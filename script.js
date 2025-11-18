// ======= SLIDER =======
const slides = document.querySelectorAll('.slide');
let sIndex = 0;
function Slide(i){
  slides.forEach(s=>s.classList.remove('active'));
  if(slides[i]) slides[i].classList.add('active');
}
Slide(0);
setInterval(()=>{ sIndex = (sIndex+1) % slides.length; Slide(sIndex); }, 3800);

// ======= DATE: Gregorian + Hijri + Day (day last) =======
function updateDates(){
  const now = new Date();
  let gStr='';
  try{
    gStr = now.toLocaleDateString('ur-IN', { day:'numeric', month:'long', year:'numeric' });
  }catch(e){
    gStr = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;
  }
  let hStr = '';
  try{
    hStr = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {day:'numeric', month:'long', year:'numeric'}).format(now);
  }catch(e){
    const y = now.getFullYear()-579, m = now.getMonth()+1, d = now.getDate();
    hStr = `${d}/${m}/${y}ھ`;
  }
  const days = ['اتوار','پیر','منگل','بدھ','جمعرات','جمعہ','ہفتہ'];
  const dayName = days[now.getDay()];
  const out = `${gStr} — ${hStr} — ${dayName}`;
  const el = document.getElementById('date-and-calendar');
  if(el) el.innerText = out;
}
updateDates();
setInterval(updateDates, 60*1000);

// ======= LANGUAGE (nav translation except Bismillah) =======
const translations = {
  ur:{
    home:'ہوم', education:'تعلیمات', departments:'شعبہ جات', syllabus:'نصاب تعلیم', results:'نتائج',
    admissions:'جدید داخلے', gallery:'گیلری', timings:'نظام الاوقات', holidays:'تعطیلات',
    academicYear:'تعلیمی سال', calendar:'تعلیمی کلینڈر', teachersList:'فہرست اساتذہ', staffList:'فہرست ملازمین',
    nazerah:'شعبہ ناظرہ', hifz:'شعبہ تحفیظ القرآن الکریم', tajweed:'شعبہ تجوید و قرأت', farsi:'شعبہ فارسی و انشاء',
    ibtidai:'ابتدائیہ', nazerahLevel:'ناظرہ', hifzLevel:'تحفیظ', searchResults:'🔍 نتیجہ تلاش کریں'
  },
  hi:{
    home:'होम', education:'शिक्षा', departments:'विभाग', syllabus:'पाठ्यक्रम', results:'परिणाम',
    admissions:'दाखिला', gallery:'गैलरी', timings:'समय-सारिणी', holidays:'छुट्टियाँ',
    academicYear:'शैक्षणिक वर्ष', calendar:'शैक्षणिक कैलेंडर', teachersList:'शिक्षक सूची', staffList:'कर्मचारी सूची',
    nazerah:'नाज़िराह', hifz:'हिफ़्ज़', tajweed:'तज़वीद', farsi:'फ़ारसी',
    ibtidai:'प्राथमिक', nazerahLevel:'नाज़िराह', hifzLevel:'हिफ़्ज़', searchResults:'🔍 परिणाम खोजें'
  },
  en:{
    home:'Home', education:'Education', departments:'Departments', syllabus:'Syllabus', results:'Results',
    admissions:'Admissions', gallery:'Gallery', timings:'Timings', holidays:'Holidays',
    academicYear:'Academic Year', calendar:'Academic Calendar', teachersList:'Teachers', staffList:'Staff',
    nazerah:'Nazerah', hifz:'Hifz', tajweed:'Tajweed', farsi:'Farsi',
    ibtidai:'Primary', nazerahLevel:'Nazerah', hifzLevel:'Hifz', searchResults:'🔍 Search results'
  }
};
const langSelect = document.getElementById('lang');
if(langSelect){
  langSelect.addEventListener('change', ()=> applyLang(langSelect.value));
  function applyLang(code){
    const t = translations[code] || translations['ur'];
    document.querySelectorAll('[data-key]').forEach(el=>{
      const key = el.getAttribute('data-key');
      if(key && t[key]) el.innerText = t[key];
    });
  }
  applyLang('ur');
}

// ======= HAMBURGER (mobile) =======
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger && hamburger.addEventListener('click', ()=>{
  navMenu.classList.toggle('open');
});

// ======= DROP-DOWN: accessible toggles for touch + hover for desktop handled by CSS =======
document.querySelectorAll('.drop-toggle').forEach(btn=>{
  btn.addEventListener('click', ()=> {
    const parent = btn.parentElement;
    const submenu = parent.querySelector('.submenu');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    if(submenu) submenu.style.display = expanded ? 'none' : 'block';
  });
});

// ======= SEARCH BOX (simple highlight) =======
document.getElementById('searchBtn')?.addEventListener('click', ()=>{
  const q = document.getElementById('searchBox')?.value || '';
  if(!q) return alert('براہ کرم تلاش کے لیے لفظ درج کریں');
  const nodes = document.querySelectorAll('.box, .stat-box, .stat-small, .nav-link');
  let found = false;
  nodes.forEach(n=>{
    if(n.innerText && n.innerText.toLowerCase().includes(q.toLowerCase())){
      found = true;
      n.scrollIntoView({behavior:'smooth', block:'center'});
      n.classList.add('pulse');
      setTimeout(()=>n.classList.remove('pulse'),1500);
    }
  });
  if(!found) alert('نتیجہ موصول نہیں ہوا');
});

// ======= RESULTS modal handling =======
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
  if(resultsModal){ resultsModal.style.display = 'flex'; resultsModal.setAttribute('aria-hidden','false'); }
  document.querySelectorAll('.pdf-btn').forEach(b=>{
    b.addEventListener('click', ()=> {
      const file = b.getAttribute('data-file');
      window.open(file, '_blank');
    });
  });
}
closeResults && closeResults.addEventListener('click', ()=> {
  if(resultsModal){ resultsModal.style.display = 'none'; resultsModal.setAttribute('aria-hidden','true'); }
});
resultsModal && resultsModal.addEventListener('click', (e)=> { if(e.target===resultsModal){ resultsModal.style.display='none'; resultsModal.setAttribute('aria-hidden','true'); }});

// ======= small helper pulse style addition =======
(function addPulseStyle(){
  const s = document.createElement('style');
  s.innerHTML = `.pulse{box-shadow:0 0 0 6px rgba(10,120,59,0.06) inset;transform:scale(1.01);transition:transform .15s}`;
  document.head.appendChild(s);
})();
