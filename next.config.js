const withPWA = require("next-pwa")

module.exports = withPWA({
  experimental: {
    esmExternals: false,
  },
  pwa: {
    dest: "public",
  },
})
