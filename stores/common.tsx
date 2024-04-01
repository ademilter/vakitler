import { createContext, ReactNode, useEffect, useState } from "react";
import { Times } from "@/model/times";
import {
  ICity,
  ICommonStore,
  ICountry,
  IRegion,
  TimeFormat,
  TypeTimer,
} from "@/utils/types";
import { useRouter } from "next/router";
import { DateTime } from "luxon";
import useInterval from "@/hooks/use-interval";
import { API_DATE_FORMAT, LOCAL_KEYS } from "@/utils/const";
import setLanguage from "next-translate/setLanguage";
import i18n from "@/i18n.json";
import * as process from "process";

export const CommonStoreContext = createContext<ICommonStore>({
  devMode: false,
  setDevMode: () => {},
  settings: {
    country: undefined,
    _country: undefined,
    region: undefined,
    _region: undefined,
    city: undefined,
    _city: undefined,
    timeFormat: TimeFormat.TwentyFour,
    ramadanTimer: false,
  },
  setSettings: () => {},
  fetchData: () => Promise.resolve(),
  rawTimes: undefined,
  times: undefined,
  timer: [0, 0, 0],
  timerRamadan: [0, 0, 0],
  releases: [],
  saveSettings: () => {},
});

export function CommonStoreProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [settings, setSettings] = useState<ICommonStore["settings"]>({
    country: undefined,
    _country: undefined,
    region: undefined,
    _region: undefined,
    city: undefined,
    _city: undefined,
    timeFormat: TimeFormat.TwentyFour,
    ramadanTimer: false,
  });

  const [releases, setReleases] = useState<ICommonStore["releases"]>([]);

  const [devMode, setDevMode] = useState<ICommonStore["devMode"]>(
    process.env.NODE_ENV === "development"
  );
  const [times, setTimes] = useState<ICommonStore["times"]>();
  const [rawTimes, setRawTimes] = useState<ICommonStore["rawTimes"]>();
  const [timer, setTimer] = useState<TypeTimer>([0, 0, 0]);
  const [timerRamadan, setTimerRamadan] = useState<TypeTimer>([0, 0, 0]);

  const fetchReleases = async () => {
    const res = await fetch("/api/releases");
    const data = await res.json();
    setReleases(data);
  };

  const fetchData = async (cityID: string) => {
    if (!cityID) {
      return console.error("cityID is required");
    }

    try {
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

      setTimes(new Times(data));
      setRawTimes(new Times(data));
    } catch (e) {
      console.error(e);
    }
  };

  const initApp = async () => {
    const local = localStorage.getItem(LOCAL_KEYS.Lang) || i18n.defaultLocale;
    await setLanguage(local);

    const settings = localStorage.getItem(LOCAL_KEYS.Settings);
    const data = localStorage.getItem(LOCAL_KEYS.Data);
    const updateDate = localStorage.getItem(LOCAL_KEYS.UpdateDate) ?? 0;

    // If there is NO LocalStorage
    if (!settings || !data) {
      return await checkQueryString();
    }

    // If there is LocalStorage, we parse and use it
    const parsedSettings = JSON.parse(settings);
    setSettings(parsedSettings);

    if (+updateDate <= Date.now()) {
      console.log("The prayer data is old, fetching new data...");
      await fetchData(parsedSettings.city?.IlceID);
    } else {
      setTimes(new Times(JSON.parse(data)));
      setRawTimes(new Times(JSON.parse(data)));
    }

    // await fetchReleases();
  };

  const checkQueryString = async () => {
    // example: https://vakitler.app?countryID=11&regionID=664&cityID=11914

    await setLanguage("en");
    const { asPath } = router;
    const query = new URL(
      asPath,
      process.env.NODE_ENV === "production"
        ? "https://vakitler.app"
        : "http://localhost:3000"
    );

    const countryID = query.searchParams.get("countryID");
    const regionID = query.searchParams.get("regionID");
    const cityID = query.searchParams.get("cityID");

    // Is there a city in the querystring data that it wants us to load?
    if (!countryID || !regionID || !cityID) {
      return await router.push("/settings/country");
    }

    try {
      const [resCountries, resRegions, resCities]: [
        ICountry[],
        IRegion[],
        ICity[],
      ] = await Promise.all([
        fetch(`/api/countries`).then(value => value.json()),
        fetch(`/api/regions?countryID=${countryID}`).then(value =>
          value.json()
        ),
        fetch(`/api/cities?regionID=${regionID}`).then(value => value.json()),
      ]);

      const country = resCountries.find(c => c.UlkeID === countryID);
      const region = resRegions.find(c => c.SehirID === regionID);
      const city = resCities.find(c => c.IlceID === cityID);

      setSettings({
        ...settings,
        country,
        region,
        city,
      });

      await fetchData(cityID);
      await router.replace("/");
    } catch (e) {
      await router.push("/settings/country");
    }
  };

  const saveSettings = (settings: ICommonStore["settings"]) => {
    const { _country, _region, _city, ...rawSettings } = settings;
    localStorage.setItem(
      LOCAL_KEYS.Settings,
      JSON.stringify({ ...rawSettings })
    );
  };

  const updateTimer = () => {
    if (!times) return;
    setTimer(times.timer() as TypeTimer);
    setTimerRamadan(times.timerRamadan() as TypeTimer);
  };

  useEffect(() => {
    initApp();
  }, []);

  useEffect(() => {
    if (!times) return;
    updateTimer();
  }, [times]);

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

  return (
    <CommonStoreContext.Provider
      value={{
        devMode,
        setDevMode,
        settings,
        setSettings,
        fetchData,
        rawTimes,
        times,
        timer,
        timerRamadan,
        releases,
        saveSettings,
      }}
    >
      {children}
    </CommonStoreContext.Provider>
  );
}
