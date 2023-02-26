import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "@next/font/google";
import { cx } from "@/lib/utils";
import AnalyticsWrapper from "../components/analytics";

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  style: "normal",
  subsets: ["latin-ext"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={cx("overflow-y-scroll scroll-smooth", inter.variable)}
    >
      <body className="bg-white leading-normal text-zinc-600 antialiased dark:bg-zinc-900 dark:text-zinc-400">
        <main>{children}</main>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}

const siteName = "Namaz Vakti";
const title = `${siteName}`;
const description = "";
const url = "https://ademilter.vercel.app";
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
