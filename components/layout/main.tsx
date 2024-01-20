import { ReactNode, useContext } from "react";
import { cx } from "@/lib/utils";
import { TimeNames } from "@/lib/types";
import { CommonStoreContext } from "@/stores/common";
import Head from "next/head";
import { useTheme } from "next-themes";

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
  [TimeNames.Imsak]: ["#daf2fe", "#1a2d3f"],
  [TimeNames.Gunes]: ["#feead6", "#42261d"],
  [TimeNames.Ogle]: ["#fef6cc", "#3c2f1e"],
  [TimeNames.Ikindi]: ["#ffe4e7", "#411c25"],
  [TimeNames.Aksam]: ["#e0edff", "#1c2745"],
  [TimeNames.Yatsi]: ["#e4e8fe", "#242144"],
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

      <div className={cx(themeStyle, "fixed inset-0 h-dvh")}>{children}</div>
    </>
  );
}
