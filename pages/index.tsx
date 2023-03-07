import { useContext, useEffect, useState } from "react";
import Div100vh from "react-div-100vh";
import { CommonStoreContext } from "@/stores/common";
import { cx } from "@/lib/utils";
import { motion } from "framer-motion";
import { TimeNames } from "@/lib/types";
import Location from "@/components/location";
import Timer from "@/components/timer";
import Time from "@/components/time";
import TimePicker from "@/components/time-picker";

const colors = {
  [TimeNames.Imsak]: "text-sky-900",
  [TimeNames.Gunes]: "text-orange-900",
  [TimeNames.Ogle]: "text-yellow-900",
  [TimeNames.Ikindi]: "text-amber-900",
  [TimeNames.Aksam]: "text-blue-900",
  [TimeNames.Yatsi]: "text-indigo-900",
};

const shouldShowTimePicker = process.env.NODE_ENV !== "production";

export default function Index() {
  const { times } = useContext(CommonStoreContext);
  const now = times?.time?.now;

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!times) return;
    setStart(true);
  }, [times]);

  if (!times) return null;
  const selectedColor = now ? colors[now] : "";

  return (
    <motion.div initial={false} animate={start ? "open" : "closed"}>
      {shouldShowTimePicker && <TimePicker />}

      <Div100vh
        className={cx(
          "grid h-full grid-rows-[minmax(auto,_1fr)_minmax(auto,_520px)]",
          selectedColor
        )}
      >
        <style jsx global>
          {`
            html,
            body {
              overflow: hidden;
            }
          `}
        </style>

        <Location />

        {/* TIMER */}
        <div className="flex items-center justify-center pb-12 pt-14">
          <Timer />
        </div>

        {/* TIMES */}
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
          {Object.keys(TimeNames).map((key, index) => {
            return <Time key={key} index={index} time={key as TimeNames} />;
          })}
        </motion.div>
      </Div100vh>
    </motion.div>
  );
}
