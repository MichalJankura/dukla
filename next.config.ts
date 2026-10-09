import type { NextConfig } from 'next';

/**
 * Static export: `npm run build` writes plain HTML/CSS/JS to out/, hosted as a static site
 * (DigitalOcean App Platform). Consequences:
 * - no server: event labels ("Dnes", "Archív") are recomputed in the browser (useLiveEvents);
 * - no image optimizer: images in public/ are already web-sized WebP;
 * - no custom headers from Next.js: set them on the host if needed;
 * - trailing slashes give every page its own folder with index.html, which any static host serves.
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
