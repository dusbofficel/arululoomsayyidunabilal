<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>دارالعلوم سیدنا بلالؓ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- thin decorative green strip (top) -->
  <div class="green-strip" aria-hidden="true"></div>

  <!-- Bismillah bar (reduced size) -->
  <div class="bismillah-bar" role="banner">
    <div class="bismillah-center">
      <div class="bismillah-text">بِسْمِ اللّٰہِ الرَّحْمٰنِ الرَّحِيْمِ</div>
    </div>

    <div class="bismillah-right">
      <div id="date-and-calendar" aria-live="polite"></div>
    </div>
  </div>

  <!-- White name strip -->
  <header class="name-strip" role="heading">
    <div class="name-left">
      <img src="assets/logo.jpg" alt="logo" class="brand-logo"> <!-- logo (moved) -->
      <select id="lang" aria-label="language select" class="lang-inline">
        <option value="ur">اردو</option>
        <option value="hi">हिंदी</option>
        <option value="en">English</option>
      </select>
    </div>

    <div class="name-inner">
      <h1 id="site-title">دارالعلوم سیدنا بلالؓ</h1>
      <p id="site-address">مقام: ناک نول، تحصیل تجارہ، ضلع خیرتھل، راجستھان — پن کوڈ: ۳۰۱۷۰۷</p>
    </div>

    <!-- Result search small card (right side inside header) -->
    <div class="result-search-card">
      <a href="results.html" class="result-link">🔍 نتیجہ تلاش کریں</a>
    </div>
  </header>

  <!-- NAV: hamburger (mobile) + menu + search -->
  <nav class="main-nav" role="navigation" aria-label="Main menu">
    <button id="hamburger" aria-label="menu">☰</button>

    <ul class="nav-menu" id="navMenu">
      <li><a href="#home" class="nav-link" data-key="home">ہوم</a></li>

      <li class="has-dropdown">
        <button class="nav-link drop-toggle" data-key="education" aria-expanded="false">تعلیمات ▾</button>
        <ul class="submenu" data-parent="education" aria-hidden="true">
          <li><a href="pages/timings.html" class="nav-link" data-key="timings">نظام الاوقات</a></li>
          <li><a href="pages/holidays.html" class="nav-link" data-key="holidays">تعطیلات</a></li>
          <li><a href="pages/academicYear.html" class="nav-link" data-key="academicYear">تعلیمی سال</a></li>
          <li><a href="pages/calendar.html" class="nav-link" data-key="calendar">تعلیمی کلینڈر</a></li>
          <li><a href="pages/teachers.html" class="nav-link" data-key="teachersList">فہرست اساتذہ</a></li>
          <li><a href="pages/staff.html" class="nav-link" data-key="staffList">فہرست ملازمین</a></li>
        </ul>
      </li>

      <li class="has-dropdown">
        <button class="nav-link drop-toggle" data-key="departments" aria-expanded="false">شعبہ جات ▾</button>
        <ul class="submenu" data-parent="departments" aria-hidden="true">
          <li><a href="pages/nazerah.html" class="nav-link" data-key="nazerah">شعبہ ناظرہ</a></li>
          <li><a href="pages/hifz.html" class="nav-link" data-key="hifz">شعبہ تحفیظ القرآن الکریم</a></li>
          <li><a href="pages/tajweed.html" class="nav-link" data-key="tajweed">شعبہ تجوید و قرأت</a></li>
          <li><a href="pages/farsi.html" class="nav-link" data-key="farsi">شعبہ فارسی و انشاء</a></li>
          <li><a href="pages/arabic1.html" class="nav-link" data-key="arabic1">شعبہ عربی</a></li>
          <li><a href="pages/exams.html" class="nav-link" data-key="exams">شعبہ امتحانات/مسابقات</a></li>
        </ul>
      </li>

      <li class="has-dropdown">
        <button class="nav-link drop-toggle" data-key="syllabus" aria-expanded="false">نصاب تعلیم ▾</button>
        <ul class="submenu" data-parent="syllabus" aria-hidden="true">
          <li><a href="pages/ibtidai.html" class="nav-link" data-key="ibtidai">ابتدائیہ</a></li>
          <li><a href="pages/nazerah-level.html" class="nav-link" data-key="nazerahLevel">ناظرہ</a></li>
          <li><a href="pages/hifz-level.html" class="nav-link" data-key="hifzLevel">تحفیظ</a></li>
          <li><a href="pages/tajweed-level.html" class="nav-link" data-key="tajweedLevel">تجوید و قرأت</a></li>
          <li><a href="pages/farsi-level.html" class="nav-link" data-key="farsiLevel">فارسی و انشاء</a></li>
          <li><a href="pages/arabic-levels.html" class="nav-link" data-key="arabicLevels">عربی (سطور)</a></li>
        </ul>
      </li>

      <li class="has-dropdown">
        <button class="nav-link drop-toggle" data-key="results" aria-expanded="false">نتائج ▾</button>
        <ul class="submenu" data-parent="results" aria-hidden="true">
          <li><a href="#" class="result-year" data-year="2023">2023</a></li>
          <li><a href="#" class="result-year" data-year="2024">2024</a></li>
          <li><a href="#" class="result-year" data-year="2025">2025</a></li>
        </ul>
      </li>

      <li><a href="pages/admissions.html" class="nav-link" data-key="admissions">جدید داخلے</a></li>
      <li><a href="pages/gallery.html" id="galleryLink" class="nav-link" data-key="gallery">گیلری</a></li>
    </ul>

    <!-- right side: search box (desktop only) -->
    <div class="nav-search" role="search" aria-label="Site search">
      <input id="searchBox" placeholder="تلاش کریں..." aria-label="search">
      <button id="searchBtn" aria-label="search-btn">🔍</button>
    </div>
  </nav>

  <!-- MAIN CONTENT: home -->
  <main id="home" class="page">

    <!-- Slider + stats row (two equal columns) -->
    <section class="hero">
      <!-- slider left -->
      <div class="hero-left">
        <div class="slider" id="mainSlider" aria-hidden="false">
          <img src="assets/slider1.jpg" alt="1" class="slide active">
          <img src="assets/slider2.jpg" alt="2" class="slide">
          <img src="assets/slider3.jpg" alt="3" class="slide">
        </div>
      </div>

      <!-- stats right (3 columns x 4 rows) -->
      <aside class="hero-right" aria-labelledby="oneLineTitle">
        <h2 id="oneLineTitle">دارالعلوم سیدنا بلالؓ ایک نظر میں</h2>

        <div class="small-stats-grid" role="list">
          <!-- row1 -->
          <div class="stat-small"><div class="stat-label">کل تعداد طلبہ</div><div class="stat-value" id="totalStudents">950</div></div>
          <div class="stat-small"><div class="stat-label">اقامتی طلبہ</div><div class="stat-value" id="resStudents">450</div></div>
          <div class="stat-small"><div class="stat-label">غیر اقامتی طلبہ</div><div class="stat-value" id="nonResStudents">500</div></div>

          <!-- row2 -->
          <div class="stat-small"><div class="stat-label">طلبہ تحفیظ</div><div class="stat-value" id="hifzStudents">45</div></div>
          <div class="stat-small"><div class="stat-label">طلبہ ناظرہ</div><div class="stat-value" id="nazerahStudents">120</div></div>
          <div class="stat-small"><div class="stat-label">طلبہ عربی و فارسی</div><div class="stat-value" id="arabifarsiStudents">85</div></div>

          <!-- row3 -->
          <div class="stat-small"><div class="stat-label">اساتذہ تحفیظ</div><div class="stat-value" id="hifzTeachers">15</div></div>
          <div class="stat-small"><div class="stat-label">اساتذہ ناظرہ</div><div class="stat-value" id="nazerahTeachers">10</div></div>
          <div class="stat-small"><div class="stat-label">اساتذہ عربی و فارسی</div><div class="stat-value" id="arabifarsiTeachers">12</div></div>

          <!-- row4 -->
          <div class="stat-small"><div class="stat-label">اساتذہ اسکول</div><div class="stat-value" id="schoolTeachers">8</div></div>
          <div class="stat-small"><div class="stat-label">دیگر ملازمین</div><div class="stat-value" id="otherStaff">47</div></div>
          <div class="stat-small"><div class="stat-label">کل اساتذہ و ملازمین</div><div class="stat-value" id="totalStaff">75</div></div>
        </div>

        <!-- long line under grid (width matches slider column height) -->
        <div class="graduates-line">کل فارغین حفاظ سن 2014-2025</div>
      </aside>
    </section>

    <!-- boxes: 3x4 grid sections (kept same links) -->
    <section class="boxes" aria-label="Sections">
      <div class="box-row" id="row1">
        <a href="pages/maqsad.html" class="box">قیام دارالعلوم کا مقصد</a>
        <a href="pages/tasawwur.html" class="box">ہمارا تصورِ تعلیم</a>
        <a href="pages/tareeqa.html" class="box">طریقۂ تعلیم</a>
      </div>

      <div class="box-row" id="row2">
        <a href="pages/ahdaf.html" class="box">تعلیمی اہداف</a>
        <a href="pages/nashatat.html" class="box">تعلیمی نشاطات</a>
        <a href="pages/fikri.html" class="box">طلبہ کی علمی و فکری سرگرمیاں</a>
      </div>

      <div class="box-row" id="row3">
        <a href="pages/nisaab.html" class="box">دارالعلوم کا نصاب تعلیم</a>
        <a href="pages/otherActs.html" class="box">دیگر نشاطات</a>
        <a href="pages/plans.html" class="box">مستقبل کے تعمیراتی منصوبے</a>
      </div>

      <div class="box-row" id="row4">
        <a href="pages/admissionProcedure.html" class="box">داخلہ کا طریقۂ کار</a>
        <a href="pages/rules.html" class="box">اصول و ضوابط برائے سرپرستان</a>
        <a href="pages/support.html" class="box">آپ ہمارا تعاون کیسے کریں</a>
      </div>
    </section>

    <!-- Results modal (hidden) - kept for year selection -->
    <div id="resultsModal" class="modal" aria-hidden="true">
      <div class="modal-inner" role="dialog" aria-modal="true">
        <h3 id="resultsTitle">نتائج — <span id="resultsYear"></span></h3>
        <div class="results-options">
          <button class="result-type" data-type="madrasa">مدرسہ</button>
          <button class="result-type" data-type="school">اسکول</button>
        </div>
        <div id="resultsLinks" class="pdf-links"></div>
        <button class="close-modal" id="closeResults">بند کریں</button>
      </div>
    </div>

  </main>

  <!-- FOOTER (vertical) -->
  <footer class="site-footer" role="contentinfo">
    <div class="footer-contact">
      <p><strong>موبائل:</strong> 000000000</p>
      <p><strong>ای میل:</strong> example@gmail.com</p>
      <p><strong>واٹس ایپ:</strong> 000000000</p>
      <p><strong>بینک:</strong> اکاؤنٹ نمبر ۔۔۔۔</p>
    </div>

    <div class="footer-links">
      <a href="#home">ہوم</a>
      <a href="pages/maqsad.html">تعارف</a>
      <a href="pages/education.html">تعلیمات</a>
      <a href="pages/departments.html">شعبہ جات</a>
      <a href="pages/syllabus.html">نصاب تعلیم</a>
      <a href="#" id="resultsOpen">نتائج</a>
      <a href="pages/admissions.html">داخلہ</a>
    </div>

    <div class="copyright" style="margin-top:14px;color:#fff;opacity:.9">
      © دارالعلوم سیدنا بلالؓ — All rights reserved.
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>
