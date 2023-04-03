import { TimeNames } from "@/lib/types";
import Container from "@/components/container";
import { motion } from "framer-motion";
import { TIME_ORDER, cx, formattedTime } from "@/lib/utils";
import { useContext, useEffect, useMemo, useState } from "react";
import { CommonStoreContext } from "@/stores/common";
import useTranslation from "next-translate/useTranslation";
import InlineTimer from "@/components/inline-timer";

export default function TimeListRow({
  time,
  index,
}: {
  time: TimeNames;
  index: number;
}) {
  const { t, lang } = useTranslation("common");
  const [showInlineTimer, setShowInlineTimer] = useState(false);

  const {
    times,
    settings: { timeFormat },
  } = useContext(CommonStoreContext);
  const inlineTimer = useMemo(() => times?.timer(time), [time, times]);

  const value = times?.today && times?.today?.[time];

  const formattedValue = formattedTime(timeFormat, value, lang);

  const now = times?.time?.now;
  const isTimeActive = now === time;
  const isNext = times?.time.next === time;
  const isPrevious = now && TIME_ORDER[time] < TIME_ORDER[now];
  const shouldShowRamadanTimer =
    time === TimeNames.Aksam &&
    [TimeNames.Imsak, TimeNames.Gunes, TimeNames.Ogle].includes(now!);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (showInlineTimer) {
      timeout = setTimeout(() => {
        setShowInlineTimer(false);
      }, 2500);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [showInlineTimer]);

  const onContainerClick = () => setShowInlineTimer(true);

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
        now === TimeNames.Imsak && "bg-sky-300",
        now === TimeNames.Gunes && "bg-orange-300",
        now === TimeNames.Ogle && "bg-yellow-300",
        now === TimeNames.Ikindi && "bg-rose-300",
        now === TimeNames.Aksam && "bg-blue-300",
        now === TimeNames.Yatsi && "bg-indigo-300",
        `bg-opacity-${(index + 1) * 10}`,
        `dark:bg-opacity-${(index + 1) * 5}`,
        // iphone bottom handle
        time === TimeNames.Yatsi && "pb-8 md:pb-14"
      )}
    >
      <Container className="flex h-full flex-col items-center px-2 py-2">
        <div
          className="relative flex h-full w-full items-center justify-between px-6 py-3 text-lg md:text-xl"
          onClick={onContainerClick}
        >
          {isTimeActive && (
            <motion.span
              layoutId="border"
              className={cx(
                "absolute inset-0 rounded-2xl border-2 border-current"
              )}
              variants={{
                open: {
                  scale: 1,
                  opacity: 0.3,
                  transition: {
                    duration: 0.3,
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

          {inlineTimer && (
            <InlineTimer
              timer={inlineTimer}
              hide={
                (isTimeActive || isNext || isPrevious || !showInlineTimer) &&
                !shouldShowRamadanTimer
              }
            />
          )}
        </div>
      </Container>
    </motion.div>
  );
}
