const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true
})

module.exports = withBundleAnalyzer(
  withPWA({
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "http",
          hostname: "localhost"
        },
        {
          protocol: "http",
          hostname: "127.0.0.1"
        },
        {
          protocol: "https",
          hostname: "**"
        }
      ]
    },
    experimental: {
      serverComponentsExternalPackages: [
        "sharp",
        "onnxruntime-node",
        "@xenova/transformers"
      ]
    },
    webpack: (config, { isServer }) => {
      // Prevent webpack from trying to parse native .node binary files
      config.module.rules.push({
        test: /\.node$/,
        type: "asset/resource"
      })

      // Externalize packages with native bindings on the server
      if (isServer) {
        const existingExternals = config.externals || []
        config.externals = [
          ...(Array.isArray(existingExternals) ? existingExternals : [existingExternals]),
          "onnxruntime-node"
        ]
      }

      return config
    }
  })
)
