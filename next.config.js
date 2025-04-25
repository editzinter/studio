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
  trailingSlash: true,
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  assetPrefix: process.env.NETLIFY ? '/' : '',
  webpack(config) {
    return config;
  },
};

module.exports = nextConfig; 