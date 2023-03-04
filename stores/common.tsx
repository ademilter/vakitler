import { createContext, ReactNode, useEffect, useState } from "react";
import { Times } from "@/lib/model";
import { ICity, ICountry, IRegion } from "@/lib/types";
import { useRouter } from "next/router";

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
  fetchData: () => Promise.resolve(),
});

export function CommonStoreProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [appReady, setAppReady] = useState<ICommonStore["appReady"]>(false);
  const [appLoading, setAppLoading] =
    useState<ICommonStore["appLoading"]>(false);
  const [times, setTimes] = useState<ICommonStore["times"]>();
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

    setAppReady(true);
  };

  useEffect(() => {
    initApp();
  }, []);

  // TODO: uygulama çalıştıktan sonra datanın ne kadar eski olduğuna bakıp güncellenmesini sağla
  // bir defa istak atıp saklıyorum. 30 günlük veri geliyor

  return (
    <CommonStoreContext.Provider
      value={{
        appReady,
        appLoading,
        setAppLoading,
        times,
        fetchData,
        settings,
        setSettings,
      }}
    >
      {children}
    </CommonStoreContext.Provider>
  );
}
