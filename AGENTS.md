# Dom Pedro — AGENTS.md

## Quick start

```bash
npm install        # install deps
npm run dev        # Vite dev server (HMR)
npm run build      # tsc -b && vite build (type-check then bundle)
npm run lint       # ESLint flat config, covers src/
npm run preview    # serve built dist/
```

- **Build order matters**: `npm run build` = `tsc -b` (project references) then `vite build`. Running `vite build` alone skips type-checking.
- **No test framework** in this project.

## TypeScript

- **TypeScript ~6.0.2** — very new.
- **Project references**: `tsconfig.app.json` (src/) + `tsconfig.node.json` (vite.config.ts). Root `tsconfig.json` is just a reference hub.
- **`verbatimModuleSyntax: true`** — use `import type` for type-only imports.
- **`erasableSyntaxOnly: true`** — no enums, no namespaces, no parameter properties.
- **`noUnusedLocals` / `noUnusedParameters`** both on.

## Architecture

Single-page marketing site (Portuguese / pt-BR) for Dom Pedro — Cortinas & Persianas Artesanais.

| Section     | File                        |
|-------------|-----------------------------|
| Nav         | `src/components/Navigation.tsx` |
| Hero        | `src/components/Hero.tsx`   |
| About       | `src/components/About.tsx`  |
| Products    | `src/components/Products.tsx` |
| Gallery     | `src/components/Gallery.tsx` |
| Contact     | `src/components/Contact.tsx` |
| Footer      | `src/components/Footer.tsx` |

**Entrypoint**: `src/main.tsx` → renders `<App/>`.

## GSAP + Lenis

- **Plugin registration** happens in `src/utils/gsap.ts` — always import `{ gsap, ScrollTrigger }` from there, never directly from `gsap`.
- **Lenis** is a module-level singleton. Access it via `getLenis()` from `src/hooks/useSmoothScroll.ts`.
- **No DrawSVG plugin** (premium). Navigation uses `strokeDasharray`/`strokeDashoffset` GSAP tweens for the underline animation.
- **No SplitText plugin** (premium). `src/utils/splitText.ts` provides `splitTextToChars()` as a replacement.

## Styling

Plain CSS (no modules, no CSS-in-JS). BEM-like naming (`hero-full__title`, `nav-draw__box`). Styles spread across `src/index.css`, `src/App.css`, and per-component sections within those.

## Other

- `pre/` directory contains **design reference / inspiration** files (CodePen exports). Not active source code.
- ESLint uses flat config (`eslint.config.js`) with `globalIgnores(['dist'])`.
- React 19 StrictMode enabled in `src/main.tsx`.
