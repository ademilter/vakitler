"use client";

import { useEffect } from "react";
import store from "@/stores/list";
import useInterval from "@/lib/use-interval";
import { clsx } from "clsx";
import Time from "@/components/time";
import { TimeNames } from "@/lib/types";
import Timer from "@/components/timer-2";

export default function Times() {
  const { fetchData, loading, times, updateTimer } = store();

  const themeTimes = {
    [TimeNames.Fajr]: "text-sky-900",
    [TimeNames.Sunrise]: "text-orange-900",
    [TimeNames.Dhuhr]: "text-yellow-900",
    [TimeNames.Asr]: "text-amber-900",
    [TimeNames.Maghrib]: "text-blue-900",
    [TimeNames.Isha]: "text-indigo-900",
  };

  const styleCnt = themeTimes[times?.time.now ?? TimeNames.Fajr];

  useEffect(() => {
    fetchData();
  }, []);

  useInterval(updateTimer, times?.time ? 1000 : null);

  if (!times) return null;

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          className={clsx(
            "grid h-screen grid-rows-[minmax(auto,_1fr)_minmax(auto,_500px)]"
          )}
        >
          <div className="flex items-center justify-center">
            <Timer />
          </div>
          <div className="grid grow">
            {Object.keys(times.today).map((key, index) => {
              return <Time key={key} index={index} time={key as TimeNames} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
