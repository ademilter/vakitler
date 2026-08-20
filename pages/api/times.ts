import type { NextApiRequest, NextApiResponse } from "next";
import { DateTime } from "luxon";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cityID = req.query.cityID;

  try {
    if (typeof cityID !== "string") {
      return res.status(400).send("Missing parameters");
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

    res.setHeader("Cache-Control", "s-maxage=172800"); // 2 days
    return res.status(200).json([yesterday, ...data]);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send(error.message);
    }
    return res.status(500).send("Something went wrong");
  }
}
