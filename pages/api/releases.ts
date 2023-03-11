import { NextRequest } from "next/server";
import { DateTime } from "luxon";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  try {
    const res = await fetch(
      "https://api.github.com/repos/ademilter/vakitler/releases",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKENS}`,
        },
      }
    );
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=86400", // 1 days
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
    return new Response("Something went wrong", { status: 500 });
  }
}
