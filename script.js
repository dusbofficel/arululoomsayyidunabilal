// ─── زبان کا نظام ───
function setLanguage(lang) {
  document.querySelectorAll("[data-lang]").forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.innerText = text;
  });
  document.documentElement.lang = lang;
  document.body.dir = lang === "en" ? "ltr" : "rtl";
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

// ─── موبائل مینو ───
function toggleMenu() {
  const menu = document.querySelector("#main-menu ul");
  menu.classList.toggle("active");
}

// ─── Dropdown Toggle ───
document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".dropdown > .dropbtn");

  dropdowns.forEach(btn => {
    btn.addEventListener("click", e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = btn.parentElement;
        parent.classList.toggle("open");

        // باقی dropdown بند ہو جائیں
        document.querySelectorAll(".dropdown").forEach(d => {
          if (d !== parent) d.classList.remove("open");
        });
      }
    });
  });
});

// ─── Gallery Lightbox ───
function openLightbox(src) {
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox").classList.add("active");
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
}

// ─── Show More / Show Less ───
function toggleGallery() {
  const hiddenItems = document.querySelectorAll(".gallery-item.hidden");
  const btn = document.getElementById("viewMoreBtn");
  const showing = btn.classList.toggle("expanded");

  hiddenItems.forEach(item => {
    item.style.display = showing ? "block" : "none";
  });

  btn.textContent = showing ? "کم دیکھائیں ↑" : "مزید دیکھیں ↓";
}
