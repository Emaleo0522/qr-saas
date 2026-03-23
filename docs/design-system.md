# QR-SaaS Design System

## Color Tokens (extends CSS Foundation)

### Interactive States (all colors)
```
--btn-primary-bg: var(--color-primary)
--btn-primary-bg-hover: var(--color-primary-dark)
--btn-primary-bg-active: #5b21b6 (violet-800)
--btn-primary-text: #ffffff
--btn-primary-disabled-bg: #c4b5fd (violet-300)
--btn-primary-disabled-text: #ffffff80

--btn-secondary-bg: transparent
--btn-secondary-border: var(--border-color)
--btn-secondary-text: var(--text-primary)
--btn-secondary-hover-bg: var(--bg-tertiary)

--btn-danger-bg: var(--color-error)
--btn-danger-hover-bg: #dc2626
--btn-danger-text: #ffffff

--btn-ghost-bg: transparent
--btn-ghost-hover-bg: var(--bg-tertiary)
--btn-ghost-text: var(--text-secondary)
```

### Semantic Variants (light/dark auto)
```
Primary:
  --primary-text-emphasis: #5b21b6 (light) / #c4b5fd (dark)
  --primary-bg-subtle: #ede9fe (light) / #1e1b4b (dark)
  --primary-border-subtle: #c4b5fd (light) / #4c1d95 (dark)

Success:
  --success-text-emphasis: #065f46 (light) / #6ee7b7 (dark)
  --success-bg-subtle: #ecfdf5 (light) / #064e3b (dark)

Error:
  --error-text-emphasis: #991b1b (light) / #fca5a5 (dark)
  --error-bg-subtle: #fef2f2 (light) / #7f1d1d (dark)

Warning:
  --warning-text-emphasis: #92400e (light) / #fcd34d (dark)
  --warning-bg-subtle: #fffbeb (light) / #78350f (dark)
```

## Component Specifications

### Button
- Sizes: sm (32px h, text-sm, px-3), md (40px h, text-sm, px-4), lg (48px h, text-base, px-6)
- Variants: primary, secondary, danger, ghost
- States: default, hover (scale 1.02, shadow-md), active (scale 0.98), focus (ring-2 primary), disabled (opacity 0.5, cursor-not-allowed), loading (spinner icon, pointer-events-none)
- Border radius: --radius-lg (12px)
- Transition: --transition-fast (150ms)
- Min touch target: 44x44px (accessible)
- Icon support: leading/trailing icon with 8px gap

### Input / TextField
- Height: 44px (accessible)
- Border: 1px solid var(--border-color)
- Focus: border-primary, ring-2 ring-primary/20
- Error: border-error, ring-error/20, error text below in text-sm
- Disabled: bg-tertiary, opacity 0.6
- Label: text-sm font-medium text-secondary, 4px gap above
- Placeholder: text-tertiary
- Border radius: --radius-md (8px)
- Padding: 12px horizontal
- With icon: 40px left padding, icon at 12px left

### Select / Dropdown
- Same dimensions as Input
- Chevron icon right-aligned
- Dropdown panel: bg-primary, shadow-lg, border, radius-lg
- Options: 40px height, hover bg-tertiary, selected bg-primary-bg-subtle
- Max height: 240px with scroll

### Card
- Background: var(--bg-primary)
- Border: 1px solid var(--border-color)
- Radius: --radius-xl (16px)
- Padding: --space-6 (24px)
- Shadow: --shadow-card
- Hover (if clickable): --shadow-card-hover, translateY(-2px), transition-base
- QR Card specific: 320px min-width, thumbnail 80x80, title truncate 1 line

### Navigation / Header
- Height: 64px
- Background: bg-primary/80 backdrop-blur-xl
- Position: sticky top-0
- Z-index: --z-sticky (1010)
- Logo left, nav links center (desktop), auth buttons right
- Mobile: hamburger menu, full-screen overlay with slide-in
- Active link: text-primary font-semibold, bottom border 2px primary

### Modal
- Backdrop: bg-black/50 backdrop-blur-sm
- Z-index: --z-modal (1040)
- Width: max-w-lg (512px), responsive with mx-4 on mobile
- Radius: --radius-2xl
- Padding: --space-8
- Enter: fade-in + scale from 95%
- Exit: fade-out + scale to 95%
- Focus trap: required
- Close: X button top-right + Escape key + backdrop click

### Toast / Notification
- Position: fixed bottom-right (bottom-center on mobile)
- Z-index: --z-toast (1070)
- Width: 360px max
- Variants: success (green left border), error (red), warning (amber), info (blue)
- Auto-dismiss: 5s default
- Enter: slide-in from right
- Exit: fade-out + slide-right

### Empty State
- Centered icon (48px, text-tertiary)
- Title: text-lg font-semibold
- Description: text-secondary text-sm
- CTA button: primary variant

### Loading State
- Skeleton: bg-tertiary animate-pulse, rounded matching component shape
- Spinner: 20px primary color, 2px border, for buttons and inline
- Full page: centered spinner + "Loading..." text

### Toggle / Switch
- Width: 44px, Height: 24px
- Track: bg-tertiary (off), bg-primary (on)
- Thumb: 20px white circle, shadow-sm
- Transition: --transition-fast
- Accessible: role="switch" + aria-checked

## QR Generator Specific Components

### QR Preview Panel
- Centered in main area
- Size: 280px on mobile, 400px on desktop
- Background: white always (QR readability)
- Shadow: --shadow-lg
- Border radius: --radius-xl
- Padding: --space-8

### Control Sidebar
- Width: 380px desktop, full-width bottom sheet mobile
- Background: --bg-secondary
- Sections: collapsible accordion style
- Section header: text-sm font-semibold uppercase text-tertiary
- Controls spacing: --space-4 between fields

### Color Picker
- Swatch grid: 8 preset colors + custom input
- Size: 32x32px per swatch
- Selected: ring-2 ring-primary, scale 1.1
- Custom: hex input + visual preview

### Template Card (social platforms)
- Grid: 3 columns desktop, 2 mobile
- Size: card with icon (32px) + platform name
- Selected: border-primary, bg-primary-bg-subtle
- Icons: platform logos via lucide-react or custom SVGs

## Responsive Behavior
- Mobile-first: all layouts start single column
- md (768px): landing sections get 2-column where applicable
- lg (1024px): generator sidebar becomes side panel, dashboard 2+ columns
- xl (1280px): max container width, comfortable spacing

## Animation Guidelines
- Hover: 150ms, translateY(-2px) + shadow for cards
- Page transitions: not needed (Next.js App Router handles)
- Micro-interactions: 200ms ease for toggles, color changes
- Loading: pulse animation for skeletons
- Reduced motion: all animations disabled via prefers-reduced-motion
