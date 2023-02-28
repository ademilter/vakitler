import { createContext, ReactNode, useEffect, useState } from "react";
import { Times } from "@/lib/model";
import { ICity, ICountry, IRegion, Timer } from "@/lib/types";
import useInterval from "@/lib/use-interval";
import { useRouter } from "next/router";

interface ICommonStore {
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
  timer: undefined | Timer;
}

export const CommonStoreContext = createContext<ICommonStore>({
  appLoading: false,
  setAppLoading: () => {},
  settings: {
    country: undefined,
    region: undefined,
    city: undefined,
  },
  setSettings: () => {},
  times: undefined,
  fetchData: () => Promise.resolve(),
  timer: undefined,
});

export function CommonStoreProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [appLoading, setAppLoading] =
    useState<ICommonStore["appLoading"]>(false);
  const [times, setTimes] = useState<ICommonStore["times"]>();
  const [timer, setTimer] = useState<ICommonStore["timer"]>();
  const [settings, setSettings] = useState<ICommonStore["settings"]>({
    country: undefined,
    region: undefined,
    city: undefined,
  });

  const fetchData = async (cityID: string) => {
    try {
      setAppLoading(true);
      const url = `/api/times?cityID=${cityID}`;
      const res = await fetch(url);
      const data = await res.json();

      localStorage.setItem("VAKITLER_DATA", JSON.stringify(data));

      const times = new Times(data);
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
      setTimes(new Times(JSON.parse(data)));
    } else {
      router.push("/settings");
    }
  };

  useInterval(
    () => {
      setTimer(times?.timer);
    },
    times ? 1000 : null
  );

  useEffect(() => {
    initApp();
  }, []);

  // TODO: uygulama çalıştıktan sonra datanın ne kadar eski olduğuna bakıp güncellenmesini sağla
  // bir defa istak atıp saklıyorum. 30 günlük veri geliyor

  return (
    <CommonStoreContext.Provider
      value={{
        appLoading,
        setAppLoading,
        times,
        fetchData,
        timer,
        settings,
        setSettings,
      }}
    >
      {children}
    </CommonStoreContext.Provider>
  );
}
