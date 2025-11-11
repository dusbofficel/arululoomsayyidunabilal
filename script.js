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
