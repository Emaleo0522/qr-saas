# QR-SaaS CSS Foundation

## Design Tokens (CSS Custom Properties)

### Color System — Light Mode (default)
```
--bg-primary: #ffffff
--bg-secondary: #f8fafc
--bg-tertiary: #f1f5f9
--text-primary: #0f172a
--text-secondary: #475569
--text-tertiary: #94a3b8
--text-emphasis: #020617
--border-color: #e2e8f0
--color-primary: #7c3aed        (violet-600 — brand)
--color-primary-dark: #6d28d9   (violet-700)
--color-primary-light: #a78bfa  (violet-400)
--color-primary-rgb: 124, 58, 237
--color-success: #10b981
--color-warning: #f59e0b
--color-error: #ef4444
--color-info: #3b82f6
```

### Color System — Dark Mode
```
--bg-primary: #0f172a
--bg-secondary: #1e293b
--bg-tertiary: #334155
--text-primary: #f1f5f9
--text-secondary: #94a3b8
--text-tertiary: #64748b
--text-emphasis: #ffffff
--border-color: #334155
--color-primary: #a78bfa        (violet-400 — brighter in dark)
--color-primary-dark: #8b5cf6   (violet-500)
--color-primary-light: #c4b5fd  (violet-300)
```

### Typography — Fluid with clamp()
```
--text-xs: 0.75rem
--text-sm: 0.875rem
--text-base: clamp(0.875rem, 0.8rem + 0.25vw, 1rem)
--text-lg: clamp(1rem, 0.9rem + 0.35vw, 1.125rem)
--text-xl: clamp(1.125rem, 1rem + 0.5vw, 1.25rem)
--text-2xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)
--text-3xl: clamp(1.5rem, 1.2rem + 1vw, 1.875rem)
--text-4xl: clamp(1.75rem, 1.3rem + 1.5vw, 2.25rem)
--text-5xl: clamp(2rem, 1.5rem + 2vw, 3rem)
--font-sans: "Inter", system-ui, -apple-system, sans-serif
--font-mono: "JetBrains Mono", "Fira Code", ui-monospace, monospace
```

### Spacing (base 4px)
```
--space-1: 0.25rem    (4px)
--space-2: 0.5rem     (8px)
--space-3: 0.75rem    (12px)
--space-4: 1rem       (16px)
--space-5: 1.25rem    (20px)
--space-6: 1.5rem     (24px)
--space-8: 2rem       (32px)
--space-10: 2.5rem    (40px)
--space-12: 3rem      (48px)
--space-16: 4rem      (64px)
--space-20: 5rem      (80px)
--space-24: 6rem      (96px)
```

### Containers
```
--container-sm: 640px
--container-md: 768px
--container-lg: 1024px
--container-xl: 1280px
--container-2xl: 1400px
```

### Z-Index Scale (centralized)
```
--z-dropdown: 1000
--z-sticky: 1010
--z-fixed: 1020
--z-modal-backdrop: 1030
--z-modal: 1040
--z-popover: 1050
--z-tooltip: 1060
--z-toast: 1070
```

### Shadows
```
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
--shadow-card: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)
--shadow-card-hover: 0 4px 12px rgba(0, 0, 0, 0.1)
```

### Border Radius
```
--radius-sm: 0.375rem   (6px)
--radius-md: 0.5rem     (8px)
--radius-lg: 0.75rem    (12px)
--radius-xl: 1rem       (16px)
--radius-2xl: 1.5rem    (24px)
--radius-full: 9999px
```

### Transitions
```
--transition-fast: 150ms ease
--transition-base: 200ms ease
--transition-slow: 300ms ease
--transition-spring: 300ms cubic-bezier(0.34, 1.56, 0.64, 1)
```

## Breakpoints (mobile-first)
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1400px
```

## Layout Patterns

### Landing Page Sections
- Full-width sections with `max()` padding: `padding: Xpx max(24px, calc((100vw - 1280px) / 2))`
- Section vertical rhythm: `--space-16` to `--space-24` between sections
- Hero: min-height 80vh on desktop, auto on mobile

### Generator Page (core layout)
- Sidebar (controls): 380px fixed width on desktop, full-width bottom sheet on mobile
- Preview area: flex-1, centered, min 400x400 QR preview
- Breakpoint: sidebar collapses below `lg` (1024px) to bottom drawer

### Dashboard
- Card grid: `grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))`
- Gap: `--space-6`

### Auth Pages
- Centered card: max-width 420px, auto margins
- Background: `--bg-secondary`

## Theme System
- Use `next-themes` with `attribute="class"` strategy
- Default theme: "system" (follows OS preference)
- Toggle: light / dark / system
- `color-scheme: dark` MUST be set on dark theme for native UI elements
- Tailwind dark mode: `darkMode: "class"` in config

## Architecture Rules
1. All colors via CSS custom properties — never hardcoded hex in components
2. Tailwind extend with custom properties: `colors: { primary: 'var(--color-primary)' }`
3. Component naming: `$component-state-property` (e.g., `--btn-hover-bg`)
4. Safari focus fix: `:where(button):focus:not(:focus-visible) { outline: 0; }`
5. Fluid typography via clamp() — never fixed rem for headings
6. Z-index from named scale only — never numeric z-index in components
7. Transitions: use CSS custom properties for consistent timing

## File Structure (Tailwind CSS 4 + Next.js 15)
```
app/
  globals.css          -> CSS custom properties + Tailwind directives + base reset
  layout.tsx           -> ThemeProvider wrapper, font loading
tailwind.config.ts     -> extend with design tokens
```

## Accessibility Foundation
- Focus ring: `outline: 2px solid var(--color-primary); outline-offset: 2px`
- Skip-nav link as first child of body
- Color contrast: all text/bg combos meet WCAG AA (4.5:1 for normal, 3:1 for large)
- Reduced motion: `@media (prefers-reduced-motion: reduce)` disables transitions
- Font minimum: 16px base (prevents iOS zoom on inputs)
