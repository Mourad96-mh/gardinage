/** Doit rester aligné sur VARIANTS dans scripts/images.mjs. */
const VARIANTS = [640, 960];

/**
 * Loader next/image pour l'export statique : renvoie la plus petite variante pré-générée
 * (/media/<slug>-<w>.webp) au moins aussi large que demandé, sinon l'original.
 */
export default function imageLoader({ src, width }: { src: string; width: number }): string {
  if (!src.startsWith('/media/')) return src;
  const w = VARIANTS.find((v) => v >= width);
  return w ? src.replace(/\.webp$/, `-${w}.webp`) : src;
}
