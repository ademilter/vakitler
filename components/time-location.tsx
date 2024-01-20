import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import useLocations from "@/hooks/use-locations";
import { cx } from "@/lib/utils";

export default function TimeLocation() {
  const { lang } = useTranslation("common");
  const { city } = useLocations();

  return (
    <div
      className={cx(
        "absolute inset-x-0 top-0 z-20",
        "flex items-center justify-center py-4 md:py-6"
      )}
    >
      <Link
        className="relative flex items-center px-4 tracking-wider py-1 font-medium gap-1 text-sm uppercase"
        href="/settings"
      >
        <span className="absolute inset-0 -z-10 rounded-2xl bg-current opacity-5" />
        {city?.toLocaleLowerCase(lang)}
      </Link>
    </div>
  );
}
