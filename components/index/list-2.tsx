import { TimeNames } from "@/types";
import Time from "@/components/index/list-row";

export default function TimeList() {
  return (
    <div className="grid w-full rounded-2xl border">
      {Object.keys(TimeNames).map((time, index) => {
        return <Time key={time} index={index} time={time as TimeNames} />;
      })}
    </div>
  );
}
