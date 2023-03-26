import { DateTime } from "luxon";
import useInterval from "@/lib/use-interval";
import { TimeNames } from "@/lib/types";
import {
  useTimes,
  useCommonStoreActions,
  useTimerStore
} from "@/stores";

export const useTimerInterval = () => {
  const times = useTimes();

  const { setThemeColour } = useCommonStoreActions();

  useInterval(
    () => {
      let localTime = DateTime.local();

      const timeTravel = times?.timeTravel ?? [0, 0, 0];
      const hasChange = timeTravel.some(value => value !== 0);

      if (hasChange) {
        localTime = localTime.set({
          hour: localTime.hour + timeTravel[0],
          minute: localTime.minute + timeTravel[1],
          second: localTime.second + timeTravel[2],
        });
      }

      times?.updateDateTime(localTime);

      if (!times) return;

      useTimerStore.setState({
        times,
        now: times?.time?.now ?? TimeNames.Imsak,
        timer: times?.timer(),
        timerRamadan: times?.timerRamadan(),
      });

      setThemeColour(times?.time?.now ?? TimeNames.Imsak);
    },
    times ? 1000 : null
  );
};

export default useTimerInterval;
