(function () {
  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function getCurrentUser() {
    const u = localStorage.getItem("currentUser");
    return u ? JSON.parse(u) : null;
  }

  // 🔥 ТЕК ОСЫ ЖЕРДЕ СІЗ URL-дерді ауыстырасыз (hotlink жұмыс істейтін URL қойыңыз)
  // Мысалы: "https://i.imgur.com/xxxxx.jpg" немесе өз CDN/drive direct link
  const PHOTO_URLS = {
    2: "https://i.pinimg.com/736x/19/ca/de/19cadee4ca41191e73acef1be8eafab0.jpg",
    4: "https://i.pinimg.com/736x/85/db/c2/85dbc256a80d55d56f2ddf60a4ba011e.jpg",
    3: "https://i.pinimg.com/1200x/ea/93/56/ea93567b3da14416a3c21587bb89ae39.jpg",
    7: "https://i.pinimg.com/1200x/fa/ad/af/faadafac4be6330d3066a3cd40e22334.jpg",
    8: "https://i.pinimg.com/736x/0d/05/42/0d0542276cba70c6bd6970c8c7c7ef6a.jpg",
    36: "https://i.pinimg.com/736x/90/11/e3/9011e3f2c2ac0673c1644d58d02e7a2b.jpg",
  };

  // Егер universitiesData жоқ болса — бет бос қалмасын деп fallback
  const fallback = [
    { id: 2, name: "Nazarbayev University", country: "Қазақстан", city: "Астана", major: "IT", rating: 4.9, tuition: 0, grantAvailable: true, dormitory: true, ielts: true, description: "Халықаралық деңгейдегі заманауи зерттеу университеті." },
    { id: 3, name: "KBTU", country: "Қазақстан", city: "Алматы", major: "Инженерия", rating: 4.8, tuition: 1600000, grantAvailable: true, dormitory: true, ielts: true, description: "Техникалық және бизнес бағыттары бойынша жетекші университет." },
    { id: 4, name: "SDU University", country: "Қазақстан", city: "Қаскелең", major: "IT", rating: 4.7, tuition: 1400000, grantAvailable: true, dormitory: true, ielts: true, description: "IT, инженерия және педагогика бағыттарымен танымал." },
    { id: 7, name: "ENU - Л.Н. Гумилев атындағы ЕҰУ", country: "Қазақстан", city: "Астана", major: "Жалпы", rating: 4.6, tuition: 1100000, grantAvailable: true, dormitory: true, ielts: false, description: "Астанадағы ірі классикалық университет." },
    { id: 8, name: "Astana IT University", country: "Қазақстан", city: "Астана", major: "IT", rating: 4.6, tuition: 1500000, grantAvailable: true, dormitory: true, ielts: false, description: "Ақпараттық технологиялар бойынша заманауи университет." },
    { id: 36, name: "Maqsut Narikbayev University (MNU)", country: "Қазақстан", city: "Астана", major: "Құқық", rating: 4.6, tuition: 1800000, grantAvailable: true, dormitory: false, ielts: false, description: "MNU — құқық, бизнес және әлеуметтік ғылымдар бағыттарымен танымал заманауи университет." },
  ];

  const allUnis = JSON.parse(localStorage.getItem("universitiesData")) || fallback;

  const id = Number(getParam("id"));
  const uni = allUnis.find(u => u.id === id);

  const nameEl = document.getElementById("uniName");
  const locEl = document.getElementById("uniLocation");
  const badgesEl = document.getElementById("uniBadges");
  const statsEl = document.getElementById("uniStats");
  const descEl = document.getElementById("uniDesc");
  const moreEl = document.getElementById("uniMore");
  const whyEl = document.getElementById("uniWhy");
  const photoEl = document.getElementById("uniPhoto");
  const saveBtn = document.getElementById("saveUniBtn");

  if (!uni) {
    if (nameEl) nameEl.textContent = "Университет табылмады";
    if (locEl) locEl.textContent = "Сілтеме қате болуы мүмкін.";
    if (descEl) descEl.textContent = "Басты бетке оралып, қайта таңдаңыз.";
    if (saveBtn) saveBtn.style.display = "none";
    if (photoEl) photoEl.style.display = "none";
    return;
  }

  document.title = `${uni.name} - FutureMe`;

  if (nameEl) nameEl.textContent = uni.name;
  if (locEl) locEl.textContent = `📍 ${uni.city}, ${uni.country}`;
  if (descEl) descEl.textContent = uni.description || "";

  // ==== PHOTO: автоматты түрде PHOTO_URLS[id] арқылы алады ====
  const photoSrc = PHOTO_URLS[id] || "assets/img/universities/placeholder.jpg";

  if (photoEl) {
    photoEl.loading = "lazy";
    photoEl.decoding = "async";
    // cache bust:
    photoEl.src = `${photoSrc}${photoSrc.includes("?") ? "&" : "?"}v=${Date.now()}`;
    photoEl.alt = uni.name;

    photoEl.onerror = () => {
      photoEl.src = `assets/img/universities/placeholder.jpg?v=${Date.now()}`;
    };
  }

  // Badges
  if (badgesEl) {
    badgesEl.innerHTML = `
      <span class="uni-page-badge">${uni.major || "Жалпы"}</span>
      <span class="uni-page-badge">${uni.grantAvailable ? "Грант бар" : "Ақылы"}</span>
      <span class="uni-page-badge">${uni.ielts ? "IELTS керек" : "IELTS керек емес"}</span>
    `;
  }

  // Stats
  const tuitionText = uni.tuition === 0 ? "Грант негізінде" : `${Number(uni.tuition).toLocaleString("ru-RU")} ₸/жыл`;
  if (statsEl) {
    statsEl.innerHTML = `
      <div class="uni-page-stat"><span class="k">Рейтинг</span><span class="v">⭐ ${uni.rating ?? "-"}</span></div>
      <div class="uni-page-stat"><span class="k">Оқу ақысы</span><span class="v">${tuitionText}</span></div>
      <div class="uni-page-stat"><span class="k">Жатақхана</span><span class="v">${uni.dormitory ? "Бар" : "Жоқ"}</span></div>
    `;
  }

  if (moreEl) {
    moreEl.innerHTML = `
      <div><strong>Бағыт:</strong> ${uni.major || "-"}</div>
      <div><strong>Грант:</strong> ${uni.grantAvailable ? "✅ Бар" : "❌ Жоқ"}</div>
      <div><strong>IELTS:</strong> ${uni.ielts ? "📋 Керек" : "✓ Керек емес"}</div>
    `;
  }

  // Why (мысал)
  const why = [
    "Жақсы рейтинг және оқу бағдарламалары",
    "Студенттік орта және мүмкіндіктер",
    "Практика/жобалар арқылы тәжірибе жинау",
  ];
  if (whyEl) whyEl.innerHTML = why.map(x => `<li>${x}</li>`).join("");

  // Save toggle
  function isSavedForUser(userId, uniId) {
    const saved = JSON.parse(localStorage.getItem("savedUniversities")) || [];
    return saved.some(x => x.userId === userId && x.universityId === uniId);
  }

  function setSaveBtnState(saved) {
    if (!saveBtn) return;
    saveBtn.textContent = saved ? "✅ Сақталды" : "Сақтау";
    saveBtn.classList.toggle("saved", saved);
  }

  if (saveBtn) {
    const user = getCurrentUser();
    if (!user) {
      saveBtn.addEventListener("click", () => alert("Сақтау үшін алдымен жүйеге кіріңіз."));
    } else {
      setSaveBtnState(isSavedForUser(user.id, uni.id));

      saveBtn.addEventListener("click", () => {
        const u = getCurrentUser();
        if (!u) return;

        let saved = JSON.parse(localStorage.getItem("savedUniversities")) || [];
        const idx = saved.findIndex(x => x.userId === u.id && x.universityId === uni.id);

        if (idx >= 0) {
          saved.splice(idx, 1);
          localStorage.setItem("savedUniversities", JSON.stringify(saved));
          setSaveBtnState(false);
        } else {
          saved.push({ userId: u.id, universityId: uni.id, savedAt: new Date().toISOString() });
          localStorage.setItem("savedUniversities", JSON.stringify(saved));
          setSaveBtnState(true);
        }
      });
    }
  }
})();