import { motion } from "framer-motion";
import { TimeNames } from "@/types";
import Time from "@/components/index/list-row";
import TimeListRowBottom from "@/components/index/list-row-last";
import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";

export default function TimeList() {
  const { times } = useContext(CommonStoreContext);

  const isTomorrow = !times?.time.isTimeBelongsToYesterday;
  // yatsı vaktiyse imsak yer değiştiriyor
  const list: [TimeNames, boolean][] =
    times!.time.now === TimeNames.Yatsi
      ? [
          [TimeNames.Aksam, false],
          [TimeNames.Yatsi, false],
          [TimeNames.Imsak, isTomorrow],
          [TimeNames.Gunes, isTomorrow],
          [TimeNames.Ogle, isTomorrow],
          [TimeNames.Ikindi, isTomorrow],
        ]
      : (Object.keys(TimeNames).map(k => [k, false]) as [TimeNames, boolean][]);

  return (
    <motion.div
      className="grid h-full"
      variants={{
        open: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05,
            staggerDirection: -1,
          },
        },
      }}
    >
      {list.map(([key, tomorrow], index) => {
        return (
          <Time
            key={key}
            index={index}
            time={key as TimeNames}
            tomorrow={tomorrow}
          />
        );
      })}
      <TimeListRowBottom />
    </motion.div>
  );
}
