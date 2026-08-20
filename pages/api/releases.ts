import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      "https://api.github.com/repos/ademilter/vakitler/releases",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKENS}`,
        },
      }
    );
    const data = await response.json();

    res.setHeader("Cache-Control", "s-maxage=86400"); // 1 days
    return res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send(error.message);
    }
    return res.status(500).send("Something went wrong");
  }
}
