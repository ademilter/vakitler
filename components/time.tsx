import store from "@/stores/list";
import { TimeNames } from "@/lib/types";
import Container from "@/components/container";
import { cx, themeTime } from "@/lib/utils";
import Timer from "@/components/timer";

export default function Time({ time }: { time: TimeNames }) {
  const { times } = store();
  const value = times?.today[time];

  const now = times?.time.now;
  const styleTheme = themeTime[now ?? TimeNames.Fajr];

  if (!times) return null;

  return (
    <div className={cx(styleTheme[time], "px-6 py-4")}>
      <Container className="relative flex h-full items-center">
        <div>
          <h4 className="">{time}</h4>
          <h4 className="text-xl font-bold">{value}</h4>
        </div>

        <Timer time={time} />
      </Container>
    </div>
  );
}
