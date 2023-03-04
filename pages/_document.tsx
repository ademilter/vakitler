import { Head, Html, Main, NextScript } from "next/document";

export default function Document({ locale }: { locale: string }) {
  return (
    <Html lang={locale}>
      <Head />
      <body className="scroll-smooth bg-white text-zinc-900 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
