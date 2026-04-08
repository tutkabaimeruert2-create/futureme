document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();
  setupThemeToggle();   // ✅ navbar шыққаннан кейін
  renderFooter();
  setupMobileMenu();


  // Егер профиль бетінде болсақ, деректерді жүктеу
  if (window.location.pathname.includes('profile.html')) {
    setupProfilePage();
    displaySavedUniversities();
  }
});

// ПАЙДАЛАНУШЫ ДЕРЕКТЕРІН АЛУ
function getCurrentUser() {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}

// NAVBAR РЕНДЕРЛЕУ
function renderNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const currentUser = getCurrentUser();
  const currentPage = window.location.pathname.split("/").pop();

  navbar.innerHTML = `
    <header class="navbar">
      <div class="container navbar-inner">
        <a href="index.html" class="logo">
          <i class="fas fa-graduation-cap"></i>
          <span>FutureMe</span>
        </a>
        <button class="nav-toggle" id="navToggle">
          <i class="fas fa-bars"></i>
        </button>
        <nav class="nav-links" id="navLinks">
          <a href="index.html" class="${currentPage === "index.html" || currentPage === "" ? "active" : ""}">Басты бет</a>
          <a href="test.html" class="${currentPage === "test.html" ? "active" : ""}">Тест</a>
          <a href="majors.html" class="${currentPage === "majors.html" ? "active" : ""}">Мамандықтар</a>
          <a href="universities.html" class="${currentPage === "universities.html" ? "active" : ""}">Университеттер</a>
          <a href="ai-helper.html" class="${currentPage === "ai-helper.html" ? "active" : ""}">AI Кеңесші</a>
          ${
            currentUser
              ? `<a href="profile.html" class="${currentPage === "profile.html" ? "active" : ""}">Профиль</a>
                 <a href="#" id="logoutBtn">Шығу</a>`
              : `<a href="login.html" class="${currentPage === "login.html" ? "active" : ""}">Кіру</a>
                 <a href="register.html" class="${currentPage === "register.html" ? "active" : ""}">Тіркелу</a>`
          }
        </nav>
        <div class="nav-user">
          <button class="theme-toggle" id="themeToggle" type="button" aria-label="Dark mode ауыстыру">
            <i class="fas fa-moon"></i>
          </button>

          ${
            currentUser
              ? `<div class="user-pill"><i class="fas fa-user"></i> ${currentUser.name}</div>`
              : ""
          }
      </div>
      </div>
    </header>
  `;

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      window.location.href = "login.html";
    });
  }
}

// FOOTER РЕНДЕРЛЕУ
function renderFooter() {
  const footer = document.getElementById("footer");
  if (!footer) return;
  footer.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <h3>FutureMe</h3>
            <p>FutureMe — оқушылар мен талапкерлерге мамандық таңдауға, университет табуға және болашағын жоспарлауға көмектесетін платформа.</p>
          </div>
          <div>
            <h4>Бөлімдер</h4>
            <div class="footer-links">
              <a href="index.html">Басты бет</a>
              <a href="test.html">Тест</a>
              <a href="majors.html">Мамандықтар</a>
              <a href="universities.html">Университеттер</a>
            </div>
          </div>
          <div>
            <h4>Байланыс</h4>
            <div class="footer-links">
              <a href="#">Email: info@futureme.kz</a>
              <a href="#">Instagram: @futureme.kz</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom"><p>© 2026 FutureMe. Барлық құқықтар қорғалған.</p></div>
      </div>
    </footer>
  `;
}

// МОБИЛЬДІ МЕНЮ
function setupMobileMenu() {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (!navToggle || !navLinks) return;

  function openMenu() {
    navLinks.classList.add("show");
    document.body.classList.add("menu-open");
    navToggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    navLinks.classList.remove("show");
    document.body.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", (e) => {
    e.preventDefault();
    if (navLinks.classList.contains("show")) closeMenu();
    else openMenu();
  });

  // Линк басқанда меню жабылсын
  navLinks.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) closeMenu();
  });

  // Сырт жерді басқанда жабылсын
  document.addEventListener("click", (e) => {
    if (!navLinks.classList.contains("show")) return;
    if (e.target.closest("#navLinks")) return;
    if (e.target.closest("#navToggle")) return;
    closeMenu();
  });

  // Экран үлкейсе меню автомат жабылсын
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) closeMenu();
  });
}

// ПРОФИЛЬ БЕТІН БАПТАУ (АТЫ ЖӘНЕ ТЕСТ)
function setupProfilePage() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const nameHeader = document.getElementById("profileNameHeader");
  if (nameHeader) nameHeader.textContent = currentUser.name;

  // ТЕСТ НӘТИЖЕСІН ШЫҒАРУ (Егер болса)
  const testResultContent = document.getElementById("testResultContent");
  const lastResult = JSON.parse(localStorage.getItem(`lastTestResult_${currentUser.id}`));
  if (testResultContent && lastResult) {
    testResultContent.innerHTML = `
      <div class="test-result-box">
        <p><strong>Бағытыңыз:</strong> ${lastResult.category}</p>
        <p>${lastResult.description}</p>
        <small>Күні: ${lastResult.date}</small>
      </div>
    `;
  }
}

// САҚТАЛҒАН УНИВЕРСИТЕТТЕРДІ ШЫҒАРУ
function displaySavedUniversities() {
  const currentUser = getCurrentUser();
  const container = document.getElementById("savedUniversitiesList");
  if (!container || !currentUser) return;

  const allUnis = JSON.parse(localStorage.getItem("universitiesData")) || [];
  const savedRecords = JSON.parse(localStorage.getItem("savedUniversities")) || [];
  const userSaved = savedRecords.filter(item => item.userId === currentUser.id);

  if (userSaved.length === 0) {
    container.innerHTML = "<p style='grid-column: 1/-1; color: #999;'>Сақталған университеттер жоқ.</p>";
    return;
  }

  container.innerHTML = "";
  userSaved.forEach(record => {
    const uni = allUnis.find(u => u.id === record.universityId);
    if (uni) {
      container.innerHTML += `
        <div class="profile-saved-card" id="saved-card-${uni.id}">
          <div class="card-info">
            <h4>${uni.name}</h4>
            <p>📍 ${uni.city}, ${uni.country}</p>
            <small>📅 Сақталды: ${new Date(record.savedAt).toLocaleDateString()}</small>
          </div>
          <button class="delete-btn" onclick="deleteUniversity(${uni.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
    }
  });
}

// ӨШІРУ ФУНКЦИЯСЫ
window.deleteUniversity = function(id) {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  let saved = JSON.parse(localStorage.getItem("savedUniversities")) || [];
  saved = saved.filter(item => !(item.universityId === id && item.userId === currentUser.id));
  localStorage.setItem("savedUniversities", JSON.stringify(saved));

  const card = document.getElementById(`saved-card-${id}`);
  if (card) {
    card.style.opacity = "0";
    setTimeout(() => {
      displaySavedUniversities();
    }, 300);
  }
};
function getInitialTheme(){
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme){
  document.body.dataset.theme = theme; // "dark" немесе "light"
  localStorage.setItem("theme", theme);

  // Иконканы ауыстыру
  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.innerHTML = theme === "dark"
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  }
}

function setupThemeToggle(){
  // Бетті ашқанда бірден қолдану
  applyTheme(getInitialTheme());

  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const current = document.body.dataset.theme === "dark" ? "dark" : "light";
    applyTheme(current === "dark" ? "light" : "dark");
  });
}
function initCareerMapV2(){
  const items = document.querySelectorAll('.career-item-v2');
  if (!items.length) return;

  items.forEach(d => {
    d.addEventListener('toggle', () => {
      if (!d.open) return;
      items.forEach(other => {
        if (other !== d) other.open = false;
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCareerMapV2();
});