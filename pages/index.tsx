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

export default function Index() {
  const { push } = useRouter();

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
    <IndexLayout>
      <div className="">
        <Moon className="mb-8" />
        <NextTime className="mb-1" />
        <TimeSummaryTimer />
      </div>

      <div className="grid place-content-center place-items-center">
        <List />
        {/*<RamadanTimer className="mt-10" />*/}
      </div>

      <div className="">
        <IslamicDate className="mb-1 opacity-60" />
        <Location className="font-semibold" />
      </div>

      {devMode && <TimeTravel />}
    </IndexLayout>
  );
}
