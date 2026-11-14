export type Lang = "kk" | "ru";

export interface TranslationSchema {
  appName: string;
  appSubtitle: string;
  slogan: string;
  badge10th: string;
  nav: {
    dashboard: string;
    bilim: string;
    terminder: string;
    test: string;
    copywriter: string;
    brand: string;
    jarname: string;
    cases: string;
    portfolio: string;
    lessonPlans: string;
    methodology: string;
    teacher: string;
  };
  sections: {
    studentsTitle: string;
    teachersTitle: string;
  };
  auth: {
    loginTitle: string;
    registerTitle: string;
    loginSubtitle: string;
    registerSubtitle: string;
    name: string;
    email: string;
    password: string;
    role: string;
    student: string;
    teacher: string;
    classCode: string;
    classCodePlaceholder: string;
    loginBtn: string;
    registerBtn: string;
    noAccount: string;
    hasAccount: string;
    guestLogin: string;
    logout: string;
  };
  dashboard: {
    greeting: string;
    welcomeBack: string;
    stats: {
      points: string;
      level: string;
      streak: string;
      completed: string;
    };
    heroTitle: string;
    heroDesc: string;
    heroCta: string;
    heroSubtitle: string;
    progressTitle: string;
    weeklyActivity: string;
    calendarTitle: string;
    topStudents: string;
    myModules: string;
    continueLearning: string;
    exploreModule: string;
  };
  bilim: {
    title: string;
    subtitle: string;
    topicsList: string;
    theoryTab: string;
    matchTab: string;
    quizTab: string;
    findKazakhTab: string;
    selfCheckTab: string;
    finishTopic: string;
    reward: string;
    wellDone: string;
  };
  terminder: {
    title: string;
    subtitle: string;
    matchPairInstruction: string;
    score: string;
    matchedCount: string;
    resetGame: string;
    allCompleted: string;
    termCardPrompt: string;
    congratulations: string;
    newGame: string;
  };
  test: {
    title: string;
    subtitle: string;
    startRandomQuiz: string;
    startFullQuiz: string;
    questionOf: string;
    yourAnswer: string;
    correctAnswer: string;
    explanation: string;
    finishTest: string;
    resultsTitle: string;
    scorePercentage: string;
    reviewErrors: string;
    retake: string;
    passed: string;
    failed: string;
  };
  copywriter: {
    title: string;
    subtitle: string;
    taskSelector: string;
    brandName: string;
    targetAudience: string;
    inputPlaceholder: string;
    checkButton: string;
    criteriaHeader: string;
    criterion1: string;
    criterion2: string;
    criterion3: string;
    criterion4: string;
    criterion5: string;
    verdictSuccess: string;
    verdictNeedsWork: string;
    saveToPortfolio: string;
  };
  brand: {
    title: string;
    subtitle: string;
    brandNameLabel: string;
    productLabel: string;
    targetAudienceLabel: string;
    sloganLabel: string;
    valuesLabel: string;
    primaryColor: string;
    secondaryColor: string;
    previewHeader: string;
    exportImage: string;
    saveToPortfolio: string;
    savedAlert: string;
  };
  jarname: {
    title: string;
    subtitle: string;
    platformSelect: string;
    headlineLabel: string;
    bodyLabel: string;
    ctaLabel: string;
    hashtagsLabel: string;
    imageStyleLabel: string;
    preview: string;
    copyText: string;
    copied: string;
    exportPost: string;
    saveToPortfolio: string;
  };
  cases: {
    title: string;
    subtitle: string;
    scenario: string;
    problemQuestion: string;
    chooseOption: string;
    checkChoice: string;
    whyCorrect: string;
    whyIncorrect: string;
  };
  portfolio: {
    title: string;
    subtitle: string;
    studentName: string;
    classTitle: string;
    badgeCount: string;
    totalScore: string;
    brandsCreated: string;
    adsCreated: string;
    slogansCreated: string;
    testsPassed: string;
    exportPdf: string;
    printPortfolio: string;
  };
  lessonPlans: {
    title: string;
    subtitle: string;
    planNumber: string;
    duration: string;
    objective: string;
    expectedOutcome: string;
    methods: string;
    stagesTable: string;
    stageTime: string;
    stageName: string;
    teacherActivity: string;
    studentActivity: string;
    assessment: string;
    homework: string;
    copyPlan: string;
    downloadDocx: string;
  };
  methodology: {
    title: string;
    subtitle: string;
    rubricsTab: string;
    worksheetsTab: string;
    guideTab: string;
    printWorksheet: string;
    downloadPdf: string;
    answerKeyHeader: string;
  };
  teacherDashboard: {
    title: string;
    subtitle: string;
    classCodeLabel: string;
    totalStudents: string;
    classAvgScore: string;
    activeToday: string;
    exportExcel: string;
    studentCol: string;
    pointsCol: string;
    levelCol: string;
    testsCol: string;
    portfolioCol: string;
    lastActiveCol: string;
  };
  common: {
    loading: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    share: string;
    close: string;
    pointsShort: string;
    level: string;
    dayShort: string;
    kazakh: string;
    russian: string;
    darkTheme: string;
    lightTheme: string;
  };
}

export const translations: Record<Lang, TranslationSchema> = {
  kk: {
    appName: "QAZMARKET",
    appSubtitle: "Қазақ тіліндегі маркетинг зертханасы",
    slogan: "Қазақша ойла. Креативті жаса. Нарықта таныт!",
    badge10th: "10-сыныпқа арналған",
    nav: {
      dashboard: "Басты бет",
      bilim: "Білім алаңы",
      terminder: "Терминдер ойыны",
      test: "Тест банкі",
      copywriter: "Копирайтер",
      brand: "Бренд студиясы",
      jarname: "Жарнама жобасы",
      cases: "Кейстер",
      portfolio: "Портфолио",
      lessonPlans: "Сабақ жоспарлары",
      methodology: "Әдістеме және парақтар",
      teacher: "Мұғалім кабинеті",
    },
    sections: {
      studentsTitle: "ОҚУШЫЛАРҒА АРНАЛҒАН (8 БӨЛІМ)",
      teachersTitle: "МҰҒАЛІМДЕРГЕ АРНАЛҒАН (2 БӨЛІМ)",
    },
    auth: {
      loginTitle: "Платформаға кіру",
      registerTitle: "Тіркелу",
      loginSubtitle: "Маркетинг зертханасындағы жұмысыңызды жалғастырыңыз",
      registerSubtitle: "Жеке маркетингтік портфолиоңызды қалыптастырыңыз",
      name: "Аты-жөніңіз",
      email: "Электронды пошта",
      password: "Құпия сөз",
      role: "Сіздің мәртебеңіз",
      student: "Оқушы (10-сынып)",
      teacher: "Мұғалім / Тәлімгер",
      classCode: "Сынып коды",
      classCodePlaceholder: "Мысалы: 10A-MARKET",
      loginBtn: "Кіру",
      registerBtn: "Тіркелу",
      noAccount: "Әлі аккаунтыңыз жоқ па?",
      hasAccount: "Бұрын тіркелгенсіз бе?",
      guestLogin: "Қонақ ретінде танысу",
      logout: "Шығу",
    },
    dashboard: {
      greeting: "Сәлем",
      welcomeBack: "Бүгін қандай креативті жоба жасаймыз?",
      stats: {
        points: "Жалпы ұпай",
        level: "Шеберлік деңгейі",
        streak: "Күндер сериясы",
        completed: "Аяқталған тапсырма",
      },
      heroTitle: "Идеяңды брендке айналдыр!",
      heroDesc: "Маркетинг әлеміне қазақ тілінде қадам бас. Үйрен, тәжірибе жаса, өз өніміңді таныт!",
      heroCta: "Бүгіннен бастап өз брендіңді жаса!",
      heroSubtitle: "Тілдік біліміңді маркетингтік шығармашылықпен ұштастыр.",
      progressTitle: "Айлық даму графигі",
      weeklyActivity: "Апталық белсенділік",
      calendarTitle: "Оқу күнтізбесі",
      topStudents: "Үздік оқушылар",
      myModules: "Негізгі модулдер",
      continueLearning: "Жалғастыру",
      exploreModule: "Бөлімді ашу",
    },
    bilim: {
      title: "Білім алаңы",
      subtitle: "Маркетинг саласына қатысты лексикалық, грамматикалық және стилистикалық теориялық база",
      topicsList: "Тақырыптар тізімі",
      theoryTab: "1. Қысқаша теория",
      matchTab: "2. Терминді сәйкестендіру",
      quizTab: "3. Интерактивті тест",
      findKazakhTab: "4. Қазақша балама",
      selfCheckTab: "5. Өзіндік тексеру",
      finishTopic: "Тақырыпты сәтті аяқтау",
      reward: "Сыйақы",
      wellDone: "Өте жақсы! Тақырып меңгерілді.",
    },
    terminder: {
      title: "Терминдер ойыны",
      subtitle: "Ағылшын-қазақ-орыс маркетинг терминдерін жұптастыру тренажері",
      matchPairInstruction: "Ағылшын терминіне сай келетін қазақша баламасын таңдаңыз:",
      score: "Ұпай",
      matchedCount: "Табылған жұптар",
      resetGame: "Қайта бастау",
      allCompleted: "Тамаша! Барлық терминдер сәйкестендірілді!",
      termCardPrompt: "Сөзді басып, жұбын табыңыз",
      congratulations: "Құттықтаймыз! Тамаша нәтиже!",
      newGame: "Жаңа ойын бастау",
    },
    test: {
      title: "Тест банкі",
      subtitle: "40+ сұрақтан тұратын кездейсоқ тестілеу және қателермен жұмыс",
      startRandomQuiz: "Кездейсоқ 10 сұрақ алу",
      startFullQuiz: "Толық 40 сұрақты тапсыру",
      questionOf: "Сұрақ",
      yourAnswer: "Сіздің жауабыңыз",
      correctAnswer: "Дұрыс жауап",
      explanation: "Әдістемелік түсіндірме",
      finishTest: "Тестті аяқтау",
      resultsTitle: "Тест нәтижесі",
      scorePercentage: "Нәтижелік көрсеткіш",
      reviewErrors: "Қателерді талдау",
      retake: "Қайта тапсыру",
      passed: "Тест сәтті тапсырылды!",
      failed: "Қайта дайындалу ұсынылады",
    },
    copywriter: {
      title: "Копирайтер шеберханасы",
      subtitle: "Жарнамалық ұрандар мен мәтіндерді 5 қатаң критерий бойынша автоматты тексеру",
      taskSelector: "Тапсырманы таңдаңыз:",
      brandName: "Бренд атауы",
      targetAudience: "Мақсатты аудитория",
      inputPlaceholder: "Осында қазақша жарнамалық мәтініңізді немесе ұраныңызды жазыңыз...",
      checkButton: "Критерийлер бойынша тексеру",
      criteriaHeader: "Тексеру критерийлері",
      criterion1: "1. Ұзындық талабы (10 - 120 таңба)",
      criterion2: "2. Қазақ әріптерінің болуы (Ә, І, Ң, Ғ, Ү, Ұ, Қ, Ө, Һ)",
      criterion3: "3. Таза қазақ тілі (тек орыс әріптерінен тұрмауы)",
      criterion4: "4. Мәтінде бренд атауының аталуы",
      criterion5: "5. Ритм және әрекетке шақыру етістігі (таңда, ал, кел, қосыл...)",
      verdictSuccess: "Керемет мәтін! Барлық талаптар орындалды.",
      verdictNeedsWork: "Мәтінді жақсартуға болады. Төмендегі ұсыныстарды қараңыз.",
      saveToPortfolio: "Портфолиоға қосу",
    },
    brand: {
      title: "Бренд студиясы",
      subtitle: "Төл қазақстандық өнімнің жеке бренд карточкасын құрастыру конструкторы",
      brandNameLabel: "Бренд атауы",
      productLabel: "Өнім немесе қызмет түрі",
      targetAudienceLabel: "Мақсатты аудиторияның сипаттамасы",
      sloganLabel: "Бренд ұраны (Слоган)",
      valuesLabel: "Брендтің 3 негізгі құндылығы",
      primaryColor: "Негізгі түс",
      secondaryColor: "Қосымша акцент түс",
      previewHeader: "Бренд карточкасының алдын ала көрінісі",
      exportImage: "Сурет ретінде сақтау (PNG)",
      saveToPortfolio: "Брендті портфолиоға сақтау",
      savedAlert: "Бренд карточкасы портфолиоға сәтті сақталды!",
    },
    jarname: {
      title: "Жарнама жобасы",
      subtitle: "Instagram және Telegram әлеуметтік желілеріне арналған дайын жарнама посты конструкторы",
      platformSelect: "Желіні таңдаңыз",
      headlineLabel: "Күшті тақырып (Headline)",
      bodyLabel: "Негізгі жарнама мәтіні (Body text)",
      ctaLabel: "Әрекетке шақыру (Call to Action)",
      hashtagsLabel: "Хэштегтер (бос орынмен)",
      imageStyleLabel: "Визуалды витрина",
      preview: "Алдын ала қарау",
      copyText: "Мәтінді көшіріп алу",
      copied: "Мәтін буферге көшірілді!",
      exportPost: "Постты экспорттау",
      saveToPortfolio: "Портфолиоға бекіту",
    },
    cases: {
      title: "Маркетингтік кейстер",
      subtitle: "Нақты қазақстандық нарықтық жағдаяттарды сараптау және ұтымды мәтінді таңдау",
      scenario: "Жағдаят (Кейс сипаттамасы)",
      problemQuestion: "Бұл жағдайда қандай жарнамалық мәтін немесе шешім ең жоғары конверсия әкеледі?",
      chooseOption: "Дұрыс нұсқаны таңдаңыз:",
      checkChoice: "Таңдауды бағалау",
      whyCorrect: "Неліктен бұл дұрыс таңдау?",
      whyIncorrect: "Бұл нұсқаның кемшілігі неде?",
    },
    portfolio: {
      title: "Жеке цифрлық портфолио",
      subtitle: "10-сынып оқушысының маркетингтік шығармашылық жұмыстары мен жетістіктерінің жинағы",
      studentName: "Оқушы",
      classTitle: "Сыныбы",
      badgeCount: "Иеленген бейдждер",
      totalScore: "Жалпы жинаған ұпайы",
      brandsCreated: "Жасалған брендтер",
      adsCreated: "Дайындалған жарнамалар",
      slogansCreated: "Жазылған ұрандар",
      testsPassed: "Сәтті өткен тестілер",
      exportPdf: "Портфолионы PDF етіп жүктеу",
      printPortfolio: "Басып шығару",
    },
    lessonPlans: {
      title: "Сабақ жоспарлары (Мұғалімге)",
      subtitle: "45 минуттық 10 дайын авторлық сабақ жоспары: мақсаты, нәтижесі, минутталған кезеңдері",
      planNumber: "№ сабақ",
      duration: "Уақыты: 45 минут",
      objective: "Сабақтың мақсаты",
      expectedOutcome: "Күтілетін нәтиже",
      methods: "Қолданылатын әдіс-тәсілдер",
      stagesTable: "Сабақтың кезең-кезеңімен құрылымы",
      stageTime: "Уақыты",
      stageName: "Кезеңі",
      teacherActivity: "Мұғалімнің іс-әрекеті",
      studentActivity: "Оқушының іс-әрекеті",
      assessment: "Бағалау критерийі",
      homework: "Үй тапсырмасы",
      copyPlan: "Жоспар мәтінін көшіру",
      downloadDocx: "DOCX түрінде жүктеу",
    },
    methodology: {
      title: "Әдістемелік құрал және жұмыс парақтары",
      subtitle: "Бағалау рубрикалары мен жауап кілттері бар 10 баспалық жұмыс парағы (PDF/DOCX)",
      rubricsTab: "Бағалау критерийлері (Рубрикалар)",
      worksheetsTab: "10 жұмыс парағы",
      guideTab: "Әдістемелік нұсқаулық",
      printWorksheet: "Жұмыс парағын басып шығару",
      downloadPdf: "PDF жүктеп алу",
      answerKeyHeader: "Мұғалімге арналған жауап кілттері:",
    },
    teacherDashboard: {
      title: "Мұғалім басқару панелі",
      subtitle: "Сынып оқушыларының прогресі, орташа балл және нәтижелер мониторингі",
      classCodeLabel: "Сіздің сынып кодыңыз:",
      totalStudents: "Сыныптағы оқушылар",
      classAvgScore: "Сыныптың орташа балы",
      activeToday: "Бүгін белсенді болғандар",
      exportExcel: "Нәтижелерді Excel-ге жүктеу",
      studentCol: "Оқушының аты-жөні",
      pointsCol: "Ұпай саны",
      levelCol: "Деңгей",
      testsCol: "Тест көрсеткіші",
      portfolioCol: "Портфолио көлемі",
      lastActiveCol: "Соңғы белсенділік",
    },
    common: {
      loading: "Жүктелуде...",
      save: "Сақтау",
      cancel: "Болдырмау",
      delete: "Жою",
      edit: "Өңдеу",
      share: "Бөлісу",
      close: "Жабу",
      pointsShort: "ұпай",
      level: "деңгей",
      dayShort: "күн",
      kazakh: "Қазақша",
      russian: "Русский",
      darkTheme: "Түнгі режим",
      lightTheme: "Күндізгі режим",
    },
  },
  ru: {
    appName: "QAZMARKET",
    appSubtitle: "Лаборатория маркетинга на казахском языке",
    slogan: "Думай по-казахски. Создавай креативно. Продвигай на рынке!",
    badge10th: "Для 10-х классов",
    nav: {
      dashboard: "Главная",
      bilim: "База знаний",
      terminder: "Игра терминов",
      test: "Банк тестов",
      copywriter: "Копирайтер",
      brand: "Бренд-студия",
      jarname: "Рекламный проект",
      cases: "Кейсы",
      portfolio: "Портфолио",
      lessonPlans: "Планы уроков",
      methodology: "Методичка и листы",
      teacher: "Кабинет учителя",
    },
    sections: {
      studentsTitle: "ДЛЯ УЧЕНИКОВ (8 РАЗДЕЛОВ)",
      teachersTitle: "ДЛЯ УЧИТЕЛЕЙ (2 РАЗДЕЛА)",
    },
    auth: {
      loginTitle: "Вход на платформу",
      registerTitle: "Регистрация",
      loginSubtitle: "Продолжите работу в маркетинговой лаборатории",
      registerSubtitle: "Сформируйте личное цифровое портфолио",
      name: "ФИО",
      email: "Электронная почта",
      password: "Пароль",
      role: "Ваш статус",
      student: "Ученик (10 класс)",
      teacher: "Учитель / Наставник",
      classCode: "Код класса",
      classCodePlaceholder: "Например: 10A-MARKET",
      loginBtn: "Войти",
      registerBtn: "Зарегистрироваться",
      noAccount: "Еще нет аккаунта?",
      hasAccount: "Уже зарегистрированы?",
      guestLogin: "Ознакомиться гостем",
      logout: "Выйти",
    },
    dashboard: {
      greeting: "Привет",
      welcomeBack: "Какой креативный проект создадим сегодня?",
      stats: {
        points: "Всего баллов",
        level: "Уровень мастерства",
        streak: "Серия дней",
        completed: "Завершенных заданий",
      },
      heroTitle: "Преврати идею в бренд!",
      heroDesc: "Сделай шаг в мир маркетинга на казахском языке. Обучайся, практикуйся и продвигай свой продукт!",
      heroCta: "Создай свой бренд прямо сегодня!",
      heroSubtitle: "Объединяй языковые знания с маркетинговым творчеством.",
      progressTitle: "График месячного прогресса",
      weeklyActivity: "Недельная активность",
      calendarTitle: "Календарь обучения",
      topStudents: "Лучшие ученики",
      myModules: "Основные модули",
      continueLearning: "Продолжить",
      exploreModule: "Открыть раздел",
    },
    bilim: {
      title: "База знаний",
      subtitle: "Теоретическая база лексических, грамматических и стилистических особенностей маркетинга",
      topicsList: "Список тем",
      theoryTab: "1. Краткая теория",
      matchTab: "2. Сопоставление",
      quizTab: "3. Интерактивный тест",
      findKazakhTab: "4. Казахский эквивалент",
      selfCheckTab: "5. Самопроверка",
      finishTopic: "Завершить тему",
      reward: "Награда",
      wellDone: "Отлично! Тема освоена.",
    },
    terminder: {
      title: "Игра терминов",
      subtitle: "Тренажер сопоставления англо-казахско-русских маркетинговых терминов",
      matchPairInstruction: "Выберите казахский эквивалент для английского термина:",
      score: "Баллы",
      matchedCount: "Найдено пар",
      resetGame: "Начать заново",
      allCompleted: "Великолепно! Все термины сопоставлены!",
      termCardPrompt: "Нажмите на термин, чтобы найти пару",
      congratulations: "Поздравляем! Отличный результат!",
      newGame: "Начать новую игру",
    },
    test: {
      title: "Банк тестов",
      subtitle: "Случайная выборка из 40+ вопросов и детальный разбор ошибок",
      startRandomQuiz: "Пройти случайные 10 вопросов",
      startFullQuiz: "Пройти все 40 вопросов",
      questionOf: "Вопрос",
      yourAnswer: "Ваш ответ",
      correctAnswer: "Правильный ответ",
      explanation: "Методическое объяснение",
      finishTest: "Завершить тест",
      resultsTitle: "Результаты теста",
      scorePercentage: "Процент верных ответов",
      reviewErrors: "Разбор ошибок",
      retake: "Пройти заново",
      passed: "Тест успешно сдан!",
      failed: "Рекомендуется повторить материал",
    },
    copywriter: {
      title: "Мастерская копирайтера",
      subtitle: "Автоматическая проверка слоганов и рекламных текстов по 5 критериям",
      taskSelector: "Выберите задание:",
      brandName: "Название бренда",
      targetAudience: "Целевая аудитория",
      inputPlaceholder: "Напишите здесь ваш казахский рекламный текст или слоган...",
      checkButton: "Проверить по критериям",
      criteriaHeader: "Критерии проверки",
      criterion1: "1. Длина текста (10 - 120 символов)",
      criterion2: "2. Наличие специфических букв казахского алфавита",
      criterion3: "3. Чистый казахский текст (без чисто русских фраз)",
      criterion4: "4. Упоминание бренда в тексте",
      criterion5: "5. Ритм и глагол призыва к действию",
      verdictSuccess: "Отличный текст! Все критерии соблюдены.",
      verdictNeedsWork: "Текст можно улучшить. Обратите внимание на рекомендации.",
      saveToPortfolio: "Сохранить в портфолио",
    },
    brand: {
      title: "Студия бренда",
      subtitle: "Конструктор карточки отечественного бренда",
      brandNameLabel: "Название бренда",
      productLabel: "Продукт или услуга",
      targetAudienceLabel: "Описание целевой аудитории",
      sloganLabel: "Слоган бренда",
      valuesLabel: "3 ключевые ценности бренда",
      primaryColor: "Основной цвет",
      secondaryColor: "Акцентный цвет",
      previewHeader: "Предпросмотр карточки бренда",
      exportImage: "Экспорт в изображение (PNG)",
      saveToPortfolio: "Сохранить бренд в портфолио",
      savedAlert: "Карточка бренда успешно сохранена в портфолио!",
    },
    jarname: {
      title: "Рекламный проект",
      subtitle: "Конструктор готовых рекламных публикаций для Instagram и Telegram",
      platformSelect: "Выберите соцсеть",
      headlineLabel: "Цепляющий заголовок (Headline)",
      bodyLabel: "Основной текст рекламы (Body)",
      ctaLabel: "Призыв к действию (Call to Action)",
      hashtagsLabel: "Хэштеги (через пробел)",
      imageStyleLabel: "Визуальный стиль",
      preview: "Предпросмотр",
      copyText: "Скопировать текст",
      copied: "Текст скопирован в буфер!",
      exportPost: "Экспорт публикации",
      saveToPortfolio: "Добавить в портфолио",
    },
    cases: {
      title: "Маркетинговые кейсы",
      subtitle: "Анализ реальных кейсов казахстанского рынка и выбор лучшего текста",
      scenario: "Ситуация (Описание кейса)",
      problemQuestion: "Какой рекламный текст или решение принесет наибольшую конверсию?",
      chooseOption: "Выберите верный вариант:",
      checkChoice: "Оценить выбор",
      whyCorrect: "Почему это верный выбор?",
      whyIncorrect: "В чем недостаток этого варианта?",
    },
    portfolio: {
      title: "Личное цифровое портфолио",
      subtitle: "Сборник маркетинговых работ и достижений ученика 10 класса",
      studentName: "Ученик",
      classTitle: "Класс",
      badgeCount: "Бейджи",
      totalScore: "Набранные баллы",
      brandsCreated: "Создано брендов",
      adsCreated: "Разработано реклам",
      slogansCreated: "Написано слоганов",
      testsPassed: "Пройдено тестов",
      exportPdf: "Экспорт портфолио в PDF",
      printPortfolio: "Распечатать",
    },
    lessonPlans: {
      title: "Планы уроков (Для учителя)",
      subtitle: "10 готовых авторских поурочных планов по 45 минут: цели, результаты, поминутные этапы",
      planNumber: "Урок №",
      duration: "Время: 45 минут",
      objective: "Цель урока",
      expectedOutcome: "Ожидаемый результат",
      methods: "Методы и приемы",
      stagesTable: "Поэтапная структура урока",
      stageTime: "Время",
      stageName: "Этап",
      teacherActivity: "Деятельность учителя",
      studentActivity: "Деятельность ученика",
      assessment: "Критерий оценивания",
      homework: "Домашнее задание",
      copyPlan: "Скопировать план",
      downloadDocx: "Скачать в формате DOCX",
    },
    methodology: {
      title: "Методическое пособие и рабочие листы",
      subtitle: "Критерии оценивания (рубрики) и 10 печатных рабочих листов с ключами ответов",
      rubricsTab: "Критерии оценивания (Рубрики)",
      worksheetsTab: "10 рабочих листов",
      guideTab: "Методическое руководство",
      printWorksheet: "Распечатать рабочий лист",
      downloadPdf: "Скачать в PDF",
      answerKeyHeader: "Ключи ответов для учителя:",
    },
    teacherDashboard: {
      title: "Панель управления учителя",
      subtitle: "Мониторинг прогресса класса, средний балл и результаты учеников",
      classCodeLabel: "Ваш код класса:",
      totalStudents: "Всего учеников в классе",
      classAvgScore: "Средний балл класса",
      activeToday: "Активны сегодня",
      exportExcel: "Экспорт результатов в Excel (CSV)",
      studentCol: "ФИО ученика",
      pointsCol: "Баллы",
      levelCol: "Уровень",
      testsCol: "Тесты",
      portfolioCol: "Портфолио",
      lastActiveCol: "Последняя активность",
    },
    common: {
      loading: "Загрузка...",
      save: "Сохранить",
      cancel: "Отмена",
      delete: "Удалить",
      edit: "Редактировать",
      share: "Поделиться",
      close: "Закрыть",
      pointsShort: "баллов",
      level: "уровень",
      dayShort: "дней",
      kazakh: "Қазақша",
      russian: "Русский",
      darkTheme: "Темная тема",
      lightTheme: "Светлая тема",
    },
  },
};

export function getT(lang: Lang): TranslationSchema {
  return translations[lang] || translations.kk;
}
