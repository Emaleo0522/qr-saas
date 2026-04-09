# QR SaaS

Generador de códigos QR con personalización avanzada, autenticación y dashboard de gestión. Stack moderno full-stack con Next.js 16 y Supabase.

## Funcionalidades

- **Generador QR** — Personalización de colores, estilos, y templates de redes sociales
- **Preview en tiempo real** — Vista previa instantánea del QR mientras se edita
- **Descarga** — Export del QR generado
- **Dashboard** — Gestión de QRs creados por el usuario
- **Shortlinks** — Redirección via código corto (`/[shortCode]`)
- **Auth** — Registro y login con Better Auth 1.5
- **Dark mode** — Tema claro/oscuro con next-themes
- **SEO** — sitemap.ts y robots.ts dinámicos

## Stack

| Capa | Tech |
|------|------|
| Framework | Next.js 16 + React 19 + TypeScript |
| Estilos | Tailwind CSS 4 |
| Auth | Better Auth 1.5 |
| DB | Supabase + Drizzle ORM + postgres.js |
| Estado | Zustand 5 + TanStack Query 5 |
| QR | qr-code-styling |
| IDs | nanoid |
| Icons | lucide-react |

## Instalación

```bash
npm install
```

Crear `.env.local` con:

```env
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Correr migraciones:

```bash
npm run migrate
```

Levantar en desarrollo:

```bash
npm run dev   # puerto 3004
```

## Estructura

```
qr-saas/
├── app/
│   ├── (landing)/        # Landing page pública
│   ├── (auth)/           # Login y registro
│   │   ├── login/
│   │   └── register/
│   ├── (app)/            # App autenticada
│   │   ├── dashboard/    # Gestión de QRs
│   │   └── generator/    # Generador con preview
│   ├── [shortCode]/      # Redirección de shortlinks
│   └── api/              # API routes
├── components/
│   ├── qr/               # color-picker, style-selector, preview, download, social-templates
│   ├── landing/          # Componentes de la landing
│   ├── layout/           # Header, footer, nav
│   ├── ui/               # Componentes base
│   └── seo/              # Meta tags, OG
├── lib/                  # DB, auth, helpers
├── supabase/migrations/  # Migraciones SQL
└── types/                # TypeScript types
```
