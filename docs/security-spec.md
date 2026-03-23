# QR-SaaS Security Specification

## Threat Model (STRIDE Analysis)

| Threat | Component | Risk | Mitigation |
|--------|-----------|------|------------|
| Spoofing | Auth endpoints | HIGH | Better Auth with rate limiting, CSRF tokens, secure cookies |
| Spoofing | QR redirect URLs | MEDIUM | Validate destination URLs against allowlist patterns |
| Tampering | QR config JSONB | MEDIUM | Server-side Zod validation before DB write |
| Tampering | User profile | LOW | RLS policies — users can only modify own data |
| Repudiation | QR creation/deletion | LOW | created_at/updated_at timestamps, audit via Supabase |
| Info Disclosure | API responses | MEDIUM | Never return other users' QR data, RLS enforced |
| Info Disclosure | Short code enumeration | MEDIUM | Random short codes (nanoid 8+), no sequential IDs |
| Info Disclosure | Source maps | LOW | Verify .map files not accessible in production |
| DoS | QR generation endpoint | MEDIUM | Rate limit: 30 QR creates/hour per user |
| DoS | Redirect endpoint | HIGH | Edge caching for popular redirects, rate limit 1000/min/IP |
| DoS | Auth endpoints | HIGH | Rate limit: 5 failed logins/15min, then CAPTCHA |
| Elevation | Admin functions | HIGH | No admin panel in v1 — future: separate auth role |
| Elevation | Plan limits bypass | MEDIUM | Server-side check of qr_count vs max_qrs on every create |

## Security Headers (Next.js middleware or next.config.js)

```typescript
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",  // Next.js requires these
      "style-src 'self' 'unsafe-inline'",                   // Tailwind inline styles
      "img-src 'self' data: blob: https:",                   // QR generation uses blob/data URIs
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://*.supabase.co",
      "frame-ancestors 'none'",
    ].join('; ')
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains'
  },
];
```

## OWASP Top 10 Checklist (QR-SaaS specific)

### A01: Broken Access Control [HIGH PRIORITY]
- [x] Supabase RLS: users CRUD only own qr_codes
- [x] Server-side validation: user_id from session, never from client
- [x] Plan limits enforced server-side (qr_count check)
- [x] Short URLs are public (no auth needed for redirect)
- [ ] No admin panel in v1

### A02: Cryptographic Failures
- [x] HTTPS everywhere (Vercel handles)
- [x] Better Auth secrets in env vars only
- [x] No secrets in client-side code
- [x] Supabase anon key is safe client-side (RLS protects data)

### A03: Injection
- [x] Supabase SDK uses parameterized queries
- [x] Zod validation on all user inputs
- [x] destination_url validated as proper URL format
- [x] QR config JSONB validated against Zod schema (no arbitrary keys)
- [x] No raw SQL — all via Supabase client

### A04: Insecure Design
- [x] Threat model created (this document)
- [x] Short codes are random (nanoid), not sequential
- [x] Rate limiting on critical endpoints

### A05: Security Misconfiguration
- [x] Security headers configured
- [x] CORS: Supabase handles, Next.js API routes same-origin only
- [x] .env.local in .gitignore
- [x] Source maps: verify not accessible in production build

### A06: Vulnerable Components
- [x] Run `npm audit` before deploy
- [ ] Optional: lockfile-lint in CI

### A07: Auth Failures
- [x] Better Auth handles password hashing (bcrypt)
- [x] Rate limit on login: 5 attempts / 15 min
- [x] Session management via Better Auth (httpOnly cookies)
- [x] CSRF protection built into Better Auth

### A08: Data Integrity
- [x] QR data immutability: short_code never changes after creation
- [x] scan_count increment via Supabase RPC (atomic)

### A09: Logging
- [x] Supabase logs auth events automatically
- [x] Never log passwords, tokens, or full QR configs
- [x] Log: failed auth attempts, rate limit hits, RLS violations

### A10: SSRF
- [x] destination_url: validate format only, don't fetch/preview server-side
- [x] Logo uploads: client-side only (qr-code-styling renders in browser)
- [x] No server-side URL fetching in v1

## Input Validation Rules (Zod schemas)

```
destination_url: z.string().url().max(2048)
title: z.string().min(1).max(100).trim()
short_code: z.string().regex(/^[a-zA-Z0-9_-]{6,12}$/)
qr_config: z.object({
  foregroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  backgroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  dotsStyle: z.enum(['square', 'dots', 'rounded', 'extra-rounded', 'classy', 'classy-rounded']),
  cornersStyle: z.enum(['square', 'dot', 'extra-rounded']),
  cornersDotStyle: z.enum(['square', 'dot']),
  imageUrl: z.string().url().optional(),
  gradient: z.object({
    type: z.enum(['linear', 'radial']),
    rotation: z.number().min(0).max(360),
    colorStops: z.array(z.object({
      offset: z.number().min(0).max(1),
      color: z.string().regex(/^#[0-9a-fA-F]{6}$/)
    })).max(4)
  }).optional()
})
category: z.string().uuid().optional()
social_platform: z.string().max(50).optional()
```

## Rate Limiting Strategy

| Endpoint | Limit | Window | Action on exceed |
|----------|-------|--------|-----------------|
| POST /auth/login | 5 attempts | 15 min | Block + CAPTCHA |
| POST /auth/register | 3 accounts | 1 hour | Block IP |
| POST /api/qr/create | 30 creates | 1 hour | 429 response |
| GET /[shortCode] (redirect) | 1000 requests | 1 min/IP | 429 + edge cache |
| PUT /api/qr/[id] | 60 updates | 1 hour | 429 response |
| DELETE /api/qr/[id] | 30 deletes | 1 hour | 429 response |

Implementation: Next.js middleware with in-memory rate limiting (upstash/ratelimit for production)

## External Links Security
- All `<a target="_blank">` MUST have `rel="noopener noreferrer"`
- destination_url displayed in UI: show full URL, no link preview fetching
- QR redirect: server-side redirect (302), no client-side window.open

## Cookie Security (Better Auth)
- httpOnly: true
- secure: true (production)
- sameSite: 'lax'
- path: '/'
- maxAge: 7 days (session), 30 days (remember me)
