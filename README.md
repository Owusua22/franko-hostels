# Franko Hostels: Room Application Web App

A production-ready Next.js 14 (App Router) front end for **Franko Hostels**, student
accommodation across eight Accra neighbourhoods. Students search by location, gender,
room size and length of stay, open a room, pick a bed and apply through a three-step
modal form.

Palette: `#F25757` + white, with warm neutral support tones. Typography is **Outfit**
throughout (headings and UI), self-hosted at build time by `next/font`.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

Node 18.17+ (tested on Node 20).

## What's in the box

| Area | Details |
| --- | --- |
| Home (`/`) | Full-bleed banner photograph with headline and live totals, paged location browser with arrow controls, filter bar (location, gender, room size, stay length, search, sort), 24 room cards with hover actions, a light process diagram with connected steps, amenities, closing CTA, compact footer |
| Accounts (`/account`) | Sign up, sign in, edit your details and see every application you have submitted, with room, bed, stay, rate and reference. Withdraw an application from the same page |
| Policies (`/policies`) | Residence policy: eligibility, check-in, visitors, quiet hours, kitchen, prohibited items, damage and deposits, security, ending a stay, complaints |
| Terms (`/terms`) | Terms and conditions: the agreement, accounts, applications and offers, fees, cancellation and refunds, stay, liability, data, governing law |
| Room detail (`/rooms/FH-SW140`) | Photo gallery, room ID, floor plan, specification grid, amenities, house rules, location panel with photograph, sticky booking panel with semester / short let switch and bed picker |
| Apply modal | 3 steps: student details, then stay and emergency contacts, then review and declare. Applying while signed out opens the account modal first, then returns you to the form. Short lets ask for a number of nights and price the stay per night. Inline validation, focus trap, Esc to close |
| Applications | Saved to `localStorage` against the signed-in account, listed on `/account` with a generated reference (e.g. `FH-26-H965E`) |
| Photography | 22 optimised JPEGs in `public/images`, served through `next/image`. Room cards use room and bathroom photographs only |
| Data | 24 rooms across 8 locations in `lib/rooms.ts` and `lib/locations.ts` |

### Routes

- `/` landing page, location browser and room explorer
- `/rooms/[id]` statically generated for all 24 room IDs
- `/account` account and application history (client side)
- `/policies` residence policy
- `/terms` terms and conditions
- `404` custom room-not-found page

## Locations

| Location | Address | Nearest campus |
| --- | --- | --- |
| East Legon | Links Road | Legon gate, 6 min walk |
| Madina | Madina Market Road | Legon, 12 min |
| Haatso | Haatso Atomic Road | GIMPA, 8 min |
| Achimota | Achimota Mile 7 Road | Legon, 14 min |
| Adenta | Adenta Housing Down | Legon, 22 min |
| Spintex | Spintex Road, near Baatsona | Legon, 20 min |
| Sowutuom | Off Awoshie Road | Pentvars, 10 min |
| Tema | Community 25 | Tema campuses, 5 min |

Locations are shown four at a time; the arrow buttons page through the rest, and tapping
a location filters the room grid and scrolls the page down to the results. The **Where**
dropdown in the filter bar does the same job from the keyboard.

## Project structure

```
app/
  layout.tsx           Outfit font, metadata, global CSS
  page.tsx             home
  rooms/[id]/page.tsx  room detail (SSG via generateStaticParams)
  not-found.tsx
  globals.css          design system, components, responsive rules
components/
  SiteHeader.tsx       sticky nav, sign in button and account pill
  AccountProvider.tsx  account context: session, applications, sign-up gate
  AuthModal.tsx        sign up / sign in dialog
  Hero.tsx             banner photograph, headline, live totals
  RoomExplorer.tsx     location browser, filters, search, sort, results grid
  RoomCard.tsx         room card with hover actions (View details / Apply)
  ApplyModal.tsx       multi-step application form
  ApplyPanel.tsx       sticky booking panel on the room page
  HowItWorks.tsx       process diagram: steps, connectors, confirmation node
  Residence.tsx        photo strip and amenity grid
  ClosingBand.tsx  SiteFooter.tsx
  icons.tsx            inline SVG icon set and the floor-plan drawing
lib/
  account.ts           local accounts, password hashing, session
  locations.ts         eight locations with photography and commute notes
  rooms.ts             room data, availability helpers, currency formatting
  storage.ts           application persistence and reference generator
  types.ts
public/images/         location exteriors, rooms, bathrooms, shared spaces, people
```

## Editing rooms

Everything about the inventory lives in `lib/rooms.ts`:

```ts
{
  id: "FH-SW140",        // room ID shown everywhere
  locationId: "sowutuom", // must match an id in lib/locations.ts
  block: "House 2",
  floor: 1,
  capacity: 4,           // 1 | 2 | 4
  bedsTaken: 2,          // occupancy drives the "beds open" states
  pricePerSemester: 1950,
  nightlyRate: 150,      // null means semester only
  minNights: 2,
  bath: "Shared",        // Private | Shared | En-suite
  policy: "Female",      // Female | Male | Mixed
  view: "Compound",
  blurb: "…",
  amenities: ["Four study desks", "…"],
  beds: ["Bunk A · lower", "…"],  // the first `bedsTaken` labels are treated as taken
  photos: ["/images/people-quad.jpg", "…"], // first photo is the cover image
}
```

Add a room and the home grid, filters, availability counts and a new static
`/rooms/<id>` page all update automatically. Add a location to `lib/locations.ts`
(name, address, landmark, commute, photo) and it appears in the location browser and the
**Where** dropdown on the next build. Drop new photography into `public/images` and point
`photos` at it.

## Photography

The images in `public/images` are sourced from Pexels (free to use under the Pexels
licence, no attribution required). Swap them for real photographs of the houses before
launch, keeping the same file names or updating the arrays in `lib/rooms.ts` and
`lib/locations.ts`.

- Room interiors: Pexels 11295825, 39338470, 19836795, 20200280, 29702286, 35236646,
  5137980
- Bathrooms: 19889116, 7005271, 6933779
- Shared spaces and grounds: 4778635, 6237926, 6636316, 14024967, 14024968
- Hero banner: 13752348 (residence lit up at dusk)
- Reading room: 5538327
- Location exteriors: 35707771, 27307397, 12559018, 15824791, 16366500, 37521274,
  35175022

Room cards and galleries use photographs of rooms, bathrooms and the houses only. The
single photograph with a person is the reading room in the amenities strip.

## Accounts and applications

This build ships a front-end account layer so the whole journey can be demonstrated
without a server:

- `lib/account.ts` stores accounts in `localStorage` (`franko.accounts.v1`), keeps the
  session id in `franko.session.v1`, and hashes passwords with SHA-256 through Web Crypto
  before storing them.
- `components/AccountProvider.tsx` exposes the signed-in account, its applications and a
  `requireAccount()` gate. Applying while signed out opens the account modal and resumes
  the application afterwards.
- `lib/storage.ts` stores applications in `franko.applications.v2`, each tagged with the
  `accountId` that submitted it.

This is a demo layer, not production auth. For a real launch, replace the three functions
in `lib/account.ts` with calls to your identity provider (Supabase Auth, Auth0, Firebase,
Cognito, a custom `/api/auth` route) and move `saveApplication()` to
`fetch("/api/applications", …)`. The `Account` and `Application` types in `lib/types.ts`
are already the API contract, and nothing in the UI has to change.

## Deployment

**Vercel**: push the folder to GitHub, import it at vercel.com, deploy. No environment
variables required. `next build` prerenders every room page.

**Any Node host**: `npm run build && npm run start` behind a reverse proxy.

**Static hosting (Netlify, S3, GitHub Pages)**: add `output: "export"` and
`images: { unoptimized: true }` to `next.config.mjs`, run `npm run build`, then upload the
generated `out/` directory. Unoptimized images means the full-size JPEGs are served, so
resize them first if bandwidth matters.

## Accessibility and performance

- Keyboard reachable controls, visible focus rings, focus-trapped modal, Esc to close
- Location cards are real buttons with `aria-pressed`; filters announce their state
- Form fields labelled and validated with inline messages
- `prefers-reduced-motion` respected
- Card hover actions appear on hover and on keyboard focus, and stay visible on touch
- Images optimised by `next/image` (AVIF/WebP, responsive sizes, lazy loaded below the fold)
- Static rendering for every public route; account and application views are client side
- First load JS about 112 kB
