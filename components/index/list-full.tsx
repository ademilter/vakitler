import { TimeNames } from "utils/types";
import Time from "components/index/list-row";
import { cx } from "utils/helper";
import { useStore } from "stores/global";
import React from "react";
import { motion } from "framer-motion";

export interface Props extends React.ComponentPropsWithoutRef<"div"> {
  showList: boolean;
  onClick: () => void;
}

export default function TimeListFull({ onClick, showList }: Props) {
  const { times } = useStore(store => ({
    times: store.times,
  }));

  if (!times) return null;

  return (
    <motion.div
      variants={{
        full: { scale: 1, opacity: 1 },
        simple: { scale: 0.8, opacity: 0 },
      }}
      className={cx("fixed z-10 inset-10 flex items-center justify-center")}
      onClick={onClick}
    >
      <div className="grid gap-1 p-8 max-w-full rounded-3xl bg-white shadow-2xl">
        {Object.keys(TimeNames).map(time => {
          return (
            <Time
              key={time}
              time={time as TimeNames}
              className="border-b rounded-none px-0"
            />
          );
        })}
      </div>
    </motion.div>
  );
}
