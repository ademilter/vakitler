import { TimeNames } from "@/utils/types";
import Time from "@/components/index/list-row";
import { cx } from "@/utils/helper";
import { useStore } from "@/stores/global";

export default function TimeList() {
  const { times } = useStore(store => ({
    times: store.times,
  }));

  if (!times) return null;

  const names = [
    times.time.now,
    // TODO: eğer imsak ise 00:00'den sonra ise sonraki günün imsak vaktini göster
    times.time.next,
  ];

  return (
    <div
      className={cx(
        "grid p-2 gap-1 w-full max-w-full rounded-3xl",
        "rounded-3xl bg-black/20"
      )}
    >
      {names.map(time => {
        return <Time key={time} time={time as TimeNames} />;
      })}
    </div>
  );
}
