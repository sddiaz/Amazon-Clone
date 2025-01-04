import { NextRequest, NextResponse } from "next/server";
import { geolocation } from '@vercel/functions';

export const config = {
  runtime: 'edge',
};

// src/app/api/location/route.ts
export async function GET(request: NextRequest) {
  const { city } = geolocation(request);
    const apiKey = process.env.GEOAPIFY_APIKEY;
    return new Response(`<h1>Your location is ${city}</h1>`, {
      headers: { 'content-type': 'text/html' },
    });
 }