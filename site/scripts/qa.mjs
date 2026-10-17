/**
 * Contrôle visuel et responsive de out/ : sert le site en HTTP, pilote Edge en CDP (sans dépendance),
 * mesure à 3 largeurs le débordement horizontal, les cibles tactiles < 40 px et les erreurs console,
 * puis capture des écrans dans %TEMP%/rsp-qa.
 *
 *   node scripts/qa.mjs            → rapport + captures
 */
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'out');
const SHOTS = path.join(os.tmpdir(), 'rsp-qa');
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2', '.json': 'application/json', '.txt': 'text/plain', '.xml': 'application/xml' };

const server = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(ROOT, p);
  if (!existsSync(f)) {
    res.writeHead(404, { 'content-type': 'text/html' });
    return res.end(await readFile(path.join(ROOT, '404.html')));
  }
  res.writeHead(200, { 'content-type': TYPES[path.extname(f)] ?? 'application/octet-stream' });
  res.end(await readFile(f));
}).listen(4321);

async function pages(dir = ROOT, base = '/') {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.isDirectory() && !e.name.startsWith('_')) out.push(...(await pages(path.join(dir, e.name), `${base}${e.name}/`)));
    else if (e.name === 'index.html') out.push(base);
  }
  return out;
}

await mkdir(SHOTS, { recursive: true });
const edge = spawn(EDGE, ['--headless=new', '--remote-debugging-port=9333', `--user-data-dir=${path.join(os.tmpdir(), 'rsp-edge')}`, 'about:blank']);
let wsUrl;
for (let i = 0; i < 40 && !wsUrl; i++) {
  await new Promise((r) => setTimeout(r, 300));
  try {
    const list = await (await fetch('http://127.0.0.1:9333/json/list')).json();
    wsUrl = list.find((t) => t.type === 'page')?.webSocketDebuggerUrl;
  } catch {}
}
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0;
const pending = new Map();
const listeners = [];
const errors = [];
ws.addEventListener('message', (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  } else {
    if (msg.method === 'Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails.text);
    if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') errors.push(msg.params.entry.text + ' ' + (msg.params.entry.url ?? ''));
    listeners.forEach((l) => l(msg));
  }
});
const send = (method, params = {}) =>
  new Promise((r) => {
    const i = ++id;
    pending.set(i, r);
    ws.send(JSON.stringify({ id: i, method, params }));
  });
const loaded = () => new Promise((r) => { const l = (m) => { if (m.method === 'Page.loadEventFired') { listeners.splice(listeners.indexOf(l), 1); r(); } }; listeners.push(l); });
const evaluate = async (expr) => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value;

await send('Page.enable');
await send('Runtime.enable');
await send('Log.enable');

const PROBE = `(async () => {
  await document.fonts.ready;
  await new Promise(r => setTimeout(r, 150));
  const W = innerWidth;
  const over = [];
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el);
    if (cs.position === 'fixed' || el.closest('.table-wrap') || el.closest('[hidden]')) continue;
    const r = el.getBoundingClientRect();
    if (r.width && r.right > W + 1) over.push(el.tagName.toLowerCase() + '.' + [...el.classList].join('.') + ' ' + Math.round(r.right));
  }
  const small = [];
  for (const el of document.querySelectorAll('a, button, summary, input, select, textarea')) {
    if (el.closest('[hidden]') || el.closest('.prose') || el.closest('.breadcrumbs')) continue;
    const r = el.getBoundingClientRect();
    if (r.width && r.height < 40) small.push((el.textContent || el.getAttribute('aria-label') || el.name || '').trim().slice(0, 30) + ' ' + Math.round(r.height));
  }
  const h1 = document.querySelectorAll('h1').length;
  return { W, scroll: document.documentElement.scrollWidth, over: over.slice(0, 5), small: [...new Set(small)].slice(0, 6), h1 };
})()`;

const all = await pages();
const widths = [390, 768, 1280];
const report = [];
for (const w of widths) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: w < 768 ? 844 : 900, deviceScaleFactor: 1, mobile: w < 768 });
  for (const p of all) {
    const l = loaded();
    await send('Page.navigate', { url: `http://127.0.0.1:4321${p}` });
    await l;
    const r = await evaluate(PROBE);
    const bad = r.W !== w || r.scroll > r.W || r.over.length || r.h1 !== 1;
    if (bad || (w < 768 && r.small.length)) report.push({ w, p, ...r });
  }
}

// Captures pleine page de quelques gabarits.
const shots = [['/', 1280], ['/', 390], ['/services/securite-incendie-ssiap/', 1280], ['/conseils/ssiap-1-2-3-differences/', 390], ['/zones-intervention/', 1280], ['/contact/', 390], ['/contact/', 1280], ['/a-propos/', 1280]];
for (const [p, w] of shots) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 768 });
  const l = loaded();
  await send('Page.navigate', { url: `http://127.0.0.1:4321${p}` });
  await l;
  await evaluate(`document.fonts.ready.then(() => new Promise(r => setTimeout(r, 400)))`);
  const h = await evaluate('document.documentElement.scrollHeight');
  await evaluate(`(async () => { document.querySelectorAll('img').forEach(i => i.loading = 'eager'); for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } scrollTo(0, 0); await new Promise(r => setTimeout(r, 300)); await Promise.all([...document.images].map(i => i.decode().catch(() => {}))); })()`);
  const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 70, captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: Math.min(h, 9000), scale: 1 } });
  const name = `${p.replace(/\//g, '_') || 'home'}${w}.jpg`;
  await writeFile(path.join(SHOTS, name), Buffer.from(shot.result.data, 'base64'));
}

// Menu mobile
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
{
  const l = loaded();
  await send('Page.navigate', { url: 'http://127.0.0.1:4321/' });
  await l;
}
const menu = await evaluate(`(async () => {
  document.querySelector('.header__burger').click();
  await new Promise(r => setTimeout(r, 200));
  const m = document.querySelector('#menu-mobile');
  const links = [...m.querySelectorAll('a')].map(a => Math.round(a.getBoundingClientRect().height));
  const burger = document.querySelector('.header__burger').getBoundingClientRect();
  const top = document.elementFromPoint(burger.x + burger.width/2, burger.y + burger.height/2);
  return { hidden: m.hidden, display: getComputedStyle(m).display, links, burgerOnTop: !!top.closest('.header__burger') };
})()`);

console.log(`${all.length} pages × ${widths.length} largeurs`);
console.log(report.length ? JSON.stringify(report, null, 1) : 'Aucun défaut de mise en page.');
console.log('Menu mobile :', JSON.stringify(menu));
console.log('Erreurs console :', errors.length ? [...new Set(errors)] : 'aucune');
console.log('Captures :', SHOTS);
ws.close();
edge.kill();
server.close();
process.exit(0);
