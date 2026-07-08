require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const PORT = process.env.PORT || 4000;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_KEY. Copy .env.example to .env and fill them in.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// Serve the website itself (index.html, styles.css, script.js) from ./frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Small helper so every route doesn't repeat the same try/catch
function route(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message || 'Server error' });
    }
  };
}

/* ============================== SERVICES ============================== */

app.get('/api/services', route(async (req, res) => {
  const { data, error } = await supabase.from('services').select('*').order('id');
  if (error) throw error;
  res.json(data);
}));

app.post('/api/services', route(async (req, res) => {
  const { name, category, description, duration, price, image } = req.body;
  if (!name || !duration || !price) return res.status(400).json({ error: 'name, duration and price are required' });
  const { data, error } = await supabase
    .from('services')
    .insert([{ name, category, description, duration, price, image }])
    .select();
  if (error) throw error;
  res.status(201).json(data[0]);
}));

app.put('/api/services/:id', route(async (req, res) => {
  const { name, category, description, duration, price, image } = req.body;
  const { data, error } = await supabase
    .from('services')
    .update({ name, category, description, duration, price, image })
    .eq('id', req.params.id)
    .select();
  if (error) throw error;
  res.json(data[0]);
}));

app.delete('/api/services/:id', route(async (req, res) => {
  const { error } = await supabase.from('services').delete().eq('id', req.params.id);
  if (error) throw error;
  res.json({ deleted: true });
}));

/* ================================ STAFF ================================ */

app.get('/api/staff', route(async (req, res) => {
  const { data, error } = await supabase.from('staff').select('*').order('id');
  if (error) throw error;
  res.json(data);
}));

app.post('/api/staff', route(async (req, res) => {
  const { name, specialty } = req.body;
  if (!name || !specialty) return res.status(400).json({ error: 'name and specialty are required' });
  const { data, error } = await supabase.from('staff').insert([{ name, specialty }]).select();
  if (error) throw error;
  res.status(201).json(data[0]);
}));

app.delete('/api/staff/:id', route(async (req, res) => {
  const { error } = await supabase.from('staff').delete().eq('id', req.params.id);
  if (error) throw error;
  res.json({ deleted: true });
}));

/* =============================== BOOKINGS =============================== */

app.get('/api/bookings', route(async (req, res) => {
  // Optional ?phone= filter, used by the "My Bookings" lookup on the site
  let query = supabase.from('bookings').select('*').order('created_at', { ascending: false });
  if (req.query.phone) query = query.eq('phone', req.query.phone);
  const { data, error } = await query;
  if (error) throw error;
  res.json(data);
}));

app.post('/api/bookings', route(async (req, res) => {
  const {
    service_id, service_name, category, duration, price, discount, final_price,
    staff_id, staff_name, date, time, customer_name, phone, notes, payment, coupon_code,
  } = req.body;

  if (!service_id || !date || !time || !customer_name || !phone) {
    return res.status(400).json({ error: 'service_id, date, time, customer_name and phone are required' });
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert([{
      service_id, service_name, category, duration, price, discount, final_price,
      staff_id, staff_name, date, time, customer_name, phone, notes, payment, coupon_code,
      status: 'confirmed',
    }])
    .select();
  if (error) throw error;
  res.status(201).json(data[0]);
}));

app.put('/api/bookings/:id', route(async (req, res) => {
  // Accepts any subset of booking fields (status, date, time, etc.)
  const allowed = ['status', 'date', 'time', 'notes', 'staff_id', 'staff_name'];
  const patch = {};
  for (const k of allowed) if (req.body[k] !== undefined) patch[k] = req.body[k];
  const { data, error } = await supabase.from('bookings').update(patch).eq('id', req.params.id).select();
  if (error) throw error;
  res.json(data[0]);
}));

app.delete('/api/bookings/:id', route(async (req, res) => {
  const { error } = await supabase.from('bookings').delete().eq('id', req.params.id);
  if (error) throw error;
  res.json({ deleted: true });
}));

/* ========================== BUSINESS SETTINGS ========================== */

app.get('/api/business-settings', route(async (req, res) => {
  const { data, error } = await supabase.from('business_settings').select('*').limit(1).maybeSingle();
  if (error) throw error;
  res.json(data || {});
}));

app.put('/api/business-settings', route(async (req, res) => {
  // Always keep a single row: fetch its id, then update (or insert if none exists)
  const { data: existing, error: findErr } = await supabase
    .from('business_settings').select('id').limit(1).maybeSingle();
  if (findErr) throw findErr;

  if (existing) {
    const { data, error } = await supabase
      .from('business_settings').update(req.body).eq('id', existing.id).select();
    if (error) throw error;
    return res.json(data[0]);
  }
  const { data, error } = await supabase.from('business_settings').insert([req.body]).select();
  if (error) throw error;
  res.status(201).json(data[0]);
}));

/* ============ GENERIC KEY/VALUE (closedDates, coupons, reviews, ============ */
/* ============ aboutUs, gallery - small pieces without their own table) ==== */

app.get('/api/kv/:key', route(async (req, res) => {
  const { data, error } = await supabase
    .from('app_data').select('value').eq('key', req.params.key).maybeSingle();
  if (error) throw error;
  if (!data) return res.status(404).json({ error: 'Not found' });
  res.json({ key: req.params.key, value: data.value });
}));

app.put('/api/kv/:key', route(async (req, res) => {
  const { value } = req.body;
  const { error } = await supabase
    .from('app_data')
    .upsert({ key: req.params.key, value, updated_at: new Date().toISOString() });
  if (error) throw error;
  res.json({ key: req.params.key, value });
}));

/* ================================ ADMIN ================================ */

app.post('/api/admin/login', route(async (req, res) => {
  const { password } = req.body;
  if (password === (process.env.ADMIN_PASS || 'deliya2026')) {
    res.json({ ok: true });
  } else {
    res.status(401).json({ ok: false, error: 'Incorrect passcode' });
  }
}));

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Deliya backend running on http://localhost:${PORT}`);
});
