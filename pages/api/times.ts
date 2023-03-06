import { NextRequest } from "next/server";
import { DateTime } from "luxon";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const cityID = params.get("cityID");

  try {
    if (!cityID) {
      return new Response("Missing parameters", { status: 400 });
    }

    const url = new URL(`/vakitler/${cityID}`, process.env.API_URL);

    const response = await fetch(url, {
      headers: { "x-parola": process.env.API_PASS! },
    });
    const data = await response.json();

    // TODO: diyanet'in server türkiye saati ile çalıştığı için
    //  tr saatine göre gece yarısını geçtiği anda tr batısındaki
    //  tüm ülkelerin o günkü bilgisi gelmiyor.
    // şimdilik sadece kullandığım tarih bilgisini değiştirdim.

    const yesterday = { ...data[0] };

    yesterday.MiladiTarihKisa = DateTime.fromFormat(
      yesterday.MiladiTarihKisa,
      "dd.MM.yyyy"
    )
      .minus({ day: 1 })
      .toFormat("dd.MM.yyyy");

    ///////////////////////////////////////////////////////////

    return new Response(JSON.stringify([yesterday, ...data]), {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=172800", // 2 days
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
    return new Response("Something went wrong", { status: 500 });
  }
}
