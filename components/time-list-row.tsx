import { TimeNames } from "@/lib/types";
import Container from "@/components/container";
import { motion } from "framer-motion";
import { cx } from "@/lib/utils";
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
  const { t } = useTranslation("common");

  const { times } = useContext(CommonStoreContext);
  const value = times?.today[time];

  const now = times?.time?.now;
  const isTimeActive = now === time;

  if (!times) return null;

  return (
    <motion.div
      variants={{
        open: {
          y: 0,
          opacity: 1,
        },
        closed: {
          y: 30,
          opacity: 0,
        },
      }}
      className={cx(
        now === TimeNames.Imsak && "bg-sky-300",
        now === TimeNames.Gunes && "bg-orange-300",
        now === TimeNames.Ogle && "bg-yellow-300",
        now === TimeNames.Ikindi && "bg-amber-300",
        now === TimeNames.Aksam && "bg-blue-300",
        now === TimeNames.Yatsi && "bg-indigo-300",
        `bg-opacity-${(index + 1) * 10}`,
        // iphone bottom handle
        time === TimeNames.Yatsi && "pb-8 md:pb-14"
      )}
    >
      <Container className={"flex h-full items-center px-2 py-2"}>
        <div
          className="relative flex h-full w-full items-center justify-between
        px-6 py-3 text-lg md:text-xl"
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
                  opacity: 0.5,
                  transition: {
                    duration: 0.3,
                    delay: 1,
                  },
                },
                closed: {
                  scale: 0.9,
                  opacity: 0,
                },
              }}
            />
          )}
          <h5 className="capitalize leading-none">{t(`times${time}`)}</h5>
          <h4 className="tabular-nums leading-none">{value}</h4>
        </div>
      </Container>
    </motion.div>
  );
}
