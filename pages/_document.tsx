import { Head, Html, Main, NextScript } from "next/document";
import { metadata } from "@/lib/meta";

export default function Document({ locale }: { locale: string }) {
  return (
    <Html lang={locale}>
      <Head>
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
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
        <meta name="twitter:creator" content={metadata.twitter.creator} />
        <meta
          name="twitter:image"
          content={`${metadata.url}${metadata.icons["180"]}`}
        />
      </Head>
      <body className="scroll-smooth bg-zinc-200 text-zinc-800 antialiased dark:bg-zinc-900 dark:text-zinc-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
