import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import useLocations from "@/hooks/use-locations";

export default function TimeLocation() {
  const { lang } = useTranslation("common");
  const { city } = useLocations();

  return (
    <Link
      className="relative inline-flex items-center px-4 tracking-wider py-1 font-medium gap-1 text-sm uppercase"
      href="/settings"
    >
      <span className="absolute inset-0 -z-10 rounded-2xl bg-current opacity-10" />
      <span className="opacity-80">{city?.toLocaleLowerCase(lang)}</span>
    </Link>
  );
}
