import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const regionID = req.query.regionID;

  try {
    if (typeof regionID !== "string") {
      return res.status(400).send("Missing parameters");
    }

    const url = new URL(`/ilceler/${regionID}`, process.env.API_URL);

    const response = await fetch(url, {
      headers: { "x-parola": process.env.API_PASS! },
    });
    const data = await response.json();

    res.setHeader("Cache-Control", "s-maxage=172800"); // 2 days
    return res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send(error.message);
    }
    return res.status(500).send("Something went wrong");
  }
}
