"use client";

import { useEffect } from "react";
import store from "@/stores/list";
import useInterval from "@/lib/use-interval";
import { clsx } from "clsx";
import Time from "@/components/time";
import { TimeNames } from "@/lib/types";
import Timer from "@/components/timer";
import { motion } from "framer-motion";

export default function Times() {
  const { fetchData, loading, times, updateTimer, timer } = store();
  const now = times?.time.now;

  useEffect(() => {
    fetchData();
  }, []);

  useInterval(updateTimer, times?.time ? 60000 : null);

  useEffect(() => {
    if (!times) return;
    updateTimer();
  }, [times]);

  if (!times) return null;

  return (
    <motion.div initial={false} animate={timer ? "open" : "closed"}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          className={clsx(
            "grid h-screen grid-rows-[minmax(auto,_1fr)_minmax(auto,_500px)]",
            now === TimeNames.Fajr && "text-sky-900",
            now === TimeNames.Sunrise && "text-orange-900",
            now === TimeNames.Dhuhr && "text-yellow-900",
            now === TimeNames.Asr && "text-amber-900",
            now === TimeNames.Maghrib && "text-blue-900",
            now === TimeNames.Isha && "text-indigo-900"
          )}
        >
          <div className="flex items-center justify-center py-12">
            <Timer />
          </div>
          <motion.div
            variants={{
              open: {
                transition: { staggerChildren: 0.05, delayChildren: 0.05 },
              },
            }}
            className="grid grow"
          >
            {Object.keys(times.today).map((key, index) => {
              return <Time key={key} index={index} time={key as TimeNames} />;
            })}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
