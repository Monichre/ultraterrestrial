const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'json', 'geojson'],
  transpilePackages: ['three', '@react-three/drei'],
  crossOrigin: 'anonymous',
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'us-east-1.xata.sh',
        port: '',
        pathname: '*',
      },
      {
        protocol: 'https',
        hostname: '**.xata.sh',
        port: '',
        pathname: '*',
      },
      {
        protocol: 'https',
        hostname: 'us-east-1.xata.sh',
        port: '',
        pathname: '*',
      },
      {
        protocol: 'https',
        hostname: 'us-east-1.storage.xata.sh',
        port: '',
        pathname: '*',
      },
    ],
    domains: ['us-east-1.storage.xata.sh', 'us-east-1.xata.sh', 'xata.sh'],
  },
  experimental: {
    taint: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // We're in the browser build, so we can safely exclude the sharp module
      config.externals.push('sharp')
    }
    // audio support
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    })

    // shader support
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
