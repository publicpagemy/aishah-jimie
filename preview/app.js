// CONFIG lives in config.js
const CONFIG = window.INVITE_CONFIG;

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ═══════════════ INTRO ═══════════════
const intro = $('#intro'), env = $('#letter'), cta = $('#intro .cta'), skip = $('#skipBtn');
const bgm = $('#bgm'), musicBtn = $('#musicBtn'), phone = $('#phone');
let introDone = false;

const bell = $('#bell');
let bellRang = false;                                  // did the postman's bell actually sound?
function ringBell(vol = 0.55) {
  try { bell.currentTime = 0; } catch {}
  bell.volume = vol;
  return bell.play().then(() => { bellRang = true; }).catch(() => {});   // blocked before a tap on iOS
}
function runIntro() {
  setTimeout(() => { env.classList.add('drop'); ringBell(); }, 900);   // letter flies in, kring-kring
  setTimeout(() => skip.classList.add('show'), 1800);
  setTimeout(() => cta.classList.add('show'), 4700);   // lands, then the invitation line appears
}
function openLetter(withMusic) {
  if (introDone) return; introDone = true;
  // iOS blocks audio before the first tap, so if the bell never sounded, ring it now on the tap
  if (!bellRang) { ringBell(0.45); setTimeout(() => { if (withMusic) playMusic(); }, 620); }
  else if (withMusic) playMusic();
  env.classList.add('open');
  setTimeout(() => $('#flash').classList.add('go'), 250);
  setTimeout(() => { document.body.classList.add('open'); phone.classList.add('show'); walk(); }, 450);
  setTimeout(() => intro.classList.add('gone'), 600);
  setTimeout(() => intro.remove(), 1500);
}
$('#openBtn').addEventListener('click', () => openLetter(true));
skip.addEventListener('click', () => openLetter(true));
runIntro();

// ═══════════════ MUSIC ═══════════════
function playMusic() {
  bgm.volume = 0; bgm.play().then(() => {
    musicBtn.classList.add('playing');
    let v = 0; const f = setInterval(() => { v = Math.min(1, v + .05); bgm.volume = v * .7; if (v >= 1) clearInterval(f); }, 80);
  }).catch(() => {});
}
musicBtn.addEventListener('click', () => {
  if (bgm.paused) playMusic(); else { bgm.pause(); musicBtn.classList.remove('playing'); }
});
// bgm loops forever; the bell is one-shot
bgm.loop = true;

// ═══════════════ TABS ═══════════════
const pages = $$('.page'), tabs = $$('#tabbar button');
let switching = false, current = 'salam';
const SUB_OF = { aturcara: 'salam', lokasi: 'salam', hubungi: 'salam', ucapan: 'rsvp' };
function go(id, { scroll = true } = {}) {
  id = SUB_OF[id] || id;
  if (id === current || switching) return;
  switching = true;
  const from = $('#' + current), to = $('#' + id);
  tabs.forEach(b => b.classList.toggle('active', b.dataset.page === id));
  walk();                                  // footprints start walking immediately
  from.classList.add('leaving');
  setTimeout(() => {                       // then the old page is gone and the new one fades in under the trail
    from.classList.remove('active', 'leaving');
    to.classList.add('active');
    current = id;
    if (scroll) window.scrollTo({ top: 0, behavior: 'auto' });
    if (id === 'rsvp') ensureWishes();
    switching = false;
  }, 470);
}
tabs.forEach(b => b.addEventListener('click', () => go(b.dataset.page)));
$$('[data-go]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); if (a.id === 'quickCal') $('#gcal').click(); else go(a.dataset.go); }));

// ═══════════════ PAGE TURN — the card turns like a page of the letter ═══════════════
const turnEl = $('#pageturn'), sparkEl = $('#pageturn .sparks');
function walk() {                                   // (kept name: called on every tab change)
  turnEl.classList.remove('go');
  sparkEl.innerHTML = '';
  const H = turnEl.clientHeight || window.innerHeight;
  for (let i = 0; i < 8; i++) {                     // little hearts lifting off the turning edge
    const s = document.createElement('div');
    s.className = 'sp';
    s.style.left = (30 + Math.random() * 48) + '%';
    s.style.top = (H * (0.28 + Math.random() * 0.44)) + 'px';
    s.style.setProperty('--dx', (Math.random() * 46 - 14).toFixed(0) + 'px');
    s.style.setProperty('--rot', (Math.random() * 60 - 30).toFixed(0) + 'deg');
    s.style.animationDelay = (60 + i * 60) + 'ms';
    sparkEl.appendChild(s);
  }
  void turnEl.offsetWidth;                          // force a reflow so the animation restarts every time
  turnEl.classList.add('go');
}

// ═══════════════ COUNTDOWN + CALENDAR ═══════════════
const startMs = new Date(CONFIG.event.start).getTime();
const pad = n => String(n).padStart(2, '0');
function tick() {
  let d = Math.max(0, startMs - Date.now());
  const days = Math.floor(d / 864e5); d -= days * 864e5;
  const h = Math.floor(d / 36e5); d -= h * 36e5;
  const m = Math.floor(d / 6e4); d -= m * 6e4;
  const s = Math.floor(d / 1e3);
  const set = (u, v) => { const el = $(`#countdown [data-u="${u}"]`); if (el) el.textContent = pad(v); };
  set('d', days); set('h', h); set('m', m); set('s', s);
}
tick(); setInterval(tick, 1000);

const fmtUTC = iso => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const e = CONFIG.event;
$('#gcal').href = 'https://calendar.google.com/calendar/render?' + new URLSearchParams({
  action: 'TEMPLATE', text: e.title, dates: `${fmtUTC(e.start)}/${fmtUTC(e.end)}`, details: e.details, location: e.venue,
});
// Apple/other calendars: hosted assets/event.ics (data: URLs are unreliable on iOS Safari)

// ═══════════════ STATIC RENDERS ═══════════════
$('#timeline').innerHTML = CONFIG.timeline.map(i =>
  `<li><div class="t">${esc(i.t)}</div><div class="dot"></div><div class="d">${esc(i.ms)}<i>${esc(i.en)}</i></div></li>`).join('');

$('#contacts').innerHTML = CONFIG.contacts.map(c => {
  const intl = '6' + c.phone.replace(/\D/g, '');
  return `<div class="contact"><div><div class="n">${esc(c.name)}</div><div class="p">${esc(c.phone)}</div></div>
  <div class="acts">
    <a href="tel:+${intl}" aria-label="Telefon ${esc(c.name)}"><svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg></a>
    <a href="https://wa.me/${intl}" target="_blank" rel="noopener" aria-label="WhatsApp ${esc(c.name)}"><svg viewBox="0 0 24 24"><path d="M4 20l1.3-3.8A8 8 0 1112 20a8 8 0 01-3.9-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-2.3-2.3l.8-1-1-2z"/></svg></a>
  </div></div>`;
}).join('');

const g = CONFIG.gift, gb = $('#giftBox');
if (g.accountNo || g.qrImage || g.address) {
  gb.innerHTML = `
    ${g.accountNo ? `<div class="card"><h3>${esc(g.bank)}</h3><div class="acct" id="acct">${esc(g.accountNo)}</div><p style="font-size:14px">${esc(g.accountName)}</p>
      <button class="copy" style="margin-top:10px" id="copyAcct">Salin · Copy</button></div>` : ''}
    ${g.qrImage ? `<div class="card"><h3>DuitNow QR</h3><img class="qr" src="${esc(g.qrImage)}" alt="QR"></div>` : ''}
    ${g.address ? `<div class="card"><h3>Hadiah · Gift Delivery</h3><p style="font-size:14.5px;white-space:pre-line">${esc(g.address)}</p></div>` : ''}`;
  $('#copyAcct')?.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(g.accountNo.replace(/\s/g, '')); $('#copyAcct').textContent = 'Disalin · Copied'; } catch {}
  });
} else {
  gb.innerHTML = `<div class="card"><p class="empty">Butiran akan dikemaskini · Details coming soon</p></div>`;
}

const paxSel = $('#pax');
paxSel.innerHTML = Array.from({ length: CONFIG.maxPax }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('');
$$('input[name=attending]').forEach(r => r.addEventListener('change', () => {
  const no = $('input[name=attending]:checked').value === 'no';
  paxSel.disabled = no;
}));

// ═══════════════ FIREBASE (Firestore) ═══════════════
let db = null, fs = null, wishesStarted = false;
const wishesEl = $('#wishes');
const pendingIds = new Set();

async function initFirebase() {
  try {
    const [{ initializeApp }, m] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js'),
    ]);
    fs = m; db = m.getFirestore(initializeApp(CONFIG.firebase));
  } catch (err) { console.warn('Firebase unavailable, running in local mode', err); }
}
const ready = initFirebase();

function fmtWhen(d) {
  if (!d) return 'baru sahaja';
  const diff = (Date.now() - d.getTime()) / 6e4;
  if (diff < 1) return 'baru sahaja';
  if (diff < 60) return `${Math.floor(diff)} min lalu`;
  if (diff < 1440) return `${Math.floor(diff / 60)} jam lalu`;
  return d.toLocaleDateString('ms-MY', { day: 'numeric', month: 'short' });
}
function wishNode(w, pending = false) {
  const div = document.createElement('div');
  div.className = 'wish' + (pending ? ' pending' : '');
  div.dataset.id = w.id;
  div.innerHTML = `<span class="when">${esc(fmtWhen(w.createdAt))}</span><div class="who">${esc(w.name)}</div><div class="msg">${esc(w.message)}</div>
    <svg class="quill" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 4c-6 0-11 5-13 12l-3 4 4-3c7-2 12-7 12-13z"/><path d="M8 16l6-6"/></svg>`;
  return div;
}
function renderWishes(list) {
  wishesEl.innerHTML = '';
  if (!list.length) { wishesEl.innerHTML = '<div class="empty">No wish found? Be the first one to give blessing to this lovely couple!</div>'; return; }
  list.forEach(w => wishesEl.appendChild(wishNode(w, pendingIds.has(w.id))));
}
async function ensureWishes() {
  if (wishesStarted) return; wishesStarted = true;
  await ready;
  if (!db) return;
  const q = fs.query(fs.collection(db, 'ucapan'), fs.orderBy('createdAt', 'desc'), fs.limit(200));
  fs.onSnapshot(q, snap => {
    const list = snap.docs.map(d => { const x = d.data(); return { id: d.id, name: x.name, message: x.message, createdAt: x.createdAt?.toDate?.() || null }; });
    renderWishes(list);
  }, err => console.warn(err));
}

$('#wishForm').addEventListener('submit', async ev => {
  ev.preventDefault();
  const f = ev.target, name = f.name.value.trim(), message = f.message.value.trim(), msg = $('#wishMsg');
  if (!name || !message) { msg.textContent = 'Sila isi nama dan ucapan · Please fill in both fields.'; return; }
  const btn = f.querySelector('button'); btn.disabled = true; msg.textContent = '';
  // Optimistic: show it instantly, Firestore snapshot replaces it when confirmed.
  const tempId = 'tmp-' + Date.now();
  $('.empty', wishesEl)?.remove();
  wishesEl.prepend(wishNode({ id: tempId, name, message, createdAt: new Date() }, true));
  f.reset();
  try {
    await ready;
    if (db) {
      const ref = fs.doc(fs.collection(db, 'ucapan'));
      pendingIds.add(ref.id);
      await fs.setDoc(ref, { name, message, createdAt: fs.serverTimestamp() });
      pendingIds.delete(ref.id);
      $(`.wish[data-id="${ref.id}"]`)?.classList.remove('pending');
    } else {
      $(`.wish[data-id="${tempId}"]`)?.classList.remove('pending');
    }
    $(`.wish[data-id="${tempId}"]`)?.remove();
    if (!db) wishesEl.prepend(wishNode({ id: tempId, name, message, createdAt: new Date() }));
    msg.textContent = 'Terima kasih atas ucapan anda · Thank you for your wish.';
  } catch (err) {
    console.error(err);
    $(`.wish[data-id="${tempId}"]`)?.remove();
    msg.textContent = 'Maaf, gagal menghantar. Sila cuba lagi · Failed to send, please try again.';
    f.name.value = name; f.message.value = message;
  } finally { btn.disabled = false; }
});

$('#rsvpForm').addEventListener('submit', async ev => {
  ev.preventDefault();
  const f = ev.target, msg = $('#rsvpMsg');
  const attending = f.attending.value, name = f.name.value.trim(), phone = f.phone.value.trim();
  if (!name || !phone) { msg.textContent = 'Sila isi nama dan nombor telefon · Please fill in your name and phone number.'; return; }
  const data = { name, phone, attending, pax: attending === 'yes' ? Number(f.pax.value) : 0 };
  const btn = f.querySelector('button[type=submit]'); btn.disabled = true; msg.textContent = 'Menghantar…';
  try {
    await ready;
    if (db) await fs.addDoc(fs.collection(db, 'rsvp'), { ...data, createdAt: fs.serverTimestamp() });
    msg.textContent = attending === 'yes'
      ? 'Terima kasih! Kehadiran anda telah direkodkan · Thank you, your attendance is recorded.'
      : 'Terima kasih atas maklum balas anda · Thank you for letting us know.';
    f.reset(); paxSel.disabled = false;
  } catch (err) {
    console.error(err); msg.textContent = 'Maaf, gagal menghantar. Sila cuba lagi · Failed to send, please try again.';
  } finally { btn.disabled = false; }
});
