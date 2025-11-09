// Basic slides (home)
(function(){
  const slides = document.querySelectorAll('.slide');
  if(!slides.length) return;
  let idx = 0;
  function show(i){ slides.forEach((s,si)=> s.classList.toggle('show', si===i)); }
  show(0);
  setInterval(()=>{ idx=(idx+1)%slides.length; show(idx); }, 3000);
})();

// Gallery slides
(function(){
  const slides = document.querySelectorAll('.gslide');
  if(!slides.length) return;
  let idx = 0;
  function show(i){ slides.forEach((s,si)=> s.classList.toggle('gshow', si===i)); }
  show(0);
  setInterval(()=>{ idx=(idx+1)%slides.length; show(idx); }, 3000);
})();

/* Multilingual content (simple object) */
const CONTENT = {
  ur: {
    welcome: 'خوش آمدید — دارالعلوم سیدنا بلالؓ کی سرکاری ویب سائٹ',
    introTitle: 'تعارف',
    introText: 'یہاں ادارے کا خلاصہ شامل ہوگا۔ ادارہ اہلِ علم کی تربیت اور دینی قدروں کے فروغ کے لیے وقف ہے۔',
    planTitle: 'تعلیمی منصوبے و اہداف',
    planText: 'یہاں تعلیمی اہداف و طریقۂ کار کا خلاصہ شامل ہوگا۔',
    curriculumTitle: 'نصابِ تعلیم',
    departmentsTitle: 'شعبہ جات',
    activitiesTitle: 'دیگر نشاطات',
    resultsTitle: 'نتائج امتحان',
    admissionsTitle: 'جدید داخلے',
    administrationTitle: 'انتظامی امور و ہدایات برائے سرپرستان',
    mashahirTitle: 'مشاہیر علماء کا ورودِ مسعود',
    appealTitle: 'تعاون کی اپیل',
    contact: 'رابطہ: 9024352763 / 9309026986 — dusb212@gmail.com'
  },
  hi: {
    welcome: 'स्वागत — Darul Uloom Sayyiduna Bilal की आधिकारिक साइट',
    introTitle: 'परिचय',
    introText: 'यहाँ संस्थान का सारांश रखा जाएगा। संस्था धार्मिक और शैक्षिक प्रशिक्षण के लिए समर्पित है।',
    planTitle: 'शैक्षिक योजनाएँ और उद्देश्य',
    planText: 'यहाँ शैक्षिक लक्ष्य और कार्यपद्धति का सारांश होगा।',
    curriculumTitle: 'पाठ्यक्रम',
    departmentsTitle: 'विभाग',
    activitiesTitle: 'अन्य गतिविधियाँ',
    resultsTitle: 'परीक्षा परिणाम',
    admissionsTitle: 'नवीन प्रवेश',
    administrationTitle: 'प्रशासनिक कार्य एवं निर्देश',
    mashahirTitle: 'आगंतुक विद्वान',
    appealTitle: 'सहायता हेतु अपील',
    contact: 'संपर्क: 9024352763 / 9309026986 — dusb212@gmail.com'
  },
  en: {
    welcome: 'Welcome — Official website of Darul Uloom Sayyiduna Bilal',
    introTitle: 'Introduction',
    introText: 'A brief about the institution will appear here. The seminary is dedicated to religious and academic training.',
    planTitle: 'Educational Plans & Objectives',
    planText: 'Summary of objectives and methods.',
    curriculumTitle: 'Curriculum',
    departmentsTitle: 'Departments',
    activitiesTitle: 'Other Activities',
    resultsTitle: 'Exam Results',
    admissionsTitle: 'Admissions',
    administrationTitle: 'Administration & Guidelines for Guardians',
    mashahirTitle: 'Visiting Scholars',
    appealTitle: 'Appeal for Support',
    contact: 'Contact: 9024352763 / 9309026986 — dusb212@gmail.com'
  }
};

// language switcher
function applyLanguage(lang){
  // save selection
  localStorage.setItem('site_lang', lang);

  // map content
  const c = CONTENT[lang] || CONTENT.ur;
  document.getElementById('welcome-text').textContent = c.welcome;
  document.getElementById('intro-title').textContent = c.introTitle;
  document.getElementById('intro-content').textContent = c.introText;
  document.getElementById('plan-title').textContent = c.planTitle;
  document.getElementById('plan-content').textContent = c.planText;
  document.getElementById('curriculum-title').textContent = c.curriculumTitle;
  document.getElementById('departments-title').textContent = c.departmentsTitle;
  document.getElementById('activities-title').textContent = c.activitiesTitle;
  document.getElementById('results-title').textContent = c.resultsTitle;
  document.getElementById('admissions-title').textContent = c.admissionsTitle;
  document.getElementById('administration-title').textContent = c.administrationTitle;
  document.getElementById('mashahir-title').textContent = c.mashahirTitle;
  document.getElementById('appeal-title').textContent = c.appealTitle;
  document.getElementById('contact-info').textContent = c.contact;

  // direction
  if(lang === 'ur'){ document.documentElement.dir = 'rtl'; }
  else { document.documentElement.dir = 'ltr'; }
}

// initialize language from localStorage or default 'ur'
const initialLang = localStorage.getItem('site_lang') || 'ur';
document.querySelectorAll('.lang-btn').forEach(btn=>{
  if(btn.getAttribute('data-lang') === initialLang) btn.classList.add('active');
});
applyLanguage(initialLang);

// lang button click
document.querySelectorAll('.lang-btn').forEach(b=>{
  b.addEventListener('click', ()=>{
    document.querySelectorAll('.lang-btn').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    const lang = b.getAttribute('data-lang');
    applyLanguage(lang);
  });
});

// Dropdown toggle behavior (click-to-open)
document.querySelectorAll('.dropdown-toggle').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const parent = btn.closest('.dropdown-list');
    // close any other open dropdowns
    document.querySelectorAll('.dropdown-list').forEach(dl=>{
      if(dl !== parent) dl.classList.remove('open');
    });
    parent.classList.toggle('open');
  });
});

// close dropdowns when clicking outside
document.addEventListener('click', (e)=>{
  if(!e.target.closest('.dropdown-list') && !e.target.classList.contains('dropdown-toggle')){
    document.querySelectorAll('.dropdown-list').forEach(dl=>dl.classList.remove('open'));
  }
});

// Populate statistics (fixed numbers per your data)
(function(){
  const el = document.getElementById('statistics');
  if(!el) return;
  el.innerHTML = `
    <h3>تعدادِ طلبہ و اساتذہ و ملازمین</h3>
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
