import { TimeNames } from "utils/types";
import { cx, formattedTime } from "utils/helper";
import useTranslation from "next-translate/useTranslation";
import { useStore } from "stores/global";
import React from "react";

export interface Props extends React.ComponentPropsWithoutRef<"div"> {
  time: TimeNames;
}

export default function Time({ className, time }: Props) {
  const { t, lang } = useTranslation("common");

  const {
    settings: { timeFormat },
    times,
  } = useStore(store => ({
    settings: store.settings,
    times: store.times,
  }));

  const value = times!.today![time];

  const formattedValue = formattedTime(timeFormat, value, lang);

  const now = times?.time?.now;
  const isTimeActive = now === time;
  const next = times?.time?.next;
  const isTimeNext = next === time;

  let timeName = t(time);
  if (time === TimeNames.Ogle && times?.today?.isJumuah) {
    timeName = `${t("Jumuah")} 🕌`;
  }

  return (
    <div
      data-time={isTimeActive ? "active" : isTimeNext ? "next" : ""}
      className={cx(
        "z-10 relative w-full",
        "flex gap-2 items-baseline justify-between",
        "px-5 py-4 text-xl rounded-2xl",
        "data-[time='next']:bg-white",
        "data-[time='next']:shadow",
        "data-[time='next']:text-card",
        "data-[time='next']:font-medium",
        className
      )}
    >
      <h5 className={cx("text-left capitalize leading-none")}>{timeName}</h5>
      <h4 className={cx("text-right tabular-nums leading-none")}>
        {formattedValue}
      </h4>
    </div>
  );
}
