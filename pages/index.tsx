import { useContext, useEffect, useState } from "react";
import Div100vh from "react-div-100vh";
import { CommonStoreContext } from "@/stores/common";
import { cx } from "@/lib/utils";
import { motion } from "framer-motion";
import { TimeNames } from "@/lib/types";
import TimeLocation from "@/components/time-location";
import TimeSummary from "@/components/time-summary";
import TimeList from "@/components/time-list";
import TimeTravel from "@/components/time-travel";

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
      <style jsx global>
        {`
          html,
          body {
            overflow: hidden;
          }
        `}
      </style>

      <Div100vh
        className={cx(
          "h-full select-none",
          "grid grid-rows-[minmax(auto,_1fr)_minmax(auto,_520px)]",
          selectedColor
        )}
      >
        <TimeLocation />
        <TimeSummary />
        <TimeList />
      </Div100vh>

      {shouldShowTimePicker && <TimeTravel />}
    </motion.div>
  );
}
