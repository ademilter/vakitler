import store from "@/stores/list";
import useInterval from "@/lib/use-interval";
import { useState } from "react";

export default function ViewTimer() {
  const { times } = store();
  const [timer, setTimer] = useState<[string, string, string]>([
    "00",
    "00",
    "00",
  ]);

  useInterval(
    () => {
      const timer = times?.timer || ["00", "00", "00"];
      setTimer(timer);
    },
    times?.time ? 1000 : null
  );

  if (!times) return null;

  return (
    <div>
      <div>{times.time.now}</div>
      <div>{times.time.next}</div>
      <div>{timer.join(":")}</div>
    </div>
  );
}
