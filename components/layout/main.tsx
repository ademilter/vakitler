import { ReactNode, useContext } from "react";
import { cx } from "@/lib/utils";
import { TimeNames } from "@/lib/types";
import { CommonStoreContext } from "@/stores/common";
import Head from "next/head";
import { useTheme } from "next-themes";

const theme = {
  [TimeNames.Imsak]:
    "bg-sky-300/30 text-sky-800 dark:bg-sky-500/20 dark:text-sky-200",
  [TimeNames.Gunes]:
    "bg-orange-300/30 text-orange-800 dark:bg-orange-500/20 dark:text-orange-200",
  [TimeNames.Ogle]:
    "bg-yellow-300/30 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-200",
  [TimeNames.Ikindi]:
    "bg-rose-300/30 text-rose-800 dark:bg-rose-500/20 dark:text-rose-200",
  [TimeNames.Aksam]:
    "bg-blue-300/30 text-blue-800 dark:bg-blue-500/20 dark:text-blue-200",
  [TimeNames.Yatsi]:
    "bg-indigo-300/30 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-200",
};

const color = {
  [TimeNames.Imsak]: ["#b7e5fd", "#08222e"],
  [TimeNames.Gunes]: ["#ffd3b5", "#311808"],
  [TimeNames.Ogle]: ["#fdeaaf", "#2f2407"],
  [TimeNames.Ikindi]: ["#ffc7cf", "#310e14"],
  [TimeNames.Aksam]: ["#c1dbfd", "#0d1a32"],
  [TimeNames.Yatsi]: ["#ccd1fd", "#141431"],
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
    <div className={cx("fixed bg-white dark:bg-black inset-0")}>
      <Head>
        {themeColor && <meta name="theme-color" content={themeColor} />}
      </Head>

      <div className={cx(themeStyle, "h-dvh")}>{children}</div>
    </div>
  );
}
