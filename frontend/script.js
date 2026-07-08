(function(){
  const OPEN_MIN = 9*60, CLOSE_MIN = 19*60;
  const CATEGORIES = ["Bridal & Wedding","Makeup","Haircuts","Facial & Skin Care","Hair Services","Massage & Wellness"];
  const GALLERY_CATEGORIES = ["Bridal Makeup","Bridal Dressing","Wedding Saree Draping","Hair Styling","Haircuts","Hair Coloring","Facial Treatments","Skin Cleanup","Body Massage","Nail Services","Before & After","Salon Interior"];

  const DEFAULT_ABOUT_US = {
    story: "Founded over a decade ago, Deliya Salon & Bridal Atelier has become Sri Lanka's most trusted destination for beauty and bridal transformation. What began as a vision to create a women-only sanctuary for self-care has grown into a celebrated atelier, known for precision, luxury, and life-changing beauty experiences.\n\nEvery bride, every client, every transformation we've had the honor to create has shaped our commitment to excellence. We don't just provide services — we craft memories that last a lifetime.",
    yearsOfExperience: 10,
    happyClients: 5000,
    bridalMakeovers: 2000,
    mission: "To deliver world-class beauty services in a serene, women-only environment where every client feels heard, valued, and transformed. We believe in personalized beauty that celebrates individuality and builds confidence.",
    vision: "To be Sri Lanka's most beloved bridal and beauty atelier — a place where women come to not just look beautiful, but to feel empowered, cherished, and celebrated at their most important moments.",
    whyChoose: [
      {icon:"💎", title:"Premium Quality", desc:"Only the finest products and techniques from international beauty standards."},
      {icon:"👩‍🦰", title:"Expert Specialists", desc:"Senior stylists with 10+ years experience in bridal and beauty transformation."},
      {icon:"🏥", title:"Hygiene & Safety", desc:"Strict sterilization protocols and the highest health & safety standards."},
      {icon:"👥", title:"Personalized Service", desc:"Every client receives bespoke attention and customized beauty solutions."},
      {icon:"🎁", title:"Women-Only Space", desc:"A private, comfortable sanctuary exclusively for female clients."},
      {icon:"⏱️", title:"Unhurried Experience", desc:"Generous appointment durations with zero rush — quality over speed."},
    ]
  };

  const DEFAULT_GALLERY = [
    {id:"g1", title:"Elaborate Bridal Transformation", category:"Bridal Makeup", description:"Full bridal makeup with traditional and modern fusion elements.", image:"https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&w=600&q=80", featured:true},
    {id:"g2", title:"Wedding Saree Draping Perfection", category:"Wedding Saree Draping", description:"Expertly draped wedding saree with jewelry styling.", image:"https://images.unsplash.com/photo-1595723518133-ffaf4666fc55?auto=format&fit=crop&w=600&q=80", featured:true},
    {id:"g3", title:"Before & After Glow", category:"Before & After", description:"Dramatic transformation through professional makeup and skincare.", image:"https://images.unsplash.com/photo-1633846445033-798d9ce87f1b?auto=format&fit=crop&w=600&q=80", featured:true},
    {id:"g4", title:"Silk Blowout Hair Styling", category:"Hair Styling", description:"Voluminous, silky styled hair perfect for any occasion.", image:"https://images.unsplash.com/photo-1599623531885-5c3d8d6dd1d3?auto=format&fit=crop&w=600&q=80", featured:false},
    {id:"g5", title:"Precision Haircut Artistry", category:"Haircuts", description:"Perfectly executed layered cut with textured finishing.", image:"https://images.unsplash.com/photo-1595477360723-a25a6c6bc8d2?auto=format&fit=crop&w=600&q=80", featured:false},
    {id:"g6", title:"Radiant Glow Facial", category:"Facial Treatments", description:"After professional facial treatment showing glowing, radiant skin.", image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80", featured:false},
    {id:"g7", title:"Luxe Studio Interior", category:"Salon Interior", description:"Our beautifully designed bridal atelier space.", image:"https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=600&q=80", featured:false},
    {id:"g8", title:"Elegant Nail Artistry", category:"Nail Services", description:"Intricate nail design complementing bridal makeup.", image:"https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80", featured:false},
  ];

  const DEFAULT_SERVICES = [
    {id:"svc_bridal_package", name:"Full Bridal Package", category:"Bridal & Wedding", duration:240, price:35000, description:"Hair styling, full bridal makeup, dress/saree draping and pre-bridal skin prep — one seamless appointment.", image:""},
    {id:"s2", name:"Bridal Makeup & Dress Styling", category:"Bridal & Wedding", duration:150, price:18000, description:"Complete bridal look with dress or saree styling.", image:""},
    {id:"s3", name:"Party Makeup", category:"Makeup", duration:60, price:6000, description:"Event-ready makeup for any celebration.", image:""},
    
    // HAIRCUTS - 13 professional women's haircuts
    {id:"hc1", name:"Bob Cut", category:"Haircuts", duration:60, price:3200, description:"Classic, timeless bob cut with precision layers for movement and shine. Perfect for all face shapes.", image:"https://images.unsplash.com/photo-1611090626919-30bda6c22402?auto=format&fit=crop&w=800&q=80"},
    {id:"hc2", name:"Long Bob (Lob)", category:"Haircuts", duration:70, price:3500, description:"Shoulder-length bob with textured layers. Modern, versatile, and flattering on every hair type.", image:"https://images.unsplash.com/photo-1597760066098-2c38e90c53f6?auto=format&fit=crop&w=800&q=80"},
    {id:"hc3", name:"Layer Cut", category:"Haircuts", duration:75, price:3800, description:"Multi-layered cut with volume at the crown. Creates movement, texture, and dimension throughout.", image:"https://images.unsplash.com/photo-1595477360723-a25a6c6bc8d2?auto=format&fit=crop&w=800&q=80"},
    {id:"hc4", name:"Butterfly Cut", category:"Haircuts", duration:65, price:3600, description:"Trendy shorter layers on top with longer underneath. Creates a distinctive butterfly silhouette with style.", image:"https://images.unsplash.com/photo-1542293329-5b1c30ed02b2?auto=format&fit=crop&w=800&q=80"},
    {id:"hc5", name:"Pixie Cut", category:"Haircuts", duration:45, price:2800, description:"Short, chic, and elegant pixie cut. Easy to style, perfect for the confident woman. Low-maintenance luxury.", image:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"},
    {id:"hc6", name:"U-Cut", category:"Haircuts", duration:70, price:3400, description:"Blunt U-shaped layers at the ends for healthy, polished look. Adds dimension while maintaining length.", image:"https://images.unsplash.com/photo-1559599810-46d1c9186038?auto=format&fit=crop&w=800&q=80"},
    {id:"hc7", name:"V-Cut", category:"Haircuts", duration:70, price:3400, description:"V-shaped layers that converge at the back. Elongates face, adds flow, and creates beautiful movement.", image:"https://images.unsplash.com/photo-1599623531885-5c3d8d6dd1d3?auto=format&fit=crop&w=800&q=80"},
    {id:"hc8", name:"Wolf Cut", category:"Haircuts", duration:80, price:4200, description:"Edgy, textured cut blending wolf and shag. Creates a bold statement with untamed, artistic vibes.", image:"https://images.unsplash.com/photo-1522869635100-ce4c6f835800?auto=format&fit=crop&w=800&q=80"},
    {id:"hc9", name:"Feather Cut", category:"Haircuts", duration:65, price:3500, description:"Soft, wispy layers that feather outward. Creates an airy, lightweight look with maximum texture.", image:"https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=80"},
    {id:"hc10", name:"Step Cut", category:"Haircuts", duration:75, price:3700, description:"Layered cut with distinct steps for dramatic volume. Adds height and texture throughout the hair.", image:"https://images.unsplash.com/photo-1559027615-cd2628902d4a?auto=format&fit=crop&w=800&q=80"},
    {id:"hc11", name:"Blunt Cut", category:"Haircuts", duration:50, price:3000, description:"Sleek, straight blunt ends for a polished, powerful look. Timeless elegance with clean lines.", image:"https://images.unsplash.com/photo-1589820228908-dd51b08e4dbe?auto=format&fit=crop&w=800&q=80"},
    {id:"hc12", name:"Curtain Bangs", category:"Haircuts", duration:45, price:2600, description:"Soft, parted bangs that frame the face beautifully. Works on any hair type and face shape.", image:"https://images.unsplash.com/photo-1611090626919-30bda6c22402?auto=format&fit=crop&w=800&q=80"},
    {id:"hc13", name:"Face-Framing Layers", category:"Haircuts", duration:60, price:3300, description:"Strategic layers framing the face with longer lengths. Flatters every face shape and adds dimension.", image:"https://images.unsplash.com/photo-1595477360723-a25a6c6bc8d2?auto=format&fit=crop&w=800&q=80"},

    {id:"s4", name:"Glow Facial", category:"Facial & Skin Care", duration:45, price:4500, description:"Brightening facial for an instant radiant finish.", image:""},
    {id:"s5", name:"Acne Care Facial", category:"Facial & Skin Care", duration:50, price:5000, description:"Gentle deep-clean facial for acne-prone skin.", image:""},
    {id:"s6", name:"Anti-Ageing Facial", category:"Facial & Skin Care", duration:60, price:7000, description:"Firming treatment with collagen-boosting serums.", image:""},
    {id:"s7", name:"Skin Cleanup", category:"Facial & Skin Care", duration:30, price:2500, description:"Quick refresh for everyday glow.", image:""},
    {id:"s8", name:"Hair Cutting & Styling", category:"Hair Services", duration:60, price:3500, description:"Precision cut finished with a signature blow-dry.", image:""},
    {id:"s9", name:"Keratin Hair Spa Treatment", category:"Hair Services", duration:120, price:9000, description:"Deep-conditioning keratin treatment for smooth, healthy hair.", image:""},
    {id:"s10", name:"Relaxation Body Massage", category:"Massage & Wellness", duration:60, price:5500, description:"Full-body massage to ease tension and stress.", image:""},
    {id:"s11", name:"Aromatherapy Massage", category:"Massage & Wellness", duration:75, price:7500, description:"Essential-oil massage for deep relaxation.", image:""},
  ];

  const DEFAULT_STAFF = [
    {id:"st1", name:"Deliya Narayana", specialty:"Founder & Bridal Specialist"},
    {id:"st2", name:"Sanduni Perera", specialty:"Bridal & Makeup Specialist"},
    {id:"st3", name:"Ishara Fernando", specialty:"Hair Stylist"},
    {id:"st4", name:"Malsha De Silva", specialty:"Skin & Massage Therapist"},
  ];

  const DEFAULT_COUPONS = [
    {code:"WELCOME10", percent:10},
    {code:"BRIDE2026", percent:15},
  ];

  const DEFAULT_REVIEWS = [
    {id:"r1", name:"Ishara P.", rating:5, text:"My bridal package was flawless — hair, makeup and draping all in one calm morning. Everyone complimented the look all day.", date:"2026-05-14"},
    {id:"r2", name:"Nadeesha W.", rating:5, text:"Such a calm, private space. My stylist actually listened before touching my hair — rare these days.", date:"2026-04-02"},
    {id:"r3", name:"Chamodi F.", rating:4, text:"Lovely bridal trial ahead of my big day. Would have liked a bit more time for the consultation, but the result was gorgeous.", date:"2026-03-20"},
  ];

  const DEFAULT_BUSINESS_SETTINGS = {
    businessName: "Deliya Salon",
    address: "Main Street, Wariyapola",
    city: "Wariyapola",
    province: "Central Province",
    postalCode: "20600",
    phone: "+94 71 234 5678",
    whatsapp: "+94 71 234 5678",
    email: "hello@deliyasalon.com",
    openingHours: "9:00 AM",
    closingHours: "9:00 PM",
    workingDays: "Monday — Saturday",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.5723900000002!2d80.62!3d7.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2e8c3a0000001%3A0x1234567890!2sWariyapola%2C%20Sri%20Lanka!5e0!3m2!1sen!2s!4v1234567890",
    googleMapsDirections: "https://www.google.com/maps/dir/?api=1&destination=Wariyapola,+Sri+Lanka",
    latitude: "7.2",
    longitude: "80.62",
  };

  // ---------- BACKEND API ----------
  // All data now lives in Supabase, reached through our own Node backend
  // (keeps the Supabase key server-side instead of in this public file).
  const API_BASE = '/api'; // change to e.g. 'http://localhost:4000/api' if frontend and backend are hosted separately

  async function apiGet(path){
    const res = await fetch(`${API_BASE}${path}`);
    if(res.status === 404) return null;
    if(!res.ok) throw new Error(`GET ${path} failed (${res.status})`);
    return res.json();
  }
  async function apiSend(method, path, body){
    const res = await fetch(`${API_BASE}${path}`, {
      method, headers:{'Content-Type':'application/json'}, body: body!==undefined ? JSON.stringify(body) : undefined
    });
    if(!res.ok) throw new Error(`${method} ${path} failed (${res.status})`);
    return res.json();
  }

  // Convert a Supabase services row (snake_case, numeric id) into the
  // shape the rest of this file already expects (camelCase-free, string id)
  function mapServiceRow(r){ return { id:String(r.id), name:r.name, category:r.category, duration:r.duration, price:r.price, description:r.description||'', image:r.image||'' }; }
  function mapStaffRow(r){ return { id:String(r.id), name:r.name, specialty:r.specialty }; }
  function mapBookingRow(r){
    return {
      id:String(r.id), serviceId:r.service_id!=null?String(r.service_id):null, serviceName:r.service_name, category:r.category,
      duration:r.duration, price:r.price, discount:r.discount||0, finalPrice:r.final_price,
      staffId:r.staff_id!=null?String(r.staff_id):null, staffName:r.staff_name,
      date:r.date, time:r.time, customerName:r.customer_name, phone:r.phone, notes:r.notes||'',
      payment:r.payment, couponCode:r.coupon_code||'', status:r.status||'confirmed', createdAt:r.created_at,
    };
  }
  function mapBusinessSettingsRow(r){
    if(!r) return DEFAULT_BUSINESS_SETTINGS;
    return {
      businessName:r.salon_name||'', address:r.address||'', city:r.city||'', province:r.province||'', postalCode:r.postal_code||'',
      phone:r.phone||'', whatsapp:r.whatsapp||'', email:r.email||'', openingHours:r.opening_hours||'9:00 AM', closingHours:r.closing_hours||'9:00 PM',
      workingDays:r.working_days||'Monday — Saturday', googleMapsEmbed:r.google_maps_embed||'', googleMapsDirections:r.google_maps_directions||'',
      latitude:r.latitude||'', longitude:r.longitude||'',
    };
  }
  function businessSettingsToRow(bs){
    return {
      salon_name:bs.businessName, address:bs.address, city:bs.city, province:bs.province, postal_code:bs.postalCode,
      phone:bs.phone, whatsapp:bs.whatsapp, email:bs.email, opening_hours:bs.openingHours, closing_hours:bs.closingHours,
      working_days:bs.workingDays, google_maps_embed:bs.googleMapsEmbed, google_maps_directions:bs.googleMapsDirections,
      latitude:bs.latitude, longitude:bs.longitude,
    };
  }

  let services=[], staff=[], bookings=[], closedDates=[], coupons=[], reviews=[], gallery=[], aboutUs={}, businessSettings={};
  let selectedRating=5, selectedSlot=null, selectedStaffAssigned=null, activeCategory="All", appliedDiscount=0, isAdmin=false, galleryFilter="All", lightboxIndex=0;

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function toast(msg){
    const t=$('#toast'); t.textContent=msg; t.classList.add('show');
    setTimeout(()=>t.classList.remove('show'), 2400);
  }
  function escapeHtml(str){ const d=document.createElement('div'); d.textContent=str; return d.innerHTML; }
  function timeToMin(t){ const [h,m]=t.split(':').map(Number); return h*60+m; }
  function minToTime(m){ const h=Math.floor(m/60), mm=m%60; return String(h).padStart(2,'0')+':'+String(mm).padStart(2,'0'); }
  function formatTimeDisplay(t){ const [h,m]=t.split(':').map(Number); const p=h>=12?'PM':'AM'; const h12=h%12===0?12:h%12; return `${h12}:${String(m).padStart(2,'0')} ${p}`; }
  function todayStr(){ return new Date().toISOString().split('T')[0]; }

  async function loadAll(){
    try{ const rows=await apiGet('/services'); services = (rows&&rows.length)? rows.map(mapServiceRow) : DEFAULT_SERVICES; }catch(e){ services=DEFAULT_SERVICES; }
    try{ const rows=await apiGet('/staff'); staff = (rows&&rows.length)? rows.map(mapStaffRow) : DEFAULT_STAFF; }catch(e){ staff=DEFAULT_STAFF; }
    try{ const rows=await apiGet('/bookings'); bookings = rows? rows.map(mapBookingRow) : []; }catch(e){ bookings=[]; }
    try{ const kv=await apiGet('/kv/deliya_closed_dates'); closedDates = kv? JSON.parse(kv.value):[]; }catch(e){ closedDates=[]; }
    try{ const kv=await apiGet('/kv/deliya_coupons'); coupons = kv? JSON.parse(kv.value):DEFAULT_COUPONS; if(!kv) await saveCoupons(); }catch(e){ coupons=DEFAULT_COUPONS; }
    try{ const kv=await apiGet('/kv/deliya_reviews'); reviews = kv? JSON.parse(kv.value):DEFAULT_REVIEWS; if(!kv) await saveReviews(); }catch(e){ reviews=DEFAULT_REVIEWS; }
    try{ const row=await apiGet('/business-settings'); businessSettings = (row&&row.salon_name)? mapBusinessSettingsRow(row) : DEFAULT_BUSINESS_SETTINGS; }catch(e){ businessSettings=DEFAULT_BUSINESS_SETTINGS; }
    try{ const kv=await apiGet('/kv/deliya_about_us'); aboutUs = kv? JSON.parse(kv.value):DEFAULT_ABOUT_US; if(!kv) await saveAboutUs(); }catch(e){ aboutUs=DEFAULT_ABOUT_US; }
    try{ const kv=await apiGet('/kv/deliya_gallery'); gallery = kv? JSON.parse(kv.value):DEFAULT_GALLERY; if(!kv) await saveGallery(); }catch(e){ gallery=DEFAULT_GALLERY; }
  }
  // NOTE: services/staff/bookings are NOT bulk-saved anymore — each add/edit/delete
  // calls its own API endpoint directly (see wireEvents / add-svc-btn / add-staff-btn / submitBooking).
  // These 5 remain simple key-value blobs since they don't have dedicated tables yet.
  async function saveClosedDates(){ await apiSend('PUT', '/kv/deliya_closed_dates', {value: JSON.stringify(closedDates)}); }
  async function saveCoupons(){ await apiSend('PUT', '/kv/deliya_coupons', {value: JSON.stringify(coupons)}); }
  async function saveReviews(){ await apiSend('PUT', '/kv/deliya_reviews', {value: JSON.stringify(reviews)}); }
  async function saveBusinessSettings(){ await apiSend('PUT', '/business-settings', businessSettingsToRow(businessSettings)); }
  async function saveAboutUs(){ await apiSend('PUT', '/kv/deliya_about_us', {value: JSON.stringify(aboutUs)}); }
  async function saveGallery(){ await apiSend('PUT', '/kv/deliya_gallery', {value: JSON.stringify(gallery)}); }

  // ---------- SERVICES / CATEGORIES ----------
  function renderCategoryChips(){
    const wrap = $('#cat-chips');
    const cats = ["All", ...CATEGORIES];
    wrap.innerHTML = cats.map(c => `<button type="button" class="chip ${c===activeCategory?'active':''}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join('');
    wrap.querySelectorAll('.chip').forEach(chip => chip.addEventListener('click', () => {
      activeCategory = chip.dataset.cat;
      renderCategoryChips();
      renderServicesGrid();
    }));
  }

  function renderServicesGrid(){
    const grid = $('#services-grid');
    const list = activeCategory==="All" ? services : services.filter(s => s.category === activeCategory);
    if(list.length===0){ grid.innerHTML = '<div class="empty-state">No services in this category yet.</div>'; return; }
    grid.innerHTML = list.map(s => `
      <div class="service-card">
        ${s.image ? `<img src="${s.image}" alt="${escapeHtml(s.name)}" class="service-image" onerror="this.style.display='none';this.parentElement.querySelector('.no-image-placeholder')&&(this.parentElement.querySelector('.no-image-placeholder').style.display='flex')">` : ''}
        ${!s.image ? `<div class="no-image-placeholder">High-quality image coming soon</div>` : ''}
        <div class="service-info">
          <div class="cat-tag">${escapeHtml(s.category)}</div>
          <h3>${escapeHtml(s.name)}</h3>
          <p class="desc">${escapeHtml(s.description||'')}</p>
          <div class="service-meta">
            <span class="service-duration">${s.duration} min</span>
            <span class="service-price">Rs. ${Number(s.price).toLocaleString()}</span>
          </div>
          <button type="button" class="book-this-btn" data-svc="${s.id}">Book Now</button>
        </div>
      </div>
    `).join('');
    grid.querySelectorAll('.book-this-btn').forEach(btn => btn.addEventListener('click', () => bookService(btn.dataset.svc)));
    observeReveal();
  }

  function bookService(svcId){
    $$('.tab').forEach(t => t.classList.remove('active'));
    $$('.tab-panel').forEach(p => p.classList.remove('active'));
    $('.tab[data-tab="book"]').classList.add('active');
    $('#tab-book').classList.add('active');
    $('#bk-service').value = svcId;
    renderSlots();
    window.scrollTo({top:0, behavior:'smooth'});
  }
  window.__bookService = bookService;

  function renderServiceSelect(){
    const sel = $('#bk-service');
    sel.innerHTML = CATEGORIES.map(cat => {
      const items = services.filter(s => s.category === cat);
      if(items.length===0) return '';
      return `<optgroup label="${escapeHtml(cat)}">${items.map(s => `<option value="${s.id}">${escapeHtml(s.name)} — ${s.duration}min — Rs.${Number(s.price).toLocaleString()}</option>`).join('')}</optgroup>`;
    }).join('');
  }

  function renderStaffSelect(){
    const sel = $('#bk-staff');
    sel.innerHTML = `<option value="any">Any Available Stylist</option>` + staff.map(s => `<option value="${s.id}">${escapeHtml(s.name)} — ${escapeHtml(s.specialty)}</option>`).join('');
  }

  function renderSvcCategorySelect(){
    const sel = $('#new-svc-cat');
    if(sel) sel.innerHTML = CATEGORIES.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
  }

  // ---------- SLOTS / STAFF ASSIGNMENT ----------
  function isStaffFree(staffId, date, start, end){
    return !bookings.some(b => b.date===date && b.status!=='cancelled' && b.staffId===staffId &&
      start < timeToMin(b.time)+b.duration && end > timeToMin(b.time));
  }
  function findAssignableStaff(date, start, duration, preferredStaffId){
    const end = start + duration;
    if(preferredStaffId && preferredStaffId !== 'any'){
      return isStaffFree(preferredStaffId, date, start, end) ? preferredStaffId : null;
    }
    for(const s of staff){ if(isStaffFree(s.id, date, start, end)) return s.id; }
    return null;
  }

  function renderSlots(){
    const wrap = $('#bk-slots');
    const svcId = $('#bk-service').value;
    const date = $('#bk-date').value;
    const preferredStaffId = $('#bk-staff') ? $('#bk-staff').value : 'any';
    selectedSlot = null; selectedStaffAssigned = null;
    if(!svcId || !date){ wrap.innerHTML = '<span class="slot-empty">Choose a service and date to see available times.</span>'; return; }
    if(closedDates.includes(date)){ wrap.innerHTML = '<span class="slot-empty">The salon is closed on this date. Please pick another day.</span>'; return; }
    if(date < todayStr()){ wrap.innerHTML = '<span class="slot-empty">Please choose a current or future date.</span>'; return; }
    const svc = services.find(s => s.id === svcId);
    if(!svc || staff.length===0){ wrap.innerHTML = '<span class="slot-empty">No stylists configured yet.</span>'; return; }

    const slots = [];
    for(let start = OPEN_MIN; start + svc.duration <= CLOSE_MIN; start += 30){
      const assigned = findAssignableStaff(date, start, svc.duration, preferredStaffId);
      if(assigned) slots.push({time: minToTime(start), staffId: assigned});
    }
    if(slots.length===0){ wrap.innerHTML = '<span class="slot-empty">No open times left for this date — try another day or stylist.</span>'; return; }
    wrap.innerHTML = slots.map(s => `<button type="button" class="slot-btn" data-time="${s.time}" data-staff="${s.staffId}">${formatTimeDisplay(s.time)}</button>`).join('');
    $$('.slot-btn').forEach(btn => btn.addEventListener('click', () => {
      $$('.slot-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedSlot = btn.dataset.time;
      selectedStaffAssigned = btn.dataset.staff;
    }));
  }

  // ---------- COUPON ----------
  function applyCoupon(){
    const code = $('#bk-coupon').value.trim().toUpperCase();
    const msg = $('#bk-coupon-msg');
    if(!code){ appliedDiscount = 0; msg.textContent=''; return; }
    const c = coupons.find(x => x.code.toUpperCase() === code);
    if(c){ appliedDiscount = c.percent; msg.textContent = `${c.percent}% discount applied.`; msg.className='coupon-msg ok'; }
    else { appliedDiscount = 0; msg.textContent = 'Invalid coupon code.'; msg.className='coupon-msg bad'; }
  }

  // ---------- BOOKING SUBMIT ----------
  async function submitBooking(){
    const svcId = $('#bk-service').value;
    const svc = services.find(s => s.id === svcId);
    const date = $('#bk-date').value;
    const name = $('#bk-name').value.trim();
    const phone = $('#bk-phone').value.trim();
    const notes = $('#bk-notes').value.trim();
    const payment = $('input[name="pay"]:checked').value;

    if(!svc){ toast('Please choose a service.'); return; }
    if(!date){ toast('Please choose a date.'); return; }
    if(!selectedSlot || !selectedStaffAssigned){ toast('Please choose an available time.'); return; }
    if(!name){ toast('Please enter your name.'); return; }
    if(!phone){ toast('Please enter your phone number.'); return; }

    const staffMember = staff.find(s => s.id === selectedStaffAssigned);
    const discount = appliedDiscount || 0;
    const finalPrice = Math.round(svc.price * (1 - discount/100));

    const payload = {
      service_id: svc.id, service_name: svc.name, category: svc.category,
      duration: svc.duration, price: svc.price, discount, final_price: finalPrice,
      staff_id: staffMember ? staffMember.id : null, staff_name: staffMember ? staffMember.name : 'Unassigned',
      date, time: selectedSlot,
      customer_name: name, phone, notes, payment,
      coupon_code: discount ? $('#bk-coupon').value.trim().toUpperCase() : '',
    };

    try{
      const row = await apiSend('POST', '/bookings', payload);
      const booking = mapBookingRow(row);
      bookings.push(booking);
      renderTicket(booking);
      renderSlots();
      $('#bk-name').value=''; $('#bk-phone').value=''; $('#bk-notes').value=''; $('#bk-coupon').value=''; $('#bk-coupon-msg').textContent='';
      appliedDiscount = 0;
      toast('Appointment confirmed!');
    }catch(e){ toast('Something went wrong saving your booking. Please try again.'); }
  }

  function renderTicket(b){
    const dateNice = new Date(b.date+'T00:00:00').toLocaleDateString('en-GB', {weekday:'long', day:'numeric', month:'long', year:'numeric'});
    $('#bk-result').innerHTML = `
      <div class="ticket">
        <div class="eyebrow">Appointment Confirmed</div>
        <h3>${escapeHtml(b.serviceName)}</h3>
        <div class="ticket-row"><span>Date</span><b>${dateNice}</b></div>
        <div class="ticket-row"><span>Time</span><b>${formatTimeDisplay(b.time)}</b></div>
        <div class="ticket-row"><span>Stylist</span><b>${escapeHtml(b.staffName)}</b></div>
        <div class="ticket-row"><span>Guest</span><b>${escapeHtml(b.customerName)}</b></div>
        <div class="ticket-row"><span>Phone</span><b>${escapeHtml(b.phone)}</b></div>
        <div class="ticket-row"><span>Payment</span><b>${escapeHtml(b.payment)}</b></div>
        ${b.discount ? `<div class="ticket-row strike"><span>Price</span><b>Rs. ${Number(b.price).toLocaleString()}</b></div>
        <div class="ticket-row"><span>After ${b.discount}% off (${escapeHtml(b.couponCode)})</span><b>Rs. ${Number(b.finalPrice).toLocaleString()}</b></div>`
        : `<div class="ticket-row"><span>Amount</span><b>Rs. ${Number(b.finalPrice).toLocaleString()}</b></div>`}
        <div class="ticket-code">Ref. ${b.id.slice(-6).toUpperCase()}</div>
      </div>
    `;
  }

  // ---------- MY BOOKINGS ----------
  function renderMyBookings(phone){
    const wrap = $('#mb-results');
    const mine = bookings.filter(b => b.phone.replace(/\s/g,'') === phone.replace(/\s/g,''));
    if(mine.length===0){ wrap.innerHTML = '<div class="empty-state">No bookings found for this phone number.</div>'; return; }
    const sorted = [...mine].sort((a,b) => (b.date+b.time).localeCompare(a.date+a.time));
    wrap.innerHTML = sorted.map(b => `
      <div class="my-booking-card" data-id="${b.id}">
        <div class="mb-top">
          <div>
            <h4>${escapeHtml(b.serviceName)}</h4>
            <div class="mb-meta">
              ${new Date(b.date+'T00:00:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})} · ${formatTimeDisplay(b.time)}<br>
              Stylist: ${escapeHtml(b.staffName)} · Rs. ${Number(b.finalPrice).toLocaleString()}
            </div>
          </div>
          <span class="badge ${b.status}">${b.status}</span>
        </div>
        ${b.status==='confirmed' ? `
        <div class="mb-actions">
          <button data-act="cancel">Cancel</button>
          <button data-act="reschedule">Reschedule</button>
        </div>
        <div class="reschedule-box" id="rb-${b.id}">
          <div class="field"><label>New Date</label><input type="date" class="rb-date" min="${todayStr()}"></div>
          <div class="field"><label>New Time</label><select class="rb-time"><option value="">Pick a date first</option></select></div>
          <button class="btn" data-act="confirm-reschedule" style="padding:11px 20px;">Confirm</button>
        </div>` : ''}
      </div>
    `).join('');

    wrap.querySelectorAll('.my-booking-card').forEach(card => {
      const id = card.dataset.id;
      const booking = bookings.find(b => b.id === id);
      const cancelBtn = card.querySelector('[data-act="cancel"]');
      const rescheduleBtn = card.querySelector('[data-act="reschedule"]');
      const box = card.querySelector('.reschedule-box');
      if(cancelBtn) cancelBtn.addEventListener('click', async () => {
        try{
          await apiSend('PUT', `/bookings/${booking.id}`, {status:'cancelled'});
          booking.status = 'cancelled';
          toast('Booking cancelled.');
          renderMyBookings(phone);
        }catch(e){ toast('Could not cancel booking. Try again.'); }
      });
      if(rescheduleBtn) rescheduleBtn.addEventListener('click', () => box.classList.toggle('open'));
      if(box){
        const dateInput = box.querySelector('.rb-date');
        const timeSelect = box.querySelector('.rb-time');
        dateInput.addEventListener('change', () => {
          const svc = services.find(s => s.id === booking.serviceId);
          const d = dateInput.value;
          if(!d || !svc){ timeSelect.innerHTML = '<option value="">Pick a date first</option>'; return; }
          if(closedDates.includes(d)){ timeSelect.innerHTML = '<option value="">Salon closed this date</option>'; return; }
          const opts = [];
          for(let start = OPEN_MIN; start + svc.duration <= CLOSE_MIN; start += 30){
            const assigned = findAssignableStaff(d, start, svc.duration, booking.staffId);
            if(assigned) opts.push(minToTime(start));
          }
          timeSelect.innerHTML = opts.length ? opts.map(t => `<option value="${t}">${formatTimeDisplay(t)}</option>`).join('') : '<option value="">No times available</option>';
        });
        box.querySelector('[data-act="confirm-reschedule"]').addEventListener('click', async () => {
          const d = dateInput.value, t = timeSelect.value;
          if(!d || !t){ toast('Choose a new date and time.'); return; }
          try{
            await apiSend('PUT', `/bookings/${booking.id}`, {date:d, time:t});
            booking.date = d; booking.time = t;
            toast('Booking rescheduled.');
            renderMyBookings(phone);
          }catch(e){ toast('Could not reschedule. Try again.'); }
        });
      }
    });
  }

  // ---------- REVIEWS ----------
  function renderReviewsSummary(){
    if(reviews.length===0){ $('#rs-score').textContent='—'; $('#rs-stars').textContent=''; $('#rs-count').textContent='No reviews yet — be the first!'; return; }
    const avg = reviews.reduce((s,r)=>s+r.rating,0)/reviews.length;
    $('#rs-score').textContent = avg.toFixed(1);
    $('#rs-stars').textContent = '★'.repeat(Math.round(avg)) + '☆'.repeat(5-Math.round(avg));
    $('#rs-count').textContent = `Based on ${reviews.length} review${reviews.length===1?'':'s'}`;
  }
  function renderReviewsList(){
    const wrap = $('#reviews-list');
    if(reviews.length===0){ wrap.innerHTML='<div class="empty-state">No reviews yet. Be the first to share your experience.</div>'; return; }
    const sorted = [...reviews].sort((a,b)=>b.date.localeCompare(a.date));
    wrap.innerHTML = sorted.map(r => `
      <div class="review-card">
        <div class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
        <p>"${escapeHtml(r.text)}"</p>
        <div class="author"><b>${escapeHtml(r.name)}</b> · ${new Date(r.date+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</div>
      </div>
    `).join('');
    observeReveal();
  }
  function wireStarPicker(){
    const stars = $$('#rv-star-picker span');
    function paint(val){ stars.forEach(s => s.classList.toggle('filled', Number(s.dataset.val) <= val)); }
    paint(selectedRating);
    stars.forEach(s => s.addEventListener('click', () => { selectedRating = Number(s.dataset.val); paint(selectedRating); }));
  }
  async function submitReview(){
    const name = $('#rv-name').value.trim(); const text = $('#rv-text').value.trim();
    if(!name){ toast('Please enter your name.'); return; }
    if(!text){ toast('Please write a short review.'); return; }
    reviews.push({id:'rv_'+Date.now(), name, rating:selectedRating, text, date:todayStr()});
    await saveReviews();
    renderReviewsSummary(); renderReviewsList();
    $('#rv-name').value=''; $('#rv-text').value=''; selectedRating=5; wireStarPicker();
    toast('Thank you for your review!');
  }
  // ---------- ABOUT US ----------
  function renderAboutUs(){
    const wrap = $('#stats-container');
    wrap.innerHTML = `
      <div class="stat-highlight"><div class="stat-num">${aboutUs.yearsOfExperience}+</div><div class="stat-label">Years of Experience</div></div>
      <div class="stat-highlight"><div class="stat-num">${(aboutUs.happyClients/1000).toFixed(0)}K+</div><div class="stat-label">Happy Clients</div></div>
      <div class="stat-highlight"><div class="stat-num">${(aboutUs.bridalMakeovers/1000).toFixed(0)}K+</div><div class="stat-label">Bridal Makeovers</div></div>
      <div class="stat-highlight"><div class="stat-num">${staff.length}</div><div class="stat-label">Expert Specialists</div></div>
    `;
    const whyWrap = $('#why-choose-container');
    whyWrap.innerHTML = aboutUs.whyChoose.map(w => `
      <div class="why-card">
        <div class="why-icon">${w.icon}</div>
        <h4>${escapeHtml(w.title)}</h4>
        <p>${escapeHtml(w.desc)}</p>
      </div>
    `).join('');
    renderTeam();
    observeReveal();
  }

  function renderTeam(){
    const wrap = $('#team-container');
    if(staff.length===0){ wrap.innerHTML='<div class="empty-state">No team members configured.</div>'; return; }
    wrap.innerHTML = staff.map(s => `
      <div class="team-card">
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" alt="${escapeHtml(s.name)}" class="team-photo">
        <div class="team-info">
          <h4>${escapeHtml(s.name)}</h4>
          <p>${escapeHtml(s.specialty)}</p>
        </div>
      </div>
    `).join('');
  }

  // ---------- GALLERY ----------
  function renderGalleryFilters(){
    const wrap = $('#gallery-filters');
    wrap.innerHTML = `<button class="gal-filter active" data-cat="All">All</button>` + GALLERY_CATEGORIES.map(c => `<button class="gal-filter" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join('');
    wrap.querySelectorAll('.gal-filter').forEach(btn => btn.addEventListener('click', () => {
      $$('.gal-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      galleryFilter = btn.dataset.cat;
      renderGallery();
    }));
  }

  function renderGallery(){
    const search = $('#gallery-search').value.toLowerCase();
    let items = gallery;
    if(galleryFilter !== 'All') items = items.filter(i => i.category === galleryFilter);
    if(search) items = items.filter(i => i.title.toLowerCase().includes(search) || i.description.toLowerCase().includes(search));
    
    const wrap = $('#gallery-grid');
    const noMsg = $('#no-gallery-msg');
    if(items.length===0){
      wrap.innerHTML='';
      noMsg.textContent='No images found. Try a different search or filter.';
      return;
    }
    noMsg.textContent='';
    wrap.innerHTML = items.map((item, idx) => `
      <div class="gallery-item" data-index="${idx}">
        <img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy">
        <div class="gallery-overlay"><span class="gallery-overlay-icon">🔍</span></div>
      </div>
    `).join('');
    wrap.querySelectorAll('.gallery-item').forEach((el, idx) => el.addEventListener('click', () => openLightbox(items, idx)));
    observeReveal();
  }

  window.openLightbox = function(items, idx){
    lightboxIndex = idx;
    const item = items[idx];
    $('#lightbox-image').src = item.image;
    $('#lightbox-title').textContent = item.title;
    $('#lightbox-desc').textContent = item.description;
    $('#lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
    window.lightboxItems = items;
  };
  window.closeLightbox = function(){
    $('#lightbox').classList.remove('active');
    document.body.style.overflow = 'auto';
  };
  window.lightboxNext = function(){
    if(!window.lightboxItems || window.lightboxItems.length===0) return;
    lightboxIndex = (lightboxIndex+1) % window.lightboxItems.length;
    const item = window.lightboxItems[lightboxIndex];
    $('#lightbox-image').src = item.image;
    $('#lightbox-title').textContent = item.title;
    $('#lightbox-desc').textContent = item.description;
  };
  window.lightboxPrev = function(){
    if(!window.lightboxItems || window.lightboxItems.length===0) return;
    lightboxIndex = (lightboxIndex-1+window.lightboxItems.length) % window.lightboxItems.length;
    const item = window.lightboxItems[lightboxIndex];
    $('#lightbox-image').src = item.image;
    $('#lightbox-title').textContent = item.title;
    $('#lightbox-desc').textContent = item.description;
  };

  function renderGalleryManage(){
    const wrap = $('#gallery-manage-list');
    if(gallery.length===0){ wrap.innerHTML='<div class="empty-state">No gallery images yet.</div>'; return; }
    wrap.innerHTML = gallery.map(g => `
      <div class="manage-item" style="align-items:flex-start;">
        <img src="${g.image}" alt="${escapeHtml(g.title)}" style="width:80px;height:80px;border-radius:8px;object-fit:cover;flex-shrink:0;">
        <div style="flex:1;">
          <div><b>${escapeHtml(g.title)}</b></div>
          <div class="meta" style="margin-top:6px;">${escapeHtml(g.category)} · ${escapeHtml(g.description)}</div>
        </div>
        <button class="btn danger" data-id="${g.id}" style="padding:8px 14px;font-size:11px;flex-shrink:0;">Remove</button>
      </div>
    `).join('');
    wrap.querySelectorAll('button[data-id]').forEach(btn => btn.addEventListener('click', async () => {
      gallery = gallery.filter(g => g.id !== btn.dataset.id);
      await saveGallery();
      renderGalleryManage();
      renderGallery();
      toast('Gallery image removed.');
    }));
  }

  function renderGalleryAddForm(){
    const wrap = $('#gallery-add-form');
    wrap.innerHTML = `
      <div class="inline-form" style="grid-template-columns:1fr 1fr 1fr 1fr auto;">
        <div class="field" style="margin:0;"><label>Image Title</label><input type="text" id="new-gal-title" placeholder="e.g. Bridal Makeup"></div>
        <div class="field" style="margin:0;"><label>Category</label>
          <select id="new-gal-cat">
            ${GALLERY_CATEGORIES.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('')}
          </select>
        </div>
        <div class="field" style="margin:0;"><label>Image URL</label><input type="text" id="new-gal-image" placeholder="https://images.unsplash.com/..."></div>
        <div class="field" style="margin:0;"><label>Description</label><input type="text" id="new-gal-desc" placeholder="Brief description"></div>
        <button class="btn" id="add-gal-btn">Add</button>
      </div>
    `;
    $('#add-gal-btn').addEventListener('click', async () => {
      const title = $('#new-gal-title').value.trim();
      const cat = $('#new-gal-cat').value;
      const image = $('#new-gal-image').value.trim();
      const desc = $('#new-gal-desc').value.trim();
      if(!title || !image || !desc){ toast('Fill in all gallery fields.'); return; }
      gallery.push({id:'g_'+Date.now(), title, category:cat, image, description:desc, featured:false});
      await saveGallery();
      $('#new-gal-title').value=''; $('#new-gal-image').value=''; $('#new-gal-desc').value='';
      renderGalleryManage();
      renderGallery();
      toast('Gallery image added.');
    });
  }

  function renderReviewsManage(){
    const wrap = $('#reviews-manage-list');
    if(reviews.length===0){ wrap.innerHTML='<div class="empty-state">No reviews yet.</div>'; return; }
    const sorted = [...reviews].sort((a,b)=>b.date.localeCompare(a.date));
    wrap.innerHTML = sorted.map(r => `
      <div class="manage-item">
        <div><div>${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)} — <b>${escapeHtml(r.name)}</b></div><div class="meta">${escapeHtml(r.text)}</div></div>
        <button class="btn danger" data-id="${r.id}" style="padding:8px 14px;font-size:11px;flex-shrink:0;">Remove</button>
      </div>
    `).join('');
    wrap.querySelectorAll('button[data-id]').forEach(btn => btn.addEventListener('click', async () => {
      reviews = reviews.filter(r => r.id !== btn.dataset.id);
      await saveReviews(); renderReviewsManage(); renderReviewsSummary(); renderReviewsList();
      toast('Review removed.');
    }));
  }

  // ---------- LOCATION ----------
  function isBusinessOpen(){
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hours24 = now.getHours();
    const min24 = now.getMinutes();
    const timeInMinutes = hours24 * 60 + min24;
    
    // Working days: Monday (1) to Saturday (6), Closed Sunday (0)
    if(dayOfWeek === 0) return false;
    
    // Parse opening/closing hours
    const openMatch = (businessSettings.openingHours || '').match(/(\d+):(\d+)/);
    const closeMatch = (businessSettings.closingHours || '').match(/(\d+):(\d+)/);
    if(!openMatch || !closeMatch) return true;
    
    const openMin = parseInt(openMatch[1])*60 + parseInt(openMatch[2]);
    const closeMin = parseInt(closeMatch[1])*60 + parseInt(closeMatch[2]);
    
    return timeInMinutes >= openMin && timeInMinutes < closeMin;
  }

  function renderLocationInfo(){
    $('#loc-business-name').textContent = businessSettings.businessName || 'Deliya Salon';
    $('#loc-address').textContent = businessSettings.address || '—';
    $('#loc-city').textContent = businessSettings.city || '—';
    $('#loc-province').textContent = businessSettings.province || '—';
    $('#loc-postal').textContent = businessSettings.postalCode || '—';
    $('#loc-phone').textContent = businessSettings.phone || '—';
    $('#loc-whatsapp').textContent = businessSettings.whatsapp || '—';
    $('#loc-email').textContent = businessSettings.email || '—';
    $('#loc-hours').textContent = `${businessSettings.openingHours} — ${businessSettings.closingHours}`;
    $('#loc-days').textContent = businessSettings.workingDays || '—';
    
    // Update status
    const isOpen = isBusinessOpen();
    const statusEl = $('#loc-status');
    statusEl.className = isOpen ? 'business-status open' : 'business-status closed';
    statusEl.innerHTML = `<span class="status-dot"></span> ${isOpen ? 'Open Now' : 'Currently Closed'}`;
    
    // Update buttons
    $('#call-btn').href = `tel:${businessSettings.phone.replace(/[^\d+]/g,'')}`;
    $('#whatsapp-btn').href = `https://wa.me/${businessSettings.whatsapp.replace(/[^\d+]/g,'')}?text=Hello%20Deliya,%20I%20would%20like%20to%20book%20an%20appointment.`;
    $('#whatsapp-float').href = `https://wa.me/${businessSettings.whatsapp.replace(/[^\d+]/g,'')}?text=Hello%20Deliya,%20I%20would%20like%20to%20book%20an%20appointment.`;
    $('#email-btn').href = `mailto:${businessSettings.email}?subject=Appointment%20Inquiry`;
    $('#directions-btn').href = businessSettings.googleMapsDirections;
    
    // Update map
    const mapContainer = $('#map-container');
    if(businessSettings.googleMapsEmbed){
      mapContainer.innerHTML = `<iframe src="${businessSettings.googleMapsEmbed}" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
    }
  }

  function renderBusinessSettingsAdmin(){
    const wrap = $('#business-settings-edit');
    if(!wrap) return;
    wrap.innerHTML = `
      <div class="card">
        <h3 style="margin-bottom:18px;">Business Information</h3>
        <div class="field"><label>Business Name</label><input type="text" id="bs-name" value="${escapeHtml(businessSettings.businessName)}"></div>
        <div class="field"><label>Full Address</label><input type="text" id="bs-address" value="${escapeHtml(businessSettings.address)}"></div>
        <div class="field"><label>City</label><input type="text" id="bs-city" value="${escapeHtml(businessSettings.city)}"></div>
        <div class="field"><label>Province</label><input type="text" id="bs-province" value="${escapeHtml(businessSettings.province)}"></div>
        <div class="field"><label>Postal Code</label><input type="text" id="bs-postal" value="${escapeHtml(businessSettings.postalCode)}"></div>
        
        <div style="border-top:1px dashed var(--line); margin:20px 0; padding-top:20px;">
          <h4 style="font-size:16px; margin-bottom:14px;">Contact Information</h4>
          <div class="field"><label>Phone Number</label><input type="tel" id="bs-phone" value="${escapeHtml(businessSettings.phone)}"></div>
          <div class="field"><label>WhatsApp Number</label><input type="tel" id="bs-whatsapp" value="${escapeHtml(businessSettings.whatsapp)}"></div>
          <div class="field"><label>Email Address</label><input type="email" id="bs-email" value="${escapeHtml(businessSettings.email)}"></div>
        </div>

        <div style="border-top:1px dashed var(--line); margin:20px 0; padding-top:20px;">
          <h4 style="font-size:16px; margin-bottom:14px;">Operating Hours</h4>
          <div class="field"><label>Opening Hours</label><input type="text" id="bs-open" placeholder="9:00 AM" value="${escapeHtml(businessSettings.openingHours)}"></div>
          <div class="field"><label>Closing Hours</label><input type="text" id="bs-close" placeholder="9:00 PM" value="${escapeHtml(businessSettings.closingHours)}"></div>
          <div class="field"><label>Working Days</label><input type="text" id="bs-days" placeholder="Monday — Saturday" value="${escapeHtml(businessSettings.workingDays)}"></div>
        </div>

        <div style="border-top:1px dashed var(--line); margin:20px 0; padding-top:20px;">
          <h4 style="font-size:16px; margin-bottom:14px;">Maps & Location</h4>
          <div class="field"><label>Google Maps Embed URL</label><textarea id="bs-maps-embed" rows="2" placeholder="https://www.google.com/maps/embed?pb=...">${escapeHtml(businessSettings.googleMapsEmbed)}</textarea></div>
          <div class="field"><label>Google Maps Directions URL</label><input type="text" id="bs-maps-dir" placeholder="https://www.google.com/maps/dir/?api=1&destination=..." value="${escapeHtml(businessSettings.googleMapsDirections)}"></div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div class="field"><label>Latitude</label><input type="text" id="bs-lat" placeholder="7.2" value="${escapeHtml(businessSettings.latitude)}"></div>
            <div class="field"><label>Longitude</label><input type="text" id="bs-lng" placeholder="80.62" value="${escapeHtml(businessSettings.longitude)}"></div>
          </div>
        </div>

        <button class="btn" id="save-bs-btn" style="width:100%; margin-top:20px;">Save All Changes</button>
      </div>
    `;

    $('#save-bs-btn').addEventListener('click', async () => {
      businessSettings.businessName = $('#bs-name').value.trim();
      businessSettings.address = $('#bs-address').value.trim();
      businessSettings.city = $('#bs-city').value.trim();
      businessSettings.province = $('#bs-province').value.trim();
      businessSettings.postalCode = $('#bs-postal').value.trim();
      businessSettings.phone = $('#bs-phone').value.trim();
      businessSettings.whatsapp = $('#bs-whatsapp').value.trim();
      businessSettings.email = $('#bs-email').value.trim();
      businessSettings.openingHours = $('#bs-open').value.trim();
      businessSettings.closingHours = $('#bs-close').value.trim();
      businessSettings.workingDays = $('#bs-days').value.trim();
      businessSettings.googleMapsEmbed = $('#bs-maps-embed').value.trim();
      businessSettings.googleMapsDirections = $('#bs-maps-dir').value.trim();
      businessSettings.latitude = $('#bs-lat').value.trim();
      businessSettings.longitude = $('#bs-lng').value.trim();
      await saveBusinessSettings();
      renderLocationInfo();
      toast('Business settings updated. Changes visible across the website.');
    });
  }

  // ---------- ADMIN ----------
  function renderAdminStats(){
    const today = todayStr();
    const active = bookings.filter(b => b.status !== 'cancelled');
    $('#stat-today').textContent = active.filter(b => b.date === today).length;
    $('#stat-upcoming').textContent = active.filter(b => b.date >= today).length;
    $('#stat-services').textContent = services.length;
    const revenue = bookings.filter(b => b.status === 'completed').reduce((s,b) => s + (b.finalPrice||b.price||0), 0);
    $('#stat-revenue').textContent = 'Rs. ' + revenue.toLocaleString();
  }
  function renderCategoryBars(){
    const wrap = $('#cat-bars');
    const active = bookings.filter(b => b.status !== 'cancelled');
    const max = Math.max(1, ...CATEGORIES.map(c => active.filter(b => b.category===c).length));
    wrap.innerHTML = `<div class="eyebrow" style="margin-bottom:14px;">Bookings by Category</div>` + CATEGORIES.map(c => {
      const count = active.filter(b => b.category===c).length;
      const pct = Math.round((count/max)*100);
      return `<div class="cat-bar-row"><span>${escapeHtml(c)}</span><div class="cat-bar-track"><div class="cat-bar-fill" style="width:${pct}%"></div></div><span>${count}</span></div>`;
    }).join('');
  }
  function renderBookingsTable(){
    const wrap = $('#bookings-table-wrap');
    const sorted = [...bookings].sort((a,b) => (a.date+a.time).localeCompare(b.date+b.time));
    if(sorted.length===0){ wrap.innerHTML = '<div class="empty-state">No bookings yet.</div>'; return; }
    wrap.innerHTML = `
      <table><thead><tr><th>Date</th><th>Time</th><th>Service</th><th>Stylist</th><th>Guest</th><th>Phone</th><th>Rs.</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>${sorted.map(b => `
        <tr>
          <td>${b.date}</td><td>${formatTimeDisplay(b.time)}</td><td>${escapeHtml(b.serviceName)}</td>
          <td>${escapeHtml(b.staffName||'—')}</td><td>${escapeHtml(b.customerName)}</td><td>${escapeHtml(b.phone)}</td>
          <td>${Number(b.finalPrice||b.price).toLocaleString()}</td>
          <td><span class="badge ${b.status}">${b.status}</span></td>
          <td><div class="row-actions">
            ${b.status==='confirmed' ? `<button data-act="complete" data-id="${b.id}">Complete</button><button data-act="cancel" data-id="${b.id}">Cancel</button>` : ''}
            <button data-act="delete" data-id="${b.id}">Delete</button>
          </div></td>
        </tr>`).join('')}</tbody></table>
    `;
    wrap.querySelectorAll('button[data-act]').forEach(btn => btn.addEventListener('click', async () => {
      const id = btn.dataset.id, act = btn.dataset.act;
      const b = bookings.find(x => x.id === id); if(!b) return;
      try{
        if(act==='complete'){ await apiSend('PUT', `/bookings/${id}`, {status:'completed'}); b.status='completed'; }
        if(act==='cancel'){ await apiSend('PUT', `/bookings/${id}`, {status:'cancelled'}); b.status='cancelled'; }
        if(act==='delete'){ await apiSend('DELETE', `/bookings/${id}`); bookings = bookings.filter(x => x.id !== id); }
        renderBookingsTable(); renderAdminStats(); renderCategoryBars();
        toast('Updated.');
      }catch(e){ toast('Something went wrong. Try again.'); }
    }));
  }
  function renderServicesManage(){
    const wrap = $('#services-manage-list');
    if(services.length===0){ wrap.innerHTML='<div class="empty-state">No services yet.</div>'; return; }
    wrap.innerHTML = services.map(s => `
      <div class="manage-item">
        <div><div>${escapeHtml(s.name)}</div><div class="meta">${escapeHtml(s.category)} · ${s.duration} min · Rs. ${Number(s.price).toLocaleString()}</div></div>
        <button class="btn danger" data-id="${s.id}" style="padding:8px 14px;font-size:11px;">Remove</button>
      </div>
    `).join('');
    wrap.querySelectorAll('button[data-id]').forEach(btn => btn.addEventListener('click', async () => {
      try{
        await apiSend('DELETE', `/services/${btn.dataset.id}`);
        services = services.filter(s => s.id !== btn.dataset.id);
        renderServicesManage(); renderServiceEditList(); renderServicesGrid(); renderServiceSelect(); renderAdminStats();
        toast('Service removed.');
      }catch(e){ toast('Could not remove service.'); }
    }));
  }

  function renderServiceEditList(){
    const wrap = $('#service-edit-list');
    if(services.length===0){ wrap.innerHTML='<div class="empty-state">No services to edit.</div>'; return; }
    wrap.innerHTML = services.map(s => `
      <div class="service-edit-card">
        <img src="${s.image || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect fill=%22%23f1e7d8%22 width=%22120%22 height=%22120%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%2212%22 fill=%22%23b09a9a%22%3ENo Image%3C/text%3E%3C/svg%3E'}" alt="${escapeHtml(s.name)}" class="thumb">
        <div class="service-edit-form">
          <div class="field"><label>Service Name</label><input type="text" class="svc-name" value="${escapeHtml(s.name)}" data-id="${s.id}"></div>
          <div class="field"><label>Description</label><textarea class="svc-desc" data-id="${s.id}" rows="2">${escapeHtml(s.description||'')}</textarea></div>
          <div class="field"><label>Duration (min)</label><input type="number" class="svc-dur" value="${s.duration}" data-id="${s.id}" style="width:80px;"></div>
          <div class="field"><label>Price (Rs.)</label><input type="number" class="svc-price" value="${s.price}" data-id="${s.id}" style="width:100px;"></div>
          <div class="field"><label>Image URL (paste Unsplash/Pexels link)</label><input type="text" class="svc-image" value="${s.image||''}" data-id="${s.id}" placeholder="https://images.unsplash.com/..."></div>
        </div>
        <div class="service-edit-actions">
          <button data-act="save" data-id="${s.id}">Save Changes</button>
          <button data-act="preview" data-id="${s.id}">Preview Image</button>
        </div>
      </div>
    `).join('');
    
    wrap.querySelectorAll('[data-act="save"]').forEach(btn => btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      const s = services.find(x => x.id === id);
      if(!s) return;
      const name = wrap.querySelector(`.svc-name[data-id="${id}"]`).value.trim();
      const description = wrap.querySelector(`.svc-desc[data-id="${id}"]`).value.trim();
      const duration = parseInt(wrap.querySelector(`.svc-dur[data-id="${id}"]`).value, 10);
      const price = parseInt(wrap.querySelector(`.svc-price[data-id="${id}"]`).value, 10);
      const image = wrap.querySelector(`.svc-image[data-id="${id}"]`).value.trim();
      try{
        const row = await apiSend('PUT', `/services/${id}`, {name, category:s.category, description, duration, price, image});
        Object.assign(s, mapServiceRow(row));
        renderServiceEditList(); renderServicesGrid(); renderServiceSelect(); renderAdminStats();
        toast('Service updated.');
      }catch(e){ toast('Could not update service.'); }
    }));

    wrap.querySelectorAll('[data-act="preview"]').forEach(btn => btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const url = wrap.querySelector(`.svc-image[data-id="${id}"]`).value.trim();
      if(!url){ toast('Please enter an image URL first.'); return; }
      const img = new Image();
      img.onload = () => toast('Image URL is valid and will load!');
      img.onerror = () => toast('Image URL is not accessible. Try another link.');
      img.src = url;
    }));
  }
  function renderStaffManage(){
    const wrap = $('#staff-manage-list');
    if(staff.length===0){ wrap.innerHTML='<div class="empty-state">No stylists yet.</div>'; return; }
    wrap.innerHTML = staff.map(s => `
      <div class="manage-item">
        <div><div>${escapeHtml(s.name)}</div><div class="meta">${escapeHtml(s.specialty)}</div></div>
        <button class="btn danger" data-id="${s.id}" style="padding:8px 14px;font-size:11px;">Remove</button>
      </div>
    `).join('');
    wrap.querySelectorAll('button[data-id]').forEach(btn => btn.addEventListener('click', async () => {
      try{
        await apiSend('DELETE', `/staff/${btn.dataset.id}`);
        staff = staff.filter(s => s.id !== btn.dataset.id);
        renderStaffManage(); renderStaffSelect();
        toast('Stylist removed.');
      }catch(e){ toast('Could not remove stylist.'); }
    }));
  }
  function renderClosedManage(){
    const wrap = $('#closed-manage-list');
    if(closedDates.length===0){ wrap.innerHTML='<div class="empty-state">No closed dates set.</div>'; return; }
    wrap.innerHTML = [...closedDates].sort().map(d => `
      <div class="manage-item"><div>${d}</div><button class="btn danger" data-date="${d}" style="padding:8px 14px;font-size:11px;">Remove</button></div>
    `).join('');
    wrap.querySelectorAll('button[data-date]').forEach(btn => btn.addEventListener('click', async () => {
      closedDates = closedDates.filter(d => d !== btn.dataset.date);
      await saveClosedDates(); renderClosedManage();
      toast('Closed date removed.');
    }));
  }
  function renderCouponsManage(){
    const wrap = $('#coupons-manage-list');
    if(coupons.length===0){ wrap.innerHTML='<div class="empty-state">No coupons yet.</div>'; return; }
    wrap.innerHTML = coupons.map(c => `
      <div class="manage-item"><div><div>${escapeHtml(c.code)}</div><div class="meta">${c.percent}% off</div></div>
      <button class="btn danger" data-code="${escapeHtml(c.code)}" style="padding:8px 14px;font-size:11px;">Remove</button></div>
    `).join('');
    wrap.querySelectorAll('button[data-code]').forEach(btn => btn.addEventListener('click', async () => {
      coupons = coupons.filter(c => c.code !== btn.dataset.code);
      await saveCoupons(); renderCouponsManage();
      toast('Coupon removed.');
    }));
  }

  // ---------- SCROLL REVEAL / SLIDESHOW ----------
  function observeReveal(){
    const items = document.querySelectorAll('.gallery-grid img, .service-card, .stat-card, .review-card');
    items.forEach((el,i) => { if(!el.classList.contains('reveal')){ el.classList.add('reveal'); el.style.transitionDelay=(Math.min(i,8)*0.06)+'s'; } });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('in-view'); io.unobserve(entry.target); } });
    }, {threshold:0.15});
    items.forEach(el => { if(!el.classList.contains('in-view')) io.observe(el); });
  }
  function startSlideshow(){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setInterval(() => {
      const imgs = document.querySelectorAll('.photo-slideshow img');
      if(imgs.length < 2) return;
      let activeIdx = 0;
      imgs.forEach((img,i) => { if(img.classList.contains('active')) activeIdx = i; });
      imgs[activeIdx].classList.remove('active');
      imgs[(activeIdx+1)%imgs.length].classList.add('active');
    }, 3800);
  }

  // ---------- EVENTS ----------
  function wireEvents(){
    $$('.tab').forEach(tab => tab.addEventListener('click', () => {
      $$('.tab').forEach(t => t.classList.remove('active'));
      $$('.tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      $('#tab-' + tab.dataset.tab).classList.add('active');
    }));

    $('#bk-service').addEventListener('change', renderSlots);
    $('#bk-staff').addEventListener('change', renderSlots);
    $('#bk-date').addEventListener('change', renderSlots);
    $('#bk-submit').addEventListener('click', submitBooking);
    $('#bk-apply-coupon').addEventListener('click', applyCoupon);

    $$('.payment-opt').forEach(opt => opt.addEventListener('click', () => {
      $$('.payment-opt').forEach(o => o.classList.remove('checked'));
      opt.classList.add('checked');
    }));

    $('#mb-find').addEventListener('click', () => {
      const phone = $('#mb-phone').value.trim();
      if(!phone){ toast('Enter a phone number.'); return; }
      renderMyBookings(phone);
    });

    $('#rv-submit').addEventListener('click', submitReview);

    $('#admin-login-btn').addEventListener('click', async () => {
      try{
        const result = await apiSend('POST', '/admin/login', {password: $('#admin-pass').value});
        if(result.ok){
          isAdmin = true;
          $('#admin-login').style.display='none';
          $('#admin-panel').style.display='block';
          renderAdminStats(); renderCategoryBars(); renderBookingsTable();
          renderServicesManage(); renderServiceEditList(); renderStaffManage(); renderClosedManage(); renderCouponsManage(); renderReviewsManage();
          renderBusinessSettingsAdmin();
        }
      }catch(e){ toast('Incorrect passcode.'); }
    });
    $('#admin-logout-btn').addEventListener('click', () => {
      isAdmin=false; $('#admin-pass').value='';
      $('#admin-login').style.display='block'; $('#admin-panel').style.display='none';
    });
    $$('.admin-tab').forEach(tab => tab.addEventListener('click', () => {
      $$('.admin-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      $$('.admin-section').forEach(s => s.style.display='none');
      $('#admin-' + tab.dataset.admin).style.display='block';
    }));

    // Sticky mobile CTA visibility
    window.addEventListener('scroll', () => {
      const bookTab = document.querySelector('.tab[data-tab="book"]');
      if(bookTab && window.scrollY > 400){
        $('#sticky-cta').classList.add('show');
      } else {
        $('#sticky-cta').classList.remove('show');
      }
    });

    $('#add-svc-btn').addEventListener('click', async () => {
      const name = $('#new-svc-name').value.trim();
      const category = $('#new-svc-cat').value;
      const dur = parseInt($('#new-svc-dur').value, 10);
      const price = parseInt($('#new-svc-price').value, 10);
      if(!name || !dur || !price){ toast('Fill in all service fields.'); return; }
      try{
        const row = await apiSend('POST', '/services', {name, category, duration:dur, price, description:'', image:''});
        services.push(mapServiceRow(row));
        $('#new-svc-name').value=''; $('#new-svc-dur').value=''; $('#new-svc-price').value='';
        renderServicesManage(); renderServiceEditList(); renderServicesGrid(); renderServiceSelect(); renderAdminStats();
        toast('Service added. Edit details and add image below.');
      }catch(e){ toast('Could not add service.'); }
    });

    $('#add-staff-btn').addEventListener('click', async () => {
      const name = $('#new-staff-name').value.trim();
      const role = $('#new-staff-role').value.trim();
      if(!name || !role){ toast('Fill in stylist name and specialty.'); return; }
      try{
        const row = await apiSend('POST', '/staff', {name, specialty:role});
        staff.push(mapStaffRow(row));
        $('#new-staff-name').value=''; $('#new-staff-role').value='';
        renderStaffManage(); renderStaffSelect();
        toast('Stylist added.');
      }catch(e){ toast('Could not add stylist.'); }
    });

    $('#add-closed-btn').addEventListener('click', async () => {
      const d = $('#new-closed-date').value;
      if(!d){ toast('Choose a date.'); return; }
      if(!closedDates.includes(d)) closedDates.push(d);
      await saveClosedDates(); $('#new-closed-date').value='';
      renderClosedManage();
      toast('Date marked as closed.');
    });

    $('#add-coupon-btn').addEventListener('click', async () => {
      const code = $('#new-coupon-code').value.trim().toUpperCase();
      const pct = parseInt($('#new-coupon-pct').value, 10);
      if(!code || !pct){ toast('Fill in coupon code and percent.'); return; }
      coupons = coupons.filter(c => c.code !== code);
      coupons.push({code, percent:pct});
      await saveCoupons();
      $('#new-coupon-code').value=''; $('#new-coupon-pct').value='';
      renderCouponsManage();
      toast('Coupon added.');
    });
  }

  async function init(){
    $('#bk-date').min = todayStr();
    $('#bk-date').value = todayStr();
    await loadAll();
    renderCategoryChips();
    renderServicesGrid();
    renderServiceSelect();
    renderStaffSelect();
    renderSvcCategorySelect();
    renderSlots();
    renderReviewsSummary();
    renderReviewsList();
    renderLocationInfo();
    wireStarPicker();
    wireEvents();
    observeReveal();
    startSlideshow();
  }

  init();
})();
