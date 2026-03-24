export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _handler: any = null;

async function getHandler() {
  if (_handler) return _handler;

  const { betterAuth } = await import("better-auth");
  const { toNextJsHandler } = await import("better-auth/next-js");
  const { Pool } = await import("pg");

  const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 3,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 10000,
    }),
    emailAndPassword: { enabled: true, minPasswordLength: 8 },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
      cookieCache: { enabled: true, maxAge: 60 * 5 },
    },
    advanced: { cookiePrefix: "qr-saas" },
  });

  _handler = toNextJsHandler(auth);
  return _handler;
}

export async function GET(req: Request) {
  const handler = await getHandler();
  return handler.GET(req);
}

export async function POST(req: Request) {
  const handler = await getHandler();
  return handler.POST(req);
}
