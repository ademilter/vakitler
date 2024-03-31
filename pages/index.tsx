import React, { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import NextTime from "@/components/index/next-time";
import Location from "@/components/index/location";
import IndexTimeList from "@/components/index/list";
import RamadanTimer from "@/components/ramadan-timer";
import TimeSummaryTimer from "@/components/time-summary-timer";
import IndexLayout, { ThemeStyle } from "@/components/index/layout";
import Moon from "@/components/index/moon";
import IslamicDate from "@/components/islamic-date";

export default function Index() {
  const { times, devMode } = useContext(CommonStoreContext);

  if (!times) return null;

  const now = times.time.now;
  const style = ThemeStyle[now];

  return (
    <IndexLayout>
      <div className="w-full">
        <Location className="font-semibold" />
        <IslamicDate className="opacity-80" />
      </div>

      <div className="w-full pb-6">
        <Moon className="mb-8" />
        <NextTime className="mb-2" />
        <TimeSummaryTimer />
      </div>

      <div className="w-full place-self-end pt-10">
        <IndexTimeList />

        <RamadanTimer className="mt-10" />
      </div>

      {/*{devMode && <TimeTravel />}*/}
    </IndexLayout>
  );
}
