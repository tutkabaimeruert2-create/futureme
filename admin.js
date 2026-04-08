document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("adminModal");
  const modalClose = modal.querySelector(".modal-close");
  const modalBody = modal.querySelector("#modalBody");

  let universities = JSON.parse(localStorage.getItem("universitiesData")) || [];
  let majors = JSON.parse(localStorage.getItem("majorsData")) || [];
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Dashboard статистикасы
  document.getElementById("usersCount").textContent = users.length;
  document.getElementById("universitiesCountAdmin").textContent = universities.length;
  document.getElementById("majorsCount").textContent = majors.length;

  function renderUniversities() {
    const list = document.getElementById("uniList");
    list.innerHTML = universities.map(uni => `
      <div class="admin-item">
        <span>${uni.name}</span>
        <div>
          <button class="btn-sm btn-edit" data-type="uni" data-id="${uni.id}">Өзгерту</button>
          <button class="btn-sm btn-delete" data-type="uni" data-id="${uni.id}">Өшіру</button>
        </div>
      </div>
    `).join("");
  }

  function renderMajors() {
    const list = document.getElementById("majorList");
    list.innerHTML = majors.map(major => `
      <div class="admin-item">
        <span>${major.name}</span>
        <div>
          <button class="btn-sm btn-edit" data-type="major" data-id="${major.id}">Өзгерту</button>
          <button class="btn-sm btn-delete" data-type="major" data-id="${major.id}">Өшіру</button>
        </div>
      </div>
    `).join("");
  }
  
  // Қосу, өзгерту, өшіру функциялары (прототип)
  document.getElementById("addUniBtn").addEventListener("click", () => {
    alert("Бұл функция backend қосылғанда іске асады.");
  });

  document.getElementById("addMajorBtn").addEventListener("click", () => {
    alert("Бұл функция backend қосылғанда іске асады.");
  });
  
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-edit')) {
      alert("Өзгерту функциясы әзірленуде.");
    }
    if (e.target.classList.contains('btn-delete')) {
      const type = e.target.dataset.type;
      const id = Number(e.target.dataset.id);
      if (confirm("Шынымен өшіргіңіз келе ме?")) {
        if (type === 'uni') {
          universities = universities.filter(u => u.id !== id);
          localStorage.setItem("universitiesData", JSON.stringify(universities));
          renderUniversities();
        }
        if (type === 'major') {
          majors = majors.filter(m => m.id !== id);
          localStorage.setItem("majorsData", JSON.stringify(majors));
          renderMajors();
        }
        alert("Элемент өшірілді!");
        location.reload(); // Статистиканы жаңарту үшін бетті қайта жүктеу
      }
    }
  });

  // Modal жабу
  modalClose.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  renderUniversities();
  renderMajors();
});