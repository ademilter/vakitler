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

  const next = times?.time?.next;
  const isTimeNext = next === time;

  const timeIndex = Object.keys(TimeNames).indexOf(time ?? "");
  const nowIndex = Object.keys(TimeNames).indexOf(now ?? "");

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
        "relative grow h-full",
        now === TimeNames.Imsak && "bg-sky-500 dark:bg-sky-500",
        now === TimeNames.Gunes && "bg-orange-500 dark:bg-orange-500",
        now === TimeNames.Ogle && "bg-yellow-500 dark:bg-yellow-500",
        now === TimeNames.Ikindi && "bg-rose-500 dark:bg-rose-500",
        now === TimeNames.Aksam && "bg-blue-500 dark:bg-blue-500",
        now === TimeNames.Yatsi && "bg-indigo-500 dark:bg-indigo-500",
        `bg-opacity-${Math.abs((index + 1) * 5)}`,
        `dark:bg-opacity-${Math.abs((index + 1) * 5)}`
      )}
    >
      <Container
        className={cx(
          "flex h-full",
          isTimeActive && "py-2",
          timeIndex < nowIndex && "opacity-60 dark:opacity-40"
        )}
      >
        <div className="relative flex h-full w-full items-center justify-between px-10 py-3 text-xl md:text-xl">
          {isTimeActive && (
            <motion.span
              layoutId="border"
              className={cx(
                "absolute inset-x-2 inset-y-1 rounded-2xl border-2 border-current"
              )}
              variants={{
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
              }}
            />
          )}
          <h5
            className={cx(
              "capitalize leading-none",
              timeIndex < nowIndex && "font-normal"
            )}
          >
            {timeName}
          </h5>
          <h4
            className={cx(
              "tabular-nums leading-none",
              timeIndex < nowIndex && "font-normal"
            )}
          >
            {formattedValue}
          </h4>

          <RamadanTimer time={time} />
        </div>
      </Container>
    </motion.div>
  );
}
