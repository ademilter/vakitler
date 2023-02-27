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
      [TimeNames.Fajr]: "bg-sky-500/10",
      [TimeNames.Sunrise]: "bg-sky-500/20",
      [TimeNames.Dhuhr]: "bg-sky-500/30",
      [TimeNames.Asr]: "bg-sky-500/40",
      [TimeNames.Maghrib]: "bg-sky-500/50",
      [TimeNames.Isha]: "bg-sky-500/60",
    },
    [TimeNames.Sunrise]: {
      [TimeNames.Fajr]: "bg-orange-500/20",
      [TimeNames.Sunrise]: "bg-orange-500/10",
      [TimeNames.Dhuhr]: "bg-orange-500/20",
      [TimeNames.Asr]: "bg-orange-500/30",
      [TimeNames.Maghrib]: "bg-orange-500/40",
      [TimeNames.Isha]: "bg-orange-500/50",
    },
    [TimeNames.Dhuhr]: {
      [TimeNames.Fajr]: "bg-yellow-500/30",
      [TimeNames.Sunrise]: "bg-yellow-500/20",
      [TimeNames.Dhuhr]: "bg-yellow-500/10",
      [TimeNames.Asr]: "bg-yellow-500/20",
      [TimeNames.Maghrib]: "bg-yellow-500/30",
      [TimeNames.Isha]: "bg-yellow-500/40",
    },
    [TimeNames.Asr]: {
      [TimeNames.Fajr]: "bg-amber-500/40",
      [TimeNames.Sunrise]: "bg-amber-500/30",
      [TimeNames.Dhuhr]: "bg-amber-500/20",
      [TimeNames.Asr]: "bg-amber-500/10",
      [TimeNames.Maghrib]: "bg-amber-500/20",
      [TimeNames.Isha]: "bg-amber-500/30",
    },
    [TimeNames.Maghrib]: {
      [TimeNames.Fajr]: "bg-blue-500/50",
      [TimeNames.Sunrise]: "bg-blue-500/40",
      [TimeNames.Dhuhr]: "bg-blue-500/30",
      [TimeNames.Asr]: "bg-blue-500/20",
      [TimeNames.Maghrib]: "bg-blue-500/10",
      [TimeNames.Isha]: "bg-blue-500/20",
    },
    [TimeNames.Isha]: {
      [TimeNames.Fajr]: "bg-indigo-500/60",
      [TimeNames.Sunrise]: "bg-indigo-500/50",
      [TimeNames.Dhuhr]: "bg-indigo-500/40",
      [TimeNames.Asr]: "bg-indigo-500/30",
      [TimeNames.Maghrib]: "bg-indigo-500/20",
      [TimeNames.Isha]: "bg-indigo-500/10",
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
              "mt-1 text-xl font-semibold",
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
