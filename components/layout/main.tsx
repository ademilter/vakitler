import { ReactNode } from "react";
import { cx } from "@/lib/utils";
import Head from "next/head";
import { useTheme } from "next-themes";
import Div100vh from "react-div-100vh";
import { useNow } from "@/stores";
import { color, theme } from "@/lib/theme";
import { metadata } from "@/lib/meta";

export default function MainPage({ children }: { children: ReactNode }) {
  const now = useNow();
  const { resolvedTheme } = useTheme();

  const themeStyle = now ? theme[now] : "";
  const themeColor = now
    ? resolvedTheme === "light"
      ? color[now][0]
      : color[now][1]
    : metadata.themeColor;

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        {themeColor && <meta name="theme-color" content={themeColor} />}
      </Head>

      <Div100vh className={cx(themeStyle, "relative dark:bg-opacity-20")}>
        {children}
      </Div100vh>
    </>
  );
}
