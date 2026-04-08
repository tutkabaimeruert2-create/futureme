(function () {
  const data = {
    it: {
      title: "IT және бағдарламалау",
      subtitle: "Backend, Frontend, Mobile, AI бағыттары",
      icon: "fas fa-code",
      description:
        "IT — бағдарламалар, сайттар, мобильді қосымшалар және жасанды интеллект шешімдерін жасау саласы.",
      duration: "3–4 жыл",
      salary: "250k–1.5M ₸+",
      entry: "Логика + практика",
      subjects: ["Математика", "Информатика", "Ағылшын тілі"],
      traits: ["Логикалық ойлау", "Төзімділік", "Үздіксіз үйрену", "Командалық жұмыс"],
      roadmap: [
        "Негіздер: алгоритм, айнымалы, цикл, шарт",
        "Git/GitHub және командалық жұмыс",
        "Бір бағыт таңда: Frontend немесе Backend",
        "Портфолио: 2–3 жоба (сайт/қосымша/API)",
        "Интервью дайындық + тәжірибе/стажировка",
      ],
      skills: ["Логика", "Алгоритм", "Ағылшын тілі", "Командалық жұмыс"],
      tools: ["VS Code", "Git", "Figma (негіз)", "Linux basics"],
      jobs: ["Backend Developer", "Frontend Developer", "Data Analyst", "ML Engineer"],
      pros: ["Жоғары сұраныс", "Қашықтан жұмыс мүмкіндігі", "Тез өсу (skill-based)"],
      cons: ["Тұрақты оқу керек", "Ұзақ отырып жұмыс", "Жобалық стресс болуы мүмкін"],
    },

    medicine: {
      title: "Медицина",
      subtitle: "Адам денсаулығы және емдеу бағыты",
      icon: "fas fa-stethoscope",
      description:
        "Медицина — диагностика, емдеу, профилактика және ғылыми-зерттеу арқылы адамдарға көмектесетін сала.",
      duration: "5–7+ жыл",
      salary: "200k–1.2M ₸+",
      entry: "Ұқыптылық + биология",
      subjects: ["Биология", "Химия", "Оқу дағдысы"],
      traits: ["Жауапкершілік", "Эмпатия", "Төзімділік", "Дисциплина"],
      roadmap: [
        "Биология/химия негіздерін жүйелеу",
        "Анатомия/терминологиямен тұрақты жұмыс",
        "Практика: клиникалық ойлау дағдысы",
        "Резидентура/мамандану бағытын таңдау",
        "Тәжірибе және үздіксіз біліктілікті арттыру",
      ],
      skills: ["Биология", "Химия", "Жауапкершілік", "Эмпатия"],
      tools: ["Клиникалық ойлау", "Терминология", "Конспект жүйесі"],
      jobs: ["Хирург", "Педиатр", "Стоматолог", "Фармацевт"],
      pros: ["Мағыналы жұмыс", "Тұрақты сұраныс", "Карьера жолы кең"],
      cons: ["Оқу ұзақ", "Жүктеме жоғары", "Үлкен жауапкершілік"],
    },

    engineering: {
      title: "Инженерия",
      subtitle: "Техника, құрылыс және өндірістік шешімдер",
      icon: "fas fa-gears",
      description:
        "Инженерия — жобалау, есептеу, құрастыру және жүйелерді тиімді ету бағытындағы мамандықтар жиынтығы.",
      duration: "4 жыл",
      salary: "250k–1.3M ₸+",
      entry: "Физика + есеп",
      subjects: ["Математика", "Физика", "Сызба/графика"],
      traits: ["Талдау", "Нақтылық", "Жүйелік ойлау", "Практикаға жақындық"],
      roadmap: [
        "Математика/физика базасын бекіту",
        "Сызба және инженерлік ойлау",
        "CAD құралдарымен танысу (негіз)",
        "Жоба: макет/есеп/жобалау жұмыстары",
        "Өндірістік практика/стажировка",
      ],
      skills: ["Физика", "Математика", "Сызба", "Талдау"],
      tools: ["AutoCAD / SolidWorks (негіз)", "Excel", "Project thinking"],
      jobs: ["Құрылыс инженері", "Механик-инженер", "Робототехник", "Электроинженер"],
      pros: ["Нақты өнім/жоба нәтижесі", "Өнеркәсіпте сұраныс", "Мамандық түрлері көп"],
      cons: ["Күрделі есептер", "Жоба жауапкершілігі", "Кейде далалық жұмыс"],
    },

    pedagogy: {
      title: "Педагогика",
      subtitle: "Оқыту, тәрбие және дамыту саласы",
      icon: "fas fa-chalkboard-teacher",
      description:
        "Педагогика — білім беру, балалармен/жастармен жұмыс, әдістеме және психологиямен байланысты сала.",
      duration: "3–4 жыл",
      salary: "180k–700k ₸+",
      entry: "Коммуникация + әдістеме",
      subjects: ["Қазақ тілі", "Психология негіздері", "Пәндік білім"],
      traits: ["Шыдамдылық", "Коммуникация", "Жауапкершілік", "Түсіндіре білу"],
      roadmap: [
        "Пәндік базаны күшейту",
        "Оқыту әдістемесі және жоспарлау",
        "Сабақ жүргізу практикасы",
        "Портфолио: сабақ жоспарлары, нәтижелер",
        "Біліктілікті арттыру курстары",
      ],
      skills: ["Коммуникация", "Шыдамдылық", "Жоспарлау", "Психология негіздері"],
      tools: ["Google Classroom", "PowerPoint", "Lesson planning"],
      jobs: ["Мұғалім", "Тәрбиеші", "Психолог", "Логопед"],
      pros: ["Қоғамға әсер", "Тұрақты жұмыс", "Өсу мүмкіндігі бар"],
      cons: ["Эмоциялық жүктеме", "Сабаққа дайындық уақыт алады", "Сабыр керек"],
    },

    business: {
      title: "Бизнес және экономика",
      subtitle: "Қаржы, маркетинг, менеджмент",
      icon: "fas fa-chart-line",
      description:
        "Бизнес — нарық, өнім, сату, стратегия және қаржы арқылы компанияны дамытуға бағытталған сала.",
      duration: "3–4 жыл",
      salary: "200k–1.5M ₸+",
      entry: "Аналитика + коммуникация",
      subjects: ["Математика", "Қаржы сауаты", "Ағылшын тілі"],
      traits: ["Көшбасшылық", "Келіссөз", "Стратегиялық ойлау", "Жауапкершілік"],
      roadmap: [
        "Қаржы/экономика негіздері",
        "Маркетинг, сату, өнім түсінігі",
        "Кейс талдау (аптасына 1)",
        "Жоба: шағын бизнес/стартап идея",
        "Стажировка/тәжірибе (sales/finance)",
      ],
      skills: ["Аналитика", "Қаржы сауаты", "Келіссөз", "Жоспарлау"],
      tools: ["Excel", "Power BI (негіз)", "CRM түсінігі"],
      jobs: ["Маркетолог", "Қаржыгер", "Менеджер", "Бизнес-аналитик"],
      pros: ["Карьера әртүрлі", "Жоғары табыс мүмкіндігі", "Басқару дағдысы"],
      cons: ["Нәтиже қысымы", "Бәсеке жоғары", "Коммуникация көп"],
    },

    law: {
      title: "Құқық",
      subtitle: "Заң, құқық қорғау, құқықтық кеңес",
      icon: "fas fa-scale-balanced",
      description:
        "Құқық саласы — заңнаманы түсіну, қорғау, құжаттармен жұмыс және процестерді жүргізу.",
      duration: "4 жыл",
      salary: "200k–1.2M ₸+",
      entry: "Оқу + талдау",
      subjects: ["Тілдік сауат", "Логика", "Тарих/қоғам"],
      traits: ["Тиянақтылық", "Жауапкершілік", "Сөйлеу мәдениеті", "Талдау"],
      roadmap: [
        "Заң негіздері + құқық салаларын түсіну",
        "Құжат/іс жүргізу дағдылары",
        "Кейс, сот практикасын оқу",
        "Практика: заң кеңсесі/мем.органдар",
        "Мамандану (civil/criminal/corporate)",
      ],
      skills: ["Оқу және талдау", "Логика", "Сөйлеу мәдениеті", "Жауапкершілік"],
      tools: ["Құжаттар", "Норматив база", "Кейс талдау"],
      jobs: ["Заңгер", "Адвокат", "Прокурор", "Нотариус"],
      pros: ["Қоғамда маңызды", "Әртүрлі салада керек", "Жоғары деңгейге өсу мүмкін"],
      cons: ["Жауапкершілік жоғары", "Көп оқу", "Құжат жұмысы көп"],
    },

    design: {
      title: "Дизайн",
      subtitle: "UX/UI, графика, визуал коммуникация",
      icon: "fas fa-pen-nib",
      description:
        "Дизайн — визуал шешімдер арқылы қолданушыға ыңғайлы әрі тартымды өнім жасау бағыты.",
      duration: "3–4 жыл",
      salary: "200k–1.3M ₸+",
      entry: "Портфолио маңызды",
      subjects: ["Композиция", "Түс", "Коммуникация"],
      traits: ["Креатив", "Талғам", "Зейін", "Эмпатия (UX үшін)"],
      roadmap: [
        "Композиция/типографика/түстер",
        "Figma: UI жинау",
        "UX негіздері: research + wireframe",
        "Портфолио: 3 кейс (case study)",
        "Freelance/стажировка арқылы тәжірибе",
      ],
      skills: ["Креатив", "Композиция", "Типографика", "Figma/Adobe"],
      tools: ["Figma", "Photoshop/Illustrator", "Notion (case)"],
      jobs: ["UX/UI дизайнер", "Графикалық дизайнер", "Motion дизайнер", "Product дизайнер"],
      pros: ["Креативті жұмыс", "Портфолиомен өсесің", "Халықаралық нарық мүмкін"],
      cons: ["Дәм/UX талабы жоғары", "Көп итерация", "Портфолио керек"],
    },

    journalism: {
      title: "Журналистика",
      subtitle: "Медиа, контент және коммуникация",
      icon: "fas fa-newspaper",
      description:
        "Журналистика — ақпарат жинау, тексеру, жазу және аудиторияға жеткізу; медиа саласының негізгі бағыты.",
      duration: "3–4 жыл",
      salary: "180k–900k ₸+",
      entry: "Жазу + ізденіс",
      subjects: ["Тіл", "Әдебиет", "Сыни ойлау"],
      traits: ["Қызығушылық", "Жауапкершілік", "Коммуникация", "Жылдам үйрену"],
      roadmap: [
        "Жазу дағдысы: күнделікті практика",
        "Сұхбат алу және ақпарат тексеру",
        "SMM/контент форматтары (бейне/мәтін)",
        "Портфолио: мақалалар/видео",
        "Редакция/медиа практика",
      ],
      skills: ["Жазу", "Сұхбат", "Талдау", "SMM негіздері"],
      tools: ["Google Docs", "Canva", "CapCut/Premiere (негіз)"],
      jobs: ["Журналист", "Редактор", "PR маман", "Контент-мейкер"],
      pros: ["Қоғаммен байланыс", "Креатив + коммуникация", "Әртүрлі тақырып"],
      cons: ["Дедлайн көп", "Бәсеке", "Ақпарат жауапкершілігі"],
    },
  };

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function renderChips(containerId, items) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = (items || []).map(t => `<span class="recommended-item">${t}</span>`).join("");
  }

  function renderBullets(containerId, items) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = (items || []).map(t => `<li>${t}</li>`).join("");
  }

  function renderRoadmap(containerId, items) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = (items || []).map(t => `<li>${t}</li>`).join("");
  }

  const key = getParam("dir");
  const item = data[key];

  const titleEl = document.getElementById("dirTitle");
  const subtitleEl = document.getElementById("dirSubtitle");
  const descEl = document.getElementById("dirDescription");
  const iconEl = document.getElementById("dirIcon");
  const metricsEl = document.getElementById("dirMetrics");

  if (!item) {
    if (titleEl) titleEl.textContent = "Бағыт табылмады";
    if (subtitleEl) subtitleEl.textContent = "Сілтеме дұрыс емес болуы мүмкін.";
    if (descEl) descEl.textContent = "Басты бетке оралып, бағытты қайта таңдаңыз.";
    return;
  }

  document.title = item.title + " - FutureMe";
  if (titleEl) titleEl.textContent = item.title;
  if (subtitleEl) subtitleEl.textContent = item.subtitle;
  if (descEl) descEl.textContent = item.description;

  if (iconEl) iconEl.className = item.icon || "fas fa-layer-group";

  if (metricsEl) {
    metricsEl.innerHTML = `
      <div class="dir-metric"><span class="k">Оқу ұзақтығы</span><span class="v">${item.duration || "-"}</span></div>
      <div class="dir-metric"><span class="k">Жалақы (шамамен)</span><span class="v">${item.salary || "-"}</span></div>
      <div class="dir-metric"><span class="k">Кіру шарты</span><span class="v">${item.entry || "-"}</span></div>
    `;
  }

  renderChips("dirTraits", item.traits);
  renderChips("dirSubjects", item.subjects);
  renderRoadmap("dirRoadmap", item.roadmap);
  renderChips("dirSkills", item.skills);
  renderChips("dirJobs", item.jobs);
  renderChips("dirTools", item.tools);
  renderBullets("dirPros", item.pros);
  renderBullets("dirCons", item.cons);
})();