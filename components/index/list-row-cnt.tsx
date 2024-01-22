import { TimeNames } from "@/lib/types";
import Container from "@/components/container";
import { motion } from "framer-motion";
import { cx } from "@/lib/utils";
import { ReactNode } from "react";

export default function ListRowCnt({
  children,
  index,
  now,
  isActive = false,
  isPast = false,
}: {
  now: TimeNames;
  index: number;
  children: ReactNode;
  isActive: boolean;
  isPast: boolean;
}) {
  const styleRow = cx(
    now === TimeNames.Imsak && "bg-sky-500 dark:bg-sky-500",
    now === TimeNames.Gunes && "bg-orange-500 dark:bg-orange-500",
    now === TimeNames.Ogle && "bg-yellow-500 dark:bg-yellow-500",
    now === TimeNames.Ikindi && "bg-rose-500 dark:bg-rose-500",
    now === TimeNames.Aksam && "bg-blue-500 dark:bg-blue-500",
    now === TimeNames.Yatsi && "bg-indigo-500 dark:bg-indigo-500",
    `bg-opacity-${Math.abs((index + 1) * 5)}`,
    `dark:bg-opacity-${Math.abs((index + 1) * 5)}`
  );

  return (
    <motion.div {...rowAnim} className={cx("relative grow h-full", styleRow)}>
      <Container
        className={cx(
          "flex h-full",
          isActive && "py-2",
          isPast && "opacity-60 dark:opacity-40"
        )}
      >
        {children}
      </Container>
    </motion.div>
  );
}

const rowAnim = {
  variants: {
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
  },
};
