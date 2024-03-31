import { TimeNames } from "@/types";
import Time from "@/components/index/list-row";
import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import { cx } from "@/utils/helper";

export default function TimeList() {
  const { times } = useContext(CommonStoreContext);

  const names = [
    // times?.time.now,
    times?.time.next,
  ];

  return (
    <div
      className={
        cx()
        // "grid p-2 gap-2 w-full max-w-full rounded-3xl",
        // "border border-white/10"
        // "rounded-3xl bg-black/20"
      }
    >
      {names.map((time, index) => {
        return <Time key={time} index={index} time={time as TimeNames} />;
      })}
    </div>
  );
}
