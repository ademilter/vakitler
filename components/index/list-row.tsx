import { TimeNames } from "@/lib/types";
import { motion } from "framer-motion";
import { cx, formattedTime } from "@/lib/utils";
import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import useTranslation from "next-translate/useTranslation";
import RamadanTimer from "@/components/ramadan-timer";
import ListRowCnt from "@/components/index/list-row-cnt";

export default function ListRow({
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

  const value = times?.today && times?.today?.[time];

  const formattedValue = formattedTime(timeFormat, value, lang);

  const now = times?.time?.now as TimeNames;
  const isTimeActive = now === time;

  const timeIndex = Object.keys(TimeNames).indexOf(time ?? "");
  const nowIndex = Object.keys(TimeNames).indexOf(now ?? "");

  const isTimePast = timeIndex < nowIndex;

  if (!times) return null;

  let timeName = t(time);
  if (time === TimeNames.Ogle && times?.today?.isJumuah) {
    timeName = `${t("Jumuah")} 🕌`;
  }

  return (
    <ListRowCnt
      index={index}
      now={now}
      isActive={isTimeActive}
      isPast={isTimePast}
    >
      <div className="relative flex h-full w-full items-center justify-between px-10 py-3 text-xl md:text-xl">
        {isTimeActive && (
          <motion.span
            layoutId="border"
            {...borderAnim}
            className={cx(
              "absolute inset-x-2 inset-y-1 rounded-2xl border-2 border-current"
            )}
          />
        )}
        <h5
          className={cx("capitalize leading-none", isTimePast && "font-normal")}
        >
          {timeName}
        </h5>
        <h4
          className={cx(
            "tabular-nums leading-none",
            isTimePast && "font-normal"
          )}
        >
          {formattedValue}
        </h4>

        <RamadanTimer time={time} />
      </div>
    </ListRowCnt>
  );
}

const borderAnim = {
  variants: {
    open: {
      scale: 1,
      opacity: 0.3,
      transition: {
        duration: 0.6,
        delay: 0.6,
      },
    },
    closed: {
      scale: 0.9,
      opacity: 0,
    },
  },
};
