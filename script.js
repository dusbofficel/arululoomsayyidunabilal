// ======= SLIDER =======
const slides = document.querySelectorAll('.slide');
let sIndex = 0;
function showSlide(i){
  slides.forEach(s=>s.classList.remove('active'));
  if(slides[i]) slides[i].classList.add('active');
}
showSlide(0);
setInterval(()=>{ sIndex = (sIndex+1) % slides.length; showSlide(sIndex); }, 3500);

// ======= DATE: Gregorian + Hijri (Intl) + formatted =======
function updateDates(){
  const now = new Date();
  // Gregorian (Ur locale)
  const gOpts = { day:'numeric', month:'long', year:'numeric', weekday:'long' };
  let gStr;
  try { gStr = now.toLocaleDateString('ur-IN', gOpts); } catch(e) { gStr = now.toLocaleDateString(); }
  // Hijri via Intl (browser support modern)
  let hStr = '';
  try{
    hStr = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {day:'numeric', month:'long', year:'numeric'}).format(now);
  }catch(e){
    // fallback simple estimate
    const y = now.getFullYear()-579, m = now.getMonth()+1, d = now.getDate();
    hStr = `${d}/${m}/${y}ھ`;
  }
  const out = `${hStr} مطابق ${gStr}`;
  const el = document.getElementById('date-and-calendar');
  if(el) el.innerHTML = out;
}
updateDates();
setInterval(updateDates, 60*1000);

// ======= LANG TRANSLATION (except Bismillah) =======
const translations = {
  ur:{ home:'ہوم', intro:'تعارف', education:'تعلیمات', departments:'شعبہ جات', syllabus:'نصاب تعلیم', results:'نتائج', admissions:'جدید داخلے', gallery:'گیلری',
       oneLineTitle:'دارالعلوم سیدنا بلالؓ ایک نظر میں',
       maqsad:'قیام دارالعلوم کا مقصد', tasawwur:'ہمارا تصورِ تعلیم', tareeqa:'طریقۂ تعلیم', ahdaf:'تعلیمی اہداف' },
  hi:{ home:'होम', intro:'परिचय', education:'शिक्षा', departments:'विभाग', syllabus:'पाठ्यक्रम', results:'परिणाम', admissions:'दाखिला', gallery:'गैलरी',
       oneLineTitle:'दारुल उलूम सैय्यिदुना बिलाल एक नज़र में',
       maqsad:'क़ीयाम मकसद', tasawwur:'हमारी शिक्षा', tareeqa:'शिक्षण तरीका', ahdaf:'शैक्षणिक उद्देश्य' },
  en:{ home:'Home', intro:'Introduction', education:'Education', departments:'Departments', syllabus:'Syllabus', results:'Results', admissions:'Admissions', gallery:'Gallery',
       oneLineTitle:'Darul Uloom Sayyiduna Bilal — At a glance',
       maqsad:'Purpose of the Institution', tasawwur:'Our Education Vision', tareeqa:'Method of Teaching', ahdaf:'Educational Goals' }
};

const langSelect = document.getElementById('lang');
langSelect.addEventListener('change', ()=> applyLang(langSelect.value));
function applyLang(code){
  const t = translations[code] || translations.ur;
  // nav labels (elements with data-key)
  document.querySelectorAll('[data-key]').forEach(el=>{
    const key = el.getAttribute('data-key');
    if(key && t[key]) el.innerText = t[key];
  });
  // titles and boxes
  const one = document.getElementById('oneLineTitle'); if(one) one.innerText = t.oneLineTitle;
  document.querySelectorAll('.box').forEach((b, i)=>{
    const map = ['maqsad','tasawwur','tareeqa','ahdaf','nashatat','fikri','nisaab','otherActs','plans','admissionProcedure','rules','support'];
    if(t[map[i]]) b.innerText = t[map[i]];
  });
}
applyLang('ur'); // default

// ======= HAMBURGER (mobile) =======
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger && hamburger.addEventListener('click', ()=>{
  navMenu.classList.toggle('show');
});

// open/close submenus accessible
document.querySelectorAll('.drop-toggle').forEach(btn=>{
  btn.addEventListener('click', ()=> {
    const parent = btn.parentElement;
    const submenu = parent.querySelector('.submenu');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    if(submenu) submenu.style.display = expanded ? 'none' : 'flex';
  });
});

// ======= BOX CLICK: already link anchors to separate pages (no JS needed) =======

// ======= RESULTS modal flow (year → madrasa/school → open pdf) =======
const resultYearLinks = document.querySelectorAll('.result-year');
const resultsModal = document.getElementById('resultsModal');
const resultsYearSpan = document.getElementById('resultsYear');
const resultsLinks = document.getElementById('resultsLinks');
const closeResults = document.getElementById('closeResults');

resultYearLinks.forEach(link=>{
  link.addEventListener('click', (e)=>{
    e.preventDefault();
    const yr = link.getAttribute('data-year');
    openResultsModal(yr);
  });
});

function openResultsModal(year){
  resultsYearSpan.innerText = year;
  resultsLinks.innerHTML = `
    <p>منتخب کریں:</p>
    <button class="pdf-btn" data-file="assets/results/${year}-madrasa.pdf">مدرسہ — ششماہی/سالانہ</button>
    <button class="pdf-btn" data-file="assets/results/${year}-school.pdf">اسکول — ششماہی/سالانہ</button>
  `;
  // show modal
  if(resultsModal){ resultsModal.style.display = 'flex'; resultsModal.setAttribute('aria-hidden','false'); }
  // attach clicks
  document.querySelectorAll('.pdf-btn').forEach(b=>{
    b.addEventListener('click', ()=> {
      const file = b.getAttribute('data-file');
      window.open(file, '_blank');
    });
  });
}
closeResults && closeResults.addEventListener('click', ()=> {
  resultsModal.style.display = 'none';
  resultsModal.setAttribute('aria-hidden','true');
});

// ======= Search (site) =======
document.getElementById('searchBtn')?.addEventListener('click', ()=>{
  const q = document.getElementById('searchBox')?.value || '';
  if(!q) return alert('براہِ کرم تلاش کے لیے لفظ درج کریں');
  const nodes = document.querySelectorAll('.detail, .box, .stat-card');
  let found = false;
  nodes.forEach(n=>{
    if(n.innerText.toLowerCase().includes(q.toLowerCase())){ n.scrollIntoView({behavior:'smooth'}); found = true; }
  });
  if(!found) alert('نتیجہ موصول نہیں ہوا');
});

// small accessibility: close modal on outside click
resultsModal && resultsModal.addEventListener('click', (e)=>{
  if(e.target === resultsModal) { resultsModal.style.display='none'; resultsModal.setAttribute('aria-hidden','true'); }
});
