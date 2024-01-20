import { ReactNode, useContext } from "react";
import { cx } from "@/lib/utils";
import { TimeNames } from "@/lib/types";
import { CommonStoreContext } from "@/stores/common";
import Head from "next/head";
import colors from "tailwindcss/colors";
import { useTheme } from "next-themes";
import Div100vh from "react-div-100vh";

const theme = {
  [TimeNames.Imsak]:
    "bg-sky-300/30 text-sky-800 dark:bg-sky-600/20 dark:text-sky-200",
  [TimeNames.Gunes]:
    "bg-orange-300/30 text-orange-800 dark:bg-orange-600/20 dark:text-orange-200",
  [TimeNames.Ogle]:
    "bg-yellow-300/30 text-yellow-800 dark:bg-yellow-600/20 dark:text-yellow-200",
  [TimeNames.Ikindi]:
    "bg-rose-300/30 text-rose-800 dark:bg-rose-600/20 dark:text-rose-200",
  [TimeNames.Aksam]:
    "bg-blue-300/30 text-blue-800 dark:bg-blue-600/20 dark:text-blue-200",
  [TimeNames.Yatsi]:
    "bg-indigo-300/30 text-indigo-800 dark:bg-indigo-600/20 dark:text-indigo-200",
};

const color = {
  [TimeNames.Imsak]: [colors.sky["300"], "#15222c"],
  [TimeNames.Gunes]: [colors.orange["300"], "#2c1c1a"],
  [TimeNames.Ogle]: [colors.yellow["300"], "#2a201a"],
  [TimeNames.Ikindi]: [colors.rose["300"], "#2e1721"],
  [TimeNames.Aksam]: [colors.blue["300"], "#191f32"],
  [TimeNames.Yatsi]: [colors.indigo["300"], "#1d1c30"],
};

export default function MainPage({ children }: { children: ReactNode }) {
  const { times } = useContext(CommonStoreContext);
  const { resolvedTheme } = useTheme();

  const now = times?.time?.now;
  const themeStyle = now ? theme[now] : "";
  const themeColor = now
    ? resolvedTheme === "light"
      ? color[now][0]
      : color[now][1]
    : "";

  return (
    <>
      <Head>
        {themeColor && <meta name="theme-color" content={themeColor} />}
      </Head>

      <Div100vh className={cx(themeStyle, "relative")}>{children}</Div100vh>
    </>
  );
}
