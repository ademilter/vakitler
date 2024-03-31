import { Head, Html, Main, NextScript } from "next/document";

export default function Document({ locale }: { locale: string }) {
  return (
    <Html lang={locale} suppressHydrationWarning>
      <Head />
      <body
        className="antialiased
      bg-white text-zinc-950
      dark:bg-black dark:text-white
      "
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
