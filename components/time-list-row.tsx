import { TimeNames } from "@/lib/types";
import Container from "@/components/container";
import { motion } from "framer-motion";
import { cx, formattedTime } from "@/lib/utils";
import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import useTranslation from "next-translate/useTranslation";
import RamadanTimer from "@/components/ramadan-timer";

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

  const value = times?.today && times?.today?.[time];

  const formattedValue = formattedTime(timeFormat, value, lang);

  const now = times?.time?.now;
  const isTimeActive = now === time;

  if (!times) return null;

  let timeName = t(time);
  if (time === TimeNames.Ogle && times?.today?.isJumuah) {
    timeName = `${t("Jumuah")} 🕌`;
  }

  return (
    <motion.div
      variants={{
        open: {
          y: 0,
          scale: 1,
          opacity: 1,
        },
        closed: {
          y: 30,
          scale: 0.8,
          opacity: 0,
        },
      }}
      className={cx(
        "relative",
        "first:rounded-t-3xl",
        "last:rounded-b-3xl",
        now === TimeNames.Imsak && "bg-sky-400 dark:bg-sky-900",
        now === TimeNames.Gunes && "bg-orange-400 dark:bg-orange-900",
        now === TimeNames.Ogle && "bg-yellow-400 dark:bg-yellow-900",
        now === TimeNames.Ikindi && "bg-rose-400 dark:bg-rose-900",
        now === TimeNames.Aksam && "bg-blue-400 dark:bg-blue-900",
        now === TimeNames.Yatsi && "bg-indigo-400 dark:bg-indigo-900",
        `bg-opacity-${Math.abs((index - 6) * 5)}`,
        `dark:bg-opacity-${Math.abs((index - 6) * 5)}`
        // isTimeActive && "bg-opacity-15"
      )}
    >
      <Container className={cx("flex h-full", isTimeActive && "py-1")}>
        <div className="relative flex h-full w-full items-center justify-between px-2 py-3 text-xl md:text-xl">
          {isTimeActive && (
            <motion.span
              layoutId="border"
              className={cx(
                "absolute -inset-x-3 inset-y-1 rounded-2xl border-2 border-current"
              )}
              variants={{
                open: {
                  scale: 1,
                  opacity: 0.6,
                  transition: {
                    duration: 0.6,
                    delay: 0.6,
                  },
                },
                closed: {
                  scale: 0.9,
                  opacity: 0,
                },
              }}
            />
          )}
          <h5 className="capitalize leading-none">{timeName}</h5>
          <h4 className="tabular-nums leading-none">{formattedValue}</h4>

          <RamadanTimer time={time} />
        </div>
      </Container>
    </motion.div>
  );
}
