import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "@next/font/google";
import AnalyticsWrapper from "@/components/analytics";
import { ReactNode } from "react";

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  style: "normal",
  subsets: ["latin-ext"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="scroll-smooth bg-white text-zinc-900 antialiased">
        <main>{children}</main>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}

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
