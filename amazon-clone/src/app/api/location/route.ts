import { NextRequest, NextResponse } from "next/server";
import { ipAddress } from "@vercel/functions";

export const config = {
  runtime: 'edge',
};

// src/app/api/location/route.ts
export async function GET(request: NextRequest) {
  const ip = ipAddress(request) || "unknown"; 
  try {
    const apiKey = process.env.GEOAPIFY_APIKEY;
    const res = await fetch(
      `https://api.geoapify.com/v1/ipinfo?ip=${ip}&apiKey=${apiKey}`
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