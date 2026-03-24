export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _auth: any = null;

async function getAuth() {
  if (_auth) return _auth;

  const { betterAuth } = await import("better-auth");
  const { Pool } = await import("pg");

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 3,
  });

  _auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: pool,
    emailAndPassword: { enabled: true, minPasswordLength: 8 },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
      cookieCache: { enabled: true, maxAge: 60 * 5 },
    },
    advanced: { cookiePrefix: "qr-saas" },
  });

  return _auth;
}

// Next.js 16 + Turbopack may pass Request objects with internal properties
// that Better Auth doesn't handle well. We rebuild a clean request.
function toCleanRequest(req: Request, body?: string | null): Request {
  const url = new URL(req.url);
  const cleanUrl = (process.env.BETTER_AUTH_URL || "http://localhost:3004") + url.pathname + url.search;

  const headers = new Headers();
  headers.set("content-type", req.headers.get("content-type") || "application/json");
  const cookie = req.headers.get("cookie");
  if (cookie) headers.set("cookie", cookie);
  const origin = req.headers.get("origin");
  if (origin) headers.set("origin", origin);

  return new Request(cleanUrl, {
    method: req.method,
    headers,
    body,
  });
}

export async function GET(req: Request) {
  const auth = await getAuth();
  return auth.handler(toCleanRequest(req));
}

export async function POST(req: Request) {
  const auth = await getAuth();
  const body = await req.text();
  return auth.handler(toCleanRequest(req, body));
}
