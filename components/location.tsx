import Link from "next/link";
import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";

export default function Location({}: {}) {
  const { settings } = useContext(CommonStoreContext);

  const country = "country";
  const region = "region";
  const city = "city";

  return (
    <div className="fixed inset-x-0 top-0 grid place-items-center pt-2">
      <Link
        href={{
          pathname: "/settings",
          query: {
            country: country,
            region: region,
            city: city,
          },
        }}
        className="flex items-center gap-1 px-4 py-2 text-sm opacity-80"
      >
        <span className="capitalize">
          {/* TODO: locale */}
          {settings.city?.IlceAdi.toLocaleLowerCase("tr").slice(0, 6)}.
        </span>
        <span>/</span>
        <span className="capitalize">
          {settings.region?.SehirAdi.toLocaleLowerCase("tr").slice(0, 6)}.
        </span>
        <span>/</span>
        <span className="capitalize">
          {settings.country?.UlkeAdi.toLocaleLowerCase("tr")}
        </span>
      </Link>
    </div>
  );
}
