import { TimeNames } from "utils/types";
import Time from "components/index/time";
import { cx } from "utils/helper";
import { useStore } from "stores/global";
import React from "react";
import { motion } from "framer-motion";
import IslamicDate from "../islamic-date";
import Location from "./location";

export interface Props extends React.ComponentPropsWithoutRef<"div"> {
  onClick: () => void;
}

export default function TimeListFull({ onClick }: Props) {
  const { times } = useStore(store => ({
    times: store.times,
  }));

  if (!times) return null;

  return (
    <motion.div
      variants={{
        simple: {
          scale: 0.6,
          opacity: 0,
          transition: {
            duration: 2,
            type: "spring",
            stiffness: 100,
            damping: 30,
          },
        },
        full: {
          scale: 1,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 500,
            damping: 30,
          },
        },
      }}
      className={cx(
        "fixed z-10 inset-0 p-10 flex flex-col items-center justify-center"
      )}
      onClick={onClick}
    >
      <div className="grid gap-1 px-10 w-full max-w-[300px] py-8 rounded-3xl bg-white text-card shadow-2xl">
        {Object.keys(TimeNames).map(time => {
          return (
            <Time
              key={time}
              time={time as TimeNames}
              className="border-b px-0 rounded-none last:border-b-0 data-[time='next']:shadow-none"
            />
          );
        })}
      </div>

      <div className="mt-6">
        <IslamicDate className="mb-1" />
        <Location />
      </div>
    </motion.div>
  );
}
