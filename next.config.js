const nextTranslate = require("next-translate-plugin");

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "namazvakti.diyanet.gov.tr",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextTranslate(nextConfig);
