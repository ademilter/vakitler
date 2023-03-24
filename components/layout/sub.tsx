import { ReactNode } from "react";
import Head from "next/head";
import { useTheme } from "next-themes";
import colors from "tailwindcss/colors";

export default function SubPage({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();

  const themeColor =
    resolvedTheme === "light" ? colors.zinc["200"] : colors.zinc["900"];

  return (
    <>
      <Head>
        <meta name="theme-color" content={themeColor} />
      </Head>

      {children}
    </>
  );
}
