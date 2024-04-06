import React from "react";
import { cx } from "utils/helper";
import Head from "next/head";
import { useStore } from "stores/global";
import { HTMLMotionProps, motion } from "framer-motion";
import { CSSVariables } from "utils/const";

export interface Props extends HTMLMotionProps<"div"> {}

export default function IndexLayout({ className, ...props }: Props) {
  const { times } = useStore(store => ({
    times: store.times,
  }));

  const now = times!.time.now;
  const style = CSSVariables[now];

  return (
    <>
      <Head>
        {<meta name="theme-color" content={style["--gradient-to"]} />}
      </Head>

      <motion.div
        className={cx(
          "fixed inset-0 overflow-hidden select-none",
          "flex flex-col gap-4",
          "px-12 pt-16 pb-12 sm:py-32",
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
