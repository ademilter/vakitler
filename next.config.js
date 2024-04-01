/** @type {import("next").NextConfig} */
module.exports = {
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
