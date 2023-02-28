import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function InfoBar({}: {}) {
  const searchParams = useSearchParams();
  const country = searchParams?.get("country");
  const region = searchParams?.get("region");
  const city = searchParams?.get("city");

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
        <span>{city}</span>
        {/*<span>/</span>*/}
        {/*<span>{region}</span>*/}
        <span>/</span>
        <span>{country}</span>
      </Link>
    </div>
  );
}
