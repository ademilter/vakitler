import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import useLocations from "@/hooks/use-locations";

export default function TimeLocation() {
  const { lang } = useTranslation("common");

  const { city, country, region } = useLocations();

  return (
    <Link
      href="/settings"
      className="absolute inset-x-0 top-0 z-20 grid place-items-center"
    >
      <div className="flex items-center gap-1 px-3 py-2 text-sm opacity-60 md:py-4">
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
  );
}
