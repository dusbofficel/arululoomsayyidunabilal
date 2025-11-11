// Loader animation
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 500);
  }
});

// Slider
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}
setInterval(nextSlide, 3000);

// Language switching
function setLanguage(lang) {
  alert("زبان منتخب: " + (lang === 'ur' ? 'اردو' : lang === 'hi' ? 'हिंदी' : 'English'));
  // بعد میں یہاں ترجمے کی فائلیں لنک کی جا سکتی ہیں
}
// ─── سلائیڈر کے لیے ───────────────
let slides = [
  { img: "assets/slide1.jpg", ur: "مدرسہ کی جامع عمارت", hi: "मदरसें की भव्य इमारत", en: "The main campus building" },
  { img: "assets/slide2.jpg", ur: "طلبہ کا مطالعہ کرتے ہوئے منظر", hi: "छात्र अध्ययन करते हुए", en: "Students studying" },
  { img: "assets/slide3.jpg", ur: "اساتذہ کی تربیتی نشست", hi: "शिक्षकों की प्रशिक्षण बैठक", en: "Teachers' training session" }
];

let currentSlide = 0;
function showNextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  const img = document.getElementById("slide-image");
  const cap = document.getElementById("slide-caption");
  const lang = localStorage.getItem('siteLanguage') || 'ur';
  
  img.src = slides[currentSlide].img;
  cap.textContent = slides[currentSlide][lang];
}

setInterval(showNextSlide, 3000); // ہر 3 سیکنڈ بعد تصویر بدلے

// ─── Page Loading Animation ───
window.addEventListener("load", function() {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("fade-out");
    setTimeout(() => loader.style.display = "none", 800);
  }, 1000);
});

