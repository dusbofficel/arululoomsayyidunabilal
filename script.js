// ─── زبان کا نظام ───
function setLanguage(lang) {
  document.querySelectorAll("[data-lang]").forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.innerText = text;
  });
}

// ─── سلائیڈر ───
let slideIndex = 0;
const slides = [
  "assets/slide1.jpg",
  "assets/slide2.jpg",
  "assets/slide3.jpg",
  "assets/slide4.jpg",
  "assets/slide5.jpg"
];
const captions = [
  "مدرسے کی جامع عمارت",
  "طلبہ کا درس",
  "اساتذہ کی مجلس",
  "کلاس کا منظر",
  "دعائیہ اجتماع"
];

function showSlide() {
  const img = document.getElementById("slide-image");
  const cap = document.getElementById("slide-caption");
  img.src = slides[slideIndex];
  cap.innerText = captions[slideIndex];
  slideIndex = (slideIndex + 1) % slides.length;
}
setInterval(showSlide, 3000);
showSlide();

// ─── Scroll Animation ───
const sections = document.querySelectorAll(".content-section");

function revealSections() {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.classList.add("visible");
    }
  });
}
sections.forEach(section => section.classList.add("fade-in-section"));
window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

// ─── Page Loading Animation ───
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("fade-out"), 1000);
  setTimeout(() => loader.style.display = "none", 1800);
});
