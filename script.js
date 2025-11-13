// ──────── 🌿 تاریخ و دن (Hijri + Gregorian) ────────
function updateDate() {
  const d = new Date();
  const weekday = d.toLocaleDateString('ur', { weekday: 'long' });
  const gregorian = d.toLocaleDateString('ur', { day: 'numeric', month: 'long', year: 'numeric' });
  const islamic = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);

  document.getElementById('today-date').innerText =
    `${islamic} مطابق ${gregorian} بروز ${weekday}`;
}
updateDate();
setInterval(updateDate, 3600000); // ہر گھنٹے بعد اپڈیٹ

// ──────── 🌿 سلائیڈر ────────
let slideIndex = 0;
const slides = [
  "assets/slider1.jpg",
  "assets/slider2.jpg",
  "assets/slider3.jpg",
  "assets/slider4.jpg",
  "assets/slider5.jpg"
];

function showSlides() {
  const img = document.getElementById("slide-image");
  slideIndex = (slideIndex + 1) % slides.length;
  img.style.opacity = 0;
  setTimeout(() => {
    img.src = slides[slideIndex];
    img.style.opacity = 1;
  }, 400);
}
setInterval(showSlides, 3000); // ہر 3 سیکنڈ میں تصویر بدلے

// ──────── 🌿 زبان سسٹم ────────
const translations = {
  ur: {
    login: "لاگ ان",
    home: "ہوم",
    intro: "تعارف",
    syllabus: "نصاب تعلیم",
    departments: "شعبہ جات",
    results: "نتائج امتحانات",
    admission: "جدید داخلے",
    gallery: "گیلری",
  },
  hi: {
    login: "लॉग इन",
    home: "होम",
    intro: "परिचय",
    syllabus: "पाठ्यक्रम",
    departments: "विभाग",
    results: "परिणाम",
    admission: "प्रवेश",
    gallery: "गैलरी",
  },
  en: {
    login: "Login",
    home: "Home",
    intro: "Introduction",
    syllabus: "Syllabus",
    departments: "Departments",
    results: "Results",
    admission: "Admissions",
    gallery: "Gallery",
  }
};

function setLanguage(lang) {
  document.querySelector(".login-link").textContent = translations[lang].login;
  document.querySelectorAll("#main-menu a")[0].textContent = translations[lang].home;
  document.querySelectorAll("#main-menu a")[1].textContent = translations[lang].intro;
  document.querySelectorAll(".dropbtn")[0].textContent = translations[lang].syllabus + " ▾";
  document.querySelectorAll(".dropbtn")[1].textContent = translations[lang].departments + " ▾";
  document.querySelectorAll(".dropbtn")[2].textContent = translations[lang].results + " ▾";
  document.querySelectorAll("#main-menu a")[5].textContent = translations[lang].admission;
  document.querySelector("#gallery h2").textContent = translations[lang].gallery;
}
