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
  const style = Variables[now];

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
          "bg-primary bg-gradient-to-t",
          "from-gradient-from via-gradient-via to-gradient-to",
          "text-secondary text-center",
          className
        )}
        style={{
          ...style,
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
    light: colors.indigo[950],
    dark: colors.indigo[950],
  },
};

export const Variables: Record<TimeNames, Record<string, string>> = {
  [TimeNames.Imsak]: {
    "--primary": colors.blue[950],
    "--secondary": colors.blue[50],
    "--gradient-to": colors.indigo[950],
    "--gradient-via": colors.blue[950],
    "--gradient-from": colors.blue[800],
    "--moon-light": colors.blue[50],
    "--moon-dark": colors.blue[900],
  },
  [TimeNames.Gunes]: {
    "--primary": colors.blue[950],
    "--secondary": colors.blue[50],
    "--gradient-to": colors.indigo[950],
    "--gradient-via": colors.blue[950],
    "--gradient-from": colors.blue[800],
    "--moon-light": colors.blue[50],
    "--moon-dark": colors.blue[900],
  },
  [TimeNames.Ogle]: {
    "--primary": colors.blue[950],
    "--secondary": colors.blue[50],
    "--gradient-to": colors.indigo[950],
    "--gradient-via": colors.blue[950],
    "--gradient-from": colors.blue[800],
    "--moon-light": colors.blue[50],
    "--moon-dark": colors.blue[900],
  },
  [TimeNames.Ikindi]: {
    "--primary": colors.blue[950],
    "--secondary": colors.blue[50],
    "--gradient-to": colors.indigo[950],
    "--gradient-via": colors.blue[950],
    "--gradient-from": colors.blue[800],
    "--moon-light": colors.blue[50],
    "--moon-dark": colors.blue[900],
  },
  [TimeNames.Aksam]: {
    "--primary": colors.blue[950],
    "--secondary": colors.blue[50],
    "--gradient-to": colors.indigo[950],
    "--gradient-via": colors.blue[950],
    "--gradient-from": colors.blue[800],
    "--moon-light": colors.blue[50],
    "--moon-dark": colors.blue[900],
  },
  [TimeNames.Yatsi]: {
    "--primary": colors.blue[950],
    "--secondary": colors.blue[50],
    "--gradient-to": colors.indigo[950],
    "--gradient-via": colors.blue[950],
    "--gradient-from": colors.blue[800],
    "--moon-light": colors.blue[50],
    "--moon-dark": colors.blue[900],
  },
};
