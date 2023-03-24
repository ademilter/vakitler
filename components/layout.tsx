import { ReactNode, useContext } from "react";
import { cx } from "@/lib/utils";
import { TimeNames } from "@/lib/types";
import { CommonStoreContext } from "@/stores/common";
import Head from "next/head";
import colors from "tailwindcss/colors";
import { useTheme } from "next-themes";

const theme = {
  [TimeNames.Imsak]: "bg-sky-50 text-sky-900 dark:text-sky-50 dark:bg-sky-900",
  [TimeNames.Gunes]:
    "bg-orange-50 text-orange-900 dark:text-orange-50 dark:bg-orange-900",
  [TimeNames.Ogle]:
    "bg-amber-50 text-amber-900 dark:text-amber-50 dark:bg-amber-900",
  [TimeNames.Ikindi]:
    "bg-rose-50 text-rose-900 dark:text-rose-50 dark:bg-rose-900",
  [TimeNames.Aksam]:
    "bg-blue-50 text-blue-900 dark:text-blue-50 dark:bg-blue-900",
  [TimeNames.Yatsi]:
    "bg-indigo-50 text-indigo-900 dark:text-indigo-50 dark:bg-indigo-900",
};

const color = {
  [TimeNames.Imsak]: [colors.sky["50"], colors.sky["900"]],
  [TimeNames.Gunes]: [colors.orange["50"], colors.orange["900"]],
  [TimeNames.Ogle]: [colors.amber["50"], colors.amber["900"]],
  [TimeNames.Ikindi]: [colors.rose["50"], colors.rose["900"]],
  [TimeNames.Aksam]: [colors.blue["50"], colors.blue["900"]],
  [TimeNames.Yatsi]: [colors.indigo["50"], colors.indigo["900"]],
};

export default function Layout({ children }: { children: ReactNode }) {
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

      <div className={cx(themeStyle, "dark:bg-opacity-100")}>{children}</div>
    </>
  );
}
