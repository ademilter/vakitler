import React from "react";
import { cx } from "utils/helper";
import { TimeNames } from "utils/types";
import Head from "next/head";
import colors from "tailwindcss/colors";
import { useStore } from "stores/global";
import { HTMLMotionProps, motion } from "framer-motion";

export interface Props extends HTMLMotionProps<"div"> {}

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

      <motion.div
        className={cx(
          "fixed inset-0 overflow-hidden select-none",
          "flex flex-col gap-4",
          "px-12 pt-16 pb-12 sm:py-32",
          "bg-primary bg-gradient-to-t",
          "from-gradient-from via-gradient-via via-30% to-gradient-to",
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
  [TimeNames.Ikindi]: colors.blue[400],
  [TimeNames.Aksam]: colors.indigo[800],
  [TimeNames.Yatsi]: colors.black,
};

export const Variables: Record<TimeNames, Record<string, string>> = {
  [TimeNames.Imsak]: {
    "--primary": colors.indigo[900],
    "--secondary": colors.indigo[50],
    "--gradient-to": colors.indigo[950],
    "--gradient-via": colors.indigo[700],
    "--gradient-from": colors.sky[600],
    "--moon-light": colors.orange[50],
    "--moon-dark": colors.indigo[950],
    "--card-bg": "rgba(0,0,0,0.2)",
    "--card-text": "var(--primary)",
  },
  [TimeNames.Gunes]: {
    "--primary": colors.indigo[900],
    "--secondary": colors.indigo[50],
    "--gradient-to": colors.blue[700],
    "--gradient-via": colors.blue[400],
    "--gradient-from": colors.orange[200],
    "--moon-light": colors.blue[50],
    "--moon-dark": colors.blue[400],
    "--card-bg": "rgba(255,255,255,0.2)",
    "--card-text": "var(--primary)",
  },
  [TimeNames.Ogle]: {
    "--primary": colors.blue[50],
    "--secondary": colors.blue[900],
    "--gradient-to": colors.blue[500],
    "--gradient-via": colors.blue[300],
    "--gradient-from": colors.yellow[50],
    "--moon-light": colors.white,
    "--moon-dark": colors.blue[300],
    "--card-bg": "rgba(0,0,0,0.1)",
    "--card-text": "var(--secondary)",
  },
  [TimeNames.Ikindi]: {
    "--primary": colors.blue[50],
    "--secondary": colors.blue[900],
    "--gradient-to": colors.blue[500],
    "--gradient-via": colors.indigo[200],
    "--gradient-from": colors.orange[200],
    "--moon-light": colors.white,
    "--moon-dark": colors.blue[300],
    "--card-bg": "rgba(0,0,0,0.1)",
    "--card-text": "var(--secondary)",
  },
  [TimeNames.Aksam]: {
    "--primary": colors.blue[900],
    "--secondary": colors.blue[50],
    "--gradient-to": colors.indigo[950],
    "--gradient-via": colors.indigo[700],
    "--gradient-from": colors.sky[600],
    "--moon-light": colors.blue[50],
    "--moon-dark": colors.indigo[900],
    "--card-bg": "rgba(0,0,0,0.2)",
    "--card-text": "var(--primary)",
  },
  [TimeNames.Yatsi]: {
    "--primary": colors.blue[900],
    "--secondary": colors.blue[50],
    "--gradient-to": colors.black,
    "--gradient-via": colors.indigo[900],
    "--gradient-from": colors.indigo[800],
    "--moon-light": colors.blue[50],
    "--moon-dark": colors.blue[950],
    "--card-bg": "rgba(0,0,0,0.2)",
    "--card-text": "var(--primary)",
  },
};
