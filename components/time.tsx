import store from "@/stores/times";
import { TimeNames } from "@/lib/types";
import Container from "@/components/container";
import { motion } from "framer-motion";
import { Vakitler } from "@/lib/const";
import { cx } from "@/lib/utils";

export default function Time({
  time,
  index,
}: {
  time: TimeNames;
  index: number;
}) {
  const { times } = store();
  const value = times?.today[time];

  const now = times?.time.now;
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
        now === TimeNames.Fajr && "bg-sky-300",
        now === TimeNames.Sunrise && "bg-orange-300",
        now === TimeNames.Dhuhr && "bg-yellow-300",
        now === TimeNames.Asr && "bg-amber-300",
        now === TimeNames.Maghrib && "bg-blue-300",
        now === TimeNames.Isha && "bg-indigo-300",
        `bg-opacity-${(index + 1) * 10}`,
        // iphone bottom handle
        time === TimeNames.Isha && "pb-8"
      )}
    >
      <Container className={"flex h-full items-center px-5 py-1"}>
        <div className="relative flex w-full items-center justify-between px-5 py-5 text-lg md:text-xl">
          {isTimeActive && (
            <motion.span
              layoutId="border"
              className={cx(
                "absolute inset-0 rounded-2xl border-2 border-current",
                `opacity-${(index + 1) * 10}`
              )}
              variants={{
                open: {
                  scale: 1,
                  opacity: 1,
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
          <h5 className="font-normal capitalize leading-none">
            {Vakitler[time]}
          </h5>
          <h4 className="tabular-nums leading-none">{value}</h4>
        </div>
      </Container>
    </motion.div>
  );
}
