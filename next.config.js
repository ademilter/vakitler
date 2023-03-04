const nextTranslate = require("next-translate-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

module.exports = nextTranslate(nextConfig);
