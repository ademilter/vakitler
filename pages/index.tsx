import React, { useEffect } from "react";
import { useStore } from "stores/global";
import IndexLayout from "components/index/layout";
import Moon from "components/index/moon";
import List from "components/index/list";
import NextTime from "components/index/next-time";
import Location from "components/index/location";
import TimeSummaryTimer from "components/time-summary-timer";
import IslamicDate from "components/islamic-date";
import TimeTravel from "components/time-travel";
import { motion } from "framer-motion";
import TimeListFull from "components/index/list-full";
import RamadanTimer from "components/ramadan-timer";
import Link from "next/link";
import { LOCAL_KEYS } from "utils/const";
import NotifyBubble from "components/notify-bubble";
import useTimer from "hooks/use-timer";

export default function Index() {
  const [anim, setAnim] = React.useState<"simple" | "full">("simple");
  const [hasNotify, setNotify] = React.useState<boolean>(false);

  const { devMode, times, updateTimer } = useStore(store => ({
    devMode: store.devMode,
    times: store.times,
    updateTimer: store.updateTimer,
  }));

  useTimer({ times, updateTimer });

  useEffect(() => {
    if (!times) return;
    updateTimer();
  }, [times]);

  useEffect(() => {
    const feedback = localStorage.getItem(LOCAL_KEYS.FeedbackModal);
    setNotify(JSON.parse(feedback || "true"));
  }, []);

  if (!times) return null;

  return (
    <IndexLayout initial="simple" animate={anim}>
      <motion.div
        variants={{
          simple: { opacity: 1, y: 0 },
          full: { opacity: 0.1, y: -20 },
        }}
      >
        <Moon className="mb-8" />
        <NextTime className="mb-1" />
        <TimeSummaryTimer />
        <RamadanTimer className="mt-3" />
      </motion.div>

      <div className="flex grow" />

      <div className="flex items-center flex-col">
        <List onClick={() => setAnim("full")} />
        {anim === "full" && <TimeListFull onClick={() => setAnim("simple")} />}
      </div>

      <div className="flex grow" />

      <motion.div
        className="flex flex-col items-center opacity-80"
        variants={{
          simple: { opacity: 1, y: 0 },
          full: { opacity: 0, y: 10 },
        }}
      >
        <IslamicDate className="mb-1 opacity-80" />

        <Link
          href={hasNotify ? "/settings/feedback" : "/settings"}
          className="inline-flex items-center gap-1.5"
        >
          <Location />
          {hasNotify && <NotifyBubble>1</NotifyBubble>}
        </Link>
      </motion.div>

      {devMode && <TimeTravel />}
    </IndexLayout>
  );
}
