// main slideshow
(function(){
  const slides = document.querySelectorAll('.slide');
  if(!slides.length) return;
  let idx=0;
  function show(i){ slides.forEach((s,si)=> s.classList.toggle('show', si===i)); }
  show(0);
  setInterval(()=>{ idx=(idx+1)%slides.length; show(idx); },3000);
})();

// gallery slideshow
(function(){
  const slides = document.querySelectorAll('.gslide');
  if(!slides.length) return;
  let idx=0;
  function show(i){ slides.forEach((s,si)=> s.classList.toggle('gshow', si===i)); }
  show(0);
  setInterval(()=>{ idx=(idx+1)%slides.length; show(idx); },3000);
})();
