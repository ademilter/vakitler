import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import useTranslation from "next-translate/useTranslation";
import { ICity, ICountry, IRegion } from "@/lib/types";

export default function useLocations() {
  const { t } = useTranslation("common");
  const { settings } = useContext(CommonStoreContext);

  const city =
    settings.city && settings.city[t("settingsCityKey") as keyof ICity];
  const region =
    settings.region && settings.region[t("settingsRegionKey") as keyof IRegion];
  const country =
    settings.country &&
    settings.country[t("settingsCountryKey") as keyof ICountry];

  return {
    city,
    region,
    country,
  };
}
