/**
 * Contrôle SEO du HTML construit (out/) : longueur des title et description (entités décodées),
 * un seul h1, canonique auto-référente, og:image présente, JSON-LD valide, doublons, liens internes cassés.
 *
 *   node scripts/seo-check.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'out');
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = path.join(d, f);
    if (statSync(p).isDirectory()) {
      if (!f.startsWith('_')) walk(p);
    } else if (f === 'index.html') files.push(p);
  }
})(OUT);

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const titles = new Map();
const descs = new Map();
const types = {};
let problems = 0;

for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const head = html.slice(0, html.indexOf('</head>'));
  const rel = path.relative(OUT, path.dirname(f)).split(path.sep).join('/');
  const route = rel ? `/${rel}/` : '/';
  const title = decode(head.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? '');
  const desc = decode(head.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  const canon = head.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '';
  const og = head.match(/<meta property="og:image" content="([^"]*)"/)?.[1] ?? '';
  const robots = head.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? '';
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  const ld = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => {
    try {
      return JSON.parse(m[1]);
    } catch {
      return 'INVALID';
    }
  });

  const issues = [];
  if (title.length < 30 || title.length > 60) issues.push(`title ${title.length}`);
  if (desc.length < 110 || desc.length > 160) issues.push(`desc ${desc.length}`);
  if (h1 !== 1) issues.push(`h1 ×${h1}`);
  if (!canon.endsWith(route)) issues.push(`canonique ${canon}`);
  if (!og) issues.push('pas d’og:image');
  if (ld.includes('INVALID')) issues.push('JSON-LD invalide');
  for (const l of ld) {
    if (l === 'INVALID') continue;
    const t = l['@graph'] ? l['@graph'].map((g) => g['@type']) : [l['@type']];
    t.forEach((x) => (types[x] = (types[x] || 0) + 1));
  }
  if (titles.has(title)) issues.push(`title identique à ${titles.get(title)}`);
  titles.set(title, route);
  if (descs.has(desc)) issues.push(`description identique à ${descs.get(desc)}`);
  descs.set(desc, route);
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const u = m[1];
    if (u.startsWith('/_next')) continue;
    const target = u.endsWith('/') ? path.join(OUT, u, 'index.html') : path.join(OUT, u);
    if (!existsSync(target)) issues.push(`lien cassé ${u}`);
  }

  if (issues.length && !robots.includes('noindex')) problems++;
  const flag = issues.length ? '✗' : '✓';
  const extra = robots ? `[${robots}] ` : '';
  console.log(`${flag} ${route.padEnd(46)} T${String(title.length).padStart(3)} D${String(desc.length).padStart(4)} ${extra}${[...new Set(issues)].join(' | ')}`);
}

console.log('\nJSON-LD :', JSON.stringify(types));
console.log(`${files.length} pages, ${problems} avec défaut (hors noindex)`);
process.exit(problems ? 1 : 0);
