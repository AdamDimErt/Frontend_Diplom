/** @format */

// src/app/api/locale/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIE_NAME = "NEXT_LOCALE";

export async function POST(request: Request) {
  const { locale } = await request.json();
  (await cookies()).set(COOKIE_NAME, locale);
  return NextResponse.json({ success: true });
}
