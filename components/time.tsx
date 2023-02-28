import store from "@/stores/times";
import { TimeNames } from "@/lib/types";
import Container from "@/components/container";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { Vakitler } from "@/lib/const";

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
      className={clsx(
        now === TimeNames.Fajr && "bg-sky-400",
        now === TimeNames.Sunrise && "bg-orange-300",
        now === TimeNames.Dhuhr && "bg-yellow-300",
        now === TimeNames.Asr && "bg-amber-300",
        now === TimeNames.Maghrib && "bg-blue-400",
        now === TimeNames.Isha && "bg-indigo-400",
        `bg-opacity-${(index + 1) * 10}`,
        // iphone bottom handle
        time === TimeNames.Isha && "pb-10"
      )}
    >
      <Container className={clsx("flex h-full items-center px-3 py-2")}>
        <div className="relative flex w-full items-center justify-between px-4 py-4 text-lg md:text-xl">
          {isTimeActive && (
            <span
              className={clsx(
                "absolute inset-0 rounded-2xl border-2 border-white",
                index === 0 && "opacity-100",
                index === 1 && "opacity-100",
                index === 2 && "opacity-90",
                index === 3 && "opacity-80",
                index === 4 && "opacity-70",
                index === 5 && "opacity-60",
              )}
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
