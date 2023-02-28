import { NextRequest } from "next/server";
import { DateTime } from "luxon";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const params = new URL(req.url).searchParams;
  // required
  const country = params.get("country");
  const region = params.get("region");
  const city = params.get("city");
  const timezoneOffset = params.get("timezoneOffset");
  // default
  const date = DateTime.now().toFormat("yyyy-MM-dd");
  const days = "2";

  try {
    if (!country || !region || !city || !timezoneOffset) {
      return new Response("Missing parameters", { status: 400 });
    }

    const url = new URL("https://namaz-vakti.vercel.app/api/timesFromPlace");

    url.searchParams.append("country", country);
    url.searchParams.append("region", region);
    url.searchParams.append("city", city);
    url.searchParams.append("timezoneOffset", timezoneOffset);
    url.searchParams.append("date", date);
    url.searchParams.append("days", days);

    const response = await fetch(url.toString());
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=86400", // 1 day
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
    return new Response("Something went wrong", { status: 500 });
  }
}
