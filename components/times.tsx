"use client";

import { useEffect } from "react";
import store from "@/stores/times";
import useInterval from "@/lib/use-interval";
import { clsx } from "clsx";
import Time from "@/components/time";
import { TimeNames } from "@/lib/types";
import Timer from "@/components/timer";
import { motion } from "framer-motion";
import InfoBar from "@/components/info-bar";
import { useSearchParams } from "next/navigation";

export default function Times() {
  const searchParams = useSearchParams();
  const { fetchData, loading, times, updateTimer, timer } = store();
  const now = times?.time.now;

  useEffect(() => {
    console.log(searchParams?.get("lang"));
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
            "grid h-screen grid-rows-[minmax(auto,_1fr)_minmax(auto,_540px)]",
            now === TimeNames.Fajr && "text-sky-900",
            now === TimeNames.Sunrise && "text-orange-900",
            now === TimeNames.Dhuhr && "text-yellow-900",
            now === TimeNames.Asr && "text-amber-900",
            now === TimeNames.Maghrib && "text-blue-900",
            now === TimeNames.Isha && "text-indigo-900"
          )}
        >
          <InfoBar />

          {/* TIMER */}
          <div className="flex items-center justify-center py-12">
            <Timer />
          </div>

          {/* TIMES */}
          <motion.div
            variants={{
              open: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.05,
                },
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
