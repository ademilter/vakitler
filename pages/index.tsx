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
import { motion } from "framer-motion";
import TimeListFull from "../components/index/list-full";
import Link from "next/link";
import { IconDots } from "@tabler/icons-react";

export default function Index() {
  const [anim, setAnim] = React.useState<"simple" | "full">("simple");

  const { devMode, times, updateTimer } = useStore(store => ({
    devMode: store.devMode,
    times: store.times,
    updateTimer: store.updateTimer,
    hasLocalData: store.hasLocalData,
    initApp: store.initApp,
  }));

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
    <IndexLayout initial="simple" animate={anim}>
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
        <List onClick={() => setAnim("full")} />
        {anim === "full" && <TimeListFull onClick={() => setAnim("simple")} />}
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
        <Link href="/settings" className="inline-flex items-center gap-1 ">
          <Location />
          <IconDots size={20} stroke={1.2} className="opacity-50" />
        </Link>
      </motion.div>

      {devMode && <TimeTravel />}
    </IndexLayout>
  );
}
