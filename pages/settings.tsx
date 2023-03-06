import React, { useContext } from "react";
import { SettingsStoreContext, SettingsStoreProvider } from "@/stores/settings";
import { Controller, useFormContext } from "react-hook-form";
import Container from "@/components/container";
import useTranslation from "next-translate/useTranslation";
import { CommonStoreContext } from "@/stores/common";

function Page() {
  const { t, lang } = useTranslation("common");
  const { handleSubmit, control, formState, setValue } = useFormContext();

  const { countryKey, regionKey, cityKey } = useContext(CommonStoreContext);

  const {
    loadingCountries,
    countries,
    loadingRegions,
    regions,
    loadingCities,
    cities,
    onSubmit,
    onChangeLang,
  } = useContext(SettingsStoreContext);

  return (
    <Container className="py-10">
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit as any)}>
        <Controller
          name="countryID"
          control={control}
          rules={{
            required: "This is required",
            validate: {
              test: value => value !== "-1",
            },
          }}
          render={({ field: { onChange, ...props } }) => (
            <select
              className="h-12 w-full rounded-md border border-gray-300 bg-white px-4"
              disabled={loadingCountries}
              defaultValue="-1"
              onChange={e => {
                setValue("regionID", "-1", { shouldValidate: true });
                setValue("cityID", "-1", { shouldValidate: true });
                onChange(e);
              }}
              {...props}
            >
              <option disabled value="-1">
                {t("settings.selectCountry", {}, { returnObjects: true })}
              </option>
              {countries.map(c => (
                <option key={c.UlkeID} value={c.UlkeID}>
                  {c[countryKey]}
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
            validate: {
              test: value => value !== "-1",
            },
          }}
          render={({ field: { onChange, ...props } }) => (
            <select
              className="h-12 w-full rounded-md border border-gray-300 bg-white px-4"
              disabled={loadingRegions}
              defaultValue="-1"
              onChange={e => {
                setValue("cityID", "-1", { shouldValidate: true });
                onChange(e);
              }}
              {...props}
            >
              <option disabled value="-1">
                {t("settings.selectRegion", {}, { returnObjects: true })}
              </option>
              {regions.map(r => (
                <option key={r.SehirID} value={r.SehirID}>
                  {r[regionKey]}
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
            validate: {
              test: value => value !== "-1",
            },
          }}
          render={({ field: { onChange, ...props } }) => (
            <select
              className="h-12 w-full rounded-md border border-gray-300 bg-white px-4"
              disabled={loadingCities}
              defaultValue="-1"
              onChange={e => {
                onChange(e);
              }}
              {...props}
            >
              <option disabled value="-1">
                {t("settings.selectCity", {}, { returnObjects: true })}
              </option>
              {cities.map(o => (
                <option key={o.IlceID} value={o.IlceID}>
                  {o[cityKey]}
                </option>
              ))}
            </select>
          )}
        />

        <div className="grid h-12 grid-cols-2 rounded-md border border-gray-300">
          <label className="flex items-center gap-2 px-4">
            <input
              type="radio"
              name="lang"
              value="tr"
              checked={lang === "tr"}
              onChange={onChangeLang}
            />
            {t("settings.tr", {}, { returnObjects: true })}
          </label>
          <label className="flex items-center gap-2 border-l px-4">
            <input
              type="radio"
              name="lang"
              value="en"
              checked={lang === "en"}
              onChange={onChangeLang}
            />
            {t("settings.en", {}, { returnObjects: true })}
          </label>
        </div>

        <button
          className="h-12 w-full rounded-md bg-blue-500 px-4 text-center text-white disabled:opacity-50"
          disabled={!formState.isValid}
        >
          {t("settings.save", {}, { returnObjects: true })}
        </button>
      </form>
    </Container>
  );
}

export default function Settings() {
  return (
    <SettingsStoreProvider>
      <Page />
    </SettingsStoreProvider>
  );
}
