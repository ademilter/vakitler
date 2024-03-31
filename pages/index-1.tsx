import React, { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import TimeTravel from "@/components/time-travel";
import NextTime from "@/components/index/next-time";
import Location from "@/components/index/location";
import IndexTimeList from "@/components/index/list";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import IslamicDate from "@/components/islamic-date";
import { cx } from "@/utils/helper";
import RamadanTimer from "@/components/ramadan-timer";
import TimeSummaryTimer from "@/components/time-summary-timer";
import IndexLayout, { ThemeStyle } from "@/components/index/layout";
import Moon from "@/components/index/moon";

export default function Index() {
  const { times, devMode } = useContext(CommonStoreContext);

  if (!times) return null;

  const now = times.time.now;
  const style = ThemeStyle[now];

  return (
    <IndexLayout>
      <SwiperRoot>
        {/* TIMER */}
        <SwiperSlide
          className={cx(
            "h-full !grid place-content-center place-items-center text-center",
            style
          )}
        >
          <div className="absolute inset-x-0 top-10">
            <Location />
            <IslamicDate className="mt-2" />
            <Moon className="mt-10" />
          </div>

          <NextTime />
          <TimeSummaryTimer />

          <div className="absolute inset-x-0 bottom-10">
            <RamadanTimer />
          </div>
        </SwiperSlide>

        {/* LIST */}
        <SwiperSlide className={cx(style)}>
          <IndexTimeList />
        </SwiperSlide>
      </SwiperRoot>

      {devMode && <TimeTravel />}
    </IndexLayout>
  );
}

function SwiperRoot({ className, ...props }: SwiperProps) {
  return (
    <Swiper
      className={cx("w-full h-full text-center", className)}
      // grabCursor={true}
      // effect={"creative"}
      // creativeEffect={{
      //   prev: {
      //     shadow: true,
      //     translate: ["-20%", 0, -1],
      //     opacity: 0.5,
      //   },
      //   next: {
      //     translate: ["100%", 0, 0],
      //   },
      // }}
      // modules={[EffectCreative]}
      {...props}
    />
  );
}
