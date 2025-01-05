import { NextRequest, NextResponse } from "next/server";
import { ipAddress } from "@vercel/functions";

export const config = {
  runtime: "edge",
};

// src/app/api/location/route.ts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
  }

  try {
    const apiKey = process.env.GEOAPIFY_APIKEY;
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${apiKey}`
    );
    const result = await res.json();
    return NextResponse.json({ data: result?.features[0]?.properties });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
