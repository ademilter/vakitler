import "./globals.css";

import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import { metadata } from "@/utils/meta";
import StoreProvider from "@/stores/StoreProvider";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Meta />

      <ThemeProvider attribute="class">
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </ThemeProvider>

      <Analytics />
    </>
  );
}

function Meta() {
  return (
    <Head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />

      <meta name="application-name" content={metadata.title} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={metadata.title} />
      <meta name="description" content={metadata.description} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content={metadata.themeColor} />

      <link rel="apple-touch-icon" href={metadata.icons["180"]} />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href={metadata.icons["152"]}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={metadata.icons["180"]}
      />
      <link
        rel="apple-touch-icon"
        sizes="167x167"
        href={metadata.icons["167"]}
      />

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={metadata.icons["32"]}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={metadata.icons["16"]}
      />
      <link rel="manifest" href={metadata.manifest} />
      {/*<link
        rel="mask-icon"
        href="/icons/safari-pinned-tab.svg"
        color="#5bbad5"
      />*/}

      <meta property="og:type" content={metadata.openGraph.type} />
      <meta property="og:title" content={metadata.openGraph.title} />
      <meta
        property="og:description"
        content={metadata.openGraph.description}
      />
      <meta property="og:url" content={metadata.url} />
      <meta property="og:site_name" content={metadata.openGraph.siteName} />
      <meta
        property="og:image"
        content={`${metadata.url}${metadata.icons["192"]}`}
      />

      <meta name="twitter:card" content={metadata.twitter.card} />
      <meta name="twitter:url" content={metadata.url} />
      <meta name="twitter:title" content={metadata.twitter.title} />
      <meta name="twitter:description" content={metadata.twitter.description} />
      <meta name="twitter:creator" content={metadata.twitter.creator} />
      <meta
        name="twitter:image"
        content={`${metadata.url}${metadata.icons["180"]}`}
      />

      {/*apple splash screen images*/}
      {/*
      <link rel='apple-touch-startup-image' href='/images/apple_splash_2048.png' sizes='2048x2732' />
      <link rel='apple-touch-startup-image' href='/images/apple_splash_1668.png' sizes='1668x2224' />
      <link rel='apple-touch-startup-image' href='/images/apple_splash_1536.png' sizes='1536x2048' />
      <link rel='apple-touch-startup-image' href='/images/apple_splash_1125.png' sizes='1125x2436' />
      <link rel='apple-touch-startup-image' href='/images/apple_splash_1242.png' sizes='1242x2208' />
      <link rel='apple-touch-startup-image' href='/images/apple_splash_750.png' sizes='750x1334' />
      <link rel='apple-touch-startup-image' href='/images/apple_splash_640.png' sizes='640x1136' />
      */}
    </Head>
  );
}
