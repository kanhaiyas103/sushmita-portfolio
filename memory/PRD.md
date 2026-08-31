# Sushmita Nanda — Brand Storyteller Portfolio

## Problem / Goal
Elevate an existing editorial portfolio (Next.js 16 + React 19 + TS + Tailwind v4 +
Framer Motion) at `/app` root. Keep the dark-editorial identity; palette must be
**black + warm yellow only** (no teal/cyan/blue/purple/neon/gradients/glassmorphism).
Refine/polish (not rebuild). Preserve structure, content, and all 4 case-study routes.

## Run / Serve (IMPORTANT)
- **Serve the PUBLIC preview with a PRODUCTION build, NOT `next dev`.** The preview
  ingress does not proxy the Next dev HMR WebSocket (`/_next/webpack-hmr` -> 502), which
  stalls React hydration on the public URL and makes the whole site inert (this was the
  reported "swipe not working" symptom).
- Supervisor `frontend` program runs `yarn start` in `/app/frontend`. That dir now holds
  a tiny launcher (`/app/frontend/package.json`) whose `start` script does
  `cd /app && node_modules/.bin/next start -p 3000 -H 0.0.0.0`. So the platform's own
  supervisor serves the production build and it survives restarts.
- After ANY code change: `cd /app && npx next build && sudo supervisorctl restart frontend`.
  (For quick local iteration only, `npx next dev` works on localhost:3000 but NOT publicly.)
- Build: `npx next build` • Lint: `npm run lint` • Types: `npx tsc --noEmit`

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
- **Public-URL serving fixed** (was the real "swipe not working" cause): switched from
  `next dev` to a production build served by supervisor via the `/app/frontend` launcher.
  Testing agent confirmed 12/12 rail interactions on the PUBLIC URL (next/prev, mouse
  drag + snap, keyboard arrows, mobile touch swipe, disabled states, all 4 case routes,
  no horizontal page overflow, clean console).
- **Keyboard fix**: moved the rail keydown listener from `.work-rail__viewport` to the
  outer `.work-rail` container (`railRef`) so ArrowLeft/ArrowRight work from the nav
  buttons (they are siblings of the viewport).

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
