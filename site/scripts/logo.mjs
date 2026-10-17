/**
 * Détoure le logo fourni par le client (JPEG sur fond blanc, reçu par WhatsApp) et produit
 * les déclinaisons du site.
 *
 * Le fond est retiré par remplissage depuis les bords : seuls les pixels quasi blancs reliés
 * au cadre deviennent transparents, si bien que le filet blanc à l'intérieur de l'écusson est
 * conservé. Une rampe de transparence entre 200 et 245 évite le liseré blanc des bords JPEG.
 *
 * Sorties :
 *   public/brand/logo-rsp.png      emblème complet détouré (en-tête, pied de page)
 *   src/app/icon.png               favicon 256 px (écusson seul, recadré)
 *   src/app/apple-icon.png         180 px sur fond marine
 *   public/brand/og-default.jpg    carte de partage 1200×630
 *
 *   npm run logo
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'assets-src', 'logo-client.jpeg');
const NAVY = '#0b1a33';

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const seen = new Uint8Array(W * H);
const stack = [];
const lightness = (i) => Math.min(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]);
const isBg = (i) => lightness(i) > 200;

for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x);
for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1);
while (stack.length) {
  const i = stack.pop();
  if (seen[i] || !isBg(i)) continue;
  seen[i] = 1;
  const l = lightness(i);
  data[i * 4 + 3] = l >= 245 ? 0 : Math.round(((245 - l) / 45) * 255);
  const x = i % W;
  if (x > 0) stack.push(i - 1);
  if (x < W - 1) stack.push(i + 1);
  if (i >= W) stack.push(i - W);
  if (i < W * (H - 1)) stack.push(i + W);
}

const cut = await sharp(data, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
const trimmed = await sharp(cut).trim({ threshold: 1 }).toBuffer();

await sharp(trimmed)
  .resize({ height: 240 })
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile(path.join(ROOT, 'public', 'brand', 'logo-rsp.png'));
const meta = await sharp(path.join(ROOT, 'public', 'brand', 'logo-rsp.png')).metadata();
console.log(`✓ logo-rsp.png ${meta.width}×${meta.height}`);

// Écusson seul (sans le bandeau) pour les petites tailles : la partie haute centrale du logo.
const t = await sharp(trimmed).metadata();
const shield = await sharp(trimmed)
  .extract({ left: Math.round(t.width * 0.18), top: 0, width: Math.round(t.width * 0.64), height: Math.round(t.height * 0.7) })
  .toBuffer();
await sharp(shield)
  .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(ROOT, 'src', 'app', 'icon.png'));
await sharp(shield)
  .resize(150, 150, { fit: 'contain', background: NAVY })
  .extend({ top: 15, bottom: 15, left: 15, right: 15, background: NAVY })
  .flatten({ background: NAVY })
  .png()
  .toFile(path.join(ROOT, 'src', 'app', 'apple-icon.png'));
console.log('✓ icon.png, apple-icon.png');

// Carte de partage : fond marine, logo à gauche, accroche à droite.
const logoOg = await sharp(trimmed).resize({ height: 420 }).png().toBuffer();
const lm = await sharp(logoOg).metadata();
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#10264a"/><stop offset="1" stop-color="${NAVY}"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="606" width="1200" height="24" fill="#d4a62a"/>
  <text x="600" y="250" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="58" fill="#ffffff">Sécurité privée</text>
  <text x="600" y="318" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="58" fill="#ffffff">à Lyon et dans le Rhône</text>
  <text x="600" y="390" font-family="Arial, sans-serif" font-size="28" fill="#e9c75f">Gardiennage · Maître-chien · SSIAP</text>
  <text x="600" y="430" font-family="Arial, sans-serif" font-size="28" fill="#e9c75f">Événementiel · Rondes · Prévention vol</text>
  <text x="600" y="500" font-family="Arial, sans-serif" font-size="26" fill="#c9d3e3">Devis gratuit · Lyon, Métropole et Rhône</text>
</svg>`;
await sharp(Buffer.from(svg))
  .composite([{ input: logoOg, left: Math.round(300 - lm.width / 2), top: Math.round(303 - lm.height / 2) }])
  .jpeg({ quality: 84 })
  .toFile(path.join(ROOT, 'public', 'brand', 'og-default.jpg'));
console.log('✓ og-default.jpg');
