/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export', // Remove static export to use SSR
  images: {
    domains: ['via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  // Disable eslint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig 