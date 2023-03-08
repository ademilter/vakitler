import React, { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import Link from "next/link";
import SettingsLangItem from "@/components/settings-lang-item";
import { cx } from "@/lib/utils";

export default function Settings() {
  const { t, lang } = useTranslation("common");

  const {
    showSettings,
    setShowSettings,
    settings,
    countryKey,
    regionKey,
    cityKey,
  } = useContext(CommonStoreContext);

  const city = settings.city && settings.city[cityKey];
  const region = settings.region && settings.region[regionKey];
  const country = settings.country && settings.country[countryKey];

  const onChangeLang = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await setLanguage(e.target.value);
  };

  return (
    <motion.div
      animate={showSettings ? "open" : "closed"}
      initial={false}
      variants={{
        open: {
          y: 0,
          opacity: 1,
        },
        closed: {
          y: "100%",
          opacity: 0,
        },
      }}
      className={cx(
        "absolute inset-x-0 bottom-0 z-50 -mb-10 px-6 pt-8 pb-20",
        "rounded-t-3xl bg-white",
        "drop-shadow-[0_0_35px_rgba(0,0,0,0.3)]"
      )}
    >
      <div className="grid gap-6">
        <Link
          href="/settings/country"
          className="flex items-center rounded-lg border border-gray-300 p-4"
        >
          <div className="grow">
            <h5 className="text-sm font-normal opacity-60">
              {t("settingsCurrentLocation")}
            </h5>
            <p className="flex w-full items-center gap-1">
              <span>{city}</span>
              <span className="opacity-60">/</span>
              <span>{region}</span>
            </p>
            <p>
              <b>{country}</b>
            </p>
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
          <SettingsLangItem
            isSelected={lang === "tr"}
            name="lang"
            value="tr"
            checked={lang === "tr"}
            onChange={onChangeLang}
          >
            {t("settingsTr")}
          </SettingsLangItem>
          <SettingsLangItem
            isSelected={lang === "en"}
            name="lang"
            value="en"
            checked={lang === "en"}
            onChange={onChangeLang}
          >
            {t("settingsEn")}
          </SettingsLangItem>
        </div>

        <header className="flex justify-end">
          <button
            type="button"
            className="inline-flex h-8 px-2 font-medium"
            onClick={() => {
              setShowSettings(false);
            }}
          >
            {t("settingsSave")}
          </button>
        </header>
      </div>
    </motion.div>
  );
}
