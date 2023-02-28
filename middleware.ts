import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  // const geo = request.geo;

  // if (geo?.latitude && geo?.longitude) {
  //   url.searchParams.set("lat", geo.latitude.toString());
  //   url.searchParams.set("lon", geo.longitude.toString());
  //   return NextResponse.rewrite(url);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
