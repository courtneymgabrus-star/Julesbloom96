# CLAUDE.md

Guidance for Claude Code and other AI assistants working in this repository.

## Project overview

**Jules in Bloom** — the marketing and booking site for a queer-affirming yoga,
sound healing, and somatic wellness practice in Atlanta, GA.

It is a single-page React app plus a small Express server that owns three
responsibilities: transactional email for the site's forms, a set of Gemini-backed
"Sanctuary Studio" endpoints, and serving the frontend. The project originated as a
Google AI Studio applet (see `metadata.json` and `.env.example`), which explains some
of the environment conventions below.

There is no database, no CMS, and no auth. All content is checked into the repo as
TypeScript constants; all persistence is "send an email to the owner."

## Commands

```bash
npm install          # install deps (npm is the source of truth — see Package manager)
npm run dev          # tsx server.ts — Express + Vite middleware on http://localhost:3000
npm run lint         # tsc --noEmit — the ONLY check in the repo; keep it clean
npm run build        # vite build (frontend → dist/) + esbuild (server.ts → dist/server.cjs)
npm start            # node dist/server.cjs  ← see gotcha below, needs NODE_ENV=production
npm run clean        # rm -rf dist
npm run preview      # vite preview — static frontend only, no /api routes
```

Both `npm run lint` and `npm run build` currently pass clean. Run `npm run lint` before
committing — there is no test suite, no ESLint/Prettier config, and no CI, so `tsc` is
the entire safety net.

### Dev/prod serving

One Express process serves everything on port 3000 (hardcoded in `server.ts`):

- **Dev** (`NODE_ENV !== "production"`): Vite runs in `middlewareMode` and is mounted
  after the API routes. One server, no proxy, no separate Vite port.
- **Prod** (`NODE_ENV === "production"`): serves `dist/` statically with an
  `app.get("*")` SPA fallback to `dist/index.html`.

**Gotcha:** `npm start` does not set `NODE_ENV`, so running it bare boots the *dev*
branch and tries to spin up Vite from inside the bundled `server.cjs`. Run
`NODE_ENV=production node dist/server.cjs` when serving a real build.

## Architecture

```
index.html            # SPA shell; all SEO meta tags (OG, Twitter, canonical) live here
server.ts             # Express: /api/* + Vite middleware or static dist
vite.config.ts        # react + tailwind plugins, "@" alias, HMR kill-switch
metadata.json         # AI Studio applet manifest (name, geolocation permission)
public/               # copied verbatim to dist/: favicon, robots.txt, sitemap.xml, _redirects
src/
  main.tsx            # createRoot + StrictMode
  App.tsx             # ErrorBoundary > MotionConfig > BrowserRouter > lazy Routes
  LandingPage.tsx     # composes the "/" one-pager from components/
  constants.ts        # Event interface + EVENTS[] — the site's entire content model
  index.css           # Tailwind v4 import + @theme design tokens
  components/         # section components for the landing page, plus shared chrome
  pages/              # route-level pages
  hooks/usePageTitle.ts
  assets/images/      # brand logo (imported as a module, see vite-env.d.ts)
```

### Routing

Routes are declared in `src/App.tsx`. Every page component is `React.lazy`-loaded behind
a `<Suspense>` with the `PageLoader` fallback.

| Path | Component | Notes |
|---|---|---|
| `/` | `LandingPage` | One-pager composed of `components/` sections |
| `/gatherings` | `pages/Gatherings` | Reuses `<Events />`; `#book-private` anchor holds `<BookingCalendar />` |
| `/research` | `pages/Research` | Static content |
| `/studio` | `pages/SanctuaryStudio` | The four Gemini tools (largest file, ~986 lines) |
| `/events/:eventId` | `pages/EventDetails` | Looks up `EVENTS.find(e => e.id === eventId)` |
| `*` | `pages/NotFound` | |

Deep links work in production because of `public/_redirects` (`/* /index.html 200`) and
the Express SPA fallback.

**Landing-page anchors.** `Navbar` and `Footer` mix router `<Link>` (page routes) and
plain `<a href="#...">` (landing-page sections), keyed off an `isPage` flag on each nav
item. When not on `/`, hash links are rewritten to `/#anchor`. Existing anchor ids:
`#home #intro #about #offerings #yoga #sound #events #faq #connect #newsletter`, plus
`#book-private` on `/gatherings`. If you rename a section id, update both `Navbar.tsx`
and `Footer.tsx`.

### API surface

All routes live in `server.ts`. Two rate limiters, both 15-minute windows:
`formLimiter` (10 req) on the form routes, `geminiLimiter` (20 req) mounted on the whole
`/api/gemini` prefix.

| Endpoint | Purpose | Called from |
|---|---|---|
| `GET /api/health` | Liveness probe | — |
| `POST /api/contact` | Emails contact form (`name`, `email`, `message`) | `components/Connect.tsx` |
| `POST /api/newsletter` | Emails a signup (`email`) | `components/Newsletter.tsx` |
| `POST /api/booking` | Emails a booking request (`name`, `email`, `type`, `date`, `time`, `message`) | `components/BookingCalendar.tsx` |
| `POST /api/gemini/search` | Gemini + `googleSearch` tool; returns `{text, groundingChunks, searchQueries}` | `pages/SanctuaryStudio.tsx` |
| `POST /api/gemini/maps` | Gemini + `googleMaps` tool, optional `latitude`/`longitude` | `pages/SanctuaryStudio.tsx` |
| `POST /api/gemini/vision-concept` | Altar/botanical blueprint text (`prompt`, `theme`) | `pages/SanctuaryStudio.tsx` |
| `POST /api/gemini/thinking` | Somatic reasoning (`prompt`, optional `context`) | `pages/SanctuaryStudio.tsx` |

Server conventions to follow when adding a route:

- Clients (`GoogleGenAI`, `Resend`) are **lazily constructed** in `getGenAI()` /
  `getResend()` and throw if their API key is missing. Never construct them at module
  scope — the server must still boot and serve the site without API keys.
- Validate up front and return `400 {error}`; wrap the body in `try/catch` and return
  `500 {error: error.message || "<friendly fallback>"}`. Emails use `isValidEmail()`.
- Form routes reply `{ ok: true }`. Gemini routes reply with the text payload directly.
- Each Gemini endpoint carries its own `systemInstruction` written in the brand's voice
  (trauma-informed, botanical, somatic). Preserve that tone when editing prompts.
- The model id `gemini-3.7-flash` is hardcoded in all four Gemini handlers. Changing
  models means editing four call sites — consider hoisting to a constant if you touch it.

## Content model

`src/constants.ts` exports the `Event` interface and the `EVENTS` array. This is the
single source of truth for the events list (`components/Events.tsx`), the month grid
(`components/EventCalendar.tsx`), the booking availability conflict check
(`components/BookingCalendar.tsx`), and the `/events/:eventId` detail page.

**When adding or removing an event:**

1. Add the object to `EVENTS` with a URL-safe `id` — it becomes the `/events/:id` route.
2. `date` is an ISO string (parsed with `date-fns` `parseISO`); `month`/`day`/`time` are
   separate pre-formatted display strings and must be kept consistent with `date` by hand.
3. Add the matching `/events/<id>` entry to `public/sitemap.xml` — it is maintained
   manually and will drift otherwise.
4. `image` points at a remote Unsplash URL; the brand logo is the only bundled image.

## Styling and UI conventions

**Tailwind CSS v4, configured entirely in `src/index.css`** via the `@theme` block —
there is no `tailwind.config.js`. Design tokens:

| Token | Hex | Typical use |
|---|---|---|
| `wine` | `#942f53` | Headings, primary buttons, links |
| `sage` | `#376327` | Eyebrow labels, icons, CTA buttons |
| `rose` / `blush` | `#D98997` / `#D9ADC2` | Borders (`border-blush/20`), accents |
| `slate` | `#3d4756` | Body copy |
| `cream` | `#FAF7F4` | Page background |
| `ink` | `#292126` | Base text, footer background |

Fonts: `font-serif` = Cormorant Garamond, `font-sans` = Montserrat (Google Fonts,
`@import`ed at the top of `index.css`).

Recurring patterns — match these rather than inventing new ones:

- **Headings** are `font-serif italic text-wine`, often lowercase with `<br />` line
  breaks. **Eyebrow labels** are `text-[0.6rem]–[0.7rem] uppercase tracking-[0.2em]
  font-bold text-sage`. **Buttons** are `rounded-full` pills with uppercase tracked
  micro-text.
- **Cards** are `bg-white` or `bg-white/40` with `border border-blush/20` and a large
  radius (`rounded-3xl`, `rounded-[2.5rem]`, `rounded-[3rem]`).
- **Animation** uses `motion/react` (Motion, not `framer-motion`). Above-the-fold
  elements use `initial`/`animate` with staggered `delay`; below-the-fold sections use
  `whileInView` with `viewport={{ once: true }}`. `App.tsx` sets
  `<MotionConfig reducedMotion="user">`, and `index.css` has a
  `prefers-reduced-motion` block — don't add motion that bypasses both.
- **Icons** are `lucide-react`, typically `w-4 h-4` / `w-6 h-6`.
- `<BotanicalDivider />` is the standard section separator on long pages.

## React conventions

- Function components with `export default`; no named component exports anywhere.
  `ErrorBoundary` is the one class component (it has to be).
- TypeScript throughout. `strict` is **not** enabled in `tsconfig.json`; `noEmit` is on
  and Vite handles transpilation. `catch (err: any)` is the established idiom.
- **Async form state** follows one shape everywhere — copy it:
  `useState<'idle' | 'submitting' | 'success' | 'error'>` plus an `errorMessage` string,
  a `fetch` to `/api/...`, `if (!response.ok) throw new Error(data.error || '...')`,
  `console.error('<Context> Error:', err)`, and an `<AnimatePresence>` swap between the
  form and a success card. See `Newsletter.tsx` for the compact version and
  `BookingCalendar.tsx` for the multi-step version.
- **Page titles / meta**: route pages call `usePageTitle(title, description)` from
  `src/hooks/usePageTitle.ts`, which appends `| Jules in Bloom` unless the title already
  contains `|`, and restores the previous values on unmount. `LandingPage.tsx` predates
  the hook and sets `document.title` in a `useEffect` directly.
- Inputs carry an `id` and a matching `<label>` (often `sr-only`); icon-only buttons
  carry `aria-label`. Keep that up.
- Static image imports (`import logo from '../assets/images/...png'`) rely on the module
  declarations in `src/vite-env.d.ts`.

## Environment variables

Copy `.env.example` → `.env` (git-ignored via `.env*`). `dotenv.config()` runs at the top
of `server.ts`.

| Variable | Required for | Notes |
|---|---|---|
| `GEMINI_API_KEY` | `/api/gemini/*` | Injected automatically in AI Studio |
| `RESEND_API_KEY` | `/api/contact`, `/api/newsletter`, `/api/booking` | No key → those routes 500 |
| `NOTIFY_TO_EMAIL` | form emails | Defaults to `hello@julesinbloom.com` |
| `NOTIFY_FROM_EMAIL` | form emails | Defaults to the Resend onboarding sender |
| `APP_URL` | — | Declared in `.env.example`, injected by AI Studio; not read by the code today |
| `DISABLE_HMR` | dev only | `true` disables Vite HMR |
| `NODE_ENV` | prod | Must be `production` for static serving |

Never commit real keys, and never log the values of these variables.

## Gotchas and known rough edges

- **`DISABLE_HMR`**: `vite.config.ts` carries an explicit comment not to modify the HMR
  setting — file watching is disabled in AI Studio to stop flicker during agent edits.
  Leave it alone.
- **`referenceId` is never sent.** `BookingCalendar.tsx` reads `data.referenceId` from the
  `/api/booking` response, but the server replies `{ ok: true }`. The success screen's
  reference id is always blank. Fix on the server if this matters.
- **`@` path alias is configured but unused.** Both `tsconfig.json` and `vite.config.ts`
  map `@/*` to the repo root. Every import in `src/` is relative today — stay relative
  unless you're deliberately migrating.
- **`sitemap.xml` and `robots.txt` are hand-maintained** and hardcode
  `https://julesinbloom.com`. So do the canonical/OG tags in `index.html`.
- **No tests, no linter, no CI.** `tsc --noEmit` is the whole verification story.
- **Port 3000 is hardcoded** in `server.ts` (no `process.env.PORT`).
- `pages/SanctuaryStudio.tsx` is ~986 lines with four near-parallel prompt/loading/error
  state groups. If you extend it, factor the repetition rather than adding a fifth copy.
- Geolocation on `/studio` falls back to Atlanta coordinates (`33.7490, -84.3880`) when
  the browser denies permission. `metadata.json` declares the `geolocation` frame
  permission for AI Studio.

### Package manager

Both `bun.lock` and `package-lock.json` are committed. The npm lockfile matches the
scripts and is what's used here — prefer `npm install` and commit `package-lock.json`
changes only when you intentionally change dependencies.

## Tone and content

This is a real practitioner's site for a queer-affirming, trauma-informed wellness
practice. Copy is lowercase-leaning, warm, botanical, and somatic ("sanctuary,"
"container," "gathering," "nervous system"). When writing or editing user-facing
strings — including error messages, Gemini system instructions, and loading states
("Breathing into Sanctuary...") — stay in that voice. Do not introduce clinical claims
beyond what the existing copy makes.
