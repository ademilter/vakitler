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
      <div className="w-full pt-8">
        <Moon />
      </div>

      <div className="w-full">
        <NextTime className="mb-2 opacity-80" />
        <TimeSummaryTimer />
        <div className="mt-6">
          <IndexTimeList />
        </div>
        <RamadanTimer className="mt-10" />
      </div>

      <div className="w-full place-self-end pt-10">
        <Location className="" />
        <IslamicDate className="mt-1 opacity-60" />
      </div>

      {/*{devMode && <TimeTravel />}*/}
    </IndexLayout>
  );
}
