import store from "@/stores/list";
import useInterval from "@/lib/use-interval";
import { useEffect, useState } from "react";
import Container from "@/components/container";

export default function ViewTimer() {
  const { times } = store();
  const defaultTimer: [string, string, string] = ["00", "00", "00"];

  const [timer, setTimer] = useState(defaultTimer);

  const updateTimer = () => {
    const timer = times?.timer || ["00", "00", "00"];
    setTimer(timer);
  };

  useEffect(updateTimer, []);
  useInterval(updateTimer, times?.time ? 1000 : null);

  if (!times) return null;

  return (
    <div className="grid h-full place-items-center">
      <Container>
        <div className="space-y-4 text-center">
          <h2 className="text-6xl">{times.time.now}</h2>
          <div>sonraki vakte ({times.time.next}) kalan süre</div>
          <div className="text-4xl">{timer.join(":")}</div>
        </div>
      </Container>
    </div>
  );
}
