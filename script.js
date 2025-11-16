// Date System
function loadDate() {
    const d = new Date();

    const days = ["اتوار","پیر","منگل","بدھ","جمعرات","جمعہ","ہفتہ"];

    const g = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;

    document.getElementById("dateBox").innerHTML =
        `${days[d.getDay()]} | ${g}`;
}
loadDate();


// Slider
let sIndex = 0;
setInterval(() => {
    sIndex = (sIndex + 1) % 3;
    document.getElementById("slider").style.transform =
        `translateX(-${sIndex * 100}%)`;
}, 3000);


// Translations
const tr = {
    ur: {
        bismillah:"بِسْمِ اللّٰہِ الرَّحْمٰنِ الرَّحِيْمِ",
        madarsa:"دارالعلوم سیدنا بلال رضی اللہ عنہ",
        address:"مقام: ناک نول، تحصیل تجارہ، ضلع خیر، راجستھان<br>پن کوڈ: ۳۰۱۷۰۷",
        introTitle:"تعارف",
        introText:`● طلبہ کی تعداد: 950<br>● اساتذہ و ملازمین: 75<br>● کل فارغین شعبہ تحفیظ القرآن الكريم: 45`,
        sl1:"سلائیڈر 1",
        sl2:"سلائیڈر 2",
        sl3:"سلائیڈر 3"
    },

    hi: {
        bismillah:"बस्मिल्लाह हिर्रहमान हिर्रहीम",
        madarsa:"दारुल उloom सैय्यिदुना बिलाल",
        address:"स्थान: नकनोल, तहसील तिजारा, जिला अलवर<br>पिन कोड: 301707",
        introTitle:"परिचय",
        introText:`● छात्र: 950<br>● शिक्षक व कर्मचारी: 75<br>● हिफ्ज़ स्नातक: 45`,
        sl1:"स्लाइडर 1",
        sl2:"स्लाइडर 2",
        sl3:"स्लाइडर 3"
    },

    en: {
        bismillah:"In the name of Allah, the Most Merciful",
        madarsa:"Darul Uloom Sayyiduna Bilal",
        address:"Location: Nakhnol, Tijara, Alwar<br>Pincode: 301707",
        introTitle:"Introduction",
        introText:`● Students: 950<br>● Teachers & Staff: 75<br>● Hifz Graduates: 45`,
        sl1:"Slider 1",
        sl2:"Slider 2",
        sl3:"Slider 3"
    }
};


// Apply Translation
document.getElementById("langSelect").addEventListener("change", function () {
    const L = this.value;

    document.getElementById("bismillah").innerHTML = tr[L].bismillah;
    document.getElementById("madarsaName").innerHTML = tr[L].madarsa;
    document.getElementById("address").innerHTML = tr[L].address;
    document.getElementById("introTitle").innerHTML = tr[L].introTitle;
    document.getElementById("introText").innerHTML = tr[L].introText;
    document.getElementById("sl1").innerHTML = tr[L].sl1;
    document.getElementById("sl2").innerHTML = tr[L].sl2;
    document.getElementById("sl3").innerHTML = tr[L].sl3;
});
