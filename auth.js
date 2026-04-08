// auth.js — Күшейтілген версия (Register, Login, Profile + Admin)
(() => {
  const USERS_KEY = "users";
  const CURRENT_USER_KEY = "currentUser";

  // Көмекші функциялар
  function loadUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch { return []; }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function setCurrentUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }

  function getCurrentUser() {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  function clearCurrentUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
  }

  function setAuthMessage(el, text, type = "error") {
    if (!el) return;
    el.textContent = text || "";
    el.className = type === "success" ? "auth-message auth-success" : "auth-message auth-error";
  }

  function getInputValue(form, selector) {
    const el = form.querySelector(selector);
    return el ? el.value.trim() : "";
  }

  function generateId() {
    return "u_" + Math.random().toString(16).slice(2) + "_" + Date.now();
  }

  // LOGIN
  function initLogin() {
    const form = document.getElementById("loginForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = getInputValue(form, 'input[type="email"]');
      const password = getInputValue(form, 'input[type="password"]');
      if (!email || !password) { setAuthMessage(document.getElementById("authMessage"), "Email және пароль енгізіңіз."); return; }
      const users = loadUsers();
      const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!found) { setAuthMessage(document.getElementById("authMessage"), "Пошта немесе пароль дұрыс емес."); return; }
      setCurrentUser({ id: found.id, name: found.name, email: found.email, role: found.role || "user" });
      
      if (found.role === 'admin') {
        window.location.href = "admin.html";
      } else {
        window.location.href = "profile.html";
      }
    });
  }

  // REGISTER
  function initRegister() {
    const form = document.getElementById("registerForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = getInputValue(form, 'input[type="text"]');
      const email = getInputValue(form, 'input[type="email"]');
      const password = getInputValue(form, 'input[type="password"]');
      if (!name || !email || !password) { setAuthMessage(document.getElementById("authMessage"), "Аты, email және пароль енгізіңіз."); return; }
      if (password.length < 4) { setAuthMessage(document.getElementById("authMessage"), "Пароль кемінде 4 таңба болуы керек."); return; }
      const users = loadUsers();
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) { setAuthMessage(document.getElementById("authMessage"), "Бұл email тіркелген."); return; }
      
      const role = email.toLowerCase() === 'admin@futureme.kz' ? 'admin' : 'user';
      
      const newUser = { id: generateId(), name, email, password, role: role, createdAt: new Date().toISOString() };
      users.push(newUser);
      saveUsers(users);
      setCurrentUser({ id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role });
      setAuthMessage(document.getElementById("authMessage"), "Тіркелу сәтті!", "success");
      setTimeout(() => {
        if (role === 'admin') {
          window.location.href = "admin.html";
        } else {
          window.location.href = "profile.html";
        }
      }, 500);
    });
  }

  // PROFILE
  function initProfile() {
    const nameHeader = document.getElementById("profileNameHeader");
    if (!nameHeader) return;
    const user = getCurrentUser();
    if (!user) { window.location.href = "login.html"; return; }
    nameHeader.textContent = user.name;
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        clearCurrentUser();
        window.location.href = "login.html";
      });
    }
    loadTestResult(user);
    loadSavedUniversities(user);
  }

  // ========================================================
  // БҰЛ ФУНКЦИЯЛАРДЫҢ ІШІНДЕГІ КОДТЫ ТОЛЫҚ ҚОСТЫМ
  // ========================================================
  function loadTestResult(user) {
    const container = document.getElementById("testResultContent");
    if (!container) return;
    const results = JSON.parse(localStorage.getItem("testResults")) || [];
    const userResult = results.find(r => r.userId === user.id);

    if (!userResult) {
      container.innerHTML = `<p class="muted">Сіз әлі тест тапсырмағансыз.</p><a href="test.html" class="btn btn-primary" style="margin-top: 15px; display: inline-block;">Тесттен өту</a>`;
      return;
    }

    container.innerHTML = `
      <div class="test-result-box">
        <h4>${userResult.title || "Нәтиже анықталды"}</h4>
        <p class="muted">${userResult.description || ""}</p>
        <div class="score-grid">
          <div>Tech: <strong>${userResult.scores.tech}</strong></div>
          <div>Creative: <strong>${userResult.scores.creative}</strong></div>
          <div>Social: <strong>${userResult.scores.social}</strong></div>
          <div>Business: <strong>${userResult.scores.business}</strong></div>
        </div>
        <small>Тест тапсырылған: ${new Date(userResult.createdAt).toLocaleDateString('kk-KZ')}</small>
      </div>
    `;

    const majorsContainer = document.getElementById("recommendedMajors");
    if (majorsContainer && userResult.recommendedMajors) {
      majorsContainer.innerHTML = userResult.recommendedMajors.map(major => `<div class="major-item">${major}</div>`).join("");
    }
  }

  function loadSavedUniversities(user) {
    const container = document.getElementById("savedUniversities");
    if (!container) return;
    
    const allUniversities = JSON.parse(localStorage.getItem("universitiesData")) || [];

    if (allUniversities.length === 0) {
      container.innerHTML = `<p class="muted">Университеттер тізімі жүктелмеді. <a href="universities.html">Университеттер бетін</a> ашып көріңіз.</p>`;
      return;
    }

    let saved = JSON.parse(localStorage.getItem("savedUniversities")) || [];
    saved = saved.filter(item => item.userId === user.id);

    if (saved.length === 0) {
      container.innerHTML = `<p class="muted">Сіз әлі ешқандай университет сақтамағансыз.</p>`;
      return;
    }

    let html = '<div class="saved-grid">';
    saved.forEach(item => {
      const uni = allUniversities.find(u => u.id === item.universityId);
      if (uni) {
        html += `
          <div class="saved-uni-card">
            <h4>${uni.name}</h4>
            <p>${uni.city}, ${uni.country}</p>
            <small>Сақталған: ${new Date(item.savedAt).toLocaleDateString('kk-KZ')}</small>
          </div>
        `;
      }
    });
    html += '</div>';
    container.innerHTML = html;
  }
  // ========================================================
  // /БҰЛ ФУНКЦИЯЛАРДЫҢ ІШІНДЕГІ КОДТЫ ТОЛЫҚ ҚОСТЫМ
  // ========================================================

  // ADMIN PANEL ТЕКСЕРУ
  function initAdminPage() {
    const adminPage = document.getElementById("adminPage");
    if (!adminPage) return;
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
      alert("Бұл бетке кіруге рұқсатыңыз жоқ!");
      window.location.href = 'index.html';
      return;
    }
  }

  // БАРЛЫҚ ФУНКЦИЯЛАРДЫ ШАҚЫРУ
  document.addEventListener("DOMContentLoaded", () => {
    initLogin();
    initRegister();
    initProfile();
    initAdminPage();
  });
})();