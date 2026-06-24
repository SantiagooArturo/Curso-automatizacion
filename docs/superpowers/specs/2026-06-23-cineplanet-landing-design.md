# Cineplanet Landing — Design Spec

**Date:** 2026-06-23
**Status:** Approved (approach A)

## Goal

Recreate the Claude Design handoff in `workshop-01/` — a single-page Spanish-language
"Cineplanet" cinema landing — **pixel-perfect**, as the home route of a complete,
properly-structured application on the stack: **Next.js + ShadCN + Firebase + Tailwind**.

This v1 is a faithful visual replica. Firebase is configured but not yet wired to
functionality; dynamic data and auth come in a later iteration.

## Source of truth

The prototype bundle, read in full:

- `workshop-01/project/index.html` — markup / section order
- `workshop-01/project/styles.css` — all visual styling, design tokens, responsive rules
- `workshop-01/project/script.js` — data (movies, promos, candy), SVG poster generator,
  carousel logic, mobile menu, filter-button activation
- `workshop-01/project/uploads/Screenshot 2026-05-07 at 8.33.09 PM.png` — reference render

The visual output is the contract. Match it; do not copy the prototype's internal structure
where React/Tailwind expresses it more naturally.

## Stack & tooling

- **Next.js 15, App Router, TypeScript**, scaffolded fresh in the repo root.
- **Tailwind CSS** (whatever `create-next-app` provisions — Tailwind v4, CSS-first `@theme`).
  Cineplanet design tokens added to the theme:
  - blues: `blue-950 #061a4a`, `blue-900 #0a2363`, `blue-800 #102d7c`, `blue-700 #1a3da8`,
    `blue-600 #2a55c8`
  - `cyan #28d4ff`, `magenta #ec1e7e`, `magenta-2 #c4135f`, `coral #f15a2b`, `coral-2 #ff7a3d`,
    `gold #ffd23f`, `ink #0e1735`, `paper #f4f5fa`, `muted #6b7390`
- **ShadCN** initialized; components `button`, `tabs`, `dropdown-menu` added and restyled to
  match the design (used where they fit naturally without altering the look).
- **Firebase**: `firebase` SDK + `src/lib/firebase.ts` initialized from env vars. `.env.local`
  with placeholder keys + `.env.example` committed. Exported `app`/`db`/`auth` but unused in v1.
- **Fonts** via `next/font/google`: **Mulish** (400–900) and **Bowlby One** (display).

## Styling approach (approach A — Hybrid)

- Design tokens → Tailwind theme.
- Layout / spacing / typography → Tailwind utilities.
- Interactive primitives → ShadCN (Button, Tabs, Dropdown), restyled to the design.
- Bespoke effects that Tailwind expresses awkwardly stay as small scoped CSS (component-level
  or a dedicated `cineplanet.css` layer):
  - stroked display titles (`-webkit-text-stroke` + layered `text-shadow`) — ESTRENOS hero,
    section titles
  - blue poster frame (layered gradients + inset shadows + inner bevel `::before`)
  - hero background (stacked radial/linear gradients + film-grain `::after`)
  - buy badge (ticket pseudo-elements), title pill, loyalty card, phone mock

## Component breakdown

Route: `src/app/page.tsx` composes, in order:

| Component | Responsibility | Notes |
|---|---|---|
| `UtilityBar` | top dark links bar | hidden < 860px |
| `SiteHeader` | sticky header: logo SVG, primary nav, action buttons, hamburger | `"use client"` for mobile menu toggle |
| `HeroCarousel` | "ESTRENOS" title + poster carousel | `"use client"`; arrows, dots, 7s auto-advance, responsive per-view (2/3/4/6) |
| `FilterBar` | 4 filter cells + "Filtrar" button | button enables after a cell is picked; ShadCN Dropdown optional for cells |
| `MoviesGrid` | section title, EN CARTELERA / PRÓXIMAMENTE tabs, grid, "ver más" | ShadCN Tabs |
| `Promotions` | dark section, 3 promo cards | |
| `SocioStrip` | magenta loyalty card strip + CTA | |
| `Dulceria` | candy combo cards | |
| `AppDownload` | copy + store buttons + phone mock | |
| `SiteFooter` | 4-col footer + socials + bottom bar | |

Shared SVGs (the cineplanet globe logo) extracted to a small component.

## Data & logic

- `src/lib/data.ts` — typed `Movie`, `Promo`, `Candy` types + the `movies`, `promos`, `candy`
  arrays lifted verbatim from `script.js`. Single source for content; the seam for Firestore later.
- `src/lib/poster.tsx` — `PosterSVG({ title, subtitle, palette, motif })` typed React component,
  porting the `posterSVG()` generator and its motif set (dragon, figure, music, horror, anime,
  sheep, action, sci). Used by both carousel and movies grid.
- `src/lib/firebase.ts` — Firebase init from env; exports `app`, `db`, `auth`. Unused in v1.

## Interactions to preserve

- Sticky header on scroll.
- Mobile hamburger toggles `primary-nav` (slide-down) < 860px.
- Carousel: prev/next wrap-around, clickable dots, 7s auto-advance, per-view by breakpoint
  (<540 → 2, <860 → 3, <1100 → 4, else 6), recompute on resize, active card shows buy badge.
- Movies tabs switch EN CARTELERA / PRÓXIMAMENTE (visual state; both can show same seed data in v1).
- Filter "Filtrar" button: disabled/grey until a filter cell is chosen, then coral-gradient + enabled.
- All hover states from the prototype (nav underline, card lift, button brightness, social hover).

## Responsive breakpoints

Reproduce exactly: **1100px**, **860px**, **540px** rules from `styles.css`
(grid column counts, mobile nav, filter card 2-col, carousel per-view, footer columns, etc.).

## Verification

- `npm run build` passes; `npm run dev` renders without console errors.
- Visual compare vs the reference screenshot and the prototype at the three breakpoints.
- Carousel auto-advances and wraps; tabs, mobile menu, and filter button behave as above.

## Out of scope (v1)

- Real Firebase data/auth wiring, login pages, ticket purchase, search.
- Additional routes' content (nav links remain `#` placeholders). Architecture is
  multi-page-ready, but only the home route is built.
- Real movie posters / brand assets (SVG placeholders are intentional, per the prototype).
