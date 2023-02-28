import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { CommonStoreProvider } from "@/stores/common";

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  style: "normal",
  subsets: ["latin-ext"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CommonStoreProvider>
      <div className={inter.variable}>
        <Component {...pageProps} />
        <Analytics />
      </div>
    </CommonStoreProvider>
  );
}
