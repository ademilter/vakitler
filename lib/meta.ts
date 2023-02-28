import { Metadata } from "next";

const siteName = "Namaz Vakitleri";
const title = `${siteName}`;
const description = "-";
const url = "https://vakitler.vercel.app";
const locale = "tr-TR";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    siteName,
    locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    site: "@ademilter",
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: "#ffffff",
  icons: {
    icon: "/icons-192.png",
    apple: "/icons-192.png",
  },
  manifest: `${url}/manifest.json`,
};
