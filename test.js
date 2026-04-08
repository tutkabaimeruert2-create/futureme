document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    {
      question: "Қай іс-әрекет сізге көбірек ұнайды?",
      answers: [
        { text: "Компьютермен жұмыс істеу", type: "tech" },
        { text: "Сурет салу немесе дизайн жасау", type: "creative" },
        { text: "Адамдарға көмектесу", type: "social" },
        { text: "Сауда немесе табыс табу жолын ойлау", type: "business" },
      ],
    },
    {
      question: "Мектепте қай пән сізге көбірек ұнайды?",
      answers: [
        { text: "Математика / Информатика", type: "tech" },
        { text: "Сызу / Әдебиет / Өнер", type: "creative" },
        { text: "Биология / Тарих", type: "social" },
        { text: "География / Экономика", type: "business" },
      ],
    },
    {
      question: "Бос уақытыңызда не істегенді ұнатасыз?",
      answers: [
        { text: "Бағдарлама, ойын, технология қарау", type: "tech" },
        { text: "Видео, фото, музыка, дизайн жасау", type: "creative" },
        { text: "Достармен сөйлесу, көмек беру", type: "social" },
        { text: "Жобалар, жоспар, ақша туралы ойлау", type: "business" },
      ],
    },
    {
      question: "Қандай ортада өзіңізді жақсы сезінесіз?",
      answers: [
        { text: "Логика мен жүйе бар ортада", type: "tech" },
        { text: "Еркін, шығармашылық ортада", type: "creative" },
        { text: "Команда және адамдар ортасында", type: "social" },
        { text: "Бәсеке мен даму бар ортада", type: "business" },
      ],
    },
    {
      question: "Қандай тапсырмалар сізге қызығырақ?",
      answers: [
        { text: "Мәселе шешу, код жазу", type: "tech" },
        { text: "Жаңа идея ойлап табу", type: "creative" },
        { text: "Түсіндіру, оқыту, қолдау", type: "social" },
        { text: "Ұйымдастыру, басқару", type: "business" },
      ],
    },
    {
      question: "Болашақ жұмысыңызда не маңызды?",
      answers: [
        { text: "Технологиямен жұмыс", type: "tech" },
        { text: "Шығармашылық еркіндік", type: "creative" },
        { text: "Қоғамға пайда келтіру", type: "social" },
        { text: "Жоғары табыс пен өсу", type: "business" },
      ],
    },
    {
      question: "Сізге қайсысы жақынырақ?",
      answers: [
        { text: "Жүйелер мен құрылғылар", type: "tech" },
        { text: "Өнер мен визуал", type: "creative" },
        { text: "Адам психологиясы", type: "social" },
        { text: "Нарық пен кәсіп", type: "business" },
      ],
    },
    {
      question: "Жобада сіз қай рөлді алар едіңіз?",
      answers: [
        { text: "Техникалық орындаушы", type: "tech" },
        { text: "Креатив ойлап табушы", type: "creative" },
        { text: "Командамен байланыс жасаушы", type: "social" },
        { text: "Жетекші не ұйымдастырушы", type: "business" },
      ],
    },
    {
      question: "Қай жетістік сізге көбірек ұнайды?",
      answers: [
        { text: "Күрделі есепті шешу", type: "tech" },
        { text: "Әдемі жоба жасау", type: "creative" },
        { text: "Біреуге нақты көмектесу", type: "social" },
        { text: "Табысты жоба жүргізу", type: "business" },
      ],
    },
    {
      question: "Өзіңізді қай саладан елестетесіз?",
      answers: [
        { text: "IT / инженерия", type: "tech" },
        { text: "Дизайн / медиа", type: "creative" },
        { text: "Мұғалім / дәрігер / психолог", type: "social" },
        { text: "Кәсіпкер / менеджер", type: "business" },
      ],
    },
  ];

  const resultMap = {
    tech: {
      title: "Сізге технологиялық бағыт жақын",
      description:
        "Сізде логикалық ойлау, жүйемен жұмыс істеу және технологияға қызығушылық жоғары. Сізге IT және техникалық бағыттар сай келеді.",
      majors: [
        "Бағдарламалық инженерия",
        "Ақпараттық жүйелер",
        "Data Science",
        "Киберқауіпсіздік",
        "Робототехника",
      ],
    },
    creative: {
      title: "Сізге шығармашылық бағыт жақын",
      description:
        "Сізде қиял, креатив және жаңа идеялар ойлап табу қабілеті жақсы дамыған. Шығармашылық мамандықтар сізге сәйкес.",
      majors: [
        "Графикалық дизайн",
        "UX/UI дизайн",
        "Архитектура",
        "Журналистика",
        "Медиа және кино",
      ],
    },
    social: {
      title: "Сізге әлеуметтік бағыт жақын",
      description:
        "Сіз адамдармен жұмыс істеуді, көмектесуді және қоғамға пайда әкелуді ұнатасыз. Әлеуметтік және гуманитарлық мамандықтар сізге сай.",
      majors: [
        "Педагогика",
        "Психология",
        "Медицина",
        "Халықаралық қатынастар",
        "Әлеуметтік жұмыс",
      ],
    },
    business: {
      title: "Сізге бизнес бағыты жақын",
      description:
        "Сізде көшбасшылық, ұйымдастырушылық қабілет және өсуге ұмтылыс бар. Бизнес пен басқару салалары сізге қолайлы.",
      majors: [
        "Менеджмент",
        "Маркетинг",
        "Қаржы",
        "Экономика",
        "Бизнес-аналитика",
      ],
    },
  };

  let currentQuestion = 0;
  let answers = new Array(questions.length).fill(null);

  const testIntro = document.getElementById("testIntro");
  const testContainer = document.getElementById("testContainer");
  const resultContainer = document.getElementById("resultContainer");

  const startTestBtn = document.getElementById("startTestBtn");
  const prevBtn = document.getElementById("prevBtn");
  const restartTestBtn = document.getElementById("restartTestBtn");

  const questionText = document.getElementById("questionText");
  const answersList = document.getElementById("answersList");
  const questionCounter = document.getElementById("questionCounter");
  const progressPercent = document.getElementById("progressPercent");
  const progressFill = document.getElementById("progressFill");

  const resultDescription = document.getElementById("resultDescription");
  const scoreCards = document.getElementById("scoreCards");
  const recommendedMajors = document.getElementById("recommendedMajors");

  if (startTestBtn) {
    startTestBtn.addEventListener("click", () => {
      testIntro.style.display = "none";
      testContainer.style.display = "block";
      renderQuestion();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
      }
    });
  }

  if (restartTestBtn) {
    restartTestBtn.addEventListener("click", () => {
      currentQuestion = 0;
      answers = new Array(questions.length).fill(null);
      resultContainer.style.display = "none";
      testIntro.style.display = "block";
    });
  }

  function renderQuestion() {
    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    answersList.innerHTML = "";

    q.answers.forEach((answer, index) => {
      const btn = document.createElement("button");
      btn.className = "answer-btn";
      btn.type = "button";
      btn.textContent = answer.text;

      if (answers[currentQuestion] === index) {
        btn.classList.add("selected");
      }

      btn.addEventListener("click", () => {
        answers[currentQuestion] = index;

        if (currentQuestion < questions.length - 1) {
          currentQuestion++;
          renderQuestion();
        } else {
          showResult();
        }
      });

      answersList.appendChild(btn);
    });

    const progress = ((currentQuestion + 1) / questions.length) * 100;
    questionCounter.textContent = `${currentQuestion + 1} / ${questions.length}`;
    progressPercent.textContent = `${Math.round(progress)}%`;
    progressFill.style.width = `${progress}%`;

    prevBtn.style.display = currentQuestion === 0 ? "none" : "inline-flex";
  }

  function showResult() {
    const scores = {
      tech: 0,
      creative: 0,
      social: 0,
      business: 0,
    };

    answers.forEach((answerIndex, questionIndex) => {
      if (answerIndex === null) return;
      const selectedType = questions[questionIndex].answers[answerIndex].type;
      scores[selectedType]++;
    });

    const topType = Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b
    );

    const result = resultMap[topType];

    testContainer.style.display = "none";
    resultContainer.style.display = "block";

    resultDescription.innerHTML = `
      <strong>${result.title}</strong><br><br>
      ${result.description}
    `;

    scoreCards.innerHTML = `
      <div class="score-card">
        <h4>Tech</h4>
        <p>${scores.tech}</p>
      </div>
      <div class="score-card">
        <h4>Creative</h4>
        <p>${scores.creative}</p>
      </div>
      <div class="score-card">
        <h4>Social</h4>
        <p>${scores.social}</p>
      </div>
      <div class="score-card">
        <h4>Business</h4>
        <p>${scores.business}</p>
      </div>
    `;

    recommendedMajors.innerHTML = result.majors
      .map((major) => `<div class="recommended-item">${major}</div>`)
      .join("");

    saveResult(scores, topType, result);
  }

  function saveResult(scores, topType, result) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const testData = {
      scores,
      topType,
      title: result.title,
      description: result.description,
      recommendedMajors: result.majors,
      createdAt: new Date().toISOString(),
    };

    if (currentUser) {
      const allResults = JSON.parse(localStorage.getItem("testResults")) || [];
      const filtered = allResults.filter((item) => item.userId !== currentUser.id);

      filtered.push({
        userId: currentUser.id,
        ...testData,
      });

      localStorage.setItem("testResults", JSON.stringify(filtered));
    } else {
      localStorage.setItem("guestTestResult", JSON.stringify(testData));
    }
  }
});