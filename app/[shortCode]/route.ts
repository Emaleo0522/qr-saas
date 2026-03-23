import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

/**
 * Anonymize an IP address using SHA-256.
 * Never stores raw IP — privacy-first approach.
 */
function hashIP(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  const { shortCode } = await params;

  // Validate short code format
  if (!/^[a-zA-Z0-9_-]{3,20}$/.test(shortCode)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Use service role client for scan recording (bypasses RLS)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll: () => [],
        setAll: () => {},
      },
    }
  );

  try {
    // Look up QR code
    const { data: qr } = await supabase
      .from("qr_codes")
      .select("destination_url, is_active")
      .eq("short_code", shortCode)
      .eq("is_active", true)
      .single();

    if (!qr) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Extract tracking data from request headers
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || null;
    const referer = request.headers.get("referer") || null;
    const country = request.headers.get("x-vercel-ip-country") || null;

    // Record scan — fire-and-forget (don't block redirect)
    void supabase.rpc("record_scan", {
      p_short_code: shortCode,
      p_ip_hash: ip !== "unknown" ? hashIP(ip) : null,
      p_user_agent: userAgent,
      p_referer: referer,
      p_country: country,
    });

    // Redirect to destination (302 for trackability, 301 would be cached)
    return NextResponse.redirect(qr.destination_url, 302);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
