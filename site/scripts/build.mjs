/**
 * Build isolé, hors OneDrive.
 *
 * Le projet vit dans OneDrive\Bureau, où `.next` se corrompt : OneDrive déshydrate et
 * re-synchronise les fichiers pendant que Next les écrit, ce qui produit des erreurs
 * « EINVAL readlink » ou « Cannot find module './NNNN.js' » au milieu du build.
 *
 * Ce script recopie donc les sources dans %TEMP%, y jonctionne node_modules (une jonction
 * NTFS, pas une copie : 300 Mo évités à chaque build), lance le build là-bas, puis rapatrie
 * `out/`. Un `next dev` ouvert par l'utilisateur n'est jamais touché, puisque le .next du
 * build est celui de la copie.
 *
 *   node scripts/build.mjs
 */

import { cp, mkdir, rm, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const WORK = path.join(os.tmpdir(), 'rsp-build');

/** Ce qu'on recopie : les sources, rien d'autre. */
const COPY = [
  'src',
  'public',
  'next.config.mjs',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
];

const step = (msg) => console.log(`\n▸ ${msg}`);

async function main() {
  const t0 = Date.now();

  step(`Préparation de ${WORK}`);
  await rm(WORK, { recursive: true, force: true, maxRetries: 5 });
  await mkdir(WORK, { recursive: true });

  step('Copie des sources');
  for (const entry of COPY) {
    const from = path.join(ROOT, entry);
    if (!existsSync(from)) continue;
    await cp(from, path.join(WORK, entry), { recursive: true });
  }

  step('Jonction de node_modules');
  const link = spawnSync(
    'cmd',
    ['/c', 'mklink', '/J', path.join(WORK, 'node_modules'), path.join(ROOT, 'node_modules')],
    { stdio: 'pipe', encoding: 'utf8' },
  );
  if (link.status !== 0) {
    console.error(link.stdout || link.stderr);
    throw new Error('mklink a échoué — node_modules est-il présent ?');
  }

  step('next build');
  // On appelle le binaire Next avec le node courant plutôt que `npx` : sous Windows, spawnSync
  // ne sait pas lancer un .cmd sans shell et échouait ici sans le moindre message.
  const build = spawnSync(
    process.execPath,
    [path.join(ROOT, 'node_modules', 'next', 'dist', 'bin', 'next'), 'build'],
    { cwd: WORK, stdio: 'inherit', env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' } },
  );
  if (build.status !== 0) process.exit(build.status ?? 1);

  step('Rapatriement de out/');
  await rm(path.join(ROOT, 'out'), { recursive: true, force: true, maxRetries: 5 });
  await cp(path.join(WORK, 'out'), path.join(ROOT, 'out'), { recursive: true });

  const pages = await countHtml(path.join(ROOT, 'out'));
  const seconds = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`\n✓ ${pages} pages HTML dans out/ — ${seconds} s`);
}

async function countHtml(dir) {
  let n = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) n += await countHtml(full);
    else if (entry.name.endsWith('.html')) n += 1;
  }
  return n;
}

main().catch((err) => {
  console.error(`\n✗ ${err.message}`);
  process.exit(1);
});
