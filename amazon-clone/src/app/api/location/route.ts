import { LocationRequestBody } from "@/app/types";
import type { NextApiResponse } from "next";
import { NextResponse } from "next/server";

type ResponseData = {
  message: string;
  [key: string]: unknown; // To handle additional properties from Geoapify
};

export async function GET(body: LocationRequestBody) {
  try {
    // Securely fetch from Geoapify using server-side environment variable
    const apiKey = process.env.GEOAPIFY_APIKEY;
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${body.lat}&lon=${body.lon}&apiKey=${apiKey}`
    );
    const result = await res.json();
    return NextResponse.json(
      { data: result?.data?.features[0]?.properties },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in API handler:", error);
  }
}
