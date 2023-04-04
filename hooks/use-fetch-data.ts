import { DateTime } from "luxon";
import {
  useCommonStoreActions,
  useSettings,
  useTimerStore
} from "@/stores";
import { API_DATE_FORMAT, LOCAL_KEYS } from "@/lib/const";
import { Times } from "@/lib/model";

const useFetchData = () => {
  const { setAppLoading } = useCommonStoreActions();
  const settings = useSettings();

  const dataFetcher = async (cityID: string) => {
    if (!cityID) {
      console.error("cityID is required");
      return;
    }

    try {
      setAppLoading(true);
      const url = `/api/times?cityID=${cityID}`;
      const res = await fetch(url);
      const data = await res.json();

      const lastDate = DateTime.fromFormat(
        data[data.length - 1].MiladiTarihKisa,
        API_DATE_FORMAT
      );
      const updateDate = lastDate.minus({ days: 2 }).toUnixInteger() * 1000;

      localStorage.setItem(LOCAL_KEYS.UpdateDate, `${updateDate}`);
      localStorage.setItem(LOCAL_KEYS.Data, JSON.stringify(data));

      const times = new Times(data, settings.adjustments);

      useTimerStore.setState({
        times,
        rawTimes: new Times(data),
        timerRamadan: times.timerRamadan(),
        timer: times.timer(),
        now: times?.time?.now
      });
    } catch (e) {
      console.error(e);
    } finally {
      setAppLoading(false);
    }
  };

  return [dataFetcher];
};

export default useFetchData;
