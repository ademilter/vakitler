import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl;
  const { searchParams } = nextUrl;

  const _country = searchParams.get("country");
  const _region = searchParams.get("region");
  const _city = searchParams.get("city");

  if (_country && _region && _city) return NextResponse.next();

  const geo = request.geo;
  const lat = geo?.latitude ?? 41;
  const lng = geo?.longitude ?? 29;

  const urlCoordinates = new URL(
    "https://namaz-vakti.vercel.app/api/timesFromCoordinates"
  );
  urlCoordinates.searchParams.set("lat", lat.toString());
  urlCoordinates.searchParams.set("lng", lng.toString());
  urlCoordinates.searchParams.set("days", "1");

  try {
    const res = await fetch(urlCoordinates.toString());
    const data = await res.json();

    const country = data.place.country;
    const region = data.place.region;
    const city = data.place.city;

    nextUrl.searchParams.set("country", country);
    nextUrl.searchParams.set("region", region);
    nextUrl.searchParams.set("city", city);

    console.log(nextUrl.toString());

    return NextResponse.redirect(nextUrl);
  } catch (e) {
    console.error(e);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
