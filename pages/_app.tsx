import "@/styles/globals.css";
import Head from "next/head";

import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>

      <Analytics />
    </>
  );
}
