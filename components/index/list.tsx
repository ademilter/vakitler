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

export default function TimeList({ onClick, showList }: Props) {
  const { times } = useStore(store => ({
    times: store.times,
  }));

  if (!times) return null;

  // TODO: eğer imsak ise 00:00'den sonra ise sonraki günün imsak vaktini göster
  const list = [times.time.now, times.time.next];

  return (
    <motion.div
      variants={{
        full: { scale: 1.2, opacity: 0 },
        simple: { scale: 1, opacity: 1 },
      }}
      className={cx("grid p-2 gap-1 rounded-3xl bg-card")}
      onClick={onClick}
    >
      {list.map(time => {
        return <Time key={time} time={time as TimeNames} />;
      })}
    </motion.div>
  );
}
