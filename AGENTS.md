<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# StudioSpace (client)

Next.js 16 App Router client for **StudioSpace**, a peer-to-peer creative-studio marketplace (assignment project). The Express/MongoDB backend lives in a **separate repo** at `../studio-space-server`.

The full assignment requirements are in **`docs/assignment-spec.md`** — treat it as the source of truth for features, routes, and grading rules. The app is still early: only the scaffold + shadcn/ui components exist; almost all routes are unbuilt.

## Commands

- `npm run dev` — dev server (Turbopack; `next dev` regenerates the agent-rules block above)
- `npm run lint` — ESLint flat config (`eslint-config-next` core-web-vitals + TS)
- `npx tsc --noEmit` — typecheck (no dedicated script exists)
- `npm run build` — production build
- **No test suite or formatter is configured.** Verify with `lint -> tsc --noEmit -> build`.

## Toolchain quirks (Next.js 16 — not the Next.js in your training data)

- **Read `node_modules/next/dist/docs/` before writing code** (`01-app/` for App Router topics). APIs and conventions differ from older Next.js.
- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler` (babel-plugin-react-compiler). Async server components must satisfy the cacheComponents model (Suspense boundaries / caching directives) — check the docs, don't assume classic `fetch` + `revalidate` behavior.
- **Cache Components forbids `new Date()` / `Math.random()` in prerendered code** — `next build` fails with `blocking-prerender-current-time`. Fix by caching the component (`"use cache"` — the footer does this) or deferring to request time. Known landmine: `src/components/ui/sidebar.tsx:609` calls `Math.random()`; the build will break the first time Sidebar is rendered on a route.
- **Tailwind v4, CSS-first.** There is no `tailwind.config.*`. Theme tokens live in `src/app/globals.css` (`@theme inline`, CSS variables); dark mode is the `.dark` class variant. CSS is compiled via the `@tailwindcss/turbopack` loader rule.
- **shadcn/ui style `base-nova` (shadcn CLI v4): primitives are `@base-ui/react`, NOT Radix.** Don't hand-write Radix imports; add components with the `shadcn` CLI or mirror existing files in `src/components/ui/`. Base UI composes via a `render` prop (not `asChild`), and `Button` needs `nativeButton={false}` when `render` targets a Next `Link`/`<a>` — see any button in `site-header.tsx`.
- Path alias `@/*` → `./src/*`; app router root is `src/app/`.

## App shell (already built)

- **Design tokens:** brand primary is `#f47a27` (on `--primary`, `--ring`, `--sidebar-primary` in both themes in `src/app/globals.css`). The app is **dark by default** — `dark` class is hard-coded on `<html>` in `layout.tsx`, and sonner's `<Toaster />` is pinned to `theme="dark"`. Always use semantic tokens (`bg-primary`, `text-muted-foreground`, …), never hard-coded colors; the theme-toggle task must replace the hard-coded class with a dynamic provider.
- `src/app/layout.tsx` wires: `AuthProvider → SiteHeader → <main className="flex-1"> → SiteFooter → <Toaster />` (sonner is the installed toast lib).
- Layout pieces live in `src/components/layout/` (`site-header`, `site-footer`, `logo`, `newsletter-form`, `placeholder-page`). The shared `Logo` must be reused everywhere branding appears.
- **Auth is mocked:** `src/components/auth/auth-provider.tsx` exposes `useAuth()` (login/logout + demo user). `/login` has a demo sign-in button that flips the authenticated navbar state. Swap the provider internals for BetterAuth later — consumers won't change.
- Every spec route (`/studios`, `/how-it-works`, `/about`, `/login`, `/register`, `/dashboard`, `/add-studio`, `/my-listings`, `/my-bookings`, `/terms`, `/privacy`) currently renders `PlaceholderPage` — replace each file wholesale when building its real feature.

## Assignment rules that are easy to violate

- **No Lorem ipsum anywhere. No `alert()`/`confirm()`** — all success/error feedback goes through toasts (sonner is installed; `<Toaster />` is mounted in the root layout) and custom modal dialogs (e.g., delete-confirmation modals).
- Private routes: `/add-studio`, `/my-listings`, `/my-bookings`, `/studios/edit/[id]`. A logged-in user must **not** be bounced to login on page refresh.
- Required extras: custom 404 page, empty states with CTAs, skeleton/spinner loading states, fully responsive.
- Footer social links use the **X logo**, not the Twitter bird.
- Auth: BetterAuth + MongoDB adapter + JWT; Google OAuth only; password rules (upper, lower, ≥6 chars) enforced client-side with inline errors.
- Challenge requirements (graded): JWT in HTTPOnly cookies guarding mutations (401 otherwise); double-booking overlap prevention against "Confirmed" bookings; light/dark theme toggle (globals.css already ships the `.dark` class variant).
- The assignment requires examiner test credentials + a live URL in `README.md` — the README is still the create-next-app default and must be replaced.
