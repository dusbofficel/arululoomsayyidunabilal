
// Simple slideshow (3s per slide)
(function(){
  const slides = document.querySelectorAll('.slide');
  if(!slides.length) return;
  let idx = 0;
  function show(i){
    slides.forEach((s,si)=> s.classList.toggle('show', si===i));
  }
  show(0);
  setInterval(()=>{ idx = (idx+1)%slides.length; show(idx); }, 3000);
})();

// Language switcher - simple text swap for header/menu placeholders
(function(){
  const data = {
    ur: {
      home:'ہوم', intro:'تعارف', activities:'تعلیمی سرگرمیاں', curriculum:'نصابِ تعلیم', departments:'شعبہ جات', admissions:'جدید داخلے', results:'نتائج'
    },
    hi: {
      home:'होम', intro:'परिचय', activities:'शैक्षणिक गतिविधियाँ', curriculum:'पाठ्यक्रम', departments:'विभाग', admissions:'नवीन प्रवेश', results:'परिणाम'
    },
    en: {
      home:'Home', intro:'Introduction', activities:'Educational Activities', curriculum:'Curriculum', departments:'Departments', admissions:'Admissions', results:'Results'
    }
  };
  const buttons = document.querySelectorAll('.lang-switch button');
  const navLinks = document.querySelectorAll('.nav-box a');
  buttons.forEach(b=>{
    b.addEventListener('click', ()=>{
      buttons.forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      const lang = b.getAttribute('data-lang');
      // update nav
      const keys = ['home','intro','activities','curriculum','departments','admissions','results'];
      navLinks.forEach((a,i)=> a.textContent = data[lang][keys[i]]);
      // update static headings text
      document.querySelector('#intro h2').textContent = data[lang].intro;
      document.querySelector('#activities h2').textContent = data[lang].activities;
      document.querySelector('#curriculum h2').textContent = data[lang].curriculum;
      document.querySelector('#departments h2').textContent = data[lang].departments;
      document.querySelector('#admissions h2').textContent = data[lang].admissions;
      document.querySelector('#results h2').textContent = data[lang].results;
      if(lang==='ur'){ document.documentElement.dir='rtl'; }
      else { document.documentElement.dir='ltr'; }
    });
  });
})();
