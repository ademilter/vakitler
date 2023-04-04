import { useEffect } from "react";
import { useRouter } from "next/router";
import setLanguage from "next-translate/setLanguage";
import {
  useSettings,
  useCommonStoreActions,
  useTimerStore,
} from "@/stores";
import { LOCAL_KEYS } from "@/lib/const";
import { Times } from "@/lib/model";
import i18n from "@/i18n.json";
import useFetchData from "@/hooks/use-fetch-data";
import useTimerInterval from "@/hooks/use-timer-interval";

const useInitApp = () => {
  const router = useRouter();
  const settings = useSettings();

  const [dataFetcher] = useFetchData();
  const { setSettings, setReleases } = useCommonStoreActions();

  useTimerInterval();

  const fetchReleases = async () => {
    const res = await fetch("/api/releases");
    const data = await res.json();

    return data;
  };

  const getSetLang = async () => {
    const local = localStorage.getItem(LOCAL_KEYS.Lang) || i18n.defaultLocale;
    await setLanguage(local);
  };

  const getSetReleases = async () => {
    const releases = await fetchReleases();
    setReleases(releases);
  };

  const getData = async (cityId: string) => await dataFetcher(cityId);

  const initApp = () => {
    getSetLang();
    const settings = localStorage.getItem(LOCAL_KEYS.Settings);
    const data = localStorage.getItem(LOCAL_KEYS.Data);
    const updateDate = localStorage.getItem(LOCAL_KEYS.UpdateDate) ?? 0;

    if (settings && data) {
      const parsedSettings = JSON.parse(settings);
      setSettings(parsedSettings);

      if (+updateDate <= Date.now()) {
        console.log("The prayer data is old, fetching new data...");
        getData(parsedSettings.city?.IlceID);
      } else {
        const times = new Times(JSON.parse(data), parsedSettings.adjustments);

        useTimerStore.setState({
          times,
          rawTimes: new Times(JSON.parse(data)),
          timerRamadan: times.timerRamadan(),
          timer: times.timer(),
          now: times?.time?.now,
        });
      }

      getSetReleases();
    } else {
      router.push("/settings/country");
    }
  };

  useEffect(() => {
    if (settings.country && settings.region && settings.city) {
      localStorage.setItem(LOCAL_KEYS.Settings, JSON.stringify(settings));
    }
  }, [settings]);

  return [initApp];
};

export default useInitApp;
