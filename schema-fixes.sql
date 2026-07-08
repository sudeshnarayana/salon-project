-- ============================================================
-- Run this in Supabase SQL Editor to add the columns the
-- Deliya frontend needs, on top of the tables you already made.
-- Safe to run even if some columns already exist (IF NOT EXISTS).
-- ============================================================

-- BOOKINGS: needs time slot, notes, payment method, coupon, status
alter table public.bookings
  add column if not exists time text,
  add column if not exists notes text,
  add column if not exists payment text,
  add column if not exists coupon_code text,
  add column if not exists status text default 'confirmed';

-- BUSINESS_SETTINGS: needs the rest of the salon's info fields
alter table public.business_settings
  add column if not exists city text,
  add column if not exists province text,
  add column if not exists postal_code text,
  add column if not exists whatsapp text,
  add column if not exists email text,
  add column if not exists closing_hours text,
  add column if not exists working_days text,
  add column if not exists google_maps_embed text,
  add column if not exists google_maps_directions text,
  add column if not exists latitude text,
  add column if not exists longitude text;

-- Make sure there's exactly one settings row to update (insert default if empty)
insert into public.business_settings (salon_name, address, phone, opening_hours)
select 'Deliya Salon', 'Main Street, Wariyapola', '+94 71 234 5678', '9:00 AM'
where not exists (select 1 from public.business_settings);

-- Generic key/value table for the smaller pieces of data that don't
-- need their own relational table yet (closed dates, coupons, reviews,
-- about-us content, gallery). Keeps everything on Supabase/Postgres
-- instead of mixing in browser-only storage.
create table if not exists public.app_data (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);
