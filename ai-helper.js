document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chatBox");
  const chatForm = document.getElementById("chatForm");
  const userInput = document.getElementById("userInput");
  const quickPrompts = document.getElementById("quickPrompts");

  let chatHistory = [];

  function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.innerHTML = `<div class="message-bubble">${text}</div>`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Авто-скролл
    chatHistory.push({ sender, text });
    localStorage.setItem("aiChatHistory", JSON.stringify(chatHistory));
  }

  function getAIResponse(question) {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const testResults = JSON.parse(localStorage.getItem("testResults")) || [];
    const userResult = user ? testResults.find(r => r.userId === user.id) : null;
    const lowerQuestion = question.toLowerCase();

    // 1. Жекелендірілген сұрақтарды анықтау
    if (lowerQuestion.includes("маған сай") || lowerQuestion.includes("менің бағытым")) {
      if (userResult) {
        let response = `Сіздің тест нәтижеңіз бойынша, сізге **${userResult.title}** жақын. `;
        response += `Осыған сәйкес, сізге мына мамандықтарды қарастыруға кеңес беремін: **${userResult.recommendedMajors.join(", ")}**.`;
        return response;
      } else {
        return `Сізге нақты кеңес беру үшін алдымен <a href="test.html">тест тапсыруыңызды</a> сұраймын. Тест нәтижесіне сүйеніп, сізге сай мамандықтарды ұсына аламын.`;
      }
    }

    // 2. Жалпы сұрақтарды кілт сөздер арқылы анықтау
    if (lowerQuestion.includes("грант")) {
      return "Грантқа түсу үшін ҰБТ-да жоғары балл жинау, таңдаған мамандығыңыз бойынша бәсекелестікті зерттеу және дұрыс университет таңдау маңызды. Көбінесе техникалық және педагогикалық мамандықтарға грант көп бөлінеді.";
    }
    if (lowerQuestion.includes("it") || lowerQuestion.includes("бағдарламалау")) {
      return "IT саласы — қазіргі таңда ең сұранысқа ие бағыттардың бірі. Ол үнемі дамып отырады және болашақта да маңыздылығын жоғалтпайды. Бастапқыда жақсы жалақы және карьералық өсу мүмкіндіктері мол.";
    }
    if (lowerQuestion.includes("медицина")) {
      return "Медицина — бұл үлкен жауапкершілікті, адамдарға көмектесуге деген шынайы ниетті және ұзақ оқуды қажет ететін сала. Егер сізде биология мен химияға қызығушылық болса, бұл мамандық сізге сай болуы мүмкін.";
    }
    if (lowerQuestion.includes("сәлем")) {
      return "Сәлем! Мен FutureMe AI кеңесшісімін. Мамандық таңдауға қатысты сұрақтарыңыз болса, қоя беріңіз.";
    }

    // 3. Егер сұрақ танылмаса
    return "Кешіріңіз, мен бұл сұрақты түсінбедім. Мамандық, университет, грант немесе тестке қатысты сұрақтарды қойып көріңіз.";
  }

  function handleQuestion(question) {
    addMessage(question, "user");
    quickPrompts.style.display = "none"; // Сұрақ қойылған соң, дайын сұрақтарды жасыру

    // AI жауабын кідіріспен көрсету (шынайы көріну үшін)
    setTimeout(() => {
      const response = getAIResponse(question);
      addMessage(response, "ai");
    }, 1000);
  }

  // Форманы жіберу
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const question = userInput.value.trim();
    if (question) {
      handleQuestion(question);
      userInput.value = "";
    }
  });

  // Дайын сұрақтарды басу
  quickPrompts.addEventListener("click", (e) => {
    if (e.target.classList.contains("prompt-btn")) {
      const question = e.target.textContent;
      userInput.value = question; // сұрақты input-қа салу (міндетті емес)
      handleQuestion(question);
    }
  });

  // Чат тарихын жүктеу
  function loadHistory() {
    const history = JSON.parse(localStorage.getItem("aiChatHistory")) || [];
    if (history.length > 0) {
      chatHistory = history;
      chatBox.innerHTML = '';
      history.forEach(msg => {
        const messageDiv = document.createElement("div");
        messageDiv.className = `chat-message ${msg.sender}`;
        messageDiv.innerHTML = `<div class="message-bubble">${msg.text}</div>`;
        chatBox.appendChild(messageDiv);
      });
      quickPrompts.style.display = "none";
    } else {
      // Егер тарих бос болса, сәлемдесу хабарын бірінші көрсету
      addMessage("Сәлем! Мен FutureMe AI кеңесшісімін. Мамандық таңдауға қатысты сұрақтарыңызға көмектесе аламын.", "ai");
    }
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  loadHistory();
});