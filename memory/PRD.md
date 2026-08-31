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

## Done (2026-06 pass 3 — copy hero, proportion, archive, mobile)
- **Case-study COPY = hero moment**: `CaseStory.tsx` renders the real supplied
  `featuredLine` as a large blockquote with a yellow left-border accent + "SUPPLIED
  CAMPAIGN LINE" caption. Verified larger than narrative (46.4px vs 24.8px desktop).
  No invented copy — uses existing `featuredLine` per project.
- **Global proportion pass**: `portfolio.css` overrides the display-size vars at
  ≥701px (major 3.95 / section 3.4 / transition 5.4rem) + brands/contact headings, for
  a clear HERO > SECTION > TITLE > BODY > META hierarchy. Palette untouched.
- **Collaborations = indexed archive**: `BrandMarquee.tsx` adds numbered entries
  (01–13) via `.brand-unit__no`; "FROM THE ARCHIVE — 13 ENTRIES" metadata. Still before
  Selected Work; real logos; restrained marquee kept.
- **Mobile polish (375/390)**: fixed nav-link clipping (PHILOSOPHY no longer cut),
  menu-toggle now 44×44 with `data-testid` + `aria-expanded`, rail card widths reduced
  (74vw / 72vw) so the next card peeks. Verified by testing_agent (iteration_4: 12/12
  pass, no horizontal overflow at 375/390, rail swipe works, portrait not clipped).
- Verified: ESLint ✓, tsc ✓, production build ✓, all 4 case routes 200 on PUBLIC URL.
- KNOWN (pre-existing, not this pass): in the TESTING sandbox the Startup India YouTube
  embeds show "Video unavailable" — likely third-party embed blocking in that
  environment, not a code defect; should render on a normal browser. Verify if needed.

## Done (2026-06 pass 2 — case-study refinement)
- **Removed "stories"** from the Collaborations line (`app/page.tsx`): now "Brands and
  teams I've worked with."
- **Spec Ads clarity**: reordered `data/projects.ts` gallery so the actual IndiGo
  creative ("Spend more on experiences than on tickets") leads, with the IndiGo
  LinkedIn recognition comment placed directly after it and re-captioned to reference
  the creative — so the "IndiGo commented" screenshot now reads in context. The home
  rail card also now leads with the real creative image (was the out-of-context comment).
- **Case-study proportions tightened** (authoritative block in `portfolio.css`, wins over
  the calibration block): smaller case hero title, medium running-narrative text, the
  COPY line as the single hero moment, smaller section headings, tighter spacing, and
  controlled/centered execution plates (featured portrait/square = `4 / span 6`, wide =
  `2 / span 8`) so nothing feels oversized. Spec Ads wide recognition image spans wide
  and sits with the creative.
- Verified: ESLint ✓, tsc ✓ (after clean rebuild), production build ✓, all 4 case routes
  200 on the PUBLIC URL. Desktop visuals verified for case story + execution via a temp
  preview (since the screenshot tool only captures page-top). Mobile not visually
  confirmed (code: featured plates collapse to full width, narrative max-width removed).

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
