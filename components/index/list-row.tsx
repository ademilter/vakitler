import { TimeNames } from "@/utils/types";
import { cx, formattedTime } from "@/utils/helper";
import useTranslation from "next-translate/useTranslation";
import { useStore } from "@/stores/global";

export default function TimeListRow({ time }: { time: TimeNames }) {
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
