"use client";

import { useEffect } from "react";
import store from "@/stores/list";
import useInterval from "@/lib/use-interval";
import { cx } from "@/lib/utils";
import Time from "@/components/time";
import { TimeNames } from "@/lib/types";

export default function Times() {
  const { fetchData, loading, times, updateTimer } = store();

  const themeTimes = {
    [TimeNames.Fajr]: "text-sky-900 grid-rows-[2fr,_1fr,_1fr,_1fr,_1fr,_1fr]",
    [TimeNames.Sunrise]:
      "text-orange-900 grid-rows-[1fr,_2fr,_1fr,_1fr,_1fr,_1fr]",
    [TimeNames.Dhuhr]:
      "text-yellow-900 grid-rows-[1fr,_1fr,_2fr,_1fr,_1fr,_1fr]",
    [TimeNames.Asr]: "text-amber-900 grid-rows-[1fr,_1fr,_1fr,_2fr,_1fr,_1fr]",
    [TimeNames.Maghrib]:
      "text-blue-900 grid-rows-[1fr,_1fr,_1fr,_1fr,_2fr,_1fr]",
    [TimeNames.Isha]:
      "text-indigo-900 grid-rows-[1fr,_1fr,_1fr,_1fr,_1fr,_2fr]",
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
        <div className={cx("grid h-screen", styleCnt)}>
          {Object.keys(times.today).map((key) => {
            return <Time key={key} time={key as TimeNames} />;
          })}
        </div>
      )}
    </div>
  );
}
