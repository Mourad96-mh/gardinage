/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // Pas d'optimiseur en export statique : le loader pointe vers les variantes générées par scripts/images.mjs.
  images: { loader: 'custom', loaderFile: './src/lib/image-loader.ts' },
  reactStrictMode: true,
  // Le build tourne dans %TEMP% : sans ceci, Next remonte jusqu'au package-lock.json parasite du dossier utilisateur.
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
