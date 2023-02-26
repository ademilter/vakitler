"use client";

import { useEffect } from "react";
import store from "@/stores/list";
import useInterval from "@/lib/use-interval";
import { cx, themeTimes } from "@/lib/utils";
import Time from "@/components/time";
import { TimeNames } from "@/lib/types";

export default function Views() {
  const { fetchData, loading, times, updateTimer } = store();

  useEffect(() => {
    fetchData();
  }, []);

  useInterval(updateTimer, times?.time ? 1000 : null);

  if (!times) return null;

  const styleCnt = themeTimes[times.time.now];

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
