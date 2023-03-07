import Link from "next/link";
import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import useTranslation from "next-translate/useTranslation";

export default function Location() {
  const { lang } = useTranslation("common");
  const { settings, countryKey, regionKey, cityKey } =
    useContext(CommonStoreContext);

  const city = settings.city && settings.city[cityKey];
  const region = settings.region && settings.region[regionKey];
  const country = settings.country && settings.country[countryKey];

  return (
    <div className="fixed inset-x-0 top-0 z-20 grid place-items-center p-2">
      <Link href="/settings" className="rounded-full bg-white">
        <div className="flex items-center gap-1 px-3 py-1 text-sm opacity-80">
          <span className="capitalize">
            {city?.toLocaleLowerCase(lang).slice(0, 12)}
          </span>
          <span>/</span>
          <span className="capitalize">
            {region?.toLocaleLowerCase(lang).slice(0, 12)}
          </span>
          <span>/</span>
          <span className="capitalize">
            {country?.toLocaleLowerCase(lang).slice(0, 12)}
          </span>
        </div>
      </Link>
    </div>
  );
}
