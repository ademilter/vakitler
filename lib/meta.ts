const siteName = "Namaz Vakitleri";
const title = `${siteName}`;
const description = "Namaz vakitlerini kolay şekilde öğrenin.";
const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://vakitler.app";
const locale = "tr-TR";

export const metadata = {
  title,
  description,
  url,
  openGraph: {
    title,
    description,
    siteName,
    locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@ademilter",
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: "#FFFFFF",
  icons: {
    "192": "/android-chrome-192.png",
    "16": "/favicon-16.png",
    "167": "/touch-icon-ipad-retina-167.png",
    "32": "/favicon-32.png",
    "512": "/icon-512.png",
    "180": "/touch-icon-iphone-180.png",
    "384": "/android-chrome-384.png",
    "152": "/touch-icon-ipad-152.png",
  },
  manifest: `${url}/manifest.json`,
};
