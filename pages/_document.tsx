import { Head, Html, Main, NextScript } from "next/document";

export default function Document({ locale }: { locale: string }) {
  return (
    <Html lang={locale}>
      <Head />
      <body className="scroll-smooth bg-zinc-200 text-zinc-800 antialiased dark:bg-zinc-900 dark:text-zinc-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
