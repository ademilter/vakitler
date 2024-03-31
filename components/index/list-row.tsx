import { TimeNames } from "@/types";
import { cx, formattedTime } from "@/utils/helper";
import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import useTranslation from "next-translate/useTranslation";

export default function TimeListRow({
  time,
  index,
}: {
  time: TimeNames;
  index: number;
}) {
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
        "inline-flex items-center justify-between",
        "px-6 h-12 text-lg rounded-2xl",
        isTimeNext ? "bg-white" : "font-light opacity-60"
      )}
    >
      <h5 className={cx("capitalize leading-none pr-2")}>{timeName}:</h5>
      {/*<span className="font-light grow opacity-10 border-b border-dashed border-b-white" />*/}
      <h4 className={cx("tabular-nums leading-none")}>{formattedValue}</h4>
    </div>
  );
}
