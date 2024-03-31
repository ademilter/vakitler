import React, { useContext } from "react";
import { cx } from "@/utils/helper";
import { TimeNames } from "@/types";
import { CommonStoreContext } from "@/stores/common";
import Head from "next/head";
import { useTheme } from "next-themes";
import colors from "tailwindcss/colors";

export interface Props extends React.ComponentPropsWithoutRef<"div"> {}

export default function IndexLayout({ className, ...props }: Props) {
  const { times } = useContext(CommonStoreContext);
  const { resolvedTheme } = useTheme();

  const now = times!.time.now;
  const style = ThemeStyle[now];

  const themeColor =
    resolvedTheme === "light"
      ? MainColors[now]["light"]
      : MainColors[now]["dark"];

  return (
    <>
      <Head>{<meta name="theme-color" content={themeColor} />}</Head>

      <div
        className={cx(
          "fixed inset-0 overflow-hidden",
          "grid place-items-center place-content-center",
          "gap-10 grid-rows-[auto_1fr_auto]",
          "p-10 pb-16 text-center",
          style,
          className
        )}
        {...props}
      />
    </>
  );
}

export const MainColors = {
  [TimeNames.Imsak]: {
    light: colors.blue[400],
    dark: colors.blue[400],
  },
  [TimeNames.Gunes]: {
    light: colors.blue[400],
    dark: colors.blue[400],
  },
  [TimeNames.Ogle]: {
    light: colors.blue[300],
    dark: colors.blue[300],
  },
  [TimeNames.Ikindi]: {
    light: colors.blue[400],
    dark: colors.blue[400],
  },
  [TimeNames.Aksam]: {
    light: colors.blue[400],
    dark: colors.blue[400],
  },
  [TimeNames.Yatsi]: {
    light: colors.blue[400],
    dark: colors.blue[950],
  },
};

// imsak from-orange-400 to-sky-700/50

export const ThemeStyle = {
  [TimeNames.Imsak]: cx(
    "bg-gradient-to-t from-purple-300 to-blue-800 to-100% text-white"
  ),
  [TimeNames.Gunes]: cx(
    "bg-gradient-to-t from-orange-300 to-blue-600 to-80% text-white"
  ),
  [TimeNames.Ogle]: cx(
    "bg-gradient-to-t from-yellow-100 to-blue-400 to-80% text-blue-900"
  ),
  [TimeNames.Ikindi]: cx(
    "bg-gradient-to-t from-orange-200 to-blue-500 to-80% text-blue-900"
  ),
  [TimeNames.Aksam]: cx(
    "bg-gradient-to-t from-orange-300 to-blue-700 to-80% text-blue-900"
  ),
  [TimeNames.Yatsi]: cx(
    "bg-gradient-to-t from-blue-800 to-blue-950 text-blue-50"
  ),
};
