export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const postgres = (await import("postgres")).default;
    const sql = postgres(process.env.DATABASE_URL!, { ssl: "require", connect_timeout: 10 });
    const result = await sql`SELECT 1 as ok`;
    await sql.end();
    return Response.json({ status: "connected", result, dbUrl: process.env.DATABASE_URL?.substring(0, 40) + "..." });
  } catch (e) {
    return Response.json({ status: "error", error: String(e), dbUrl: process.env.DATABASE_URL?.substring(0, 40) + "..." }, { status: 500 });
  }
}
