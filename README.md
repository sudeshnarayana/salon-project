# Deliya Salon — Backend + Frontend

Full stack now: **Supabase** (database) ← **Node/Express backend** (this
folder's `server.js`, keeps your Supabase key private) ← **static
frontend** (`public/` — the same site, now talking to your backend
instead of browser-only storage).

## 1. Run the SQL setup in Supabase

Open your Supabase project → SQL Editor → paste and run, in this order:

1. `schema-fixes.sql` — adds the columns the site needs to the tables
   you already created (`bookings`, `business_settings`), plus a small
   generic `app_data` table for coupons/reviews/closed dates/gallery/about-us.
2. `seed-services.sql` — inserts the 24 services from the original site.
3. `seed-staff.sql` — inserts the 4 stylists from the original site.

## 2. Configure the backend

```bash
cd backend
npm install
```

Edit `.env` (already filled in with what you gave me — double check it):

```
PORT=4000
SUPABASE_URL=https://uzvyreobcerpgqnbqlgp.supabase.co
SUPABASE_KEY=sb_publishable_ZfmERp3XVj7ao10eYoPWKQ_ICcW9Bo6
ADMIN_PASS=deliya2026
```

**⚠️ Important:** `sb_publishable_...` is the public/anon key — it's
subject to whatever Row Level Security (RLS) policies your tables have.
If inserts/updates start failing with a permissions error, either:
- add RLS policies on each table allowing the operations this API needs, or
- (simpler, since this key now lives on the server, not the browser)
  swap it for your **service_role** key from Supabase → Project Settings
  → API → "service_role secret". That key bypasses RLS entirely, which
  is fine here because it's never sent to the browser.

## 3. Run everything

```bash
node server.js
```

Visit **http://localhost:4000** — this one server serves the website
*and* the API (`/api/services`, `/api/staff`, `/api/bookings`,
`/api/business-settings`, `/api/kv/:key`, `/api/admin/login`).

## What changed in the frontend

`script.js` no longer uses `window.storage` (that only worked inside
Claude artifacts). It now calls `fetch('/api/...')`, so this site works
as a normal, hostable website. `storage-adapter.js` was removed since
it's no longer needed.

## Folder structure

```
deliya-full/
├── backend/
│   ├── server.js          ← Express API + serves the frontend
│   ├── package.json
│   ├── .env                ← your real credentials (don't commit this)
│   ├── .env.example
│   ├── schema-fixes.sql
│   ├── seed-services.sql
│   └── seed-staff.sql
└── public/
    ├── index.html
    ├── styles.css
    └── script.js
```

## Deploying for real

Any Node host works (Render, Railway, Fly.io, a VPS, etc.). Set the
same three env vars there, and point your domain at it — no separate
static hosting needed since this one server serves everything.
