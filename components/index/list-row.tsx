import { TimeNames } from "@/types";
import { cx, formattedTime } from "@/utils/helper";
import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import useTranslation from "next-translate/useTranslation";

export default function TimeListRow({ time }: { time: TimeNames }) {
  const { t, lang } = useTranslation("common");

  const {
    times,
    settings: { timeFormat },
  } = useContext(CommonStoreContext);

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
      className={cx(
        "z-10 relative",
        "inline-flex gap-2 items-baseline justify-between",
        "px-6 py-4 text-xl rounded-2xl",
        isTimeNext ? "bg-white/10 font-medium" : "opacity-80"
      )}
    >
      <h5 className={cx("capitalize leading-none")}>{timeName}</h5>
      <span
        className={cx(
          "w-16"
          // "opacity-10 font-light",
          // "border-b border-b-white"
        )}
      />
      <h4 className={cx("tabular-nums leading-none")}>{formattedValue}</h4>
    </div>
  );
}
