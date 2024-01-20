import { useContext, useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { CommonStoreContext } from "@/stores/common";
import { checkForNotification, cx } from "@/lib/utils";
import { motion } from "framer-motion";
import TimeLocation from "@/components/time-location";
import TimeSummary from "@/components/time-summary";
import TimeList from "@/components/time-list";
import TimeTravel from "@/components/time-travel";
import MainPage from "@/components/layout/main";
import { TimeNames } from "@/lib/types";

export default function Index() {
  const { t } = useTranslation("common");
  const { times, timer } = useContext(CommonStoreContext);

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!times) return;
    setStart(true);
  }, [times]);

  if (!times) return null;

  if (start) {
    checkForNotification(
      t("timerTitle", {
        time: t(times?.time.next as TimeNames),
      }) +
        ": " +
        t("timerMinute", { minute: timer[1] }),
      timer,
      45
    );
  }

  return (
    <MainPage>
      <motion.div
        initial={false}
        animate={start ? "open" : "closed"}
        className={cx(
          "h-full select-none",
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
