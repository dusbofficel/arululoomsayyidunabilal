/* SLIDES (home) */
(function(){
  const slides = document.querySelectorAll('.slide');
  if(!slides.length) return;
  let i=0;
  function show(n){ slides.forEach((s,si)=> s.classList.toggle('show', si===n)); }
  show(0);
  setInterval(()=>{ i=(i+1)%slides.length; show(i); }, 3000);
})();

/* GALLERY SLIDES */
(function(){
  const slides = document.querySelectorAll('.gimg');
  if(!slides.length) return;
  let i=0;
  function show(n){ slides.forEach((s,si)=> s.classList.toggle('show', si===n)); }
  show(0);
  setInterval(()=>{ i=(i+1)%slides.length; show(i); }, 3000);
})();

/* NEWS TICKER (simple horizontal scroll) */
(function(){
  const el = document.getElementById('news-inner');
  if(!el) return;
  let pos = 0;
  setInterval(()=>{ pos -= 1; el.style.transform = `translateX(${pos}px)`; if(Math.abs(pos) > el.scrollWidth/2) pos = 0; }, 40);
})();

/* NAV DROPDOWNS (click to open/close) */
document.querySelectorAll('.nav-dropdown .nav-toggle').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const parent = btn.closest('.nav-dropdown');
    // close others
    document.querySelectorAll('.nav-dropdown').forEach(nd=>{ if(nd!==parent) nd.classList.remove('open'); });
    parent.classList.toggle('open');
  });
});
// close on outside click
document.addEventListener('click', (e)=>{
  if(!e.target.closest('.nav-dropdown')) document.querySelectorAll('.nav-dropdown').forEach(nd=>nd.classList.remove('open'));
});

/* LANGUAGE SWITCHER (simple object) */
const TEXT = {
  ur: {
    welcome: 'خوش آمدید — دارالعلوم سیدنا بلالؓ',
    introTitle: 'تعارف',
    introText: 'مختصر تعارفی متن یہاں دکھایا جائے گا۔',
    curriculumTitle: 'نصابِ تعلیم',
    departmentsTitle: 'شعبہ جات',
    activitiesTitle: 'دیگر نشاطات',
    resultsTitle: 'نتائج امتحان',
    admissionsTitle: 'جدید داخلے',
    contact: 'رابطہ: 9024352763 / 9309026986 — dusb212@gmail.com'
  },
  hi: {
    welcome: 'स्वागत — Darul Uloom Sayyiduna Bilal',
    introTitle: 'परिचय',
    introText: 'यहाँ संस्थान का सारांश रखा जाएगा।',
    curriculumTitle: 'पाठ्यक्रम',
    departmentsTitle: 'विभाग',
    activitiesTitle: 'अन्य गतिविधियाँ',
    resultsTitle: 'परीक्षा परिणाम',
    admissionsTitle: 'नवीन प्रवेश',
    contact: 'संपर्क: 9024352763 / 9309026986 — dusb212@gmail.com'
  },
  en: {
    welcome: 'Welcome — Darul Uloom Sayyiduna Bilal',
    introTitle: 'Introduction',
    introText: 'A brief about the institution will appear here.',
    curriculumTitle: 'Curriculum',
    departmentsTitle: 'Departments',
    activitiesTitle: 'Other Activities',
    resultsTitle: 'Exam Results',
    admissionsTitle: 'Admissions',
    contact: 'Contact: 9024352763 / 9309026986 — dusb212@gmail.com'
  }
};

function applyLang(lang){
  // basic mapping
  const t = TEXT[lang] || TEXT.ur;
  document.getElementById('intro-title').textContent = t.introTitle;
  document.getElementById('intro-content').textContent = t.introText;
  document.getElementById('curriculum-title').textContent = t.curriculumTitle;
  document.getElementById('departments-title').textContent = t.departmentsTitle;
  document.getElementById('activities-title').textContent = t.activitiesTitle;
  document.getElementById('results-title').textContent = t.resultsTitle;
  document.getElementById('admissions-title').textContent = t.admissionsTitle;
  document.getElementById('gallery-title').textContent = t.activitiesTitle === 'Other Activities' ? 'Gallery' : 'گیلری';
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.remove('active'));
  document.querySelector(`.lang-btn[data-lang="${lang}"]`).classList.add('active');
  // RTL/LTR
  if(lang === 'ur') document.documentElement.dir = 'rtl';
  else document.documentElement.dir = 'ltr';
}

// init lang from storage
const saved = localStorage.getItem('site_lang') || 'ur';
applyLang(saved);
document.querySelectorAll('.lang-btn').forEach(b=>{
  b.addEventListener('click', ()=>{
    const lang = b.getAttribute('data-lang');
    localStorage.setItem('site_lang', lang);
    applyLang(lang);
  });
});

/* Populate fixed statistics */
(function(){
  const container = document.getElementById('stats');
  if(!container) return;
  container.innerHTML = `
    <div class="stats-grid">
      <div><strong>کل طلبہ و طالبات:</strong> 954</div>
      <div><strong>اقامتی طلبہ:</strong> 334</div>
      <div><strong>غیر اقامتی طلبہ:</strong> 510</div>
      <div><strong>حفظ و تجوید کے طلبہ:</strong> 198</div>
      <div><strong>ناظرہ کے طلبہ:</strong> 182</div>
      <div><strong>عربی و فارسی کے طلبہ:</strong> 75</div>
      <div><strong>کل فارغین شعبہ تجوید:</strong> 12</div>
      <div><strong>کل فارغین حفاظ (سال 1436ھ تا 1445ھ):</strong> 96</div>
      <div><strong>کل تعداد اساتذہ و ملازمین:</strong> 80</div>
      <div><strong>اساتذہ عربی:</strong> 8</div>
      <div><strong>اساتذہ حفظ و تجوید:</strong> 13</div>
      <div><strong>اساتذہ ناظرہ و ابتدائیہ:</strong> 16</div>
      <div><strong>اساتذہ اسکول:</strong> 21</div>
      <div><strong>ملازمین و عملہ:</strong> 12</div>
    </div>
  `;
})();
