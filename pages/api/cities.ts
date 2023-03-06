import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const regionID = params.get("regionID");

  try {
    if (!regionID) {
      return new Response("Missing parameters", { status: 400 });
    }

    const url = new URL(`/ilceler/${regionID}`, process.env.API_URL);

    const response = await fetch(url, {
      headers: { "x-parola": process.env.API_PASS! },
    });
    const data = await response.json();

    return new Response(JSON.stringify(data), {
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
