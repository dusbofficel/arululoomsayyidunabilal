// ---------------- Language & memory ----------------
function setLanguage(lang) {
  localStorage.setItem('selectedLang', lang);
  document.querySelectorAll('[data-lang]').forEach(el => {
    const txt = el.getAttribute(`data-${lang}`);
    if (txt) el.innerText = txt;
  });
  document.documentElement.lang = lang;
  document.body.dir = (lang === 'en') ? 'ltr' : 'rtl';
}
window.addEventListener('load', () => {
  const saved = localStorage.getItem('selectedLang') || 'ur';
  setLanguage(saved);
});

// -------------- top date (Gregorian + Hijri approx) --------------
function pad(n){return n<10?'0'+n:n;}
function getHijri(date){
  // Simple arithmetic (Umm al-Qura approximations not used) - good for display
  const jd = Math.floor((date / 86400000) - (date.getTimezoneOffset()/1440) + 2440587.5);
  // Use a known conversion shortcut (approx). For display only.
  // We'll use a small JS conversion (Tabular Islamic)
  const day = date.getUTCDate(), month = date.getUTCMonth()+1, year = date.getUTCFullYear();
  // Convert Gregorian to Julian day number (approx)
  const a = Math.floor((14-month)/12);
  const y = year+4800 - a;
  const m = month + 12*a -3;
  let JDN = day + Math.floor((153*m+2)/5) + 365*y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) - 32045;
  let islamic = JDN - 1948439 + 10632;
  let n = Math.floor((islamic -1)/10631);
  islamic = islamic - 10631*n + 354;
  let j = (Math.floor((10985 - islamic)/5316)) * (Math.floor((50*islamic)/17719)) + (Math.floor(islamic/5670)) * (Math.floor((43*islamic)/15238));
  islamic = islamic - (Math.floor((30 - j)/15)) * (Math.floor((17719*j)/50)) - (Math.floor(j/16)) * (Math.floor((15238*j)/43)) + 29;
  const monthIslamic = Math.floor((24*islamic)/709);
  const dayIslamic = islamic - Math.floor((709*monthIslamic)/24);
  const yearIslamic = 30*n + j - 30;
  return { day: dayIslamic, month: monthIslamic, year: yearIslamic };
}

function updateDates(){
  const d = new Date();
  const options = { weekday: 'long', year:'numeric', month:'long', day:'numeric' };
  const greg = d.toLocaleDateString(undefined, options);
  document.getElementById('gregorian-date').innerText = greg;
  const wk = d.toLocaleDateString(undefined, { weekday: 'long' });
  document.getElementById('weekday').innerText = wk;
  const h = getHijri(d);
  document.getElementById('hijri-date').innerText = `قمری: ${h.day}/${h.month}/${h.year} هـ`;
}
updateDates();
setInterval(updateDates, 60000);

// ---------------- Slider ----------------
let slideIndex = 0;
const slides = [
  "assets/slider1.jpg",
  "assets/slider2.jpg",
  "assets/slider3.jpg",
  "assets/slider4.jpg",
  "assets/slider5.jpg"
];
const captions = [
  "مدرسہ کی جامع عمارت",
  "طلبہ کا درس",
  "اساتذہ کی مجلس",
  "دعائیہ اجتماع",
  "کلاس کا منظر"
];
function showSlide() {
  const img = document.getElementById('slide-image');
  const cap = document.getElementById('slide-caption');
  if(!img) return;
  img.src = slides[slideIndex % slides.length];
  cap.innerText = captions[slideIndex % captions.length];
  slideIndex++;
}
setInterval(showSlide, 3000);
showSlide();

// ---------------- Gallery (show more) ----------------
function openLightbox(src){
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.add('active');
}
function closeLightbox(){
  document.getElementById('lightbox').classList.remove('active');
}
function toggleGallery(){
  const hidden = document.querySelectorAll('.gallery-item.hidden');
  const btn = document.getElementById('viewMoreBtn');
  const expanded = btn.classList.toggle('expanded');
  hidden.forEach(el => el.style.display = expanded ? 'block' : 'none');
  btn.textContent = expanded ? 'کم دیکھائیں ↑' : 'مزید دیکھیں ↓';
}

// ---------------- Mobile menu and dropdowns ----------------
function toggleMenu(){
  const ul = document.querySelector('#main-menu ul');
  ul.classList.toggle('active');
}
document.addEventListener('DOMContentLoaded', () => {
  // mobile dropdown toggles
  document.querySelectorAll('.dropdown > .dropbtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = btn.parentElement;
        parent.classList.toggle('open');
        document.querySelectorAll('.dropdown').forEach(d => { if(d !== parent) d.classList.remove('open'); });
      }
    });
  });
});

// ---------------- Search (simple client-side find) ----------------
function doSearch(){
  const q = document.getElementById('site-search').value.trim().toLowerCase();
  if(!q) { alert('تلاش کرنے کے لئے کچھ لکھیں'); return; }
  // Basic behaviour: search headings and open relevant section
  const map = [
    {k:'تعارف', sel:'#introduction'},
    {k:'نصاب', sel:'#features'},
    {k:'گیلری', sel:'#gallery'},
    {k:'نتائج', sel:'pages/results2023.html'}
  ];
  for(let m of map){
    if(m.k.includes(q) || q.includes(m.k)) { window.location.href = m.sel; return; }
  }
  alert('نتائج نہیں ملے — مکمل تلاش کے لیے ویب سائٹ کا سرچ فیچر آئندہ شامل کیا جائے گا۔');
}
