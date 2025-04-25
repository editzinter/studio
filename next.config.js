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
  
  // Use the default 'out' directory
  distDir: 'out',
};

module.exports = nextConfig; 