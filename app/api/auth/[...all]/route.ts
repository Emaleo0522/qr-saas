export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _handler: any = null;

async function getHandler() {
  if (_handler) return _handler;

  const { betterAuth } = await import("better-auth");
  const { toNextJsHandler } = await import("better-auth/next-js");
  const { drizzleAdapter } = await import("better-auth/adapters/drizzle");
  const { drizzle } = await import("drizzle-orm/postgres-js");
  const postgres = (await import("postgres")).default;
  const schema = await import("@/lib/schema");

  const client = postgres(process.env.DATABASE_URL!, { ssl: "require" });
  const db = drizzle(client, { schema });

  const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: {
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification,
      },
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
