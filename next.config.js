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
  experimental: {
    serverComponentsExternalPackages: [],
  },
  webpack(config) {
    return config;
  },
};

module.exports = nextConfig; 