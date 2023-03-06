import { createContext, ReactNode, useEffect, useState } from "react";
import { Times } from "@/lib/model";
import { ICity, ICountry, IRegion, TypeTimer } from "@/lib/types";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { DateTime } from "luxon";
import useInterval from "@/lib/use-interval";

interface ICommonStore {
  appReady: boolean;
  appLoading: boolean;
  setAppLoading: (state: boolean) => void;
  settings: {
    country: undefined | ICountry;
    region: undefined | IRegion;
    city: undefined | ICity;
  };
  setSettings: (settings: ICommonStore["settings"]) => void;
  times: undefined | Times;
  fetchData: (cityID: string) => Promise<void>;
  countryKey: keyof ICountry;
  regionKey: keyof IRegion;
  cityKey: keyof ICity;
  localTime: DateTime;
  setLocalTime: (time: DateTime) => void;
  devLocalTime: [number, number, number];
  setDevLocalTime: (value: [number, number, number]) => void;
  timer: TypeTimer;
}

export const CommonStoreContext = createContext<ICommonStore>({
  appReady: false,
  appLoading: false,
  setAppLoading: () => {},
  settings: {
    country: undefined,
    region: undefined,
    city: undefined,
  },
  setSettings: () => {},
  times: undefined,
  localTime: DateTime.local(),
  setLocalTime: () => {},
  devLocalTime: [0, 0, 0],
  setDevLocalTime: () => {},
  fetchData: () => Promise.resolve(),
  countryKey: "UlkeAdi",
  regionKey: "SehirAdi",
  cityKey: "IlceAdi",
  timer: [0, 0, 0],
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

  const [appReady, setAppReady] = useState<ICommonStore["appReady"]>(false);
  const [appLoading, setAppLoading] =
    useState<ICommonStore["appLoading"]>(false);
  const [times, setTimes] = useState<ICommonStore["times"]>();
  const [settings, setSettings] = useState<ICommonStore["settings"]>({
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

  const fetchData = async (cityID: string) => {
    try {
      setAppLoading(true);
      const url = `/api/times?cityID=${cityID}`;
      const res = await fetch(url);
      const data = await res.json();

      localStorage.setItem("VAKITLER_DATA", JSON.stringify(data));

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
    const settings = localStorage.getItem("VAKITLER_SETTINGS");
    const data = localStorage.getItem("VAKITLER_DATA");

    if (settings && data) {
      setSettings(JSON.parse(settings));
      setTimes(new Times(JSON.parse(data), localTime));
    } else {
      router.push("/settings");
    }

    setAppReady(true);
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
        appReady,
        appLoading,
        setAppLoading,
        times,
        localTime,
        setLocalTime,
        devLocalTime,
        setDevLocalTime,
        fetchData,
        settings,
        setSettings,
        countryKey,
        regionKey,
        cityKey,
        timer,
      }}
    >
      {children}
    </CommonStoreContext.Provider>
  );
}
