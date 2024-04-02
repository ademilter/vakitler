import React, { useEffect } from "react";
import { useStore } from "stores/global";
import IndexLayout from "components/index/layout";
import Moon from "components/index/moon";
import List from "components/index/list";
import NextTime from "components/index/next-time";
import Location from "components/index/location";
import TimeSummaryTimer from "components/time-summary-timer";
import IslamicDate from "components/islamic-date";
import useInterval from "hooks/use-interval";
import { DateTime } from "luxon";
import TimeTravel from "components/time-travel";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import TimeListFull from "../components/index/list-full";
import Link from "next/link";

export default function Index() {
  const { push } = useRouter();

  const [showList, setShowList] = React.useState(false);

  const { hasLocalData, initApp, devMode, times, updateTimer } = useStore(
    store => ({
      devMode: store.devMode,
      times: store.times,
      updateTimer: store.updateTimer,
      hasLocalData: store.hasLocalData,
      initApp: store.initApp,
    })
  );

  useEffect(() => {
    if (hasLocalData()) {
      initApp();
    } else {
      push("/settings/country");
    }
  }, []);

  useEffect(() => {
    if (!times) return;
    updateTimer();
  }, [times]);

  useInterval(
    () => {
      let localTime = DateTime.local();

      const timeTravel = times!.timeTravel ?? [0, 0, 0];
      const hasChange = timeTravel.some((value: number) => value !== 0);

      if (hasChange) {
        localTime = localTime.set({
          hour: localTime.hour + timeTravel[0],
          minute: localTime.minute + timeTravel[1],
          second: localTime.second + timeTravel[2],
        });
      }

      times?.updateDateTime(localTime);
      updateTimer();
    },
    times ? 1000 : null
  );

  if (!times) return null;

  return (
    <IndexLayout
      initial="simple"
      animate={showList ? "full" : "simple"}
      showList={showList}
    >
      <motion.div
        variants={{
          simple: { opacity: 1, y: 0 },
          full: { opacity: 0, y: -20 },
        }}
      >
        <Moon className="mb-8" />
        <NextTime className="mb-1" />
        <TimeSummaryTimer />
      </motion.div>

      <div className="flex grow" />

      <div className="flex items-center flex-col">
        <List showList={showList} onClick={() => setShowList(true)} />
        {showList && (
          <TimeListFull
            showList={showList}
            onClick={() => setShowList(false)}
          />
        )}
      </div>

      <div className="flex grow" />

      <motion.div
        className="opacity-80"
        variants={{
          simple: { opacity: 1, y: 0 },
          full: { opacity: 0, y: 10 },
        }}
      >
        <IslamicDate className="mb-1" />
        <Link href="/settings">
          <Location />
        </Link>
      </motion.div>

      {devMode && <TimeTravel />}
    </IndexLayout>
  );
}
