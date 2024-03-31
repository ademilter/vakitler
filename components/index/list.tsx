import { TimeNames } from "@/types";
import Time from "@/components/index/list-row";
import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import { cx } from "@/utils/helper";

export default function TimeList() {
  const { times } = useContext(CommonStoreContext);

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
