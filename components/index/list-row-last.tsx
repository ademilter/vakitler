import { TimeNames } from "@/types";
import { motion } from "framer-motion";
import { cx } from "@/utils/helper";
import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";

export default function TimeListRowBottom({}: {}) {
  const { times } = useContext(CommonStoreContext);

  const now = times?.time?.now;

  if (!times) return null;

  return (
    <motion.div
      variants={{
        open: {
          y: 0,
          scale: 1,
          opacity: 1,
        },
        closed: {
          y: 30,
          scale: 0.8,
          opacity: 0,
        },
      }}
      className={cx(
        "h-full min-h-4",
        now === TimeNames.Imsak && "bg-sky-500 dark:bg-sky-500",
        now === TimeNames.Gunes && "bg-orange-500 dark:bg-orange-500",
        now === TimeNames.Ogle && "bg-yellow-500 dark:bg-yellow-500",
        now === TimeNames.Ikindi && "bg-orange-500 dark:bg-orange-500",
        now === TimeNames.Aksam && "bg-blue-500 dark:bg-blue-500",
        now === TimeNames.Yatsi && "bg-indigo-500 dark:bg-indigo-500",
        `bg-opacity-${Math.abs(7 * 5)}`,
        `dark:bg-opacity-${Math.abs(7 * 5)}`
      )}
    />
  );
}
