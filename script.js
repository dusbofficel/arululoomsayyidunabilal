// ======= SLIDER =======
const slides = document.querySelectorAll('.slide');
let sIndex = 0;
function showSlide(i){
  slides.forEach(s=>s.classList.remove('active'));
  if(slides[i]) slides[i].classList.add('active');
}
showSlide(0);
setInterval(()=>{ sIndex = (sIndex+1) % slides.length; showSlide(sIndex); }, 3500);

// ======= DATE: Gregorian + Hijri + Day (day last) =======
function updateDates(){
  const now = new Date();
  // Gregorian (Ur locale)
  let gStr='';
  try{
    gStr = now.toLocaleDateString('ur-IN', { day:'numeric', month:'long', year:'numeric' });
  }catch(e){
    gStr = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;
  }
  // Hijri via Intl (browser)
  let hStr = '';
  try{
    hStr = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {day:'numeric', month:'long', year:'numeric'}).format(now);
  }catch(e){
    const y = now.getFullYear()-579, m = now.getMonth()+1, d = now.getDate();
    hStr = `${d}/${m}/${y}ھ`;
  }
  // Day name Urdu
  const days = ['اتوار','پیر','منگل','بدھ','جمعرات','جمعہ','ہفتہ'];
  const dayName = days[now.getDay()];
  const out = `${gStr} — ${hStr} — ${dayName}`;
  const el = document.getElementById('date-and-calendar');
  if(el) el.innerText = out;
}
updateDates();
setInterval(updateDates, 60*1000);

// ======= NAV TRANSLATION & simple mapping (keep bismillah fixed) =======
const translations = {
  ur:{ home:'ہوم', education:'تعلیمات', departments:'شعبہ جات', syllabus:'نصاب تعلیم', results:'نتائج', admissions:'جدید داخلے', gallery:'گیلری' },
  hi:{ home:'होम', education:'शिक्षा', departments:'विभाग', syllabus:'पाठ्यक्रम', results:'परिणाम', admissions:'दाखिला', gallery:'गैलरी' },
  en:{ home:'Home', education:'Education', departments:'Departments', syllabus:'Syllabus', results:'Results', admissions:'Admissions', gallery:'Gallery' }
};
const langSelect = document.getElementById('lang');
langSelect.addEventListener('change', ()=> applyLang(langSelect.value));
function applyLang(code){
  const t = translations[code] || translations['ur'];
  document.querySelectorAll('[data-key]').forEach(el=>{
    const key = el.getAttribute('data-key');
    if(key && t[key]) el.innerText = t[key];
  });
}
// default
applyLang('ur');

// ======= HAMBURGER (mobile) & submenu toggles =======
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger && hamburger.addEventListener('click', ()=>{
  navMenu.classList.toggle('show');
});

// for accessibility: click toggles on small screens
document.querySelectorAll('.drop-toggle').forEach(btn=>{
  btn.addEventListener('click', ()=> {
    const parent = btn.parentElement;
    const submenu = parent.querySelector('.submenu');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    if(submenu) submenu.style.display = expanded ? 'none' : 'flex';
  });
});

// ======= SITE SEARCH (simple) =======
document.getElementById('searchBtn')?.addEventListener('click', ()=>{
  const q = document.getElementById('searchBox')?.value || '';
  if(!q) return alert('براہِ کرم تلاش کے لیے لفظ درج کریں');
  const nodes = document.querySelectorAll('.box, .stat-small, .nav-link');
  let found = false;
  nodes.forEach(n=>{
    if(n.innerText.toLowerCase().includes(q.toLowerCase())){ n.scrollIntoView({behavior:'smooth'}); found = true; }
  });
  if(!found) alert('نتیجہ موصول نہیں ہوا');
});

// ======= Results modal flow (unchanged) =======
const resultYearLinks = document.querySelectorAll('.result-year');
const resultsModal = document.getElementById('resultsModal');
const resultsYearSpan = document.getElementById('resultsYear');
const resultsLinks = document.getElementById('resultsLinks');
const closeResults = document.getElementById('closeResults');

resultYearLinks.forEach(link=>{
  link.addEventListener('click', (e)=>{
    e.preventDefault();
    const yr = link.getAttribute('data-year');
    if(yr) openResultsModal(yr);
  });
});
function openResultsModal(year){
  resultsYearSpan.innerText = year;
  resultsLinks.innerHTML = `
    <p>منتخب کریں:</p>
    <button class="pdf-btn" data-file="assets/results/${year}-madrasa.pdf">مدرسہ — ششماہی/سالانہ</button>
    <button class="pdf-btn" data-file="assets/results/${year}-school.pdf">اسکول — ششماہی/سالانہ</button>
  `;
  if(resultsModal) { resultsModal.style.display = 'flex'; resultsModal.setAttribute('aria-hidden','false'); }
  document.querySelectorAll('.pdf-btn').forEach(b=>{
    b.addEventListener('click', ()=> window.open(b.getAttribute('data-file'), '_blank'));
  });
}
closeResults && closeResults.addEventListener('click', ()=> { resultsModal.style.display = 'none'; resultsModal.setAttribute('aria-hidden','true'); });

// close modal on outside click
resultsModal && resultsModal.addEventListener('click', (e)=> { if(e.target === resultsModal){ resultsModal.style.display='none'; resultsModal.setAttribute('aria-hidden','true'); }});
