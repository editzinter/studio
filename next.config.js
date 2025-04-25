/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  // For static sites
  trailingSlash: true,
  output: 'export',
  
  // Ensure app directory is handled properly
  experimental: {
    appDir: true,
  },
  
  // Use the default 'out' directory
  distDir: 'out',
};

module.exports = nextConfig; 