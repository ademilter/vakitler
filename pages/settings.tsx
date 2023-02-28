import { useContext, useEffect, useState } from "react";
import { ICity, ICountry, IRegion } from "@/lib/types";
import { CommonStoreContext } from "@/stores/common";
import { Controller, useForm } from "react-hook-form";
import Container from "@/components/container";
import { useRouter } from "next/router";

type IForm = {
  countryID: undefined | string;
  regionID: undefined | string;
  cityID: undefined | string;
};

export default function Index() {
  const router = useRouter();

  const { settings, setSettings, fetchData } = useContext(CommonStoreContext);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingRegions, setLoadingRegions] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const defaultOptions = {
    value: "0",
    name: "",
  };

  const defaultValues: IForm = {
    countryID: settings.country?.UlkeID,
    regionID: settings.region?.SehirID,
    cityID: settings.city?.IlceID,
  };

  const { handleSubmit, control, watch, setValue, formState } = useForm<IForm>({
    defaultValues,
  });

  const countryID = watch("countryID");
  const regionID = watch("regionID");
  const cityID = watch("cityID");

  const [countries, setCountries] = useState<ICountry[]>([]);
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  const fetchCountries = async () => {
    try {
      setLoadingCountries(true);
      const res = await fetch("/api/countries");
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
      const res = await fetch(`api/regions?countryID=${countryID}`);
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
      const res = await fetch(`api/cities?regionID=${regionID}`);
      const data = await res.json();
      setCities(data);

      if (cityID) setValue("cityID", cityID);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCities(false);
    }
  };

  const onSubmit = async (values: IForm) => {
    const country = countries.find((c) => c.UlkeID === values.countryID);
    const region = regions.find((r) => r.SehirID === values.regionID);
    const city = cities.find((c) => c.IlceID === values.cityID);

    setSettings({ country, region, city });

    localStorage.setItem(
      "VAKITLER_SETTINGS",
      JSON.stringify({ country, region, city })
    );

    await fetchData(cityID as string);
    return router.push(`/`);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!countryID || countryID === defaultOptions.value) return;
    fetchRegions();
  }, [countryID]);

  useEffect(() => {
    if (!regionID || regionID === defaultOptions.value) return;
    fetchCities();
  }, [regionID]);

  return (
    <Container className="py-10">
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="countryID"
          control={control}
          rules={{
            required: "This is required",
          }}
          render={({ field }) => (
            <select
              className="w-64 rounded-md border border-gray-300 p-2"
              disabled={loadingCountries}
              {...field}
            >
              <option value={defaultOptions.value}>
                {defaultOptions.name}
              </option>
              {countries.map((c) => (
                <option key={c.UlkeID} value={c.UlkeID}>
                  {c.UlkeAdi}
                </option>
              ))}
            </select>
          )}
        />

        <Controller
          name="regionID"
          control={control}
          rules={{
            required: "This is required",
          }}
          render={({ field }) => (
            <select
              className="w-64 rounded-md border border-gray-300 p-2"
              disabled={loadingRegions}
              {...field}
            >
              <option value={defaultOptions.value}>
                {defaultOptions.name}
              </option>
              {regions.map((r) => (
                <option key={r.SehirID} value={r.SehirID}>
                  {r.SehirAdi}
                </option>
              ))}
            </select>
          )}
        />

        <Controller
          name="cityID"
          control={control}
          rules={{
            required: "This is required",
          }}
          render={({ field }) => (
            <select
              className="w-64 rounded-md border border-gray-300 p-2"
              disabled={loadingCities}
              {...field}
            >
              <option value={defaultOptions.value}>
                {defaultOptions.name}
              </option>
              {cities.map((o) => (
                <option key={o.IlceID} value={o.IlceID}>
                  {o.IlceAdi}
                </option>
              ))}
            </select>
          )}
        />

        <button
          className="w-64 rounded-md border border-gray-300 p-2 disabled:opacity-50"
          disabled={!formState.isValid}
        >
          Kaydet
        </button>
      </form>
    </Container>
  );
}
