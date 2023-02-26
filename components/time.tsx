import store from "@/stores/list";
import { TimeNames } from "@/lib/types";
import Container from "@/components/container";
import { cx, themeTime } from "@/lib/utils";

export default function Time({ time }: { time: TimeNames }) {
  const { times } = store();

  if (!times) return null;

  const value = times.today[time];

  const now = times.time.now;
  const styleTheme = themeTime[now];

  return (
    <div className={cx(styleTheme[time], "px-6 py-4")}>
      <Container className="relative flex h-full items-center">
        <div>
          <h4 className="">{time}</h4>
          <h4 className="text-xl font-bold">{value}</h4>
        </div>

        {now === time && (
          <div className="absolute right-0 h-4 w-4 rounded-full bg-red-500">
            now
          </div>
        )}
      </Container>
    </div>
  );
}
