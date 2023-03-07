import React, { useContext } from "react";
import Container from "@/components/container";
import useTranslation from "next-translate/useTranslation";
import { CommonStoreContext } from "@/stores/common";
import Link from "next/link";
import setLanguage from "next-translate/setLanguage";
import { clsx } from "clsx";

export default function Settings() {
  const { t, lang } = useTranslation("common");

  const { settings, countryKey, regionKey, cityKey } =
    useContext(CommonStoreContext);

  const city = settings.city && settings.city[cityKey];
  const region = settings.region && settings.region[regionKey];
  const country = settings.country && settings.country[countryKey];

  const onChangeLang = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await setLanguage(e.target.value);
  };

  return (
    <Container className="grid gap-6 py-10">
      <Link
        href="/settings/country"
        className="flex items-center rounded-lg border border-gray-300 p-4"
      >
        <div className="grow">
          <h5 className="text-sm font-normal opacity-60">
            {t("settingsCurrentLocation")}
          </h5>
          <div className="flex items-center gap-1 font-medium">
            <span>{city}</span>
            <span>/</span>
            <span>{region}</span>
            <span>/</span>
            <span>{country}</span>
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 opacity-50"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#000000"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </Link>

      <div className="grid h-12 grid-cols-2 rounded-lg border border-gray-300 bg-zinc-100">
        <label
          className={clsx(
            "flex cursor-pointer items-center gap-2 rounded-l-lg px-4",
            lang === "tr" && "bg-white"
          )}
        >
          <input
            type="radio"
            name="lang"
            value="tr"
            checked={lang === "tr"}
            onChange={onChangeLang}
          />
          {t("settingsTr")}
        </label>
        <label
          className={clsx(
            "flex cursor-pointer items-center gap-2 rounded-r-lg border-l px-4",
            lang === "en" && "bg-white"
          )}
        >
          <input
            type="radio"
            name="lang"
            value="en"
            checked={lang === "en"}
            onChange={onChangeLang}
          />
          {t("settingsEn")}
        </label>
      </div>

      <Link
        href="/"
        className="flex h-12 w-full items-center justify-center rounded-lg bg-blue-500 px-4 text-white"
      >
        {t("settingsSave")}
      </Link>
    </Container>
  );
}
