import store from "@/stores/list";
import { TimeNames } from "@/lib/types";
import { cx, themeTimes } from "@/lib/utils";
import Time from "@/components/time";

export default function ViewTimes() {
  const { times } = store();

  if (!times) return null;

  const styleCnt = themeTimes[times.time.now];

  return (
    <div className={cx("grid h-full", styleCnt)}>
      {Object.keys(times.today).map((key) => {
        return <Time key={key} time={key as TimeNames} />;
      })}
    </div>
  );
}
