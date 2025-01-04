import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: 'edge',
};

// src/app/api/location/route.ts
export async function GET(request: NextRequest) {
  const headersList = headers();
  const ip = (await headersList).get("x-forwarded-for");
  try {
    const apiKey = process.env.GEOAPIFY_APIKEY;
    const res = await fetch(
      `https://api.geoapify.com/v1/ipinfo?&apiKey=${apiKey}`
    );
    const result = await res.json();
    return NextResponse.json({ 
      data: result?.features[0]?.properties,
      clientIP: ip // Return IP to client
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
 }