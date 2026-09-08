# AGENTS.md

## Stack

React 19 + TypeScript + Vite 8 + Tailwind CSS 3.4. ESM (`"type": "module"`).

## Commands

```bash
npm run dev        # Vite dev server
npm run build      # tsc -b && vite build (typecheck runs as part of build)
npm run lint       # oxlint (NOT ESLint)
npm run preview    # serve dist/
npm run optimize:images  # converts public/images to WebP (sharp), resize max 1280
```

No test framework is configured. No formatter is configured.

## Linting

Uses **oxlint** (config: `.oxlintrc.json`), not ESLint. Plugins: `react`, `typescript`, `oxc`.

## TypeScript

Two tsconfig references: `tsconfig.app.json` (src/) and `tsconfig.node.json` (vite.config.ts only).
Key flags: `verbatimModuleSyntax: true` — use `import type` for type-only imports.
Typecheck runs automatically via `npm run build` (`tsc -b`).

## Architecture

- Single-page portfolio site — all components live in `src/App.tsx`
- Entry: `index.html` → `src/main.tsx` → `App`
- Sections: hero, about, skills, projects, contact
- Projects are hardcoded data arrays in `App.tsx` (not fetched from an API)
- `features/` contains source assets (screenshots, CV, design files) — not used at runtime

## Design

- Amber/gold color theme, hexagonal shapes (CSS `clip-path`)
- Projects section uses absolute-positioned hex grid (10 projects, honeycomb 3/4/3) — coordinate math is manual in `App.tsx:457-468`
- Sections use `scroll-snap-type: y mandatory` (set in `src/index.css`)
- Scroll-reveal animations via custom `IntersectionObserver` hook (`useInView`)

## Static assets

Project images go in `public/images/<projectId>/` (referenced as `/images/<projectId>/<file>`).
Images must be **WebP** (max 1280px): run `npm run optimize:images` after adding screenshots —
it converts PNG/JPG to `.webp` and deletes the originals. Reference `.webp` names in the
`images[]` arrays (`src/App.tsx`).

## Gotchas

- Tailwind v3 (not v4) — config in `tailwind.config.js`, not a CSS-based config
- No routing library — plain anchor links with scroll-snap
- `dist/` is gitignored — do not commit build output
