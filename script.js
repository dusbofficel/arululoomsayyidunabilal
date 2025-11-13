// ──────── قمری + شمسی تاریخ ────────
function updateDateTime() {
  const el = document.getElementById('hijriDate');
  const indiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const date = new Date(indiaTime);
  const greg = date.toLocaleDateString("ur-IN", {
    day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'
  });
  const hijri = date.toLocaleDateString("ar-SA-u-ca-islamic", {
    day: 'numeric', month: 'long', year: 'numeric'
  });
  el.innerHTML = `📅 ${hijri} مطابق ${greg}`;
}
updateDateTime();
setInterval(updateDateTime, 60000);

// ──────── نمازوں کے اوقات ────────
async function loadPrayerTimes() {
  const response = await fetch("https://api.aladhan.com/v1/timingsByCity?city=Alwar&country=India&method=2");
  const data = await response.json();
  const times = data.data.timings;

  const prayerList = document.getElementById("prayerList");
  prayerList.innerHTML = `
    <li>فجر: ${times.Fajr}</li>
    <li>ظہر: ${times.Dhuhr}</li>
    <li>عصر: ${times.Asr}</li>
    <li>مغرب: ${times.Maghrib}</li>
    <li>عشاء: ${times.Isha}</li>
  `;
}
loadPrayerTimes();
