import useInterval from "./use-interval";
import { DateTime } from "luxon";
import { StoreInterface } from "../utils/types";

export default function useTimer({
  times,
  updateTimer,
}: {
  times: StoreInterface["times"];
  updateTimer: StoreInterface["updateTimer"];
}) {
  useInterval(
    () => {
      let localTime = DateTime.local();

      const timeTravel = times!.timeTravel ?? [0, 0, 0];
      const hasChange = timeTravel.some((value: number) => value !== 0);

      if (hasChange) {
        localTime = localTime.set({
          hour: localTime.hour + timeTravel[0],
          minute: localTime.minute + timeTravel[1],
          second: localTime.second + timeTravel[2],
        });
      }

      times?.updateDateTime(localTime);
      updateTimer();
    },
    times ? 1000 : null
  );
}
