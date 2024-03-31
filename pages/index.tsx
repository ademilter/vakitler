import React, { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import NextTime from "@/components/index/next-time";
import Location from "@/components/index/location";
import IndexTimeList from "@/components/index/list";
import RamadanTimer from "@/components/ramadan-timer";
import TimeSummaryTimer from "@/components/time-summary-timer";
import IndexLayout from "@/components/index/layout";
import Moon from "@/components/index/moon";
import IslamicDate from "@/components/islamic-date";

export default function Index() {
  const { times } = useContext(CommonStoreContext);

  if (!times) return null;

  return (
    <IndexLayout>
      <div className="">
        <Moon className="mb-8" />
        <NextTime className="mb-1" />
        <TimeSummaryTimer />
      </div>

      <div className="grid place-content-center place-items-center">
        <IndexTimeList />
        <RamadanTimer className="mt-10" />
      </div>

      <div className="">
        <IslamicDate className="mb-1 opacity-60" />
        <Location className="font-semibold" />
      </div>

      {/*{devMode && <TimeTravel />}*/}
    </IndexLayout>
  );
}
