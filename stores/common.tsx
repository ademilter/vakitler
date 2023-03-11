import { createContext, ReactNode, useEffect, useState } from "react";
import { Times } from "@/lib/model";
import { ICity, ICountry, IRegion, TimeFormat, TypeTimer } from "@/lib/types";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { DateTime } from "luxon";
import useInterval from "@/lib/use-interval";
import { LOCAL_KEYS } from "@/lib/const";
import setLanguage from "next-translate/setLanguage";
import i18n from "@/i18n.json";
// import colors from "tailwindcss/colors";
// import { DefaultColors } from "tailwindcss/types/generated/colors";

interface ICommonStore {
  appLoading: boolean;
  _settings: {
    country: undefined | ICountry;
    region: undefined | IRegion;
    city: undefined | ICity;
    timeFormat: TimeFormat;
    adjustments: number[];
  };
  _setSettings: (value: ICommonStore["_settings"]) => void;
  settings: {
    country: undefined | ICountry;
    region: undefined | IRegion;
    city: undefined | ICity;
    timeFormat: TimeFormat;
    adjustments: number[];
  };
  setSettings: (value: ICommonStore["_settings"]) => void;
  fetchData: (cityId: string) => Promise<void>;
  times: undefined | Times;
  rawTimes: undefined | Times;
  timer: TypeTimer;
}

export const CommonStoreContext = createContext<ICommonStore>({
  appLoading: false,
  _settings: {
    country: undefined,
    region: undefined,
    city: undefined,
    timeFormat: TimeFormat.TwentyFour,
    adjustments: [0, 0, 0, 0, 0, 0],
  },
  _setSettings: () => {},
  settings: {
    country: undefined,
    region: undefined,
    city: undefined,
    timeFormat: TimeFormat.TwentyFour,
    adjustments: [0, 0, 0, 0, 0, 0],
  },
  setSettings: () => {},
  fetchData: () => Promise.resolve(),
  rawTimes: undefined,
  times: undefined,
  timer: [0, 0, 0],
});

export function CommonStoreProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [appLoading, setAppLoading] =
    useState<ICommonStore["appLoading"]>(false);

  const [settings, setSettings] = useState<ICommonStore["settings"]>({
    country: undefined,
    region: undefined,
    city: undefined,
    timeFormat: TimeFormat.TwentyFour,
    adjustments: [0, 0, 0, 0, 0, 0],
  });
  const [_settings, _setSettings] = useState<ICommonStore["settings"]>({
    country: undefined,
    region: undefined,
    city: undefined,
    timeFormat: TimeFormat.TwentyFour,
    adjustments: [0, 0, 0, 0, 0, 0],
  });

  const [times, setTimes] = useState<ICommonStore["times"]>();
  const [rawTimes, setRawTimes] = useState<ICommonStore["rawTimes"]>();
  const [timer, setTimer] = useState<TypeTimer>([0, 0, 0]);

  const fetchData = async (cityID: string) => {
    if (!cityID) {
      console.error("cityID is required");
      return;
    }

    try {
      setAppLoading(true);
      const url = `/api/times?cityID=${cityID}`;
      const res = await fetch(url);
      const data = await res.json();

      localStorage.setItem(LOCAL_KEYS.Data, JSON.stringify(data));

      setTimes(new Times(data, settings.adjustments));
      setRawTimes(new Times(data));
    } catch (e) {
      console.error(e);
    } finally {
      setAppLoading(false);
    }
  };

  const initApp = async () => {
    const local = localStorage.getItem(LOCAL_KEYS.Lang) || i18n.defaultLocale;
    await setLanguage(local);

    const settings = localStorage.getItem(LOCAL_KEYS.Settings);
    const data = localStorage.getItem(LOCAL_KEYS.Data);

    if (settings && data) {
      const parsedSettings = JSON.parse(settings);
      setSettings(parsedSettings);
      setTimes(new Times(JSON.parse(data), parsedSettings.adjustments));
      setRawTimes(new Times(JSON.parse(data)));
    } else {
      await router.push("/settings/country");
    }
  };

  const updateTimer = () => {
    if (!times) return;
    setTimer(times?.timer() as TypeTimer);
  };

  useEffect(() => {
    initApp();
  }, []);

  useEffect(() => {
    if (settings.country && settings.region && settings.city) {
      localStorage.setItem(LOCAL_KEYS.Settings, JSON.stringify(settings));
    }
  }, [settings]);

  useEffect(() => {
    if (!times) return;
    updateTimer();
  }, [times]);

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
      updateTimer();
    },
    times ? 1000 : null
  );

  // TODO: uygulama çalıştıktan sonra datanın ne kadar eski olduğuna bakıp güncellenmesini sağla

  return (
    <CommonStoreContext.Provider
      value={{
        appLoading,
        _settings,
        _setSettings,
        settings,
        setSettings,
        fetchData,
        rawTimes,
        times,
        timer,
      }}
    >
      {children}
    </CommonStoreContext.Provider>
  );
}
