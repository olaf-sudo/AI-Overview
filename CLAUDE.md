# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single static marketing page for "AI Overview", built with Next.js 16 (App Router), React 19, TypeScript (strict) and Tailwind CSS v4. No API routes, no data fetching, no state, no tests. Deploys to Vercel. `next.config.ts` sets `agentRules: false`, so Next will not generate AGENTS.md or CLAUDE.md; this file is maintained by hand.

## Commands

```bash
npm install            # or npm ci
npm run dev            # http://localhost:3000
npm run build          # production build; runs the typecheck but not ESLint (Next 16)
npm start              # serve the build
npm run lint           # eslint (flat config: next/core-web-vitals + next/typescript)
npx tsc --noEmit       # typecheck only
```

There is no test suite and no formatter config beyond ESLint.

## Language conventions

- All user-facing copy is English and lives in `lib/content.ts`. Components import from there; do not hardcode text in JSX.
- Code comments, the README and commit messages are in Dutch. Keep that when adding to them.
- Path alias `@/*` maps to the repo root.

## Architecture

**Page composition.** `app/layout.tsx` loads the single font (Figtree via `next/font`), sets metadata and mounts `<SmoothScroll>` (Lenis). `app/page.tsx` renders `<SiteHeader>`, `<Hero>` and then a `#more` wrapper that holds one component per section. That wrapper is the "sheet" that slides over the hero on scroll; it uses `overflow-clip` (not `overflow-hidden`) so the sticky cards in HowItWorks keep working.

**Server by default, tiny client islands.** Everything is a server component except `CountUp`, `HeroScroll`, `SiteHeader`, `SmoothScroll`, `StackCards` and `lib/hooks.ts`. The client components follow one pattern: listen to scroll/resize, coalesce with `requestAnimationFrame`, and write a few CSS custom properties onto elements (`--hero-y/-s/-o/-hint`, `--stack-s/-r`). All visual styling for those variables lives in `app/globals.css`, never inline. When adding motion, keep to this split.

**One stylesheet.** `app/globals.css` is organised in commented blocks: `@theme` design tokens, base, reusable `@layer components` classes (`.container-page`, `.reveal`, `.stack-card`, `.hero-out`, `.cv-auto`, `.tick`, `.sheen`, `.glow-pulse`), a single motion block with every `@keyframes`, hero-specific rules, a `prefers-reduced-motion` block that stops everything, and responsive tweaks. Tailwind v4 is CSS-first: there is no `tailwind.config`; tokens in `@theme` become utilities (`bg-paper`, `text-ink`, `bg-lime`, `text-signal`, `border-line`, `bg-beige`, `text-muted`, `shadow-step`). Add new colours there, not as arbitrary values.

**Reduced motion is handled twice.** CSS: the `prefers-reduced-motion` block in `globals.css`. JS: `useReducedMotion()` from `lib/hooks.ts` (a `useSyncExternalStore` over `matchMedia`), which every client effect checks before attaching listeners or starting Lenis.

**Lenis.** `SmoothScroll` stores the instance on `window.__lenis` (typed in `lib/global.d.ts`). For programmatic scrolling use `scrollToId()` from `lib/hooks.ts`; it goes through Lenis when running and falls back to native scroll.

**`<Reveal>` is CSS only.** It adds the `.reveal` class, whose fade is driven by `animation-timeline: view()`. No JS, no hydration. Browsers without scroll-driven animations show content immediately.

**Sizing matches a `content-box` design reference.** Several elements deliberately use `box-content` and padding-inclusive widths (container `max-width: 1248px` = 1200 + 24px padding, FAQ 868px, process-card visuals 240px + padding) to render pixel-equal to the original prototype at 1280px. Do not "fix" these to border-box sizes; see the README section "Box-sizing en de referentie".

**Motion style.** Content enters with an opacity fade only, no translate or scale. `.cv-auto` sections use `content-visibility: auto` so off-screen animations pause and images load lazily. See the README "Beweging" section for the intent behind each effect before changing it.

## Known placeholders

- The domain input in the hero and closing card intentionally does nothing (`QuietForm` in `components/HeroScroll.tsx`); a backend hook-up is a future task.
- Several links point at `#`, and `FOOTER.kvk` / `FOOTER.vat` in `lib/content.ts` are placeholders.
- `app/layout.tsx` has a TODO on the final `<title>` and meta description.
- The README references `lib/analytics.ts` and a `design_handoff_ai_overview_landing/` folder; neither exists in this repo.
