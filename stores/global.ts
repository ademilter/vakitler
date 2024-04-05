import { createContext, useContext } from "react";
import { createStore, useStore as useZustandStore } from "zustand";
import { PreloadedStoreInterface } from "./StoreProvider";
import { StoreInterface, TimeFormat, TypeTimer } from "utils/types";
import process from "process";
import { DateTime } from "luxon";
import { API_DATE_FORMAT, LOCAL_KEYS } from "utils/const";
import { Times } from "model/times";
import setLanguage from "next-translate/setLanguage";
import i18n from "../i18n.json";

function getDefaultInitialState() {
  return {
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
    updateTimer: () => {},
    initApp: () => {},
    fetchReleases: () => {},
    checkQueryString: () => {},
    hasLocalData: () => {},
    showFullList: true,
    setFullList: () => {},
  } as const;
}

export type StoreType = ReturnType<typeof initializeStore>;

const storeContext = createContext<StoreType | null>(null);

export const Provider = storeContext.Provider;

export function useStore<T>(selector: (state: StoreInterface) => T) {
  const store = useContext(storeContext);

  if (!store) throw new Error("Store is missing the provider");

  return useZustandStore(store, selector);
}

export function initializeStore(preloadedState: PreloadedStoreInterface) {
  return createStore<StoreInterface>((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    devMode: process.env.NODE_ENV === "development",
    setDevMode: () => {},
    showFullList: true,
    setFullList: () => {
      set({ showFullList: false });
    },

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

    rawTimes: undefined,
    times: undefined,
    timer: [0, 0, 0],
    timerRamadan: [0, 0, 0],

    releases: [],

    setSettings: settings => {
      set({
        settings: { ...get().settings, ...settings },
      });
    },

    fetchData: async (cityID: string) => {
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

        set({
          times: new Times(data),
          rawTimes: new Times(data),
        });
      } catch (e) {
        console.error(e);
      }
    },

    initApp: async () => {
      const local = localStorage.getItem(LOCAL_KEYS.Lang) || i18n.defaultLocale;
      await setLanguage(local);

      const data = localStorage.getItem(LOCAL_KEYS.Data);
      const settings = localStorage.getItem(LOCAL_KEYS.Settings);
      const updateDate = localStorage.getItem(LOCAL_KEYS.UpdateDate) ?? 0;

      if (!data || !settings) {
        return;
      }

      const parsedSettings = JSON.parse(settings);

      set({
        settings: { ...JSON.parse(settings) },
        times: new Times(JSON.parse(data)),
        rawTimes: new Times(JSON.parse(data)),
      });

      if (+updateDate <= Date.now()) {
        await get().fetchData(parsedSettings.city?.IlceID);
      }
    },

    hasLocalData: () => {
      const settings = localStorage.getItem(LOCAL_KEYS.Settings);
      const data = localStorage.getItem(LOCAL_KEYS.Data);

      if (!settings || !data) {
        return false;
      }

      return true;
    },

    fetchReleases: async () => {
      const res = await fetch("/api/releases");
      const data = await res.json();
      set({ releases: data });
    },

    saveSettings: settings => {
      const { _country, _region, _city, ...rawSettings } = settings;

      localStorage.setItem(
        LOCAL_KEYS.Settings,
        JSON.stringify({ ...rawSettings })
      );
    },

    updateTimer: () => {
      const times = get().times;
      if (!times) return;
      set({
        timer: times.timer() as TypeTimer,
        timerRamadan: times.timerRamadan() as TypeTimer,
      });
    },

    checkQueryString: async () => {
      // example: https://vakitler.app?countryID=11&regionID=664&cityID=11914
      // await setLanguage("en");
      // const { asPath } = router;
      // const query = new URL(
      //   asPath,
      //   process.env.NODE_ENV === "production"
      //     ? "https://vakitler.app"
      //     : "http://localhost:3000"
      // );
      //
      // const countryID = query.searchParams.get("countryID");
      // const regionID = query.searchParams.get("regionID");
      // const cityID = query.searchParams.get("cityID");
      //
      // // Is there a city in the querystring data that it wants us to load?
      // if (!countryID || !regionID || !cityID) {
      //   return await router.push("/settings/country");
      // }
      //
      // try {
      //   const [resCountries, resRegions, resCities]: [
      //     ICountry[],
      //     IRegion[],
      //     ICity[],
      //   ] = await Promise.all([
      //     fetch(`/api/countries`).then(value => value.json()),
      //     fetch(`/api/regions?countryID=${countryID}`).then(value =>
      //       value.json()
      //     ),
      //     fetch(`/api/cities?regionID=${regionID}`).then(value => value.json()),
      //   ]);
      //
      //   const country = resCountries.find(c => c.UlkeID === countryID);
      //   const region = resRegions.find(c => c.SehirID === regionID);
      //   const city = resCities.find(c => c.IlceID === cityID);
      //
      //   setSettings({
      //     ...settings,
      //     country,
      //     region,
      //     city,
      //   });
      //
      //   await fetchData(cityID);
      //   await router.replace("/");
      // } catch (e) {
      //   await router.push("/settings/country");
      // }
    },
  }));
}
