import { ReactNode, useContext, useEffect, useState } from "react";
import { cx } from "@/lib/utils";
import { TimeNames } from "@/lib/types";
import { CommonStoreContext } from "@/stores/common";
import Head from "next/head";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const theme = {
  [TimeNames.Imsak]:
    "bg-sky-300/30 text-sky-800 dark:bg-sky-800/30 dark:text-sky-200",
  [TimeNames.Gunes]:
    "bg-orange-300/30 text-orange-800 dark:bg-orange-800/30 dark:text-orange-200",
  [TimeNames.Ogle]:
    "bg-yellow-300/30 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-200",
  [TimeNames.Ikindi]:
    "bg-rose-300/30 text-rose-800 dark:bg-rose-800/30 dark:text-rose-200",
  [TimeNames.Aksam]:
    "bg-blue-300/30 text-blue-800 dark:bg-blue-800/30 dark:text-blue-200",
  [TimeNames.Yatsi]:
    "bg-indigo-300/30 text-indigo-800 dark:bg-indigo-800/30 dark:text-indigo-200",
};

const color = {
  [TimeNames.Imsak]: ["#daf2fe", "#192b3b"],
  [TimeNames.Gunes]: ["#feead6", "#40221a"],
  [TimeNames.Ogle]: ["#fef6cc", "#3a281a"],
  [TimeNames.Ikindi]: ["#ffe4e7", "#421a25"],
  [TimeNames.Aksam]: ["#e0edff", "#1b2448"],
  [TimeNames.Yatsi]: ["#e4e8fe", "#212044"],
};

export default function IndexLayout({ children }: { children: ReactNode }) {
  const { times } = useContext(CommonStoreContext);
  const { resolvedTheme } = useTheme();

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!times) return;
    setStart(true);
  }, [times]);

  const now = times?.time?.now;
  const themeStyle = now ? theme[now] : "";
  const themeColor = now
    ? resolvedTheme === "light"
      ? color[now][0]
      : color[now][1]
    : "";

  return (
    <div className={cx("fixed bg-white dark:bg-zinc-900 inset-0")}>
      <Head>
        {themeColor && <meta name="theme-color" content={themeColor} />}
      </Head>

      <div className={cx(themeStyle, "h-dvh")}>
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
