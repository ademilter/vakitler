import { useContext, useEffect, useState } from "react";
import { CommonStoreContext } from "@/stores/common";
import { cx } from "@/lib/utils";
import { motion } from "framer-motion";
import TimeLocation from "@/components/time-location";
import TimeSummary from "@/components/time-summary";
import TimeList from "@/components/time-list";
import TimeTravel from "@/components/time-travel";
import MainPage from "@/components/layout/main";

export default function Index() {
  const { times } = useContext(CommonStoreContext);

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!times) return;
    setStart(true);
  }, [times]);

  if (!times) return null;

  return (
    <MainPage>
      <motion.div
        initial={false}
        animate={start ? "open" : "closed"}
        className={cx(
          "min-h-dvh overflow-hidden select-none",
          "grid grid-rows-[minmax(auto,_1fr)_minmax(auto,_480px)]",
          "md:grid-rows-[minmax(auto,_1fr)_minmax(auto,_520px)]"
        )}
      >
        <TimeLocation />
        <TimeSummary />
        <TimeList />
        <TimeTravel />
      </motion.div>
    </MainPage>
  );
}
