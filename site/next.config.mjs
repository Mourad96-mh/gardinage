/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  // Le build tourne dans %TEMP% : sans ceci, Next remonte jusqu'au package-lock.json parasite du dossier utilisateur.
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
