const nextTranslate = require("next-translate-plugin");

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

/** @type {import("next").NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: false,
  // Self-host: emit a standalone server bundle with only the traced
  // dependencies, so the runtime image needs no node_modules install.
  output: "standalone",
});

module.exports = nextTranslate(nextConfig);
