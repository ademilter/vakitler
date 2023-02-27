import store from "@/stores/list";
import { TimeNames } from "@/lib/types";
import Container from "@/components/container";
import { clsx } from "clsx";
import { motion } from "framer-motion";

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
          y: 10,
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
        time === TimeNames.Isha && "pb-6"
      )}
    >
      <Container className={clsx("flex h-full items-center px-3 py-2")}>
        <div
          className={clsx(
            "flex w-full items-center justify-between rounded-xl px-4 py-4 text-lg md:text-xl",
            isTimeActive && "border-2 border-white/80"
          )}
        >
          <h5 className={clsx("font-normal capitalize leading-none")}>
            {time}
          </h5>
          <h4 className={clsx("leading-none")}>{value}</h4>
        </div>
      </Container>
    </motion.div>
  );
}
