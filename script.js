// ───── تاریخ و وقت ─────
function updateDate() {
  const today = new Date();
  const days = ["اتوار", "پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ"];
  const hijri = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(today);
  const gregorian = today.toLocaleDateString("ur-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const dayName = days[today.getDay()];
  document.getElementById("hijriDate").innerText = `${hijri} : ${gregorian} : بروز ${dayName}`;
}
updateDate();

// ───── اوقاتِ نماز ─────
const prayerTimes = {
  fajr: "5:12 AM",
  zuhr: "12:25 PM",
  asr: "3:45 PM",
  maghrib: "5:40 PM",
  isha: "7:10 PM",
  sunrise: "6:35 AM",
  ishraq: "7:00 AM",
  zawal: "12:00 PM",
  sunset: "5:38 PM",
};

document.getElementById("main-prayers").innerText =
  `فجر: ${prayerTimes.fajr} | ظہر: ${prayerTimes.zuhr} | عصر: ${prayerTimes.asr} | مغرب: ${prayerTimes.maghrib} | عشاء: ${prayerTimes.isha}`;
document.getElementById("other-prayers").innerText =
  `صبح صادق: ${prayerTimes.fajr} | طلوع: ${prayerTimes.sunrise} | اشراق: ${prayerTimes.ishraq} | زوال: ${prayerTimes.zawal} | غروب: ${prayerTimes.sunset}`;

// ───── سلائیڈر ایفیکٹ ─────
let index = 0;
const slides = document.querySelectorAll(".slides img");
setInterval(() => {
  index = (index + 1) % slides.length;
  slides.forEach((img, i) => {
    img.style.display = i === index ? "block" : "none";
  });
}, 5000);
