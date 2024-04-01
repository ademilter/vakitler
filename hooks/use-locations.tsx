import useTranslation from "next-translate/useTranslation";
import { ICity, ICountry, IRegion } from "utils/types";
import { useStore } from "stores/global";

export default function useLocations() {
  const { t } = useTranslation("common");

  const { settings } = useStore(store => ({
    settings: store.settings,
  }));

  const city = settings.city && settings.city[t("cityKey") as keyof ICity];
  const region =
    settings.region && settings.region[t("regionKey") as keyof IRegion];
  const country =
    settings.country && settings.country[t("countryKey") as keyof ICountry];

  return {
    city,
    region,
    country,
  };
}
