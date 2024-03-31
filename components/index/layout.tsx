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
  const style1 = Variables[now];

  const themeColor =
    resolvedTheme === "light"
      ? MainColors[now]["light"]
      : MainColors[now]["dark"];

  return (
    <>
      <Head>{<meta name="theme-color" content={themeColor} />}</Head>

      <div
        data-name="layout"
        className={cx(
          "fixed inset-0 overflow-hidden",
          "grid grid-rows-[auto_1fr_auto] gap-10",
          "p-12 md:py-24",
          "bg-primary bg-gradient-to-t from-gradient-1 to-gradient-2",
          "text-secondary text-center",
          style,
          className
        )}
        style={{
          ...style1,
        }}
        {...props}
      />
    </>
  );
}

export const MainColors = {
  [TimeNames.Imsak]: {
    light: colors.blue[950],
    dark: colors.blue[950],
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

export const Variables: Record<TimeNames, Record<string, string>> = {
  [TimeNames.Imsak]: { "--bg-theme": "red", "--text-theme": "white" },
  [TimeNames.Gunes]: { "--bg-theme": "red", "--text-theme": "white" },
  [TimeNames.Ogle]: { "--bg-theme": "red", "--text-theme": "white" },
  [TimeNames.Ikindi]: { "--bg-theme": "red", "--text-theme": "white" },
  [TimeNames.Aksam]: { "--bg-theme": "red", "--text-theme": "white" },
  [TimeNames.Yatsi]: {
    "--primary": colors.blue[950],
    "--secondary": colors.blue[50],
    "--gradient-from": colors.blue[800],
    "--gradient-to": colors.blue[950],
    "--moon-light": colors.blue[50],
    "--moon-dark": colors.blue[800],
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
  [TimeNames.Yatsi]: cx(),
  // "bg-gradient-to-t from-blue-800 to-blue-950 text-blue-50"
};
