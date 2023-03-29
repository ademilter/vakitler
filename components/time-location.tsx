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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className=""
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
          <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
        </svg>
      </button>
    </div>
  );
}
