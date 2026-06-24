# Cineplanet Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recreate the Claude Design handoff (`workshop-01/`) — a Spanish "Cineplanet" cinema landing — pixel-perfect as the home route of a complete Next.js + ShadCN + Firebase + Tailwind app.

**Architecture:** Next.js 15 App Router + TypeScript. Design tokens live in the Tailwind theme; layout/typography use Tailwind utilities; ShadCN supplies restyled interactive primitives (Button, Tabs, Dropdown); bespoke effects (stroked titles, poster frame, hero bg) live in a scoped `cineplanet.css` layer. Content (movies/promos/candy) and the SVG poster generator are typed TS modules — the seam for Firestore later. Firebase is initialized from env but unused in v1.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Firebase JS SDK, Vitest + React Testing Library, next/font (Mulish, Bowlby One).

---

## Source of truth

All porting references the prototype, already read in full:
- `workshop-01/project/index.html` — markup & section order
- `workshop-01/project/styles.css` — styling, tokens, responsive rules
- `workshop-01/project/script.js` — data, `posterSVG()`, carousel logic
- `workshop-01/project/uploads/Screenshot 2026-05-07 at 8.33.09 PM.png` — reference render

When porting a section, open the matching block in those files. The visual output is the contract.

## File structure

```
src/
  app/
    layout.tsx          # fonts, <html lang="es">, metadata, imports globals
    page.tsx            # composes the landing sections in order
    globals.css         # Tailwind import + @theme tokens + cineplanet layer import
    cineplanet.css      # bespoke effects (stroked titles, poster frame, hero bg, badges)
  components/
    site/
      UtilityBar.tsx
      SiteHeader.tsx     # "use client" — mobile menu
      Logo.tsx           # shared globe SVG
      HeroCarousel.tsx   # "use client" — carousel
      FilterBar.tsx      # "use client" — filter button activation
      MoviesGrid.tsx     # "use client" — tabs
      Promotions.tsx
      SocioStrip.tsx
      Dulceria.tsx
      AppDownload.tsx
      SiteFooter.tsx
    ui/                  # shadcn-generated (button, tabs, dropdown-menu)
  lib/
    data.ts             # Movie/Promo/Candy types + arrays
    poster.tsx          # <PosterSVG/> generator
    carousel.ts         # pure helpers: getPerView, totalPages, nextPage, prevPage
    firebase.ts         # Firebase init (unused in v1)
    utils.ts            # shadcn cn() helper
  test/
    data.test.ts
    poster.test.tsx
    carousel.test.ts
.env.local              # placeholder Firebase keys (gitignored)
.env.example            # committed placeholder template
vitest.config.ts
vitest.setup.ts
```

---

### Task 1: Scaffold Next.js app

**Files:** whole project root (creates `package.json`, `src/app/*`, `tsconfig.json`, Tailwind config, etc.)

- [ ] **Step 1: Scaffold in place**

The repo root already contains `docs/`, `workshop-01/`, `.git`, `.gitignore`. Scaffold into the current directory (note the `.`):

```bash
npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack --yes
```

If it refuses due to existing files, answer prompts to proceed; the existing `docs/`, `workshop-01/`, and `.gitignore` must be preserved. If `create-next-app` overwrote `.gitignore`, re-add `node_modules/`, `.next/`, `.env.local`, `*.log`, `.DS_Store`.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds (default starter page compiles).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js app (ts, tailwind, app router, src dir)"
```

---

### Task 2: Test tooling (Vitest + RTL)

**Files:**
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Modify: `package.json` (scripts)

- [ ] **Step 1: Install dev deps**

```bash
npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/dom
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
```

- [ ] **Step 3: Create `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Add scripts to `package.json`**

Add to `"scripts"`: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 5: Verify runner**

Run: `npx vitest run`
Expected: exits 0 with "No test files found" (or runs zero tests).

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "chore: add vitest + react testing library"
```

---

### Task 3: Data module (TDD)

**Files:**
- Create: `src/lib/data.ts`
- Test: `src/test/data.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// src/test/data.test.ts
import { describe, it, expect } from "vitest";
import { movies, promos, candy } from "@/lib/data";

describe("data", () => {
  it("has 10 movies each with a 3-color palette and known motif", () => {
    const motifs = ["dragon","figure","music","horror","anime","sheep","action","sci"];
    expect(movies).toHaveLength(10);
    for (const m of movies) {
      expect(m.title.length).toBeGreaterThan(0);
      expect(m.palette).toHaveLength(3);
      expect(motifs).toContain(m.motif);
      expect(m.genre).toMatch(/·/);
    }
  });
  it("has 3 promos and 4 candy items with prices", () => {
    expect(promos).toHaveLength(3);
    expect(candy).toHaveLength(4);
    for (const c of candy) expect(c.price).toMatch(/^S\/ /);
  });
});
```

- [ ] **Step 2: Run — expect FAIL** (`Cannot find module '@/lib/data'`)

Run: `npx vitest run src/test/data.test.ts`

- [ ] **Step 3: Implement `src/lib/data.ts`**

Port the arrays verbatim from `script.js` (lines 63–74 movies, 171–193 promos, 221–226 candy):

```ts
export type Motif = "dragon" | "figure" | "music" | "horror" | "anime" | "sheep" | "action" | "sci";

export interface Movie {
  title: string;
  subtitle: string;
  palette: [string, string, string];
  motif: Motif;
  genre: string;
}
export interface Promo {
  eyebrow: string;
  title: string;
  desc: string;
  palette: [string, string];
  icon: string;
}
export interface Candy {
  name: string;
  price: string;
  icon: string;
  sub: string;
}

export const movies: Movie[] = [
  { title: "Mortal Kombat", subtitle: "7 DE MAYO · SOLO EN CINES", palette: ["#0e1a1a", "#1a3d2e", "#2dffa0"], motif: "dragon", genre: "Acción · 2D" },
  { title: "La Niña", subtitle: "7 DE MAYO · SOLO EN CINES", palette: ["#1a0808", "#4a1414", "#ff5151"], motif: "horror", genre: "Terror · 2D" },
  { title: "Billie Eilish", subtitle: "EL TOUR · EN 3D", palette: ["#0a0033", "#1c1480", "#28d4ff"], motif: "music", genre: "Concierto · 3D" },
  { title: "Nota de Voz", subtitle: "UN MENSAJE DEL DEMONIO", palette: ["#240814", "#4a0a2e", "#ff2e5c"], motif: "horror", genre: "Suspenso · 2D" },
  { title: "Mamoru Hosoda", subtitle: "FILM ANNIVERSARY", palette: ["#0d3b66", "#3aa8c1", "#fff7c2"], motif: "anime", genre: "Anime · 2D" },
  { title: "Las Ovejas", subtitle: "7 DE MAYO · SOLO EN CINES", palette: ["#5fa3ff", "#a6d36a", "#fef6c8"], motif: "sheep", genre: "Familiar · 2D" },
  { title: "Renacer Estelar", subtitle: "PRÓXIMAMENTE EN 3D", palette: ["#1a0a3a", "#5b14a8", "#ffd23f"], motif: "sci", genre: "Sci-Fi · 3D" },
  { title: "Última Línea", subtitle: "ESTRENO MUNDIAL", palette: ["#180a0a", "#7a2010", "#ffb43d"], motif: "action", genre: "Acción · 2D" },
  { title: "Sombras", subtitle: "TODOS GUARDAN UN SECRETO", palette: ["#0a0e24", "#2a3580", "#9bc1ff"], motif: "figure", genre: "Drama · 2D" },
  { title: "El Bosque", subtitle: "NO ENTRES SOLO", palette: ["#0a1a0e", "#1a4a2a", "#a8ff66"], motif: "horror", genre: "Terror · 2D" },
];

export const promos: Promo[] = [
  { eyebrow: "Martes y Miércoles", title: "2x1 con tu tarjeta Socio", desc: "Disfruta dos entradas al precio de una en todas nuestras salas a nivel nacional.", palette: ["#ec1e7e", "#c4135f"], icon: "🎟" },
  { eyebrow: "Combo Familiar", title: "Canchita gigante + 4 bebidas", desc: "El combo perfecto para compartir en familia los fines de semana.", palette: ["#f15a2b", "#ec4115"], icon: "🍿" },
  { eyebrow: "BCP", title: "Hasta 30% de descuento", desc: "Pagando con tu tarjeta de crédito BCP en compra online.", palette: ["#102d7c", "#28d4ff"], icon: "💳" },
];

export const candy: Candy[] = [
  { name: "Combo Mega", price: "S/ 32.90", icon: "🍿", sub: "Canchita grande + bebida" },
  { name: "Combo Pareja", price: "S/ 45.90", icon: "🥤", sub: "2 canchitas + 2 bebidas" },
  { name: "Combo Familiar", price: "S/ 58.90", icon: "🍫", sub: "Combo grande + dulces" },
  { name: "Nachos Premium", price: "S/ 24.90", icon: "🌽", sub: "Con queso y jalapeños" },
];
```

- [ ] **Step 4: Run — expect PASS**

Run: `npx vitest run src/test/data.test.ts`

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: typed movies/promos/candy data module"
```

---

### Task 4: Carousel page-math helpers (TDD)

**Files:**
- Create: `src/lib/carousel.ts`
- Test: `src/test/carousel.test.ts`

These are the pure functions behind `script.js` `getPerView()`/`totalPages()` and the wrap-around prev/next.

- [ ] **Step 1: Write failing test**

```ts
// src/test/carousel.test.ts
import { describe, it, expect } from "vitest";
import { getPerView, totalPages, nextPage, prevPage } from "@/lib/carousel";

describe("carousel math", () => {
  it("perView by width breakpoints (2/3/4/6)", () => {
    expect(getPerView(500)).toBe(2);
    expect(getPerView(700)).toBe(3);
    expect(getPerView(1000)).toBe(4);
    expect(getPerView(1280)).toBe(6);
  });
  it("totalPages = ceil(count/perView), min 1", () => {
    expect(totalPages(10, 6)).toBe(2);
    expect(totalPages(10, 3)).toBe(4);
    expect(totalPages(0, 6)).toBe(1);
  });
  it("next/prev wrap around", () => {
    expect(nextPage(1, 2)).toBe(0);
    expect(nextPage(0, 2)).toBe(1);
    expect(prevPage(0, 2)).toBe(1);
    expect(prevPage(1, 2)).toBe(0);
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `npx vitest run src/test/carousel.test.ts`

- [ ] **Step 3: Implement `src/lib/carousel.ts`**

```ts
export function getPerView(width: number): number {
  if (width < 540) return 2;
  if (width < 860) return 3;
  if (width < 1100) return 4;
  return 6;
}
export function totalPages(count: number, perView: number): number {
  return Math.max(1, Math.ceil(count / perView));
}
export function nextPage(page: number, pages: number): number {
  return (page + 1) % pages;
}
export function prevPage(page: number, pages: number): number {
  return (page - 1 + pages) % pages;
}
```

- [ ] **Step 4: Run — expect PASS**

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: pure carousel page-math helpers"
```

---

### Task 5: Poster SVG generator (TDD)

**Files:**
- Create: `src/lib/poster.tsx`
- Test: `src/test/poster.test.tsx`

Port `posterSVG()` from `script.js` (lines 7–61) to a typed React component. Keep the same gradient, motif set, slice behavior, and title sizing (`title.length > 12 ? 28 : 38`).

- [ ] **Step 1: Write failing test**

```tsx
// src/test/poster.test.tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { PosterSVG } from "@/lib/poster";

describe("PosterSVG", () => {
  it("renders an svg with the uppercased title", () => {
    const { container, getByText } = render(
      <PosterSVG title="El Bosque" subtitle="NO ENTRES SOLO" palette={["#0a1a0e","#1a4a2a","#a8ff66"]} motif="horror" />
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(getByText("EL BOSQUE")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

- [ ] **Step 3: Implement `src/lib/poster.tsx`**

Use a stable id (slugified title) for the gradient, matching the prototype. Provide the 8 motifs as JSX fragments keyed by name. Component signature accepts a `Movie`-compatible shape:

```tsx
import type { Motif } from "@/lib/data";

interface PosterSVGProps {
  title: string;
  subtitle: string;
  palette: [string, string, string];
  motif: Motif;
}

export function PosterSVG({ title, subtitle, palette, motif }: PosterSVGProps) {
  const [a, b, c] = palette;
  const id = `bg-${title.replace(/\s/g, "")}`;
  const motifs: Record<Motif, React.ReactNode> = {
    dragon: (<><path d="M60 240 Q120 180 180 220 T280 200" stroke={c} strokeWidth={3} fill="none" opacity={0.7}/><circle cx={180} cy={200} r={55} fill={b} opacity={0.55}/><circle cx={170} cy={195} r={8} fill={c}/><path d="M120 260 Q200 240 270 280" stroke={c} strokeWidth={2} fill="none" opacity={0.5}/></>),
    figure: (<><ellipse cx={180} cy={240} rx={70} ry={120} fill={b} opacity={0.55}/><circle cx={180} cy={170} r={22} fill={c} opacity={0.75}/><rect x={120} y={260} width={120} height={170} fill={b} opacity={0.5}/></>),
    music: (<><circle cx={180} cy={220} r={100} fill={b} opacity={0.5}/><path d="M140 200 v90 M170 180 v110 M200 200 v90 M230 180 v110" stroke={c} strokeWidth={6} strokeLinecap="round" opacity={0.7}/></>),
    horror: (<><rect x={80} y={120} width={200} height={280} fill={b} opacity={0.4}/><circle cx={150} cy={240} r={14} fill={c}/><circle cx={210} cy={240} r={14} fill={c}/><path d="M140 320 Q180 300 220 320" stroke={c} strokeWidth={3} fill="none"/></>),
    anime: (<><circle cx={120} cy={180} r={36} fill={c} opacity={0.7}/><circle cx={200} cy={210} r={32} fill="#ffffff" opacity={0.5}/><circle cx={270} cy={180} r={28} fill={b} opacity={0.7}/><path d="M40 360 Q180 320 320 360" stroke={c} strokeWidth={4} fill="none"/></>),
    sheep: (<><ellipse cx={180} cy={320} rx={160} ry={40} fill={b} opacity={0.5}/><circle cx={120} cy={290} r={28} fill="#ffffff" opacity={0.7}/><circle cx={180} cy={280} r={32} fill="#ffffff" opacity={0.75}/><circle cx={240} cy={290} r={26} fill="#ffffff" opacity={0.7}/></>),
    action: (<><path d="M0 480 L180 220 L360 480 Z" fill={b} opacity={0.5}/><circle cx={180} cy={180} r={50} fill={c} opacity={0.7}/><path d="M120 200 L180 100 L240 200" stroke={c} strokeWidth={4} fill="none"/></>),
    sci: (<><circle cx={180} cy={240} r={80} fill="none" stroke={c} strokeWidth={3}/><circle cx={180} cy={240} r={120} fill="none" stroke={c} strokeWidth={2} opacity={0.5}/><circle cx={180} cy={240} r={40} fill={b}/><path d="M60 480 L120 380 L240 380 L300 480" stroke={c} strokeWidth={2} fill="none"/></>),
  };
  return (
    <svg viewBox="0 0 360 540" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={a} />
          <stop offset="100%" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width={360} height={540} fill={`url(#${id})`} />
      {motifs[motif]}
      <rect x={0} y={380} width={360} height={160} fill={`url(#${id})`} opacity={0.25} />
      <text x={180} y={450} textAnchor="middle" fill="#ffffff" fontFamily="Bowlby One, sans-serif" fontSize={title.length > 12 ? 28 : 38} fontWeight={800} letterSpacing={1}>{title.toUpperCase()}</text>
      <text x={180} y={478} textAnchor="middle" fill="#ffffff" fontFamily="Mulish, sans-serif" fontSize={11} fontWeight={700} opacity={0.75} letterSpacing={2}>{subtitle}</text>
    </svg>
  );
}
```

- [ ] **Step 4: Run — expect PASS**

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: PosterSVG generator component"
```

---

### Task 6: Firebase init (unused in v1)

**Files:**
- Create: `src/lib/firebase.ts`, `.env.example`, `.env.local`
- Modify: `.gitignore` (ensure `.env.local` ignored)

- [ ] **Step 1: Install SDK**

```bash
npm i firebase
```

- [ ] **Step 2: Create `.env.example`** (committed template)

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

- [ ] **Step 3: Create `.env.local`** with the same keys and placeholder values (e.g. `demo-...`). Ensure `.gitignore` contains `.env.local`.

- [ ] **Step 4: Create `src/lib/firebase.ts`**

Guard against re-init during HMR; init lazily so missing env doesn't crash the build:

```ts
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);
```

- [ ] **Step 5: Verify build still passes**

Run: `npm run build`
Expected: PASS (firebase.ts compiles; not imported by any rendered route yet).

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: firebase init from env (unused in v1)"
```

---

### Task 7: Design tokens, fonts, global + bespoke CSS

**Files:**
- Modify: `src/app/globals.css`, `src/app/layout.tsx`
- Create: `src/app/cineplanet.css`

- [ ] **Step 1: Tokens in `globals.css`**

Keep the Tailwind import the starter added. Add a `@theme` block exposing the palette so utilities like `bg-blue-900`, `text-magenta`, `bg-gold` resolve to Cineplanet values, and base body styles:

```css
@theme {
  --color-blue-950: #061a4a;
  --color-blue-900: #0a2363;
  --color-blue-800: #102d7c;
  --color-blue-700: #1a3da8;
  --color-blue-600: #2a55c8;
  --color-cyan: #28d4ff;
  --color-magenta: #ec1e7e;
  --color-magenta-2: #c4135f;
  --color-coral: #f15a2b;
  --color-coral-2: #ff7a3d;
  --color-gold: #ffd23f;
  --color-ink: #0e1735;
  --color-paper: #f4f5fa;
  --color-muted: #6b7390;
}

@import "./cineplanet.css";

body {
  background: var(--color-paper);
  color: var(--color-ink);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
```

(Adjust `@import` ordering if Tailwind v4 requires it at top; if so, move `@import "./cineplanet.css";` directly under the `@import "tailwindcss";` line.)

- [ ] **Step 2: Fonts + lang in `layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Mulish, Bowlby_One } from "next/font/google";
import "./globals.css";

const mulish = Mulish({ subsets: ["latin"], weight: ["400","500","600","700","800","900"], variable: "--font-mulish" });
const bowlby = Bowlby_One({ subsets: ["latin"], weight: "400", variable: "--font-bowlby" });

export const metadata: Metadata = {
  title: "Cineplanet — Réplica visual",
  description: "Estrenos, promociones y la mejor dulcería en un solo lugar.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${mulish.variable} ${bowlby.variable}`}>
      <body style={{ fontFamily: "var(--font-mulish), system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Create `src/app/cineplanet.css`** — bespoke effects ported from `styles.css`.

Port these classes verbatim (adjusting only font-family to the CSS variables): `.cp-display` (the stroked title — generalize `.hero-title`/`.section-title` shared rule), `.section-title.light` variant, `.frame`/`.frame::before`/`.poster-img`, `.buy-badge` (+ `::before`/`::after`), `.title-pill` (+ `.plus`), `.carousel-arrow`, `.hero-bg` (+ `::after`), `.loyalty-card` (+ `::after`), `.phone-*`, `.dot`. Use the exact gradient/shadow values from `styles.css` lines referenced in the spec. Title font becomes `font-family: var(--font-bowlby), 'Mulish', sans-serif;`.

Minimum content (titles + poster frame + hero bg shown; include the rest from styles.css):

```css
.cp-display {
  font-family: var(--font-bowlby), system-ui, sans-serif;
  font-weight: 400;
  color: #ec1e7e;
  -webkit-text-stroke: 2px #ff5ea1;
  text-shadow: 0 4px 0 #6b0a3a, 0 12px 24px rgba(0,0,0,0.18);
  letter-spacing: -0.5px;
  line-height: 0.95;
}
.cp-display.light {
  color: #fff;
  -webkit-text-stroke: 2px #ffd2e3;
  text-shadow: 0 4px 0 #c4135f, 0 12px 24px rgba(0,0,0,0.25);
}
.cp-hero-title {
  font-family: var(--font-bowlby), system-ui, sans-serif;
  -webkit-text-stroke: 2px #ff5ea1;
  color: #ec1e7e;
  text-shadow: -2px -2px 0 #6b0a3a, 0 6px 0 #6b0a3a, 0 14px 30px rgba(0,0,0,0.45);
  line-height: 0.9; letter-spacing: -0.5px; user-select: none;
}
/* ...port .hero-bg, .frame, .poster-img, .buy-badge, .title-pill, .carousel-arrow,
   .loyalty-card, .phone-mock and children verbatim from workshop-01/project/styles.css... */
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: design tokens, fonts, bespoke cineplanet css layer"
```

---

### Task 8: shadcn/ui init + primitives

**Files:** creates `src/components/ui/{button,tabs,dropdown-menu}.tsx`, `src/lib/utils.ts`, `components.json`

- [ ] **Step 1: Init shadcn**

```bash
npx shadcn@latest init -d
```

Accept defaults (it detects Tailwind v4 + the `@/*` alias).

- [ ] **Step 2: Add components**

```bash
npx shadcn@latest add button tabs dropdown-menu
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: shadcn init + button/tabs/dropdown-menu"
```

---

### Task 9: Logo + UtilityBar + SiteHeader

**Files:**
- Create: `src/components/site/Logo.tsx`, `UtilityBar.tsx`, `SiteHeader.tsx`

Port markup from `index.html` lines 13–71 and styles from `styles.css` lines 39–136, 942–961 (mobile). `SiteHeader` is `"use client"` with a `useState` hamburger toggle.

- [ ] **Step 1: `Logo.tsx`** — the globe + "cineplanet" SVG (index.html 28–40), `width`/`color` props. Reuse in header + footer.

- [ ] **Step 2: `UtilityBar.tsx`** — dark `#04123a` bar, right-aligned links with `util-sep` dividers, `hidden min-[860px]:block` (it disappears below 860px per `styles.css:943`). Max-width 1280, padding `8px 24px`.

- [ ] **Step 3: `SiteHeader.tsx`** — `"use client"`. Sticky `bg-[linear-gradient(180deg,#06185a,#0a2363)]`, z-50, bottom hairline border. Grid `auto 1fr auto`. Center nav with 7 links (Películas active → magenta underline). Right action buttons (Únete/Buscar/Ayuda) with magenta `action-badge` pills. Hamburger visible `< 860px`, toggles a `useState` `open` that applies the slide-down mobile nav (port `.primary-nav` mobile rules `styles.css:944–959`). Use ShadCN `Button` variant `ghost` for action buttons if it doesn't disturb the look; otherwise plain buttons.

- [ ] **Step 4: Smoke-render in page** (temporarily) and verify build.

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: Logo, UtilityBar, SiteHeader (mobile menu)"
```

---

### Task 10: HeroCarousel

**Files:**
- Create: `src/components/site/HeroCarousel.tsx`

`"use client"`. Ports hero (`index.html` 74–95) + carousel logic (`script.js` 76–149) using `src/lib/carousel.ts` and `<PosterSVG/>`.

- [ ] **Step 1: Implement**

- `<section class="hero">` with `.cp-hero-title` "ESTRENOS" (`clamp(72px,14vw,220px)`), `.hero-bg` div behind.
- Track of `movies` mapped to poster cards (`.frame` > `.poster-img` > `PosterSVG`, `.buy-badge` on active, `.title-pill` with gold `+` plus signs). Card index 1 starts `active` per prototype.
- State: `page`, `perView` (from `getPerView(window.innerWidth)` in an effect + resize listener), translateX offset = `page * perView * (cardWidth + gap)` measured from the first card's rect and computed `gap`.
- Prev/next buttons call `prevPage`/`nextPage` with `totalPages(movies.length, perView)`. Dots rendered from `totalPages`, clickable. `setInterval` 7000ms auto-advance; clear on unmount.
- Card flex-basis via the same responsive `calc()` as `styles.css:206`/`939`/`974`/`984` (use arbitrary Tailwind classes or a `.poster-card` rule in cineplanet.css — porting the existing rule is simplest and most exact).

- [ ] **Step 2: Verify build + dev**

Run: `npm run build` then `npm run dev`, open `/`, confirm carousel advances and arrows/dots work.
Expected: PASS, no console errors.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: HeroCarousel with auto-advance + responsive per-view"
```

---

### Task 11: FilterBar

**Files:**
- Create: `src/components/site/FilterBar.tsx`

`"use client"`. Ports `index.html` 98–134 + `styles.css` 362–426 + 964–967 (mobile 2-col) + activation logic `script.js` 242–246.

- [ ] **Step 1: Implement** — white `.filter-card` (max 1080, lifted with `-mt-8`, shadow), 4 cells (`Por película/ciudad/cine/fecha`) each a button with strong label + sub + chevron, dividers between. State `picked: boolean`; clicking any cell sets it. "Filtrar" button is grey/`cursor-not-allowed` until `picked`, then coral gradient + enabled. Optionally wrap cells in ShadCN `DropdownMenu` (visual menus not required in v1 — clicking just activates).

- [ ] **Step 2: Verify build.**

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: FilterBar with activate-on-pick button"
```

---

### Task 12: MoviesGrid

**Files:**
- Create: `src/components/site/MoviesGrid.tsx`

`"use client"`. Ports `index.html` 136–149 + `styles.css` 431–576 + grid mobile rules. Uses ShadCN `Tabs`.

- [ ] **Step 1: Implement** — `.cp-display` "Películas" title; ShadCN `Tabs` styled to the `EN CARTELERA` / `PRÓXIMAMENTE` underline tabs (both tabs show the same seed `movies.slice(0,10)` in v1, per spec). Grid `repeat(5,1fr)` → 4 → 3 → 2 at breakpoints. Each `movie-card`: poster wrap (`PosterSVG` + `2D · ESP` tag), meta (title blue, genre muted), actions (`COMPRAR` coral pill + `+` info button). "VER MÁS PELÍCULAS" coral pill below.

- [ ] **Step 2: Verify build.**

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: MoviesGrid with tabs"
```

---

### Task 13: Promotions + SocioStrip + Dulceria

**Files:**
- Create: `src/components/site/Promotions.tsx`, `SocioStrip.tsx`, `Dulceria.tsx`

- [ ] **Step 1: `Promotions.tsx`** — dark gradient section (`styles.css` 581–635), `.cp-display.light` "Promociones" title, 3 promo cards from `promos` (gradient SVG art with icon glyph, eyebrow/title/desc/"VER MÁS →"). "VER TODAS LAS PROMOCIONES" outline pill. Promo art gradient id slugified from title like the prototype.

- [ ] **Step 2: `SocioStrip.tsx`** — magenta gradient card (`styles.css` 640–720), eyebrow pill, h3 copy, white "QUIERO SER SOCIO" CTA, and the rotated `.loyalty-card` art (5412 •••• •••• 7829 / JUAN PÉREZ / ★ 1,240 pts).

- [ ] **Step 3: `Dulceria.tsx`** — `.cp-display` "Dulcería" + sub, 4 candy cards from `candy` (emoji art tile, name, sub, coral price, "AÑADIR" pill). Grid 4→3→2.

- [ ] **Step 4: Verify build + commit**

```bash
git add -A && git commit -m "feat: Promotions, SocioStrip, Dulceria sections"
```

---

### Task 14: AppDownload + SiteFooter

**Files:**
- Create: `src/components/site/AppDownload.tsx`, `SiteFooter.tsx`

- [ ] **Step 1: `AppDownload.tsx`** — blue gradient (`styles.css` 772–877), copy + two black store buttons (Apple + Google Play SVGs from `index.html` 196–202), and the `.phone-mock` art (notch, magenta screen, strip, poster "PRÓXIMAMENTE", rows, gold CTA).

- [ ] **Step 2: `SiteFooter.tsx`** — `#04123a` footer (`styles.css` 882–931), 4 columns (brand+blurb+socials, Información, Servicios, Ayuda) using `Logo`, social circle links (FB/IG/YT/TikTok SVGs from `index.html` 236–239), bottom bar with copyright. Footer grid 4→2→1 at breakpoints.

- [ ] **Step 3: Verify build + commit**

```bash
git add -A && git commit -m "feat: AppDownload + SiteFooter"
```

---

### Task 15: Compose page + final verification

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Compose** — replace starter `page.tsx` with the ordered composition:

```tsx
import { UtilityBar } from "@/components/site/UtilityBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { FilterBar } from "@/components/site/FilterBar";
import { MoviesGrid } from "@/components/site/MoviesGrid";
import { Promotions } from "@/components/site/Promotions";
import { SocioStrip } from "@/components/site/SocioStrip";
import { Dulceria } from "@/components/site/Dulceria";
import { AppDownload } from "@/components/site/AppDownload";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function Home() {
  return (
    <>
      <UtilityBar />
      <SiteHeader />
      <HeroCarousel />
      <FilterBar />
      <MoviesGrid />
      <Promotions />
      <SocioStrip />
      <Dulceria />
      <AppDownload />
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 2: Full test + build**

Run: `npm run test && npm run build`
Expected: all unit tests PASS; build PASS.

- [ ] **Step 3: Visual verification**

Run `npm run dev`. Compare `/` against `workshop-01/project/uploads/Screenshot 2026-05-07 at 8.33.09 PM.png`. Resize through 1100 / 860 / 540px and confirm: mobile nav appears, utility bar hides, filter card goes 2-col, grids reflow (5→4→3→2), carousel per-view changes, footer collapses. Fix any drift in the relevant component / `cineplanet.css`.

- [ ] **Step 4: Final commit**

```bash
git add -A && git commit -m "feat: compose Cineplanet landing home route"
```

---

## Self-review notes

- **Spec coverage:** tokens (T7), fonts (T7), ShadCN button/tabs/dropdown (T8/T10/T11/T12), Firebase init+env (T6), data module (T3), poster generator (T5), carousel logic (T4/T10), all 10 sections (T9–T14), interactions — sticky/mobile menu (T9), carousel (T10), tabs (T12), filter activation (T11), hover states (per-section), responsive breakpoints (each section + T15), verification (T15). All spec sections map to a task.
- **Types consistent:** `Motif`/`Movie`/`Promo`/`Candy` defined in T3 and reused by `PosterSVG` (T5) and all sections; `getPerView/totalPages/nextPage/prevPage` defined in T4 and consumed in T10.
- **No placeholders:** tested modules (T3–T6) carry full code; presentational sections carry exact source line refs + token/class mapping rather than re-pasting ~900 lines of CSS, which is the intended porting unit.
