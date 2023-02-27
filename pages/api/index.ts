import { NextRequest } from "next/server";
import { DateTime } from "luxon";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const params = new URL(req.url).searchParams;
  const country = params.get("country") ?? "Turkey";
  const region = params.get("region") ?? "İstanbul";
  const city = params.get("city") ?? "İstanbul";
  const date = DateTime.now().minus({ days: 1 }).toFormat("yyyy-MM-dd"); // yyyy-MM-dd
  const days = "3"; // kaç günlük
  const timezoneOffset = params.get("timezoneOffset") ?? "180"; // dakika cinsinden, örn: 180

  try {
    // if (!country || !region || !city || !date || !days || !timezoneOffset) {
    //   return new Response("Missing parameters", { status: 400 });
    // }

    const url = new URL("https://namaz-vakti.vercel.app/api/timesFromPlace");
    // timezoneOffset=180

    url.searchParams.append("country", country);
    url.searchParams.append("region", region);
    url.searchParams.append("city", city);
    url.searchParams.append("date", date);
    url.searchParams.append("days", days);
    url.searchParams.append("timezoneOffset", timezoneOffset);

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
