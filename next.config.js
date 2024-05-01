/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'json', 'geojson'],
  transpilePackages: ['three', '@react-three/drei'],
  crossOrigin: 'anonymous',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'us-east-1.xata.sh',
        port: '',
        pathname: '/file/**',
      },
    ],
  },
  experimental: {
    taint: true,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    })
    config.module.rules.push({
      test: /\.(frag|vert)$/,
      type: 'asset/source',
    })

    return config
  },
}

module.exports = nextConfig
