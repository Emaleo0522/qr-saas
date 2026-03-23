import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

interface ScansByDay {
  date: string;
  count: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: qrId } = await params;

  // Validate UUID format
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(qrId)) {
    return NextResponse.json({ error: "Invalid QR ID" }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();

  // Verify authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify ownership — user must own this QR code
  const { data: qr } = await supabase
    .from("qr_codes")
    .select("id, user_id, scan_count, title")
    .eq("id", qrId)
    .single();

  if (!qr || qr.user_id !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Parse period from query params (default: 30 days)
  const searchParams = request.nextUrl.searchParams;
  const period = searchParams.get("period") || "30d";

  let daysBack: number;
  switch (period) {
    case "7d":
      daysBack = 7;
      break;
    case "30d":
      daysBack = 30;
      break;
    case "90d":
      daysBack = 90;
      break;
    default:
      daysBack = 30;
  }

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - daysBack);

  // Fetch scans within the period
  const { data: scans, error } = await supabase
    .from("qr_scans")
    .select("scanned_at, ip_hash")
    .eq("qr_code_id", qrId)
    .gte("scanned_at", startDate.toISOString())
    .order("scanned_at", { ascending: true });

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }

  // Aggregate scans by day
  const scansByDayMap = new Map<string, number>();
  const uniqueIPs = new Set<string>();

  // Pre-fill all days in the range with 0
  for (let i = 0; i <= daysBack; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    scansByDayMap.set(dateStr, 0);
  }

  // Count scans
  for (const scan of scans || []) {
    const dateStr = new Date(scan.scanned_at).toISOString().split("T")[0];
    scansByDayMap.set(dateStr, (scansByDayMap.get(dateStr) || 0) + 1);
    if (scan.ip_hash) {
      uniqueIPs.add(scan.ip_hash);
    }
  }

  const scansByDay: ScansByDay[] = Array.from(scansByDayMap.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return NextResponse.json({
    qr_id: qrId,
    title: qr.title,
    period,
    total_scans: qr.scan_count,
    period_scans: scans?.length || 0,
    unique_visitors: uniqueIPs.size,
    scans_by_day: scansByDay,
  });
}
