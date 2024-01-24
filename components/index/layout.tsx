import { ReactNode, useContext, useEffect, useState } from "react";
import { cx } from "@/lib/utils";
import { TimeNames } from "@/lib/types";
import { CommonStoreContext } from "@/stores/common";
import Head from "next/head";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const tailwindConfig = require("../../tailwind.config");

const themeStyle = {
  [TimeNames.Imsak]: cx(
    "bg-Imsak-light dark:bg-Imsak-dark",
    "text-sky-800 dark:text-sky-200"
  ),
  [TimeNames.Gunes]: cx(
    "bg-Gunes-light dark:bg-Gunes-dark",
    "text-orange-800 dark:text-orange-200"
  ),
  [TimeNames.Ogle]: cx(
    "bg-Ogle-light dark:bg-Ogle-dark",
    "text-yellow-800 dark:text-yellow-200"
  ),
  [TimeNames.Ikindi]: cx(
    "bg-Ikindi-light dark:bg-Ikindi-dark",
    "text-rose-800 dark:text-rose-200"
  ),
  [TimeNames.Aksam]: cx(
    "bg-Aksam-light dark:bg-Aksam-dark",
    "text-blue-800 dark:text-blue-200"
  ),
  [TimeNames.Yatsi]: cx(
    "bg-Yatsi-light dark:bg-Yatsi-dark",
    "text-indigo-800 dark:text-indigo-200"
  ),
};

export default function IndexLayout({ children }: { children: ReactNode }) {
  const { times } = useContext(CommonStoreContext);
  const { resolvedTheme } = useTheme();

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!times) return;
    setStart(true);
  }, [times]);

  const now = times!.time.now;

  const themeColor =
    resolvedTheme === "light"
      ? tailwindConfig.theme.extend.colors[now]["light"]
      : tailwindConfig.theme.extend.colors[now]["dark"];

  return (
    <div className={cx("fixed bg-white dark:bg-zinc-900 inset-0")}>
      <Head>
        {themeColor && <meta name="theme-color" content={themeColor} />}
      </Head>

      <div className={cx(themeStyle[now], "h-dvh")}>
        <motion.div
          initial={false}
          animate={start ? "open" : "closed"}
          className={cx(
            "h-full select-none",
            "grid grid-rows-[minmax(auto,_1fr)_minmax(auto,_460px)]",
            "md:grid-rows-[minmax(auto,_1fr)_minmax(auto,_600px)]"
          )}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
