export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const postgres = (await import("postgres")).default;
    const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });
    const result = await sql`SELECT 1 as ok`;
    await sql.end();
    return Response.json({ status: "connected", result });
  } catch (e) {
    return Response.json({ status: "error", error: String(e) }, { status: 500 });
  }
}
