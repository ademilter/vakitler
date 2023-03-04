import React, { useContext } from "react";
import { SettingsStoreContext, SettingsStoreProvider } from "@/stores/settings";
import { Controller, useFormContext } from "react-hook-form";
import Container from "@/components/container";
import useTranslation from "next-translate/useTranslation";

function Page() {
  const { t, lang } = useTranslation("common");
  const { handleSubmit, control, formState } = useFormContext();

  const {
    defaultOptions,
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

        <label>
          <input
            type="radio"
            name="lang"
            value="tr"
            checked={lang === "tr"}
            onChange={onChangeLang}
          />
          {t("settings.tr", {}, { returnObjects: true })}
        </label>
        <label>
          <input
            type="radio"
            name="lang"
            value="en"
            checked={lang === "en"}
            onChange={onChangeLang}
          />
          {t("settings.en", {}, { returnObjects: true })}
        </label>

        <button
          className="w-64 rounded-md border border-gray-300 p-2 disabled:opacity-50"
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
