import { Head, Html, Main, NextScript } from "next/document";

export default function Document({ locale }: { locale: string }) {
  return (
    <Html lang={locale}>
      <Head />
      <body className="scroll-smooth bg-white text-zinc-800 antialiased accent-current dark:bg-zinc-900 dark:text-zinc-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
