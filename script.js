/* ---------------- date (hijri + gregorian) ---------------- */
function updateDates() {
  // India timezone
  const indiaNow = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  // hijri (arabic format)
  const hijri = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", { day: 'numeric', month: 'long', year:'numeric' }).format(indiaNow);
  // gregorian ur format
  const greg = indiaNow.toLocaleDateString("ur-IN", { day:'2-digit', month:'long', year:'numeric' });
  const daysUr = ["اتوار","پیر","منگل","بدھ","جمعرات","جمعہ","ہفتہ"];
  const dayName = daysUr[indiaNow.getDay()];
  // format: hijri ، مطابق gregorian :: بروز DAY
  document.getElementById("hijriDate").innerText = `${hijri}، مطابق ${greg} :: بروز ${dayName}`;
}
updateDates();
setInterval(updateDates, 60000);

/* =============================
   HIJRI + GREGORIAN DATE SYSTEM
   ============================= */

function loadDates() {
    const today = new Date();

    const gregorian = today.toLocaleDateString("ur-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
    });

    // Hijri
    const hijri = today.toLocaleDateString("ar-SA-u-ca-islamic", {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    document.getElementById("today-gregorian").innerHTML = `مطابق: ${gregorian}`;
    document.getElementById("today-hijri").innerHTML = `تاریخ: ${hijri}`;
}

loadDates();

/* =============================
   PRAYER TIMES + GEO LOCATION
   ============================= */

const prayerMain = document.getElementById("prayer-main");
const prayerExtra = document.getElementById("prayer-extra");

const nextName = document.getElementById("next-prayer-name");
const countdownBox = document.getElementById("countdown-timer");

const DEFAULT_LOC = { lat: 27.6483, lon: 76.1991 };

async function getTimes(lat, lon) {
    try {
        let res = await fetch(
            `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`
        );
        let data = await res.json();
        return data.data.timings;
    } catch {
        return null;
    }
}

function format(t) {
    prayerMain.innerHTML =
        `فجر: ${t.Fajr} | ظہر: ${t.Dhuhr} | عصر: ${t.Asr} | مغرب: ${t.Maghrib} | عشاء: ${t.Isha}`;

    prayerExtra.innerHTML =
        `صبح صادق: ${t.Fajr} | طلوع: ${t.Sunrise} | اشراق: ${t.Sunrise} | زوال: ${t.Dhuhr} | غروب: ${t.Sunset}`;
}

function convertToDate(time) {
    const [h, m] = time.split(":");
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
}

/* -------- NEXT PRAYER CALCULATION ---------- */

function getNextPrayer(t) {
    const now = new Date();

    const prayers = [
        { name: "فجر", time: convertToDate(t.Fajr) },
        { name: "ظہر", time: convertToDate(t.Dhuhr) },
        { name: "عصر", time: convertToDate(t.Asr) },
        { name: "مغرب", time: convertToDate(t.Maghrib) },
        { name: "عشاء", time: convertToDate(t.Isha) }
    ];

    for (let p of prayers) {
        if (p.time > now) return p;
    }

    // اگلے دن کی فجر
    let fajrTomorrow = convertToDate(t.Fajr);
    fajrTomorrow.setDate(fajrTomorrow.getDate() + 1);

    return { name: "فجر", time: fajrTomorrow };
}

/* -------- COUNTDOWN ---------- */
function startCountdown(prayer) {
    setInterval(() => {
        const now = new Date();
        let diff = prayer.time - now;

        let h = Math.floor(diff / 1000 / 3600);
        let m = Math.floor((diff % (3600 * 1000)) / 60000);
        let s = Math.floor((diff % 60000) / 1000);

        countdownBox.innerHTML = `${h} گھنٹے : ${m} منٹ : ${s} سیکنڈ`;
    }, 1000);
}

/* -------- MAIN LOADER ---------- */
async function loadPrayerBox() {
    let timings;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async p => {
                timings = await getTimes(p.coords.latitude, p.coords.longitude);
                afterLoad(timings);
            },
            async () => {
                timings = await getTimes(DEFAULT_LOC.lat, DEFAULT_LOC.lon);
                afterLoad(timings);
            }
        );
    } else {
        timings = await getTimes(DEFAULT_LOC.lat, DEFAULT_LOC.lon);
        afterLoad(timings);
    }
}

function afterLoad(t) {
    if (!t) return;
    format(t);
    let next = getNextPrayer(t);
    nextName.innerHTML = next.name;
    startCountdown(next);
}

loadPrayerBox();


/* ---------------- mobile menu toggle ---------------- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if(hamburger){
  hamburger.addEventListener('click', ()=> mobileMenu.classList.toggle('hidden'));
}

/* ---------------- Gallery: lightbox & show more ---------------- */
const galleryGrid = document.getElementById('galleryGrid');
const showMoreBtn = document.getElementById('showMoreBtn');
let galleryImgs = Array.from(galleryGrid.querySelectorAll('img'));
let extraLoaded = false;

// fill rest images on "more"
showMoreBtn.addEventListener('click', ()=>{
  if(extraLoaded) {
    // scroll to gallery area
    galleryGrid.scrollIntoView({behavior:'smooth'});
    return;
  }
  // append gallery7..gallery50 dynamically
  for(let i=7;i<=50;i++){
    const img = document.createElement('img');
    img.src = `assets/gallery${i}.jpg`;
    img.alt = `gallery ${i}`;
    img.dataset.index = galleryGrid.children.length;
    galleryGrid.appendChild(img);
  }
  galleryImgs = Array.from(galleryGrid.querySelectorAll('img'));
  extraLoaded = true;
  showMoreBtn.innerText = "مزید تصاویر لوڈ ہوچکی ہیں — اوپر اسکالر کریں";
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');

let currentIndex = 0;

// open on click
galleryGrid.addEventListener('click',(e)=>{
  if(e.target && e.target.tagName === 'IMG'){
    galleryImgs = Array.from(document.querySelectorAll('#galleryGrid img'));
    currentIndex = galleryImgs.indexOf(e.target);
    openLightboxAt(currentIndex);
  }
});

function openLightboxAt(i){
  const img = galleryImgs[i];
  if(!img) return;
  lbImg.src = img.src;
  lightbox.classList.remove('hidden');
  currentIndex = i;
}
function closeLightbox(){ lightbox.classList.add('hidden'); }
function prevLightbox(){ currentIndex = (currentIndex-1+galleryImgs.length)%galleryImgs.length; lbImg.src = galleryImgs[currentIndex].src; }
function nextLightbox(){ currentIndex = (currentIndex+1)%galleryImgs.length; lbImg.src = galleryImgs[currentIndex].src; }

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', prevLightbox);
lbNext.addEventListener('click', nextLightbox);

// keyboard navigation
document.addEventListener('keydown', (e)=>{
  if(lightbox.classList.contains('hidden')) return;
  if(e.key==='ArrowLeft') prevLightbox();
  if(e.key==='ArrowRight') nextLightbox();
  if(e.key==='Escape') closeLightbox();
});

/* ---------------- YouTube live thumbnail without API (RSS trick) ---------------- */
/* We will load latest video id by using YouTube channel's RSS feed (no API key). */
async function loadYoutubeThumbnail(channelHandleOrId){
  try {
    // If user provided channel handle (e.g. @mewatidunyanaat) we can try fetch rss via https://rsshub.app/youtube/user/USER
    // but better: use https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID if channel id known.
    // We'll attempt to fetch by published feed via channel page: user can later replace channelId in code if needed.
    // For now use channel link provided earlier in chat: open channel home -> not safe to scrape here.
    // Fallback: show manual thumbnail already in HTML (assets/youtube-loading.jpg).
    // If you want API-free working, provide channel ID and uncomment below section.

    // Example using channel ID (uncomment and set channelId):
    // const channelId = 'UCxxxxxxxxxxxxxxxx'; // TODO: set real channel id
    // const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    // const r = await fetch(rssUrl);
    // const text = await r.text();
    // parse XML and extract videoId and thumb. For now we skip automatic fetch if no channelId.

  } catch(e){ console.warn('youtube load err', e); }
}
loadYoutubeThumbnail();

/* ---------------- Results dropdown: toggle sublists ---------------- */
document.querySelectorAll('.year-item').forEach(item=>{
  item.addEventListener('click', (e)=>{
    e.stopPropagation();
    const sub = item.querySelector('.sub-result');
    if(sub) sub.style.display = sub.style.display==='block' ? 'none' : 'block';
  });
});

/* ---------------- Language translations (simple) ---------------- */
const translations = {
  ur: {
    home: "ہوم", about: "تعارف", gallery: "گیلری", youtube: "ہماری ویڈیوز",
    intro1: "دارالعلوم سیدنا بلالؓ", intro2: "الہدٰی پبلک اسکول",
    boxes: ["ہمارا تصورِ تعلیم","تعلیمی اہداف","تعلیمی طریقہ کار","تعمیراتی منصوبے"]
  },
  hi: {
    home: "होम", about: "परिचय", gallery: "गैलरी", youtube: "हमारे वीडियो",
    intro1: "दारुल उलूम सय्यदुना बिलाल", intro2: "अल-हदा पब्लिक स्कूल",
    boxes: ["हमारी शिक्षा की धारणा","शैक्षिक लक्ष्य","शैक्षिक तरीका","निर्माण योजनाएँ"]
  },
  en:{
    home: "Home", about:"About", gallery:"Gallery", youtube:"Our Videos",
    intro1: "DarulUloom Sayyiduna Bilal", intro2: "Al-Huda Public School",
    boxes: ["Our Educational Vision","Educational Goals","Teaching Methodology","Construction Plans"]
  }
};

const langSelect = document.getElementById('langSelect');
langSelect.addEventListener('change', (e)=>{
  const lang = e.target.value;
  applyLang(lang);
});

function applyLang(lang){
  const t = translations[lang] || translations.ur;
  // nav items: easiest approach: rewrite manual anchors
  const navAnchors = document.querySelectorAll('.nav-list > li > a');
  if(navAnchors && navAnchors.length>=1){
    navAnchors[0].innerText = t.home;
    if(navAnchors[1]) navAnchors[1].innerText = t.about;
  }
  // section titles
  document.querySelector('#about .section-title')?.innerText ?? null;
  // intro boxes
  const introH3s = document.querySelectorAll('.intro-box h3');
  if(introH3s[0]) introH3s[0].innerText = t.intro1;
  if(introH3s[1]) introH3s[1].innerText = t.intro2;
  // quad boxes
  document.querySelectorAll('.quad-boxes .box').forEach((b,i)=>{
    b.innerText = t.boxes[i] || b.innerText;
  });
}

// initial apply
applyLang('ur');

/* ---------------- end ---------------- */

