import { useContext, useEffect, useState } from "react";
import { CommonStoreContext } from "@/stores/common";
import { cx } from "@/lib/utils";
import { motion } from "framer-motion";
import { TimeNames } from "@/lib/types";
import Location from "@/components/location";
import Timer from "@/components/timer";
import Time from "@/components/time";

export default function Index() {
  const { times } = useContext(CommonStoreContext);
  const now = times?.time?.now;

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!times) return;
    setStart(true);
  }, [times]);

  if (!times) return null;

  return (
    <motion.div initial={false} animate={start ? "open" : "closed"}>
      <div
        className={cx(
          "grid h-screen grid-rows-[minmax(auto,_1fr)_minmax(auto,_520px)]",
          now === TimeNames.Imsak && "text-sky-900",
          now === TimeNames.Gunes && "text-orange-900",
          now === TimeNames.Ogle && "text-yellow-900",
          now === TimeNames.Ikindi && "text-amber-900",
          now === TimeNames.Aksam && "text-blue-900",
          now === TimeNames.Yatsi && "text-indigo-900"
        )}
      >
        <Location />

        {/* TIMER */}
        <div className="flex items-center justify-center pb-12 pt-16">
          <Timer />
        </div>

        {/* TIMES */}
        <motion.div
          className="grid grow"
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
          {Object.keys(TimeNames).map((key, index) => {
            return <Time key={key} index={index} time={key as TimeNames} />;
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}
