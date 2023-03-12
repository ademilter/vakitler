import { TimeNames } from "@/lib/types";
import Container from "@/components/container";
import { motion } from "framer-motion";
import { cx } from "@/lib/utils";
import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import useTranslation from "next-translate/useTranslation";
import { formattedTime } from "@/lib/utils";

export default function TimeListRow({
  time,
  index,
}: {
  time: TimeNames;
  index: number;
}) {
  const { t } = useTranslation("common");

  const {
    times,
    settings: { timeFormat },
  } = useContext(CommonStoreContext);

  const value = times?.today && times?.today?.[time];

  const formattedValue = formattedTime(timeFormat, value);

  const now = times?.time?.now;
  const isTimeActive = now === time;

  if (!times) return null;

  let timeName = t(`times${time}`);
  if (time === TimeNames.Ogle && times?.today?.isJumuah) {
    timeName = `${t("timesJumuah")} 🕌`;
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
        now === TimeNames.Imsak && "bg-sky-300",
        now === TimeNames.Gunes && "bg-orange-300",
        now === TimeNames.Ogle && "bg-yellow-300",
        now === TimeNames.Ikindi && "bg-rose-300",
        now === TimeNames.Aksam && "bg-blue-300",
        now === TimeNames.Yatsi && "bg-indigo-300",
        `bg-opacity-${(index + 1) * 10}`,
        // iphone bottom handle
        time === TimeNames.Yatsi && "pb-8 md:pb-14"
      )}
    >
      <Container className={"flex h-full items-center px-2 py-2"}>
        <div className="relative flex h-full w-full items-center justify-between px-6 py-3 text-lg md:text-xl">
          {isTimeActive && (
            <motion.span
              layoutId="border"
              className={cx(
                "absolute inset-0 rounded-2xl border border-current"
              )}
              variants={{
                open: {
                  scale: 1,
                  opacity: 0.6,
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
        </div>
      </Container>
    </motion.div>
  );
}
