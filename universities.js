document.addEventListener("DOMContentLoaded", () => {
  // ===========================================
  // Toast хабарлама функциясы
  // ===========================================
  function showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 4000);
  }

  // ===========================================
  // Университеттер деректер базасы (IELTS қосылды)
  // ===========================================
  const universities = [
    { id: 1, name: "Әл-Фараби атындағы ҚазҰУ", country: "Қазақстан", city: "Алматы", major: "Жалпы", rating: 4.8, tuition: 1200000, grantAvailable: true, dormitory: true, ielts: false, isTop: true, type: "kazakhstan", description: "Қазақстандағы ең ірі және беделді классикалық университет." },
    { id: 2, name: "Nazarbayev University", country: "Қазақстан", city: "Астана", major: "IT", rating: 4.9, tuition: 0, grantAvailable: true, dormitory: true, ielts: true, isTop: true, type: "kazakhstan", description: "Халықаралық деңгейдегі заманауи зерттеу университеті." },
    { id: 3, name: "KBTU", country: "Қазақстан", city: "Алматы", major: "Инженерия", rating: 4.8, tuition: 1600000, grantAvailable: true, dormitory: true, ielts: true, isTop: true, type: "kazakhstan", description: "Техникалық және бизнес бағыттары бойынша жетекші университет." },
    { id: 4, name: "SDU University", country: "Қазақстан", city: "Қаскелең", major: "IT", rating: 4.7, tuition: 1400000, grantAvailable: true, dormitory: true, ielts: true, isTop: false, type: "kazakhstan", description: "IT, инженерия және педагогика бағыттарымен танымал." },
    { id: 5, name: "Satbayev University", country: "Қазақстан", city: "Алматы", major: "Инженерия", rating: 4.7, tuition: 1300000, grantAvailable: false, dormitory: true, ielts: false, isTop: false, type: "kazakhstan", description: "Инженерлік және техникалық мамандықтар бойынша танымал." },
    { id: 6, name: "ҚазҰПУ", country: "Қазақстан", city: "Алматы", major: "Педагогика", rating: 4.5, tuition: 900000, grantAvailable: true, dormitory: true, ielts: false, isTop: false, type: "kazakhstan", description: "Педагогикалық бағыттағы алдыңғы қатарлы университет." },
    { id: 7, name: "ENU - Л.Н. Гумилев атындағы ЕҰУ", country: "Қазақстан", city: "Астана", major: "Жалпы", rating: 4.6, tuition: 1100000, grantAvailable: true, dormitory: true, ielts: false, isTop: false, type: "kazakhstan", description: "Астанадағы ірі классикалық университет.", photo: "assets/img/universities/enu.jpg" },
    { id: 8, name: "Astana IT University", country: "Қазақстан", city: "Астана", major: "IT", rating: 4.6, tuition: 1500000, grantAvailable: true, dormitory: true, ielts: false, isTop: false, type: "kazakhstan", description: "Ақпараттық технологиялар бойынша заманауи университет." },
    { id: 9, name: "Almaty Management University (AlmaU)", country: "Қазақстан", city: "Алматы", major: "Бизнес", rating: 4.5, tuition: 1800000, grantAvailable: true, dormitory: true, ielts: true, isTop: false, type: "kazakhstan", description: "Бизнес және менеджмент бағыттары бойынша танымал." },
    { id: 10, name: "M. Auezov South Kazakhstan University", country: "Қазақстан", city: "Шымкент", major: "Жалпы", rating: 4.4, tuition: 950000, grantAvailable: true, dormitory: true, ielts: false, isTop: false, type: "kazakhstan", description: "Оңтүстік Қазақстандағы ең ірі университет." },
    { id: 11, name: "Karaganda Technical University", country: "Қазақстан", city: "Қарағанды", major: "Инженерия", rating: 4.5, tuition: 1050000, grantAvailable: true, dormitory: true, ielts: false, isTop: false, type: "kazakhstan", description: "Техникалық бағыттағы жетекші университет." },
    { id: 12, name: "Karaganda Medical University", country: "Қазақстан", city: "Қарағанды", major: "Медицина", rating: 4.7, tuition: 1400000, grantAvailable: true, dormitory: true, ielts: false, isTop: false, type: "kazakhstan", description: "Медицина саласы бойынша беделді университет." },
    { id: 13, name: "West Kazakhstan Marat Ospanov Medical University", country: "Қазақстан", city: "Ақтөбе", major: "Медицина", rating: 4.4, tuition: 1200000, grantAvailable: true, dormitory: true, ielts: false, isTop: false, type: "kazakhstan", description: "Ақтөбедегі медициналық университет." },
    { id: 14, name: "Atyrau University", country: "Қазақстан", city: "Атырау", major: "Бизнес", rating: 4.3, tuition: 850000, grantAvailable: true, dormitory: true, ielts: false, isTop: false, type: "kazakhstan", description: "Атырау өңіріндегі көпсалалы университет." },
    { id: 15, name: "Toraighyrov University", country: "Қазақстан", city: "Павлодар", major: "Инженерия", rating: 4.4, tuition: 980000, grantAvailable: true, dormitory: true, ielts: false, isTop: false, type: "kazakhstan", description: "Павлодар өңіріндегі техникалық бағыттағы университет." },
    { id: 16, name: "D. Serikbayev East Kazakhstan Technical University", country: "Қазақстан", city: "Өскемен", major: "Инженерия", rating: 4.5, tuition: 1100000, grantAvailable: true, dormitory: true, ielts: false, isTop: false, type: "kazakhstan", description: "Шығыс Қазақстандағы техникалық университет." },
    { id: 17, name: "Khoja Akhmet Yassawi International Kazakh-Turkish University", country: "Қазақстан", city: "Түркістан", major: "Жалпы", rating: 4.4, tuition: 900000, grantAvailable: true, dormitory: true, ielts: true, isTop: false, type: "kazakhstan", description: "Түркістандағы халықаралық мәртебеге ие университет." },
    { id: 18, name: "Taraz Regional University", country: "Қазақстан", city: "Тараз", major: "Жалпы", rating: 4.2, tuition: 800000, grantAvailable: true, dormitory: true, ielts: false, isTop: false, type: "kazakhstan", description: "Жамбыл облысындағы ірі университет." },
    { id: 19, name: "Kostanay Regional University", country: "Қазақстан", city: "Қостанай", major: "Бизнес", rating: 4.3, tuition: 850000, grantAvailable: true, dormitory: true, ielts: false, isTop: false, type: "kazakhstan", description: "Қостанайдағы көпсалалы университет." },
    { id: 20, name: "North Kazakhstan University", country: "Қазақстан", city: "Петропавл", major: "Педагогика", rating: 4.2, tuition: 780000, grantAvailable: true, dormitory: true, ielts: false, isTop: false, type: "kazakhstan", description: "Солтүстік Қазақстандағы университет." },
    { id: 21, name: "Zhangir Khan West Kazakhstan Agrarian-Technical University", country: "Қазақстан", city: "Орал", major: "Инженерия", rating: 4.3, tuition: 950000, grantAvailable: true, dormitory: true, ielts: false, isTop: false, type: "kazakhstan", description: "Ауыл шаруашылығы және техникалық бағыттағы университет." },
    { id: 22, name: "Korkyt Ata Kyzylorda University", country: "Қазақстан", city: "Қызылорда", major: "Жалпы", rating: 4.1, tuition: 750000, grantAvailable: true, dormitory: true, ielts: false, isTop: false, type: "kazakhstan", description: "Қызылордадағы ірі университет." },
    { id: 23, name: "Semey Medical University", country: "Қазақстан", city: "Семей", major: "Медицина", rating: 4.6, tuition: 1350000, grantAvailable: true, dormitory: true, ielts: false, isTop: false, type: "kazakhstan", description: "Медицина саласы бойынша танымал университет." },
    { id: 24, name: "MIT", country: "АҚШ", city: "Кембридж", major: "Инженерия", rating: 5.0, tuition: 45000000, grantAvailable: true, dormitory: true, ielts: true, isTop: true, type: "international", description: "Әлемдегі ең үздік техникалық университеттердің бірі." },
    { id: 25, name: "Harvard University", country: "АҚШ", city: "Кембридж", major: "Медицина", rating: 5.0, tuition: 52000000, grantAvailable: true, dormitory: true, ielts: true, isTop: true, type: "international", description: "Әлемдік деңгейдегі ең беделді университет." },
    { id: 26, name: "Stanford University", country: "АҚШ", city: "Станфорд", major: "IT", rating: 5.0, tuition: 48000000, grantAvailable: true, dormitory: true, ielts: true, isTop: true, type: "international", description: "IT және инновациялар бойынша әлемдік көшбасшы." },
    { id: 27, name: "University of Oxford", country: "Ұлыбритания", city: "Оксфорд", major: "Жалпы", rating: 5.0, tuition: 38000000, grantAvailable: true, dormitory: true, ielts: true, isTop: true, type: "international", description: "Әлемдік рейтингте жоғары орын алатын университет." },
    { id: 28, name: "University of Cambridge", country: "Ұлыбритания", city: "Кембридж", major: "Жалпы", rating: 5.0, tuition: 37000000, grantAvailable: true, dormitory: true, ielts: true, isTop: true, type: "international", description: "Ғылым мен зерттеуде әлемдік көшбасшы." },
    { id: 29, name: "Imperial College London", country: "Ұлыбритания", city: "Лондон", major: "Инженерия", rating: 4.9, tuition: 42000000, grantAvailable: true, dormitory: true, ielts: true, isTop: false, type: "international", description: "Инженерия және медицина салаларында күшті." },
    { id: 30, name: "University of Toronto", country: "Канада", city: "Торонто", major: "Жалпы", rating: 4.9, tuition: 28000000, grantAvailable: true, dormitory: true, ielts: true, isTop: false, type: "international", description: "Канададағы үздік зерттеу университеттерінің бірі." },
    { id: 31, name: "University of Melbourne", country: "Австралия", city: "Мельбурн", major: "Бизнес", rating: 4.8, tuition: 32000000, grantAvailable: true, dormitory: true, ielts: true, isTop: false, type: "international", description: "Австралиядағы жетекші университет." },
    { id: 32, name: "Seoul National University", country: "Оңтүстік Корея", city: "Сеул", major: "IT", rating: 4.8, tuition: 15000000, grantAvailable: true, dormitory: true, ielts: true, isTop: false, type: "international", description: "Кореядағы ең беделді университет." },
    { id: 33, name: "Peking University", country: "Қытай", city: "Пекин", major: "Жалпы", rating: 4.8, tuition: 18000000, grantAvailable: true, dormitory: true, ielts: true, isTop: false, type: "international", description: "Қытайдағы ең танымал классикалық университеттердің бірі." },
    { id: 34, name: "University of Tokyo", country: "Жапония", city: "Токио", major: "Инженерия", rating: 4.9, tuition: 22000000, grantAvailable: true, dormitory: true, ielts: true, isTop: false, type: "international", description: "Жапониядағы ең үздік университет." },
    { id: 35, name: "National University of Singapore", country: "Сингапур", city: "Сингапур", major: "IT", rating: 4.9, tuition: 35000000, grantAvailable: true, dormitory: true, ielts: true, isTop: false, type: "international", description: "Азиядағы ең үздік университеттердің бірі." },
    { id: 36, name: "Maqsut Narikbayev University (MNU)", country: "Қазақстан", city: "Астана", major: "Құқық", rating: 4.6, tuition: 1800000, grantAvailable: true, dormitory: false, ielts: false, isTop: true, type: "kazakhstan", description: "MNU — құқық, бизнес және әлеуметтік ғылымдар бағыттарымен танымал заманауи университет.",photo: "assets/img/universities/mnu.jpg"}
  ];

  let compareList = [];

  // ===========================================
  // DOM элементтері
  // ===========================================
  const searchInput = document.getElementById("searchInput");
  const cityFilter = document.getElementById("cityFilter");
  const majorFilter = document.getElementById("majorFilter");
  const sortFilter = document.getElementById("sortFilter");
  
  // ЖАҢА ФИЛЬТРЛЕР
  const grantFilter = document.getElementById("grantFilter");
  const ieltsFilter = document.getElementById("ieltsFilter");
  const priceFilter = document.getElementById("priceFilter");
  
  const countEl = document.getElementById("universitiesCount");
  const kazakhstanList = document.getElementById("kazakhstanList");
  const internationalList = document.getElementById("internationalList");
  const comparePanel = document.getElementById("comparePanel");
  const compareBtn = document.getElementById("compareBtn");
  const clearCompareBtn = document.getElementById("clearCompareBtn");
  const modal = document.getElementById("uniModal");
  const modalClose = document.querySelector(".modal-close");
  const modalBody = document.getElementById("modalBody");
  const compareModal = document.getElementById("compareModal");
  const compareModalClose = document.getElementById("compareModalClose");
  const compareModalBody = document.getElementById("compareModalBody");

  // ===========================================
  // Қалаларды тізімге қосу
  // ===========================================
  try {
    const cities = [...new Set(universities.map(u => u.city))].sort();
    cities.forEach(city => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      if (cityFilter) cityFilter.appendChild(option);
    });
  } catch (e) { console.error("Қалалар фильтрін жасауда қате:", e); }

  function getSavedUniversities() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return [];
    const saved = JSON.parse(localStorage.getItem("savedUniversities")) || [];
    return saved.filter(item => item.userId === currentUser.id).map(item => item.universityId);
  }

  // ===========================================
  // Университет картасын жасау
  // ===========================================
  function universityCard(uni, idx = 0) {
  const savedUniversities = getSavedUniversities();
  const isSaved = savedUniversities.includes(uni.id);
    
  // Логотип optional: uni.logo болса сурет, болмаса қысқа мәтін (KBTU, NU т.б.)
  const short = (uni.name || "").split(" ").slice(0,1).join("").substring(0,4).toUpperCase();
  const avatar = uni.logo
    ? `<img src="${uni.logo}" alt="${uni.name} logo" loading="lazy">`
    : `<span>${short || "UNI"}</span>`;

  const pct = Math.max(0, Math.min(100, Math.round((uni.rating / 5) * 100)));
  const tuitionText = uni.tuition === 0 ? "Грант" : `${uni.tuition.toLocaleString('ru-RU')} ₸/жыл`;

  // Қосымша инфо (бар деректерден)
  const partners = uni.type === "international" ? "Global partners" : "Local + Global";
  const employment = Math.max(80, Math.min(98, Math.round(uni.rating * 20))); // 4.6 -> 92% (демо)

  return `
    <div class="uni-card premium-uni" data-aos="fade-up" data-aos-delay="${Math.min(idx * 60, 420)}">
      <div class="puni-top">
        <div class="puni-left">
          <div class="puni-avatar">${avatar}</div>
          <div>
            <h3 class="puni-title">${uni.name}</h3>
            <p class="puni-loc">📍 ${uni.city}, ${uni.country}</p>
          </div>
        </div>

        <div class="puni-rating">
          <div class="puni-score"><i class="fas fa-star"></i> ${uni.rating.toFixed(1)}</div>
          <div class="puni-bar"><span style="width:${pct}%"></span></div>
        </div>
      </div>

      <p class="puni-desc">${uni.description}</p>

      <div class="puni-stats">
        <div class="puni-stat">
          <span class="k">Оқу ақысы</span>
          <span class="v">${tuitionText}</span>
        </div>
        <div class="puni-stat">
          <span class="k">Employment rate</span>
          <span class="v">${employment}%</span>
        </div>
        <div class="puni-stat">
          <span class="k">Серіктестер</span>
          <span class="v">${partners}</span>
        </div>
        <div class="puni-stat">
          <span class="k">Грант</span>
          <span class="v">${uni.grantAvailable ? "Бар" : "Жоқ"}</span>
        </div>
      </div>

      <div class="puni-tags">
        <span class="puni-tag">${uni.major}</span>
        <span class="puni-tag">${uni.type === "kazakhstan" ? "Қазақстан" : "Шетел"}</span>
        <span class="puni-tag">${uni.ielts ? "IELTS керек" : "IELTS керек емес"}</span>
      </div>

      <div class="uni-actions" style="margin-top:14px;">
        <button class="btn btn-outline detail-btn" data-id="${uni.id}">Толығырақ</button>
        <button class="btn btn-primary compare-add-btn" data-id="${uni.id}">Салыстыру</button>
        <button class="btn btn-primary save-btn ${isSaved ? 'saved' : ''}" data-id="${uni.id}">
          ${isSaved ? '✅ Сақталды' : 'Сақтау'}
        </button>
      </div>
    </div>
  `;
}

  function renderUniversities(data) {
    try {
      const kazakhstan = data.filter(u => u.type === "kazakhstan");
      const international = data.filter(u => u.type === "international");
      
      if (countEl) countEl.textContent = `${data.length} университет табылды`;
      
      if (kazakhstanList) kazakhstanList.innerHTML = kazakhstan.map((u,i)=>universityCard(u,i)).join("");
      if (internationalList) internationalList.innerHTML = international.map((u,i)=>universityCard(u,i)).join("");
      if (window.AOS) AOS.refreshHard();
      // Оқиға тыңдаушыларын қосу
      document.querySelectorAll(".detail-btn").forEach(btn => 
        btn.addEventListener("click", () => showModal(Number(btn.dataset.id)))
      );
      document.querySelectorAll(".compare-add-btn").forEach(btn => 
        btn.addEventListener("click", () => addToCompare(Number(btn.dataset.id)))
      );
      document.querySelectorAll(".save-btn").forEach(btn => {
        btn.addEventListener("click", toggleSaveUniversity);
      });
    } catch(e) { console.error("Университеттерді рендерлеуде қате:", e); }
  }

  // ===========================================
  // Негізгі ФИЛЬТРЛЕУ ФУНКЦИЯСЫ (Жаңартылған)
  // ===========================================
  function filterAndSort() {
  try {
    let filtered = [...universities];
    
    // 1. Іздеу (Search)
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
    if (searchTerm) {
      filtered = filtered.filter(u => u.name.toLowerCase().includes(searchTerm));
    }
    
    // 2. Қала (City)
    const selectedCity = cityFilter ? cityFilter.value : "";
    if (selectedCity) {
      filtered = filtered.filter(u => u.city === selectedCity);
    }
    
    // 3. Мамандық (Major)
    const selectedMajor = majorFilter ? majorFilter.value : "";
    if (selectedMajor) {
      filtered = filtered.filter(u => u.major === selectedMajor);
    }
    
    // 4. ГРАНТ
    const grantValue = grantFilter ? grantFilter.value : "";
    if (grantValue === "true") {
      filtered = filtered.filter(u => u.grantAvailable === true);
    } else if (grantValue === "false") {
      filtered = filtered.filter(u => u.grantAvailable === false);
    }
    
    // 5. IELTS
    const ieltsValue = ieltsFilter ? ieltsFilter.value : "";
    if (ieltsValue === "true") {
      filtered = filtered.filter(u => u.ielts === true);
    } else if (ieltsValue === "false") {
      filtered = filtered.filter(u => u.ielts === false);
    }
    
    // 6. БАҒА (ТҮЗЕТІЛДІ)
    // Егер слайдер соңында тұрса (80 млн), бағаға қарамай бәрін көрсетеді
    const maxPrice = priceFilter ? parseInt(priceFilter.value) : 80000000;
    if (maxPrice < 80000000) {
        filtered = filtered.filter(u => u.tuition <= maxPrice);
    }
    
    // Баға лейблін жаңарту (Миллионмен көрсету)
    if (document.getElementById('priceLabel')) {
        document.getElementById('priceLabel').textContent = 
            maxPrice >= 1000000 ? (maxPrice / 1000000).toFixed(0) + " млн" : maxPrice.toLocaleString();
    }
    
    // 7. Сұрыптау (Sort)
    const sortType = sortFilter ? sortFilter.value : "rating-desc";
    if (sortType === "rating-desc") filtered.sort((a, b) => b.rating - a.rating);
    if (sortType === "rating-asc") filtered.sort((a, b) => a.rating - b.rating);
    if (sortType === "tuition-asc") filtered.sort((a, b) => a.tuition - b.tuition);
    if (sortType === "tuition-desc") filtered.sort((a, b) => b.tuition - a.tuition);
    
    renderUniversities(filtered);
  } catch(e) { 
    console.error("Фильтрлеуде қате:", e); 
  }
}

  function showModal(id) {
    const uni = universities.find(u => u.id === id);
    if (!uni || !modalBody || !modal) return;
    
    modalBody.innerHTML = `
      <h2>${uni.name}</h2>
      <div class="modal-info-grid">
        <p><strong>Қала:</strong> ${uni.city}, ${uni.country}</p>
        <p><strong>Бағыт:</strong> ${uni.major}</p>
        <p><strong>Рейтинг:</strong> ⭐ ${uni.rating}</p>
        <p><strong>Оқу ақысы:</strong> ${uni.tuition === 0 ? "Грант негізінде" : uni.tuition.toLocaleString('ru-RU') + " ₸/жыл"}</p>
        <p><strong>Грант мүмкіндігі:</strong> ${uni.grantAvailable ? "✅ Иә" : "❌ Жоқ"}</p>
        <p><strong>IELTS талабы:</strong> ${uni.ielts ? "📋 Иә, керек" : "✓ Керек емес"}</p>
        <p><strong>Жатақхана:</strong> ${uni.dormitory ? "✅ Бар" : "❌ Жоқ"}</p>
      </div>
      <div class="modal-description">
        <h3>Сипаттама</h3>
        <p>${uni.description}</p>
      </div>
    `;
    modal.style.display = "flex";
  }

  function addToCompare(id) {
    if (compareList.length >= 3) { 
      showToast("Ең көп 3 университет таңдауға болады.", "error"); 
      return; 
    }
    if (compareList.includes(id)) { 
      showToast("Бұл университет бұрын таңдалған.", "error"); 
      return; 
    }
    compareList.push(id);
    updateComparePanel();
    showToast("Салыстыру тізіміне қосылды!");
  }

  function updateComparePanel() {
    const compareItemsContainer = document.getElementById("compareItems");
    if (!comparePanel || !compareItemsContainer) return;
    
    if (compareList.length > 0) {
      comparePanel.style.display = "flex";
      document.getElementById("compareNum").textContent = compareList.length;
      compareItemsContainer.innerHTML = compareList.map(id => {
        const uni = universities.find(u => u.id === id);
        return `<div class="compare-item"><span>${uni.name}</span><span class="compare-item-remove" data-id="${id}">&times;</span></div>`;
      }).join("");
      
      document.querySelectorAll(".compare-item-remove").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const idToRemove = Number(e.target.dataset.id);
          compareList = compareList.filter(id => id !== idToRemove);
          updateComparePanel();
        });
      });
    } else {
      comparePanel.style.display = "none";
      compareItemsContainer.innerHTML = "";
    }
  }

    // Сақтау батырмасын қосу/өшіру (Toggle)
    function toggleSaveUniversity(event) {
    const btn = event.currentTarget;
    const id = Number(btn.dataset.id);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser) { 
      showToast("Сақтау үшін алдымен жүйеге кіріңіз.", "error"); 
      return; 
    }
    
    let saved = JSON.parse(localStorage.getItem("savedUniversities")) || [];
    const index = saved.findIndex(item => item.universityId === id && item.userId === currentUser.id);

    if (index > -1) {
      // Егер бұрын сақталған болса - ӨШІРУ
      saved.splice(index, 1);
      localStorage.setItem("savedUniversities", JSON.stringify(saved));
      
      // БАТЫРМАНЫ БҰРЫНҒЫ ҚАЛПЫНА КЕЛТІРУ (КӨК ТҮС)
      btn.innerHTML = 'Сақтау';
      btn.classList.remove('saved');
      showToast("Тізімнен өшірілді", "info");
    } else {
      // ЕГЕР САҚТАЛМАҒАН БОЛСА - ҚОСУ
      saved.push({ userId: currentUser.id, universityId: id, savedAt: new Date().toISOString() });
      localStorage.setItem("savedUniversities", JSON.stringify(saved));
      
      // БАТЫРМАНЫ ЖАСЫЛ ТҮСКЕ АУЫСТЫРУ
      btn.innerHTML = '✅ Сақталды';
      btn.classList.add('saved');
      showToast("Университет сақталды!");
    }
  }

  // Рендерленгеннен кейін батырмаға оқиға тыңдаушысын қосу керек (renderUniversities ішінде)
  // Мысалы: 
  // document.querySelectorAll(".save-btn").forEach(btn => btn.addEventListener("click", toggleSaveUniversity));
    
  function showCompareModal() {
    if (!compareModalBody || compareList.length === 0) return;
    const selectedUnis = compareList.map(id => universities.find(u => u.id === id));
    
    let tableHTML = `<h2>Университеттерді салыстыру</h2><table class="compare-table"><tr class="header-row"><th class="param-col">Параметр</th>`;
    selectedUnis.forEach(uni => { tableHTML += `<th>${uni.name}</th>`; });
    tableHTML += `</tr>`;
    
    const params = [
      { key: 'rating', label: 'Рейтинг' },
      { key: 'tuition', label: 'Оқу ақысы (жылдық)' },
      { key: 'grantAvailable', label: 'Грант', isBool: true },
      { key: 'ielts', label: 'IELTS талабы', isBool: true },
      { key: 'dormitory', label: 'Жатақхана', isBool: true },
      { key: 'city', label: 'Қала' },
      { key: 'country', label: 'Ел' },
      { key: 'major', label: 'Негізгі бағыт' },
    ];
    
    params.forEach(param => {
      tableHTML += `<tr><td class="param-col">${param.label}</td>`;
      selectedUnis.forEach(uni => {
        let value = uni[param.key];
        if (param.key === 'tuition') {
          value = uni.tuition === 0 ? "Грант негізінде" : `${uni.tuition.toLocaleString('ru-RU')} ₸`;
        } else if (param.isBool) {
          value = value ? '✅ Бар' : '❌ Жоқ';
        }
        tableHTML += `<td>${value}</td>`;
      });
      tableHTML += `</tr>`;
    });
    
    tableHTML += `</table>`;
    compareModalBody.innerHTML = tableHTML;
    compareModal.style.display = "flex";
  }

  // ===========================================
  // Оқиғаларды тыңдау (Event Listeners)
  // ===========================================
  if (searchInput) searchInput.addEventListener("input", filterAndSort);
  if (cityFilter) cityFilter.addEventListener("change", filterAndSort);
  if (majorFilter) majorFilter.addEventListener("change", filterAndSort);
  if (sortFilter) sortFilter.addEventListener("change", filterAndSort);
  
  // ЖАҢА ФИЛЬТРЛЕР тыңдаушылары
  if (grantFilter) grantFilter.addEventListener("change", filterAndSort);
  if (ieltsFilter) ieltsFilter.addEventListener("change", filterAndSort);
  if (priceFilter) priceFilter.addEventListener("input", filterAndSort);

  if (compareBtn) {
    compareBtn.addEventListener("click", () => {
      if (compareList.length < 2) {
        showToast("Салыстыру үшін кемінде 2 университет таңдаңыз.", "error");
        return;
      }
      showCompareModal();
    });
  }
  
  if (clearCompareBtn) clearCompareBtn.addEventListener("click", () => { 
    compareList = []; 
    updateComparePanel(); 
  });
  
  if (compareModalClose) compareModalClose.addEventListener("click", () => compareModal.style.display = "none");
  if (modalClose) modalClose.addEventListener("click", () => modal.style.display = "none");
  
  window.addEventListener("click", (e) => {
    if (e.target === modal || e.target === compareModal) {
      if(modal) modal.style.display = "none";
      if(compareModal) compareModal.style.display = "none";
    }
  });

  // ===========================================
  // Бастапқы жүктеу
  // ===========================================
  filterAndSort();

  function saveUniversitiesToLocalStorage() {
    localStorage.setItem("universitiesData", JSON.stringify(universities));
  }
  saveUniversitiesToLocalStorage();
});
// Сақтау батырмасын басқанда орындалатын функция
window.handleSaveClick = function(id, event) {
  const btn = event.currentTarget;
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  if (!currentUser) { 
    showToast("Сақтау үшін алдымен жүйеге кіріңіз.", "error"); 
    return; 
  }
  
  let saved = JSON.parse(localStorage.getItem("savedUniversities")) || [];
  const index = saved.findIndex(item => item.universityId === id && item.userId === currentUser.id);

  if (index > -1) {
    // 1. Егер бұрын сақталған болса - ӨШІРУ (БҰРЫНҒЫ ҚАЛПЫНА КЕЛТІРУ)
    saved.splice(index, 1);
    localStorage.setItem("savedUniversities", JSON.stringify(saved));
    
    // UI-ды көк түске қайтару
    btn.innerHTML = 'Сақтау';
    btn.classList.remove('saved'); 
    showToast("Тізімнен өшірілді", "info");
  } else {
    // 2. Егер сақталмаған болса - САҚТАУ (ЖАСЫЛ ЕТУ)
    saved.push({ userId: currentUser.id, universityId: id, savedAt: new Date().toISOString() });
    localStorage.setItem("savedUniversities", JSON.stringify(saved));
    
    // UI-ды жасыл ету
    btn.innerHTML = '✅ Сақталды';
    btn.classList.add('saved'); 
    showToast("Университет сақталды!");
  }
}