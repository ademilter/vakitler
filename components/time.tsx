import store from "@/stores/list";
import { TimeNames } from "@/lib/types";
import Container from "@/components/container";
import { cx } from "@/lib/utils";
import Timer from "@/components/timer";

export default function Time({ time }: { time: TimeNames }) {
  const { times } = store();
  const value = times?.today[time];

  const themeTime = {
    [TimeNames.Fajr]: {
      [TimeNames.Fajr]: "bg-sky-400/0",
      [TimeNames.Sunrise]: "bg-sky-400/10",
      [TimeNames.Dhuhr]: "bg-sky-400/20",
      [TimeNames.Asr]: "bg-sky-400/30",
      [TimeNames.Maghrib]: "bg-sky-400/40",
      [TimeNames.Isha]: "bg-sky-400/50",
    },
    [TimeNames.Sunrise]: {
      [TimeNames.Fajr]: "bg-orange-400/10",
      [TimeNames.Sunrise]: "bg-orange-400/0",
      [TimeNames.Dhuhr]: "bg-orange-400/10",
      [TimeNames.Asr]: "bg-orange-400/20",
      [TimeNames.Maghrib]: "bg-orange-400/30",
      [TimeNames.Isha]: "bg-orange-400/40",
    },
    [TimeNames.Dhuhr]: {
      [TimeNames.Fajr]: "bg-yellow-400/20",
      [TimeNames.Sunrise]: "bg-yellow-400/10",
      [TimeNames.Dhuhr]: "bg-yellow-400/0",
      [TimeNames.Asr]: "bg-yellow-400/10",
      [TimeNames.Maghrib]: "bg-yellow-400/20",
      [TimeNames.Isha]: "bg-yellow-400/30",
    },
    [TimeNames.Asr]: {
      [TimeNames.Fajr]: "bg-amber-400/30",
      [TimeNames.Sunrise]: "bg-amber-400/20",
      [TimeNames.Dhuhr]: "bg-amber-400/10",
      [TimeNames.Asr]: "bg-amber-400/0",
      [TimeNames.Maghrib]: "bg-amber-400/10",
      [TimeNames.Isha]: "bg-amber-400/20",
    },
    [TimeNames.Maghrib]: {
      [TimeNames.Fajr]: "bg-blue-400/40",
      [TimeNames.Sunrise]: "bg-blue-400/30",
      [TimeNames.Dhuhr]: "bg-blue-400/20",
      [TimeNames.Asr]: "bg-blue-400/10",
      [TimeNames.Maghrib]: "bg-blue-400/0",
      [TimeNames.Isha]: "bg-blue-400/10",
    },
    [TimeNames.Isha]: {
      [TimeNames.Fajr]: "bg-indigo-500/80",
      [TimeNames.Sunrise]: "bg-indigo-500/70",
      [TimeNames.Dhuhr]: "bg-indigo-500/60",
      [TimeNames.Asr]: "bg-indigo-500/50",
      [TimeNames.Maghrib]: "bg-indigo-500/40",
      [TimeNames.Isha]: "bg-indigo-500/30",
    },
  };

  const now = times?.time.now;
  const isTimeActive = now === time;
  const styleTheme = themeTime[now ?? TimeNames.Fajr];

  if (!times) return null;

  return (
    <div className={cx(styleTheme[time], "py-4")}>
      <Container className="relative flex h-full items-center">
        <div className="">
          <h5
            className={cx(
              "text-lg opacity-80",
              isTimeActive && "text-xl",
              "leading-none"
            )}
          >
            {time}
          </h5>
          <h3
            className={cx(
              "mt-1 text-xl font-bold",
              isTimeActive && "text-2xl",
              "leading-none"
            )}
          >
            {value}
          </h3>
        </div>

        <Timer show={isTimeActive} />
      </Container>
    </div>
  );
}
