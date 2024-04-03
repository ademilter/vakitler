import { ReactNode } from "react";
import Head from "next/head";
import { useTheme } from "next-themes";
import colors from "tailwindcss/colors";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();

  const themeColor =
    resolvedTheme === "light" ? colors.zinc["200"] : colors.zinc["900"];

  return (
    <>
      <Head>
        <meta name="theme-color" content={themeColor} />
      </Head>

      <div className="relative bg-zinc-200 dark:bg-zinc-900 min-h-dvh">
        {children}
      </div>
    </>
  );
}
