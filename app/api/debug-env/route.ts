import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasDbUrl: !!process.env.DATABASE_URL,
    dbUrlPrefix: process.env.DATABASE_URL?.substring(0, 30) + "...",
    hasAuthUrl: !!process.env.BETTER_AUTH_URL,
    authUrl: process.env.BETTER_AUTH_URL,
    hasSecret: !!process.env.BETTER_AUTH_SECRET,
    hasSupaUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
  });
}
