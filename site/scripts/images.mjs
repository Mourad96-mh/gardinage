/**
 * Importe les photos (CC0, archive Unsplash de Wikimedia Commons) dans public/media/.
 *
 * Table slug -> fichier Commons : scripts/photos.json. Les originaux sont mis en cache dans
 * %TEMP%/rsp-photos (curl, car fetch de Node expire sur thumb.wikimedia.org).
 * Sorties : public/media/<slug>.webp (3:2, 1400 px ; hero 2000 px), src/lib/media.ts
 * (dimensions réelles, zéro CLS) et public/media/CREDITS.json.
 *
 *   npm run images
 *
 * Ce sont des photos d'illustration : à remplacer par les chantiers réels du client.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = path.join(os.tmpdir(), 'rsp-photos');
const OUT = path.join(ROOT, 'public', 'media');
mkdirSync(CACHE, { recursive: true });
mkdirSync(OUT, { recursive: true });

const photos = JSON.parse(readFileSync(path.join(ROOT, 'scripts', 'photos.json'), 'utf8'));
const media = {};
const credits = {};

for (const [slug, file] of Object.entries(photos)) {
  const src = path.join(CACHE, `${slug}.jpg`);
  if (!existsSync(src) || statSync(src).size < 10000) {
    const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=2600`;
    execFileSync('curl', ['-s', '-L', '--max-time', '120', '-A', 'RSPSiteBuilder/1.0', '-o', src, url]);
  }
  const width = slug === 'hero' ? 2000 : 1400;
  const height = Math.round((width * 2) / 3);
  const dest = path.join(OUT, `${slug}.webp`);
  await sharp(src)
    .resize(width, height, { fit: 'cover', position: 'attention' })
    .webp({ quality: slug === 'hero' ? 60 : 56 })
    .toFile(dest);
  media[slug] = { src: `/media/${slug}.webp`, width, height };
  credits[slug] = { file: `https://commons.wikimedia.org/wiki/File:${file.replace(/ /g, '_')}`, license: 'CC0 (Unsplash archive)' };
  console.log(`✓ ${slug}  ${Math.round(statSync(dest).size / 1024)} Ko`);
}

writeFileSync(
  path.join(ROOT, 'src', 'lib', 'media.ts'),
  `// Généré par scripts/images.mjs — ne pas éditer à la main.\n` +
    `export type Photo = { src: string; width: number; height: number };\n\n` +
    `export const media = ${JSON.stringify(media, null, 2)} as const satisfies Record<string, Photo>;\n\n` +
    `export type MediaKey = keyof typeof media;\n`,
);
writeFileSync(path.join(OUT, 'CREDITS.json'), JSON.stringify(credits, null, 2));
