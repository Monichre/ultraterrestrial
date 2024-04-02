/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'json', 'geojson'],
  transpilePackages: ['sanity'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  experimental: {
    taint: true,
  },
}

module.exports = nextConfig
