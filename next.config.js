const withPWA = require("next-pwa")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer(
  withPWA({
    experimental: {
      esmExternals: false,
    },
    pwa: {
      disable: process.env.NODE_ENV === "development",
      dest: "public",
    },
  })
)
