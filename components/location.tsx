import Link from "next/link";
import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";

export default function Location() {
  const { settings } = useContext(CommonStoreContext);

  const country = "country";
  const region = "region";
  const city = "city";

  return (
    <div className="fixed inset-x-0 top-0 z-20 grid place-items-center p-2">
      <Link
        href={{
          pathname: "/settings",
          query: {
            country: country,
            region: region,
            city: city,
          },
        }}
        className="rounded-full bg-white"
      >
        <div className="flex items-center gap-1 px-3 py-1 text-sm opacity-80">
          <span className="capitalize">
            {settings.city?.IlceAdi.toLocaleLowerCase().slice(0, 8)}
          </span>
          <span>/</span>
          <span className="capitalize">
            {settings.region?.SehirAdi.toLocaleLowerCase().slice(0, 8)}
          </span>
          <span>/</span>
          <span className="capitalize">
            {settings.country?.UlkeAdi.toLocaleLowerCase().slice(0, 8)}
          </span>
        </div>
      </Link>
    </div>
  );
}
