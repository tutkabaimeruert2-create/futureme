document.addEventListener("DOMContentLoaded", () => {
  const majorsGrid = document.getElementById("majorsGrid");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const modal = document.getElementById("majorModal");
  const modalClose = modal.querySelector(".modal-close");
  const modalBody = document.getElementById("modalBody");

  let allMajors = [];

  async function fetchMajors() {
    try {
      const response = await fetch("majors.json");
      if (!response.ok) {
        throw new Error("Мамандықтар тізімін жүктеуде қате болды.");
      }
      allMajors = await response.json();
      renderMajors(allMajors);
    } catch (error) {
      console.error(error);
      majorsGrid.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
  }

  function renderMajors(majors) {
    if (majors.length === 0) {
      majorsGrid.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;"><h3>Ештеңе табылмады</h3><p>Іздеу параметрлерін өзгертіп көріңіз.</p></div>`;
      return;
    }

    majorsGrid.innerHTML = majors.map(major => `
      <div class="major-card" data-id="${major.id}">
        <div class="major-category">${major.category}</div>
        <h3>${major.name}</h3>
        <p>${major.description}</p>
        <button class="btn btn-outline detail-btn" data-id="${major.id}">Толығырақ</button>
      </div>
    `).join("");

    document.querySelectorAll(".major-card .detail-btn").forEach(btn => {
      btn.addEventListener("click", () => showModal(Number(btn.dataset.id)));
    });
  }

  function filterMajors() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    let filtered = allMajors.filter(major => {
      const matchesSearch = major.name.toLowerCase().includes(searchTerm);
      const matchesCategory = selectedCategory ? major.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });

    renderMajors(filtered);
  }

  function showModal(id) {
    const major = allMajors.find(m => m.id === id);
    if (!major) return;

    modalBody.innerHTML = `
      <h2>${major.name}</h2>
      <p><strong>Саласы:</strong> ${major.category}</p>
      <hr>
      <h4>Мамандық сипаттамасы:</h4>
      <p>${major.description}</p>
      <h4>Не істейді?</h4>
      <p>${major.duties}</p>
      <h4>Қандай қабілеттер керек?</h4>
      <p>${major.skills}</p>
      <h4>Болжамды жалақы:</h4>
      <p>${major.salary}</p>
      <h4>Қайда оқуға болады?</h4>
      <p>${major.universities.join(", ")}</p>
    `;
    modal.style.display = "flex";
  }

  // Event Listeners
  searchInput.addEventListener("input", filterMajors);
  categoryFilter.addEventListener("change", filterMajors);
  modalClose.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  fetchMajors();
});