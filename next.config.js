const nextTranslate = require("next-translate-plugin")

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: false,
});
 
module.exports = nextTranslate(nextConfig)