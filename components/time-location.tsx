import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import useLocations from "@/hooks/use-locations";
import { askNotificationPermission } from "@/lib/utils";

export default function TimeLocation() {
  const { lang } = useTranslation("common");
  const { city } = useLocations();

  return (
    <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-center py-2 md:py-4">
      <Link href="/settings">
        <div className="flex items-center gap-1 text-sm opacity-60">
          <span className="capitalize">{city?.toLocaleLowerCase(lang)}</span>
        </div>
      </Link>

      <button
        className="absolute right-0 top-0 rounded-bl-sm p-1 pb-2 pl-2 hover:bg-black hover:bg-opacity-10"
        onClick={() => askNotificationPermission()}
      >
        test
      </button>
    </div>
  );
}
