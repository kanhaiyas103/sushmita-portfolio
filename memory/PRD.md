# Sushmita Nanda — Brand Storyteller Portfolio

## Problem / Goal
Elevate an existing editorial portfolio (Next.js 16 + React 19 + TS + Tailwind v4 +
Framer Motion) at `/app` root. Keep the dark-editorial identity; palette must be
**black + warm yellow only** (no teal/cyan/blue/purple/neon/gradients/glassmorphism).
Refine/polish (not rebuild). Preserve structure, content, and all 4 case-study routes.

## Run
- Dev: `npx next dev -p 3000 -H 0.0.0.0` (Node 20 works; package prefers 22).
  Supervisor's `frontend` program points at `/app/frontend` which does NOT exist here —
  this project is Next.js at `/app` root, run manually as above.
- Build: `npx next build`  •  Lint: `npm run lint`  •  Types: `npx tsc --noEmit`

## Architecture
- `app/page.tsx` — Home: Hero → About → Collaborations → Works-transition →
  Selected Work → Editorial pause → Philosophy → Contact → Footer.
- `app/work/[slug]/page.tsx` — case study (SSG from `data/projects.ts`): hero +
  CaseVideos + CaseStory (Brief→Thinking→Copy→Execution→Impact) + CaseVisuals + prev/next.
- `data/projects.ts` — 4 projects: makemytrip, spectra, startup-india, spec-ads.
- Logos: cropped from `public/images/portfolio/brands.jpeg` sprite via `ProjectMark` /
  `BrandMarquee` (real supplied identities).
- Styles: `globals.css` + `theme-reference.css` + **`portfolio.css` (loaded LAST =
  authoritative palette + Selected Work rail + About portrait)**.

## Done (2026-06 pass 1)
- **Deterministic black + yellow palette.** Fixed the two leftover teal `--aqua`
  values in `globals.css` (#43bdbd / #3fc1c3 → #f5c518); authoritative palette now
  lives in `portfolio.css` (last import). Removed the dead `.project-deck-*` block from
  `theme-reference.css` (contained cream/olive hardcodes). Yellow `#f5c518` accent kept.
- **Selected Work rebuilt (was unstyled).** `ProjectRail.tsx` rewritten as a premium,
  drag-driven editorial archive: active card dominant, neighbours peek (dimmed +
  grayscale), Framer Motion drag + velocity snap + spring, prev/next buttons,
  arrow-key nav (ref listener, a11y-clean), "DRAG TO EXPLORE" cue, 01/04 counter with
  live category, progress rules. Each card: real logo (ProjectMark) → number → category
  → title → large work image (dominant) → description + VIEW CASE STUDY →. New CSS in
  `portfolio.css` under `.work-rail` / `.work-card`.
- **About portrait** integrated as a sharp, naturally-cropped rectangular editorial
  image (`sushmita-portrait.jpeg`, object-fit cover, yellow bottom rule, caption).
  Not on the hero.
- Verified: TypeScript ✓, ESLint ✓, production build ✓ (all 4 case routes prerender).
  Desktop visuals verified for rail / about / collaborations.

## Not yet done / backlog (P1)
- Deeper global proportion + hierarchy pass across every section.
- Case-study editorial elevation (large campaign-copy typography, sequencing).
- Philosophy scroll-driven sequence polish; Contact link treatment.
- Typography reveal polish on major headings.

## Verification limits
- Screenshot tool only captures **desktop top-of-URL** (ignores scroll/viewport/style
  injection). Mobile (390/375/768) was NOT visually confirmed — handled via CSS clamps,
  `overflow:hidden` on the rail viewport (no horizontal page overflow), and stacking
  media queries. Recommend a real-device/browser check.

## Git safety
- Working in Emergent workspace only. **Do NOT commit/push/merge** — user reviews first
  and will trigger "Save to Github" themselves.
