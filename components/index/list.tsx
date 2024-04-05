import { TimeNames } from "utils/types";
import Time from "components/index/time";
import { cx } from "utils/helper";
import { useStore } from "stores/global";
import React from "react";
import { motion } from "framer-motion";

export interface Props extends React.ComponentPropsWithoutRef<"div"> {
  onClick: () => void;
}

export default function TimeList({ onClick }: Props) {
  const { times } = useStore(store => ({
    times: store.times,
  }));

  if (!times) return null;

  // TODO: eğer imsak ise 00:00'den sonra ise sonraki günün imsak vaktini göster
  const list = [times.time.now, times.time.next];

  return (
    <motion.div
      variants={{
        simple: { scale: 1, opacity: 1 },
        full: { scale: 1.2, opacity: 0 },
      }}
      className={cx(
        "grid p-3 gap-1 w-full max-w-[230px]",
        "rounded-3xl bg-card"
      )}
      onClick={onClick}
    >
      {list.map(time => {
        return <Time key={time} time={time as TimeNames} />;
      })}
    </motion.div>
  );
}
