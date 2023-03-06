import { createContext, ReactNode, useEffect, useState } from "react";
import { Times } from "@/lib/model";
import { ICity, ICountry, IRegion, TypeTimer } from "@/lib/types";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { DateTime } from "luxon";
import useInterval from "@/lib/use-interval";
import { LOCAL_KEYS } from "@/lib/const";

interface ICommonStore {
  appLoading: boolean;
  _settings: {
    country: undefined | ICountry;
    region: undefined | IRegion;
    city: undefined | ICity;
  };
  _setSettings: (value: ICommonStore["_settings"]) => void;
  settings: {
    country: undefined | ICountry;
    region: undefined | IRegion;
    city: undefined | ICity;
  };
  changeSettings: (value: ICommonStore["_settings"]) => Promise<void>;
  times: undefined | Times;
  localTime: DateTime;
  devLocalTime: [number, number, number];
  setDevLocalTime: (value: [number, number, number]) => void;
  timer: TypeTimer;
  fetchData: (cityId: string) => Promise<void>;
  countryKey: keyof ICountry;
  regionKey: keyof IRegion;
  cityKey: keyof ICity;
}

export const CommonStoreContext = createContext<ICommonStore>({
  appLoading: false,
  _settings: {
    country: undefined,
    region: undefined,
    city: undefined,
  },
  _setSettings: () => {},
  settings: {
    country: undefined,
    region: undefined,
    city: undefined,
  },
  changeSettings: () => Promise.resolve(),
  times: undefined,
  localTime: DateTime.local(),
  devLocalTime: [0, 0, 0],
  setDevLocalTime: () => {},
  timer: [0, 0, 0],
  fetchData: () => Promise.resolve(),
  countryKey: "UlkeAdi",
  regionKey: "SehirAdi",
  cityKey: "IlceAdi",
});

export function CommonStoreProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [localTime, setLocalTime] = useState<ICommonStore["localTime"]>(
    DateTime.local()
  );
  const [devLocalTime, setDevLocalTime] = useState<
    ICommonStore["devLocalTime"]
  >([0, 0, 0]);

  const [appLoading, setAppLoading] =
    useState<ICommonStore["appLoading"]>(false);
  const [times, setTimes] = useState<ICommonStore["times"]>();
  const [settings, setSettings] = useState<ICommonStore["settings"]>({
    country: undefined,
    region: undefined,
    city: undefined,
  });
  const [_settings, _setSettings] = useState<ICommonStore["settings"]>({
    country: undefined,
    region: undefined,
    city: undefined,
  });

  const [timer, setTimer] = useState<TypeTimer>([0, 0, 0]);

  const countryKey = t(
    "settings.countryKey",
    {},
    {
      returnObjects: true,
    }
  ) as keyof ICountry;

  const regionKey = t(
    "settings.regionKey",
    {},
    {
      returnObjects: true,
    }
  ) as keyof IRegion;

  const cityKey = t(
    "settings.cityKey",
    {},
    {
      returnObjects: true,
    }
  ) as keyof ICity;

  const changeSettings = async (settings: ICommonStore["_settings"]) => {
    setSettings(settings);
    localStorage.setItem(LOCAL_KEYS.Settings, JSON.stringify(settings));
    await fetchData(settings.city?.IlceID as string);
  };

  const fetchData = async (cityID: string) => {
    try {
      setAppLoading(true);
      const url = `/api/times?cityID=${cityID}`;
      const res = await fetch(url);
      const data = await res.json();

      localStorage.setItem(LOCAL_KEYS.Data, JSON.stringify(data));

      const times = new Times(data, localTime);
      setTimes(times);
    } catch (e) {
      // TODO: global bir error mesaj göster
      console.error(e);
    } finally {
      setAppLoading(false);
    }
  };

  const initApp = () => {
    const settings = localStorage.getItem(LOCAL_KEYS.Settings);
    const data = localStorage.getItem(LOCAL_KEYS.Data);

    if (settings && data) {
      setSettings(JSON.parse(settings));
      setTimes(new Times(JSON.parse(data), localTime));
    } else {
      router.push("/settings/country");
    }
  };

  useEffect(() => {
    initApp();
  }, []);

  useInterval(
    () => {
      let localTime = DateTime.local();
      const hasChange = devLocalTime.some(value => value !== 0);

      if (hasChange) {
        localTime = localTime.set({
          hour: localTime.hour + devLocalTime[0],
          minute: localTime.minute + devLocalTime[1],
          second: localTime.second + devLocalTime[2],
        });
      }

      setLocalTime(localTime);
      times?.updateDateTime(localTime);
    },
    times ? 1000 : null
  );

  useEffect(() => {
    if (!times) return;
    setTimer(times?.timer() as TypeTimer);
  }, [localTime, times]);

  // TODO: uygulama çalıştıktan sonra datanın ne kadar eski olduğuna bakıp güncellenmesini sağla

  return (
    <CommonStoreContext.Provider
      value={{
        appLoading,
        times,
        localTime,
        devLocalTime,
        setDevLocalTime,
        settings,
        changeSettings,
        _settings,
        _setSettings,
        timer,
        fetchData,
        countryKey,
        regionKey,
        cityKey,
      }}
    >
      {children}
    </CommonStoreContext.Provider>
  );
}
