import { NextRequest } from "next/server";
import { get } from "@vercel/edge-config";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const API_URL = await get("API_URL");
  const API_PASS = await get("API_PASS");

  const params = req.nextUrl.searchParams;
  const countryID = params.get("countryID");

  try {
    if (!countryID) {
      return new Response("Missing parameters", { status: 400 });
    }

    const url = new URL(`/sehirler/${countryID}`, API_URL);

    const response = await fetch(url, {
      headers: { "x-parola": API_PASS },
    });
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=604800", // 7 day (86400 * 7)
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
    return new Response("Something went wrong", { status: 500 });
  }
}
