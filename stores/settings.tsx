import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ICity, ICountry, IRegion } from "@/lib/types";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { CommonStoreContext } from "@/stores/common";
import setLanguage from "next-translate/setLanguage";

export type SettingsForm = {
  countryID: undefined | string;
  regionID: undefined | string;
  cityID: undefined | string;
};

interface ISettingsStore {
  defaultOptions: {
    value: string;
    name: string;
  };
  loadingCountries: boolean;
  countries: ICountry[];
  loadingRegions: boolean;
  regions: IRegion[];
  loadingCities: boolean;
  cities: ICity[];
  onSubmit: (values: SettingsForm) => void;
  onChangeLang: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SettingsStoreContext = createContext<ISettingsStore>({
  defaultOptions: {
    value: "0",
    name: "",
  },
  loadingCountries: false,
  countries: [],
  loadingRegions: false,
  regions: [],
  loadingCities: false,
  cities: [],
  onSubmit: () => {},
  onChangeLang: () => {},
});

export function SettingsStoreProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const { appReady, settings, setSettings, fetchData } =
    useContext(CommonStoreContext);

  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingRegions, setLoadingRegions] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const defaultOptions = {
    value: "0",
    name: "",
  };

  const defaultValues: SettingsForm = {
    countryID: undefined,
    regionID: undefined,
    cityID: undefined,
  };

  const methods = useForm<SettingsForm>({
    defaultValues,
    mode: "onChange",
  });

  const { watch, setValue, trigger } = methods;

  const countryID = watch("countryID");
  const regionID = watch("regionID");
  const cityID = watch("cityID");

  const [countries, setCountries] = useState<ICountry[]>([]);
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  const onChangeLang = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await setLanguage(e.target.value);
  };

  const fetchCountries = async () => {
    try {
      setLoadingCountries(true);
      const url = new URL("/api/countries", window.location.origin);
      const res = await fetch(url.toString());
      const data = await res.json();
      setCountries(data);

      if (countryID) setValue("countryID", countryID);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCountries(false);
    }
  };

  const fetchRegions = async () => {
    try {
      setLoadingRegions(true);
      const url = new URL("/api/regions", window.location.origin);
      url.searchParams.set("countryID", countryID as string);
      const res = await fetch(url.toString());
      const data = await res.json();
      setRegions(data);

      if (regionID) setValue("regionID", regionID);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingRegions(false);
    }
  };

  const fetchCities = async () => {
    try {
      setLoadingCities(true);
      const url = new URL("/api/cities", window.location.origin);
      url.searchParams.set("regionID", regionID as string);
      const res = await fetch(url.toString());
      const data = await res.json();
      setCities(data);

      if (cityID) setValue("cityID", cityID);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCities(false);
    }
  };

  const onSubmit = async (values: SettingsForm) => {
    const country = countries.find((c) => c.UlkeID === values.countryID);
    const region = regions.find((r) => r.SehirID === values.regionID);
    const city = cities.find((c) => c.IlceID === values.cityID);

    setSettings({ country, region, city });

    localStorage.setItem(
      "VAKITLER_SETTINGS",
      JSON.stringify({ country, region, city })
    );

    await fetchData(cityID as string);
    router.push(`/`);
  };

  useEffect(() => {
    if (!appReady) return;

    const { country, region, city } = settings;

    if (country) {
      setValue("countryID", country.UlkeID);
    }
    if (region) {
      setValue("regionID", region.SehirID);
    }
    if (city) {
      setValue("cityID", city.IlceID);
    }

    trigger();

    fetchCountries();
  }, [appReady]);

  useEffect(() => {
    if (!countryID || countryID === defaultOptions.value) return;
    fetchRegions();
  }, [countryID]);

  useEffect(() => {
    if (!regionID || regionID === defaultOptions.value) return;
    fetchCities();
  }, [regionID]);

  return (
    <SettingsStoreContext.Provider
      value={{
        defaultOptions,
        loadingCountries,
        countries,
        loadingRegions,
        regions,
        loadingCities,
        cities,
        onSubmit,
        onChangeLang,
      }}
    >
      <FormProvider {...methods}>{children}</FormProvider>
    </SettingsStoreContext.Provider>
  );
}
