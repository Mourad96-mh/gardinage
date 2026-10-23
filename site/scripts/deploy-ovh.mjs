/**
 * Mise en ligne sur l'hébergement OVH (rhonesj.cluster129.hosting.ovh.net) par FTP.
 *
 * Envoie le contenu de out/ dans le dossier www/ de l'hébergement, avec curl (fourni par
 * Windows et Git Bash). Les identifiants FTP viennent de l'espace client OVH :
 * Hébergements → rhonesj… → FTP-SSH. Ils ne sont jamais écrits dans le dépôt.
 *
 *   npm run build
 *   OVH_FTP_USER=rhonesj OVH_FTP_PASS=… node scripts/deploy-ovh.mjs
 *
 * Les fichiers supprimés du site ne sont pas effacés côté serveur : les retirer via FileZilla.
 */

import { readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(HERE, '..', 'out');
const HOST = process.env.OVH_FTP_HOST || 'ftp.cluster129.hosting.ovh.net';
const DIR = process.env.OVH_FTP_DIR || 'www';
const { OVH_FTP_USER: USER, OVH_FTP_PASS: PASS } = process.env;

async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

async function main() {
  if (!USER || !PASS) throw new Error('OVH_FTP_USER et OVH_FTP_PASS sont requis.');
  if (!existsSync(path.join(OUT, 'index.html'))) throw new Error('out/ vide : lancer npm run build.');
  if (!existsSync(path.join(OUT, '.htaccess'))) throw new Error('out/.htaccess manquant.');

  const files = await walk(OUT);
  console.log(`▸ ${files.length} fichiers → ftp://${HOST}/${DIR}/`);

  // Un seul appel curl pour toute la liste : une connexion, -T/URL répétés.
  const args = ['--silent', '--show-error', '--fail', '--ssl', '--ftp-create-dirs', '--user', `${USER}:${PASS}`];
  for (const file of files) {
    const rel = path.relative(OUT, file).split(path.sep).map(encodeURIComponent).join('/');
    args.push('-T', file, `ftp://${HOST}/${DIR}/${rel}`);
  }
  const t0 = Date.now();
  const res = spawnSync('curl', args, { stdio: 'inherit' });
  if (res.status !== 0) throw new Error(`curl a échoué (code ${res.status}).`);
  console.log(`✓ En ligne — ${((Date.now() - t0) / 1000).toFixed(1)} s`);
}

main().catch((err) => {
  console.error(`✗ ${err.message}`);
  process.exit(1);
});
