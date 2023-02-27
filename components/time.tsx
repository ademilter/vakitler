import store from "@/stores/list";
import { TimeNames } from "@/lib/types";
import Container from "@/components/container";
import { clsx } from "clsx";

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

  console.log(`bg-sky-200/${(index + 1) * 10}`);

  return (
    <div
      className={clsx(
        now === TimeNames.Fajr && "bg-sky-400",
        now === TimeNames.Sunrise && "bg-orange-300",
        now === TimeNames.Dhuhr && "bg-yellow-300",
        now === TimeNames.Asr && "bg-amber-300",
        now === TimeNames.Maghrib && "bg-blue-400",
        now === TimeNames.Isha && "bg-indigo-400",
        `bg-opacity-${(index + 1) * 10}`
      )}
    >
      <Container className={clsx("h-full px-4")}>
        <div
          className={clsx(
            "flex h-full items-center justify-between rounded-xl px-4 py-4 text-lg md:px-6 md:text-2xl",
            isTimeActive && "border-2 border-white"
          )}
        >
          <h5 className={clsx("capitalize leading-none")}>{time}</h5>
          <h4 className={clsx("font-semibold leading-none")}>{value}</h4>
        </div>
      </Container>
    </div>
  );
}
