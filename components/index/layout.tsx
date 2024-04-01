import React from "react";
import { cx } from "utils/helper";
import { TimeNames } from "utils/types";
import Head from "next/head";
import colors from "tailwindcss/colors";
import { useStore } from "stores/global";

export interface Props extends React.ComponentPropsWithoutRef<"div"> {}

export default function IndexLayout({ className, ...props }: Props) {
  const { times } = useStore(store => ({
    times: store.times,
  }));

  const now = times!.time.now;
  const style = Variables[now];
  const themeColor = MainColors[now];

  return (
    <>
      <Head>{<meta name="theme-color" content={themeColor} />}</Head>

      <div
        data-name="layout"
        className={cx(
          "fixed inset-0 overflow-hidden",
          "grid grid-rows-[auto_1fr_auto] gap-10",
          "p-12 py-16 md:py-32",
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
  [TimeNames.Imsak]: colors.indigo[950],
  [TimeNames.Gunes]: colors.blue[700],
  [TimeNames.Ogle]: colors.blue[500],
  [TimeNames.Ikindi]: colors.blue[500],
  [TimeNames.Aksam]: colors.indigo[800],
  [TimeNames.Yatsi]: colors.indigo[950],
};

export const Variables: Record<TimeNames, Record<string, string>> = {
  [TimeNames.Imsak]: {
    "--primary": colors.indigo[950],
    "--secondary": colors.indigo[50],
    "--gradient-to": colors.indigo[900],
    "--gradient-via": colors.indigo[800],
    "--gradient-from": colors.orange[500],
    "--moon-light": colors.orange[50],
    "--moon-dark": colors.indigo[900],
  },
  [TimeNames.Gunes]: {
    "--primary": colors.indigo[950],
    "--secondary": colors.indigo[50],
    "--gradient-to": colors.blue[700],
    "--gradient-via": colors.orange[500],
    "--gradient-from": colors.orange[300],
    "--moon-light": colors.blue[50],
    "--moon-dark": colors.orange[800],
  },
  [TimeNames.Ogle]: {
    "--primary": colors.blue[50],
    "--secondary": colors.blue[950],
    "--gradient-to": colors.blue[500],
    "--gradient-via": colors.blue[300],
    "--gradient-from": colors.yellow[50],
    "--moon-light": colors.blue[50],
    "--moon-dark": colors.blue[300],
  },
  [TimeNames.Ikindi]: {
    "--primary": colors.blue[50],
    "--secondary": colors.blue[950],
    "--gradient-to": colors.blue[500],
    "--gradient-via": colors.purple[200],
    "--gradient-from": colors.orange[200],
    "--moon-light": colors.blue[50],
    "--moon-dark": colors.blue[300],
  },
  [TimeNames.Aksam]: {
    "--primary": colors.blue[950],
    "--secondary": colors.blue[50],
    "--gradient-to": colors.indigo[800],
    "--gradient-via": colors.blue[600],
    "--gradient-from": colors.sky[400],
    "--moon-light": colors.blue[50],
    "--moon-dark": colors.blue[500],
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
