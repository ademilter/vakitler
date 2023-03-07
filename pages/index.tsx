import { useContext, useEffect, useState } from "react";
import Div100vh from "react-div-100vh";
import { CommonStoreContext } from "@/stores/common";
import { cx } from "@/lib/utils";
import { motion } from "framer-motion";
import TimeLocation from "@/components/time-location";
import TimeSummary from "@/components/time-summary";
import TimeList from "@/components/time-list";
import TimeTravel from "@/components/time-travel";

export default function Index() {
  const { times } = useContext(CommonStoreContext);

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!times) return;
    setStart(true);
  }, [times]);

  if (!times) return null;

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
          "relative h-full select-none",
          "grid grid-rows-[minmax(auto,_1fr)_minmax(auto,_520px)]"
        )}
      >
        <TimeLocation />
        <TimeSummary />
        <TimeList />
        <TimeTravel />
      </Div100vh>
    </motion.div>
  );
}
