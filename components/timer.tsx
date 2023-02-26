import store from "@/stores/list";
import { TimeNames } from "@/lib/types";

export default function Timer({ time }: { time: TimeNames }) {
  const { times, timer } = store();
  const now = times?.time.now;

  if (now !== time) return null;
  if (!timer) return null;

  return <div className="absolute right-0 rounded-full">{timer.join(":")}</div>;
}
