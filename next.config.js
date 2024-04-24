/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'json', 'geojson'],
  transpilePackages: ['three'],
  experimental: {
    taint: true,
  },
}

module.exports = nextConfig
