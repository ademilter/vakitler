import { motion } from "framer-motion";
import { TimeNames } from "@/lib/types";
import Time from "@/components/time-list-row";
import TimeListRowBottom from "@/components/time-list-row-last";
import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";

export default function TimeList() {
  const { times } = useContext(CommonStoreContext);

  // yatsı vaktiyse ve gece yarısındna önceyse imsak yer değiştiriyor
  const list: [TimeNames, boolean][] =
    times!.time.now === TimeNames.Yatsi && times!.isBeforeMidnight()
      ? [
          [TimeNames.Gunes, false],
          [TimeNames.Ogle, false],
          [TimeNames.Ikindi, false],
          [TimeNames.Aksam, false],
          [TimeNames.Yatsi, false],
          [TimeNames.Imsak, true],
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
