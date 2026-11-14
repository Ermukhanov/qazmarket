export type Lang = "kk" | "ru";

export interface TranslationSchema {
  appName: string;
  appSubtitle: string;
  slogan: string;
  badge10th: string;
  nav: {
    dashboard: string;
    bilim: string;
    studio: string;
    brand: string;
    smm: string;
    seo: string;
    game: string;
    portfolio: string;
    achievements: string;
    lessonPlans: string;
    methodology: string;
    teacher: string;
    admin: string;
    // Legacy keys for backward compatibility
    terminder: string;
    test: string;
    copywriter: string;
    jarname: string;
    cases: string;
  };
  sections: {
    studentsTitle: string;
    teachersTitle: string;
  };
  landing: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    enterBtn: string;
    exploreBtn: string;
    modulesTitle: string;
    modulesSubtitle: string;
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    teachersSectionTitle: string;
    teachersSectionDesc: string;
    teachersFeature1: string;
    teachersFeature2: string;
    teachersFeature3: string;
    teachersBtn: string;
    authorTitle: string;
    authorName: string;
    authorSchool: string;
    stat1Label: string;
    stat2Label: string;
    stat3Label: string;
    stat4Label: string;
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
    admin: string;
    classCode: string;
    classCodePlaceholder: string;
    loginBtn: string;
    registerBtn: string;
    noAccount: string;
    hasAccount: string;
    guestLogin: string;
    demoStudent: string;
    demoTeacher: string;
    demoAdmin: string;
    logout: string;
  };
  dashboard: {
    greeting: string;
    welcomeBack: string;
    stats: {
      points: string;
      level: string;
      streak: string;
      completedTasks: string;
      days: string;
      levelSuffix: string;
      pointsUnit: string;
      emptyPoints: string;
      emptyStreak: string;
    };
    modulesTitle: string;
    modulesSubtitle: string;
    monthlyProgressTitle: string;
    calendarTitle: string;
    activityTitle: string;
    activityUnit: string;
    topPerformersTitle: string;
    continueBtn: string;
    startBtn: string;
    completedStatus: string;
    inProgressStatus: string;
    notStartedStatus: string;
    tasksUnit: string;
    emptyActivity: string;
  };
  bilim: {
    title: string;
    subtitle: string;
    tabs: {
      theory: string;
      matching: string;
      quiz: string;
      findKazakh: string;
      selfCheck: string;
    };
    theoryTab?: string;
    matchTab?: string;
    quizTab?: string;
    findKazakhTab?: string;
    selfCheckTab?: string;
    matchPrompt: string;
    matchSuccess: string;
    nextTopic: string;
    prevTopic: string;
    topicCompleted: string;
  };
  studio: {
    title: string;
    subtitle: string;
    tabSlogan: string;
    tabAdText: string;
    criteriaTitle: string;
    brandName: string;
    brandNamePlaceholder: string;
    sloganInput: string;
    sloganPlaceholder: string;
    qualityScore: string;
    criteriaLength: string;
    criteriaKazakhLetters: string;
    criteriaNoRussianLetters: string;
    criteriaBrandIncluded: string;
    criteriaCallToAction: string;
    saveBtn: string;
    savedSuccess: string;
    headline: string;
    targetAudience: string;
    benefits: string;
    callToAction: string;
    deadline: string;
    contacts: string;
    previewHeader: string;
  };
  brand: {
    title: string;
    subtitle: string;
    formTitle: string;
    brandName: string;
    productType: string;
    targetAudience: string;
    colors: string;
    slogan: string;
    mission: string;
    logoIcon: string;
    previewTitle: string;
    saveBtn: string;
    exportPng: string;
    savedSuccess: string;
    saveToPortfolio: string;
    savedAlert: string;
    primaryColor?: string;
    secondaryColor?: string;
    previewHeader?: string;
    exportImage?: string;
    brandNameLabel?: string;
    productLabel?: string;
    targetAudienceLabel?: string;
    sloganLabel?: string;
    colorsLabel?: string;
    valuesLabel?: string;
  };
  smm: {
    title: string;
    subtitle: string;
    platform: string;
    headline: string;
    body: string;
    hashtags: string;
    callToAction: string;
    previewTitle: string;
    copyText: string;
    textCopied: string;
    saveBtn: string;
    savedSuccess: string;
  };
  seo: {
    title: string;
    subtitle: string;
    serpPreviewTitle: string;
    pageTitle: string;
    metaDescription: string;
    urlSlug: string;
    keywords: string;
    analysisTitle: string;
    titleLengthCheck: string;
    descLengthCheck: string;
    keywordsCheck: string;
    kazakhCheck: string;
    scoreLabel: string;
    saveBtn: string;
    savedSuccess: string;
  };
  game: {
    title: string;
    subtitle: string;
    tabTerms: string;
    tabQuiz: string;
    tabCases: string;
    score: string;
    combo: string;
    timeLeft: string;
    startBtn: string;
    finishBtn: string;
    dictionarySearch: string;
    test10Btn: string;
    test40Btn: string;
    nextQuestion: string;
    prevQuestion: string;
    finishQuiz: string;
    caseExplanation: string;
    expertVerdict: string;
  };
  portfolio: {
    title: string;
    subtitle: string;
    studentInfo: string;
    badgesTitle: string;
    brandsTitle: string;
    slogansTitle: string;
    smmPostsTitle: string;
    seoProjectsTitle: string;
    adTextsTitle: string;
    testsPassed: string;
    exportPdf: string;
    printPortfolio: string;
    emptyBrands: string;
    emptySlogans: string;
    emptyPosts: string;
  };
  achievements: {
    title: string;
    subtitle: string;
    xpProgress: string;
    currentLevel: string;
    nextLevel: string;
    streakTitle: string;
    badgesTitle: string;
    leaderboardTitle: string;
    certificateTitle: string;
    downloadCertificate: string;
  };
  lessonPlans: {
    title: string;
    subtitle: string;
    orderBadge: string;
    selectLesson: string;
    planDetails: string;
    duration: string;
    objectives: string;
    expectedResults: string;
    stagesTable: string;
    rubric: string;
    homework: string;
    directions11Title: string;
    copyPlan: string;
    downloadDocx: string;
    downloadPdf: string;
    print: string;
    copiedSuccess: string;
  };
  methodology: {
    title: string;
    subtitle: string;
    guideTab: string;
    rubricsTab: string;
    worksheetsTab: string;
    printSheet: string;
    downloadSheet: string;
    answerKeyToggle: string;
    studentNameField: string;
    scoreField: string;
    printWorksheet?: string;
    answerKeyHeader?: string;
  };
  teacher: {
    title: string;
    subtitle: string;
    classCode: string;
    studentsCount: string;
    averageScore: string;
    activeToday: string;
    studentsTableTitle: string;
    nameCol: string;
    pointsCol: string;
    levelCol: string;
    completedCol: string;
    lastActiveCol: string;
    actionsCol: string;
    exportExcel: string;
    viewStudent: string;
    quickActionsTitle: string;
    createQmjBtn: string;
    addQuestionBtn: string;
    cmsTabTitle: string;
    aiSettingsTitle: string;
  };
  aiChat: {
    widgetTitle: string;
    welcomeMessage: string;
    inputPlaceholder: string;
    sendBtn: string;
    limitNotice: string;
    suggestion1: string;
    suggestion2: string;
    suggestion3: string;
  };
}

export const translations: Record<Lang, TranslationSchema> = {
  kk: {
    appName: "QAZMARKET",
    appSubtitle: "Қазақ тіліндегі маркетинг зертханасы",
    slogan: "Қазақша ойла. Креативті жаса. Нарықта таныт!",
    badge10th: "10-сынып",
    nav: {
      dashboard: "Басты бет",
      bilim: "01 Білім алаңы",
      studio: "02 Жарнама студиясы",
      brand: "03 Бренд зертханасы",
      smm: "04 SMM орталығы",
      seo: "05 SEO шеберханасы",
      game: "06 Маркетинг ойыны",
      portfolio: "07 Жоба портфолиосы",
      achievements: "08 Жетістік алаңы",
      lessonPlans: "09 Сабақ жоспарлары",
      methodology: "10 Әдістемелік құрал",
      teacher: "Мұғалім кабинеті",
      admin: "Әкімшілік панелі",
      terminder: "Терминдер ойыны",
      test: "Тест банкі",
      copywriter: "Копирайтер",
      jarname: "Жарнама жобасы",
      cases: "Кейстер",
    },
    sections: {
      studentsTitle: "Оқушыларға арналған (8 бөлім)",
      teachersTitle: "Мұғалімдерге арналған",
    },
    landing: {
      heroBadge: "«Маркетингтегі қазақ тілі» авторлық элективті курсы",
      heroTitle: "Идеяңды брендке айналдыр!",
      heroSubtitle: "Қазақ тілі, маркетинг және цифрлық сауаттылықты біріктіретін 10-сыныпқа арналған коммерциялық интерактивті зертхана.",
      enterBtn: "Платформаға кіру",
      exploreBtn: "Бағдарламамен танысу",
      modulesTitle: "8 Интерактивті оқу модулі",
      modulesSubtitle: "Оқушы жай тыңдаушы емес — ол маркетолог, копирайтер, бренд-дизайнер және SMM маманы.",
      howItWorksTitle: "Қалай жұмыс істейді?",
      howItWorksSubtitle: "Бар болғаны 3 қарапайым қадам арқылы өз кәсіби маркетингтік портфолиоңды жаса.",
      step1Title: "1. Тіркелу және сыныпқа қосылу",
      step1Desc: "Мұғалім берген сынып коды (10A-MARKET) арқылы жеке кабинетіңізге кіріңіз.",
      step2Title: "2. Практикалық тапсырмалар",
      step2Desc: "Ұрандар жазыңыз, бренд карточкасын жинаңыз, Instagram/Telegram жарнамаларын жасаңыз.",
      step3Title: "3. Цифрлық портфолио алу",
      step3Desc: "Барлық орындаған жобаларыңызды бірыңғай кәсіби PDF құжат ретінде жүктеп алыңыз.",
      teachersSectionTitle: "Мұғалімдерге арналған мүмкіндіктер",
      teachersSectionDesc: "№ 130 бұйрыққа толық сәйкес келетін 17 сабақтың ҚМЖ үлгілері, 10 баспалық жұмыс парағы және сынып нәтижелерін Excel-ге экспорттау.",
      teachersFeature1: "№ 130 бұйрық бойынша дайын ҚМЖ (10-25-10 мин)",
      teachersFeature2: "Жауап кілттері бар 10 жұмыс парағы",
      teachersFeature3: "Сынып аналитикасы және Excel экспорт",
      teachersBtn: "Мұғалім кабинетіне өту",
      authorTitle: "Бағдарлама авторы",
      authorName: "Сарсенова Ақкүміс Піржанқызы",
      authorSchool: "Қазақ тілі мен әдебиеті пәні мұғалімі, педагог-сарапшы. №6 Хромтау гимназиясы, Ақтөбе облысы",
      stat1Label: "Авторлық оқу сабағы",
      stat2Label: "Тест сұрақтары банкі",
      stat3Label: "Кәсіби терминдер қоры",
      stat4Label: "Шынайы нарық кейстері",
    },
    auth: {
      loginTitle: "Платформаға кіру",
      registerTitle: "Жаңа есептік жазба ашу",
      loginSubtitle: "Маркетинг зертханасына қош келдіңіз!",
      registerSubtitle: "10-сыныптың авторлық бағдарламасына қосылыңыз",
      name: "Аты-жөніңіз",
      email: "Электрондық пошта",
      password: "Құпия сөз",
      role: "Рөліңіз",
      student: "Оқушы",
      teacher: "Мұғалім",
      admin: "Әкімші (Мектеп)",
      classCode: "Сынып коды",
      classCodePlaceholder: "Мысалы: 10A-MARKET",
      loginBtn: "Кіру",
      registerBtn: "Тіркелу",
      noAccount: "Есептік жазбаңыз жоқ па?",
      hasAccount: "Есептік жазбаңыз бар ма?",
      guestLogin: "Қонақ ретінде көру",
      demoStudent: "Оқушы демо",
      demoTeacher: "Мұғалім демо",
      demoAdmin: "Админ демо",
      logout: "Шығу",
    },
    dashboard: {
      greeting: "Сәлем",
      welcomeBack: "Бүгін жаңа маркетингтік жобаларды жүзеге асыруға дайынсың ба?",
      stats: {
        points: "Жалпы ұпай",
        level: "Шеберлік деңгейі",
        streak: "Күндер сериясы",
        completedTasks: "Аяқталған жұмыс",
        days: "күн",
        levelSuffix: "-деңгей",
        pointsUnit: "XP",
        emptyPoints: "Әзірге ұпай жоқ. 01 модульден бастаңыз!",
        emptyStreak: "Бүгін белсенділік көрсетіңіз",
      },
      modulesTitle: "Негізгі модульдер (8 бағыт)",
      modulesSubtitle: "Практикалық зертхананың барлық интерактивті бағыттары",
      monthlyProgressTitle: "Айлық оқу прогресі",
      calendarTitle: "Оқу күнтізбесі",
      activityTitle: "Апталық белсенділік",
      activityUnit: "тапсырма",
      topPerformersTitle: "Сынып үздіктері (Топ)",
      continueBtn: "Жалғастыру",
      startBtn: "Бастау",
      completedStatus: "Аяқталды",
      inProgressStatus: "Өтуде",
      notStartedStatus: "Басталмаған",
      tasksUnit: "жұмыс",
      emptyActivity: "Бүгінге тапсырма орындаңыз",
    },
    bilim: {
      title: "01. Білім алаңы — Теория және терминдер",
      subtitle: "«Маркетингтегі қазақ тілі» 17 сабағының толық теориялық базасы мен практикалық тапсырмалары",
      tabs: {
        theory: "Теориялық конспект",
        matching: "Терминдер сәйкестігі",
        quiz: "Бекіту тесті",
        findKazakh: "Қазақша балама",
        selfCheck: "Өзін-өзі бағалау",
      },
      theoryTab: "Теориялық конспект",
      matchTab: "Терминдер сәйкестігі",
      quizTab: "Бекіту тесті",
      findKazakhTab: "Қазақша балама",
      selfCheckTab: "Өзін-өзі бағалау",
      matchPrompt: "Терминдерді дұрыс анықтамасымен сәйкестендіріңіз:",
      matchSuccess: "Барлық жұптар дұрыс табылды! +50 XP",
      nextTopic: "Келесі тақырып",
      prevTopic: "Алдыңғы тақырып",
      topicCompleted: "Тақырып сәтті меңгерілді!",
    },
    studio: {
      title: "02. Жарнама студиясы — Мәтін және ұран",
      subtitle: "5 қатаң критерий бойынша ұрандар мен 6 элементтік жарнамалық мәтіндерді автоматты тексеру",
      tabSlogan: "Ұран (Слоган) шеберханасы",
      tabAdText: "Жарнамалық мәтін құрастыру (6 элемент)",
      criteriaTitle: "Сапаны тексерудің 5 қатаң критерийі",
      brandName: "Бренд атауы",
      brandNamePlaceholder: "Мысалы: Qazaq Republic, Балақай, Balmuzdaq",
      sloganInput: "Қазақша ұран (слоган) жазыңыз",
      sloganPlaceholder: "Мысалы: Qazaq Republic — дала рухының заманауи көрінісі!",
      qualityScore: "Ұран сапасының рейтингі",
      criteriaLength: "Ұзындығы (3–6 сөз)",
      criteriaKazakhLetters: "Төл қазақ әріптері (ә, і, ң, ғ, ү, ұ, қ, ө, һ)",
      criteriaNoRussianLetters: "Орысша ғана әріптер жоқ (ё, ъ, ь, э, щ, ц)",
      criteriaBrandIncluded: "Мәтінде бренд атауы қамтылған",
      criteriaCallToAction: "Әрекетке шақыру немесе ритм бар",
      saveBtn: "Портфолиоға сақтау",
      savedSuccess: "Жарнама материалы портфолиоңызға сақталды!",
      headline: "1. Тартымды тақырып",
      targetAudience: "2. Мақсатты аудитория",
      benefits: "3. Өнім артықшылықтары мен құндылығы",
      callToAction: "4. Әрекетке шақыру (Call to Action)",
      deadline: "5. Науқан мерзімі немесе жеңілдік",
      contacts: "6. Байланыс және мекенжай",
      previewHeader: "Жарнамалық мәтін карточкасы",
    },
    brand: {
      title: "03. Бренд зертханасы — Атау және бренд",
      subtitle: "Өз брендіңіздің тұжырымдамасы мен цифрлық төлқұжатын жасаңыз",
      formTitle: "Бренд параметрлері",
      brandName: "Бренд атауы",
      productType: "Өнім немесе қызмет түрі",
      targetAudience: "Мақсатты тұтынушы аудиториясы",
      colors: "Бренд түстері",
      slogan: "Бренд ұраны",
      mission: "Миссиясы мен құндылығы",
      logoIcon: "Бренд белгішесі",
      previewTitle: "Бренд карточкасының алдын-ала көрінісі",
      saveBtn: "Портфолиоға сақтау",
      exportPng: "Карточканы сурет (PNG) етіп жүктеу",
      savedSuccess: "Бренд сәтті жасалып, портфолиоға сақталды!",
      saveToPortfolio: "Портфолиоға сақтау",
      savedAlert: "Бренд сақталды!",
      primaryColor: "Негізгі түс",
      secondaryColor: "Қосымша түс",
      previewHeader: "Бренд карточкасы",
      exportImage: "Карточканы жүктеу (PNG)",
      brandNameLabel: "Бренд атауы",
      productLabel: "Өнім түрі",
      targetAudienceLabel: "Мақсатты аудитория",
      sloganLabel: "Бренд ұраны",
      colorsLabel: "Бренд түстері",
      valuesLabel: "Миссиясы мен құндылықтары",
    },
    smm: {
      title: "04. SMM орталығы — Әлеуметтік желі",
      subtitle: "Instagram, TikTok және Facebook желілеріне арналған визуалды жарнамалық посттар конструкторы",
      platform: "Әлеуметтік желі түрі",
      headline: "Посттың басты тақырыбы",
      body: "Негізгі жарнамалық мәтін",
      hashtags: "Қазақша хэштегтер",
      callToAction: "Әрекетке шақыру (CTA)",
      previewTitle: "Смартфон мокапындағы көрінісі",
      copyText: "Мәтінді көшіру",
      textCopied: "Мәтін буферге көшірілді!",
      saveBtn: "Портфолиоға сақтау",
      savedSuccess: "SMM посты портфолиоңызға сақталды!",
    },
    seo: {
      title: "05. SEO шеберханасы — Іздеу және кілтсөз",
      subtitle: "Google және Yandex жүйелеріндегі қазақ тілді іздеу нәтижелерін оңтайландыру тренажері",
      serpPreviewTitle: "Іздеу жүйесінің нәтижесі (SERP Preview)",
      pageTitle: "Парақ тақырыбы (SEO Title)",
      metaDescription: "Қысқаша сипаттамасы (Meta Description)",
      urlSlug: "Сайт сілтемесі (URL Slug)",
      keywords: "Негізгі кілт сөздер (үтірмен)",
      analysisTitle: "Автоматты SEO талдауы",
      titleLengthCheck: "Title ұзындығы (50–60 таңба)",
      descLengthCheck: "Description ұзындығы (120–160 таңба)",
      keywordsCheck: "Кілт сөздердің сәйкестігі",
      kazakhCheck: "Қазақша іздеу сұраныстары",
      scoreLabel: "SEO оңтайландыру сапасы",
      saveBtn: "SEO жобасын сақтау",
      savedSuccess: "SEO жобасы портфолиоға сақталды!",
    },
    game: {
      title: "06. Маркетинг ойыны — Тапсырмалар мен тест",
      subtitle: "35+ термин сәйкестендіру ойыны, 60+ сұрақтан тұратын тест банкі және 10 нақты нарық кейсі",
      tabTerms: "Терминдер ойыны",
      tabQuiz: "Тест орталығы (60+ сұрақ)",
      tabCases: "Маркетингтік кейстер",
      score: "Ұпай",
      combo: "Комбо",
      timeLeft: "Қалған уақыт",
      startBtn: "Ойынды бастау",
      finishBtn: "Аяқтау",
      dictionarySearch: "Сөздіктен іздеу...",
      test10Btn: "10 сұрақ (Жедел тест)",
      test40Btn: "40 сұрақ (Толық емтихан)",
      nextQuestion: "Келесі сұрақ",
      prevQuestion: "Алдыңғы",
      finishQuiz: "Тестті аяқтау",
      caseExplanation: "Шешімнің себебі",
      expertVerdict: "Сарапшы қорытындысы",
    },
    portfolio: {
      title: "07. Жоба портфолиосы — Оқушы жұмыстары",
      subtitle: "Оқушы жасаған барлық шығармашылық брендтер, ұрандар, SMM постылары мен SEO жобалары",
      studentInfo: "Оқушы мәліметтері",
      badgesTitle: "Иеленген бейдждер мен жетістіктер",
      brandsTitle: "Жасалған брендтер",
      slogansTitle: "Ұрандар топтамасы",
      smmPostsTitle: "SMM жарнамалары",
      seoProjectsTitle: "SEO оңтайландырулары",
      adTextsTitle: "Жарнамалық мәтіндер",
      testsPassed: "Сәтті өткен тестілер",
      exportPdf: "Портфолионы PDF етіп жүктеу",
      printPortfolio: "Басып шығару",
      emptyBrands: "Әзірге брендтер жоқ. «03 Бренд зертханасында» алғашқы брендіңізді жасаңыз!",
      emptySlogans: "Әзірге сақталған ұрандар жоқ. «02 Жарнама студиясында» жазып көріңіз!",
      emptyPosts: "Әзірге постылар жоқ. «04 SMM орталығында» пост жариялаңыз!",
    },
    achievements: {
      title: "08. Жетістік алаңы — Ұпай және марапат",
      subtitle: "Сіздің жинаған тәжірибеңіз (XP), дәрежеңіз, марапаттарыңыз және ресми сертификатыңыз",
      xpProgress: "Келесі деңгейге дейінгі прогресс",
      currentLevel: "Қазіргі шеберлік деңгейі",
      nextLevel: "Келесі деңгей",
      streakTitle: "Үздіксіз күн сериясы",
      badgesTitle: "Жетістік бейдждері топтамасы",
      leaderboardTitle: "Сынып рейтингісі (10-сынып)",
      certificateTitle: "Курсты аяқтау ресми сертификаты",
      downloadCertificate: "Сертификатты жүктеу (PDF)",
    },
    lessonPlans: {
      title: "09. Сабақ жоспарлары — № 130 бұйрық",
      subtitle: "ҚР Оқу-ағарту министрлігінің № 130 бұйрығына сәйкес дайын 17 қысқа мерзімді сабақ жоспары (ҚМЖ)",
      orderBadge: "ҚР Оқу-ағарту министрлігінің № 130 бұйрығы үлгісінде",
      selectLesson: "Сабақты таңдаңыз (1–17 тақырып)",
      planDetails: "Сабақ жоспарының паспорты",
      duration: "45 минут (10 + 25 + 10 минут)",
      objectives: "Оқу бағдарламасына сәйкес оқу мақсаттары",
      expectedResults: "Сабақтың мақсаты мен күтілетін нәтижелері",
      stagesTable: "Сабақтың барысы (10+25+10 минуттық нақты кесте)",
      rubric: "Критериалды бағалау және дескрипторлар",
      homework: "Үй тапсырмасы және рефлексия",
      directions11Title: "Сабақты талдаудың 11 бағыты",
      copyPlan: "ҚМЖ мәтінін көшіру",
      downloadDocx: "DOCX форматында жүктеу (№ 130 үлгісі)",
      downloadPdf: "PDF форматында жүктеу",
      print: "Басып шығару",
      copiedSuccess: "ҚМЖ мәтіні көшірілді!",
    },
    methodology: {
      title: "10. Әдістемелік құрал және жұмыс парақтары",
      subtitle: "9 бағалау критерийі, әдістемелік нұсқаулық және мұғалім жауап кілттері бар 10 жұмыс парағы",
      guideTab: "Әдістемелік нұсқаулық",
      rubricsTab: "9 бағалау критерийі (Рубрикатор)",
      worksheetsTab: "10 баспалық жұмыс парағы",
      printSheet: "Жұмыс парағын басу",
      downloadSheet: "PDF жүктеу",
      answerKeyToggle: "Мұғалім жауап кілттерін көрсету",
      studentNameField: "Оқушының аты-жөні: ___________________________",
      scoreField: "Балы: ___ / 10",
      printWorksheet: "Жұмыс парағын басу",
      answerKeyHeader: "Мұғалімге арналған жауап кілттері",
    },
    teacher: {
      title: "Мұғалім кабинеті — Басқару және аналитика",
      subtitle: "10A сыныбының оқу процесін бақылау, нәтижелер және контентті басқару (CMS)",
      classCode: "Сыныпқа кіру коды",
      studentsCount: "Оқушылар саны",
      averageScore: "Сыныптың орташа балы",
      activeToday: "Бүгін белсенді оқушылар",
      studentsTableTitle: "10A сынып оқушыларының үлгерім кестесі",
      nameCol: "Оқушы аты-жөні",
      pointsCol: "Ұпай (XP)",
      levelCol: "Деңгей",
      completedCol: "Аяқталған",
      lastActiveCol: "Соңғы кіргені",
      actionsCol: "Әрекет",
      exportExcel: "Нәтижелерді Excel (CSV) жүктеу",
      viewStudent: "Карточка",
      quickActionsTitle: "Жедел әрекеттер",
      createQmjBtn: "№ 130 бұйрықпен ҚМЖ жасау",
      addQuestionBtn: "Жаңа тест сұрағын қосу",
      cmsTabTitle: "Оқу материалдарын басқару (CMS)",
      aiSettingsTitle: "ИИ-чатботын баптау",
    },
    aiChat: {
      widgetTitle: "QAZMARKET ИИ-кеңесшісі",
      welcomeMessage: "Сәлем! Мен маркетинг және қазақ тілі бойынша сіздің виртуалды көмекшіңізбін. Қандай сұрағыңыз бар?",
      inputPlaceholder: "Сұрағыңызды немесе тапсырманы жазыңыз...",
      sendBtn: "Жіберу",
      limitNotice: "Күндізгі лимит: 25 хабарлама",
      suggestion1: "Ұранды 5 критериймен қалай тексереді?",
      suggestion2: "Маркетингтегі 4P моделі деген не?",
      suggestion3: "№ 130 бұйрық бойынша ҚМЖ құрастыруға көмектес",
    },
  },
  ru: {
    appName: "QAZMARKET",
    appSubtitle: "Лаборатория казахского маркетинга",
    slogan: "Думай по-казахски. Твори креативно. Продвигай на рынке!",
    badge10th: "10-класс",
    nav: {
      dashboard: "Главная",
      bilim: "01 База знаний",
      studio: "02 Студия рекламы",
      brand: "03 Лаборатория бренда",
      smm: "04 Центр SMM",
      seo: "05 Мастерская SEO",
      game: "06 Маркетинг-игра",
      portfolio: "07 Портфолио проектов",
      achievements: "08 Зал достижений",
      lessonPlans: "09 Планы уроков",
      methodology: "10 Методпособие",
      teacher: "Кабинет учителя",
      admin: "Панель админа",
      terminder: "Игра терминов",
      test: "Банк тестов",
      copywriter: "Копирайтер",
      jarname: "Проект рекламы",
      cases: "Кейсы",
    },
    sections: {
      studentsTitle: "Для учеников (8 разделов)",
      teachersTitle: "Для учителей",
    },
    landing: {
      heroBadge: "Авторский элективный курс «Маркетингтегі қазақ тілі»",
      heroTitle: "Преврати идею в бренд!",
      heroSubtitle: "Коммерческая интерактивная платформа для 10 класса: казахский язык, маркетинг и цифровая грамотность.",
      enterBtn: "Войти на платформу",
      exploreBtn: "О программе курса",
      modulesTitle: "8 интерактивных учебных модулей",
      modulesSubtitle: "Ученик работает как маркетолог, копирайтер, бренд-дизайнер и SMM-специалист.",
      howItWorksTitle: "Как это работает?",
      howItWorksSubtitle: "Всего 3 простых шага для создания собственного профессионального маркетингового портфолио.",
      step1Title: "1. Регистрация по коду класса",
      step1Desc: "Войдите в личный кабинет по коду учителя (10A-MARKET).",
      step2Title: "2. Практические задания",
      step2Desc: "Пишите слоганы, создавайте бренды, разрабатывайте посты для Instagram и Telegram.",
      step3Title: "3. Цифровое портфолио",
      step3Desc: "Скачайте единый профессиональный PDF-документ со всеми выполненными проектами.",
      teachersSectionTitle: "Возможности для учителей",
      teachersSectionDesc: "17 поурочных планов (ҚМЖ) по приказу № 130, 10 печатных рабочих листов и экспорт успеваемости в Excel.",
      teachersFeature1: "Готовые ҚМЖ по приказу № 130 (10-25-10 мин)",
      teachersFeature2: "10 рабочих листов с ключами ответов",
      teachersFeature3: "Аналитика класса и экспорт в Excel",
      teachersBtn: "В кабинет учителя",
      authorTitle: "Автор программы",
      authorName: "Сарсенова Аккумис Пиржановна",
      authorSchool: "Учитель казахского языка и литературы, педагог-эксперт. Гимназия № 6 г. Хромтау, Актюбинская область",
      stat1Label: "Уроков по программе",
      stat2Label: "Вопросов в банке тестов",
      stat3Label: "Профессиональных терминов",
      stat4Label: "Реальных рыночных кейсов",
    },
    auth: {
      loginTitle: "Вход на платформу",
      registerTitle: "Регистрация аккаунта",
      loginSubtitle: "Добро пожаловать в маркетинговую лабораторию!",
      registerSubtitle: "Присоединяйтесь к авторской программе 10 класса",
      name: "Ваше имя и фамилия",
      email: "Электронная почта",
      password: "Пароль",
      role: "Ваша роль",
      student: "Ученик",
      teacher: "Учитель",
      admin: "Администратор школы",
      classCode: "Код класса",
      classCodePlaceholder: "Например: 10A-MARKET",
      loginBtn: "Войти",
      registerBtn: "Зарегистрироваться",
      noAccount: "Нет аккаунта?",
      hasAccount: "Уже есть аккаунт?",
      guestLogin: "Войти как гость",
      demoStudent: "Демо ученика",
      demoTeacher: "Демо учителя",
      demoAdmin: "Демо админа",
      logout: "Выйти",
    },
    dashboard: {
      greeting: "Привет",
      welcomeBack: "Готов реализовать новые маркетинговые проекты сегодня?",
      stats: {
        points: "Всего баллов",
        level: "Уровень мастерства",
        streak: "Серия дней",
        completedTasks: "Выполнено работ",
        days: "дней",
        levelSuffix: "-уровень",
        pointsUnit: "XP",
        emptyPoints: "Пока 0 баллов. Начните с модуля 01!",
        emptyStreak: "Проявите активность сегодня",
      },
      modulesTitle: "Основные модули (8 направлений)",
      modulesSubtitle: "Интерактивные направления практической лаборатории",
      monthlyProgressTitle: "Месячный прогресс",
      calendarTitle: "Учебный календарь",
      activityTitle: "Недельная активность",
      activityUnit: "заданий",
      topPerformersTitle: "Лидеры класса (Топ)",
      continueBtn: "Продолжить",
      startBtn: "Начать",
      completedStatus: "Завершено",
      inProgressStatus: "В процессе",
      notStartedStatus: "Не начато",
      tasksUnit: "работ",
      emptyActivity: "Выполните задание сегодня",
    },
    bilim: {
      title: "01. База знаний — Теория и термины",
      subtitle: "Полная теоретическая база и практические задания по 17 темам курса «Маркетингтегі қазақ тілі»",
      tabs: {
        theory: "Конспект теории",
        matching: "Пары терминов",
        quiz: "Мини-тест",
        findKazakh: "Казахский эквивалент",
        selfCheck: "Самопроверка",
      },
      theoryTab: "Конспект теории",
      matchTab: "Пары терминов",
      quizTab: "Мини-тест",
      findKazakhTab: "Казахский эквивалент",
      selfCheckTab: "Самопроверка",
      matchPrompt: "Сопоставьте термины с их правильными определениями:",
      matchSuccess: "Все пары найдены верно! +50 XP",
      nextTopic: "Следующая тема",
      prevTopic: "Предыдущая тема",
      topicCompleted: "Тема успешно освоена!",
    },
    studio: {
      title: "02. Студия рекламы — Текст и слоган",
      subtitle: "Автоматическая проверка слоганов по 5 строгим критериям и конструктор рекламного текста по 6 элементам",
      tabSlogan: "Мастерская слоганов",
      tabAdText: "Конструктор рекламного текста (6 элементов)",
      criteriaTitle: "5 строгих критериев качества",
      brandName: "Название бренда",
      brandNamePlaceholder: "Например: Qazaq Republic, Балақай, Balmuzdaq",
      sloganInput: "Введите слоган на казахском языке",
      sloganPlaceholder: "Например: Qazaq Republic — дала рухының заманауи көрінісі!",
      qualityScore: "Оценка качества слогана",
      criteriaLength: "Длина (3–6 слов)",
      criteriaKazakhLetters: "Казахские буквы (ә, і, ң, ғ, ү, ұ, қ, ө, һ)",
      criteriaNoRussianLetters: "Нет сугубо русских букв (ё, ъ, ь, э, щ, ц)",
      criteriaBrandIncluded: "Бренд упомянут в тексте",
      criteriaCallToAction: "Есть ритм или призыв к действию",
      saveBtn: "Сохранить в портфолио",
      savedSuccess: "Материал сохранен в портфолио!",
      headline: "1. Цепляющий заголовок",
      targetAudience: "2. Целевая аудитория",
      benefits: "3. Преимущества продукта",
      callToAction: "4. Призыв к действию (CTA)",
      deadline: "5. Срок акции или скидка",
      contacts: "6. Контакты и адрес",
      previewHeader: "Карточка рекламного текста",
    },
    brand: {
      title: "03. Лаборатория бренда — Имя и бренд",
      subtitle: "Создайте концепцию и цифровой паспорт собственного бренда",
      formTitle: "Параметры бренда",
      brandName: "Название бренда",
      productType: "Тип продукта или услуги",
      targetAudience: "Целевая аудитория",
      colors: "Фирменные цвета",
      slogan: "Слоган бренда",
      mission: "Миссия и ценности",
      logoIcon: "Символ / иконка логотипа",
      previewTitle: "Предпросмотр карточки бренда",
      saveBtn: "Сохранить в портфолио",
      exportPng: "Скачать карточку как PNG",
      savedSuccess: "Бренд успешно сохранен в портфолио!",
      saveToPortfolio: "Сохранить в портфолио",
      savedAlert: "Бренд сохранен!",
      primaryColor: "Основной цвет",
      secondaryColor: "Дополнительный цвет",
      previewHeader: "Карточка бренда",
      exportImage: "Скачать карточку (PNG)",
      brandNameLabel: "Название бренда",
      productLabel: "Тип продукта",
      targetAudienceLabel: "Целевая аудитория",
      sloganLabel: "Слоган бренда",
      colorsLabel: "Фирменные цвета",
      valuesLabel: "Миссия и ценности",
    },
    smm: {
      title: "04. Центр SMM — Социальные сети",
      subtitle: "Конструктор рекламных постов для Instagram, TikTok и Facebook с живым мокапом",
      platform: "Платформа соцсети",
      headline: "Главный заголовок поста",
      body: "Текст рекламного поста",
      hashtags: "Хэштеги на казахском",
      callToAction: "Призыв к действию (CTA)",
      previewTitle: "Предпросмотр на экране смартфона",
      copyText: "Скопировать текст",
      textCopied: "Текст скопирован в буфер!",
      saveBtn: "Сохранить в портфолио",
      savedSuccess: "Пост сохранен в портфолио!",
    },
    seo: {
      title: "05. Мастерская SEO — Поиск и ключевые слова",
      subtitle: "Тренажер поисковой оптимизации для казахскоязычных запросов Google и Яндекс",
      serpPreviewTitle: "Отображение в поисковике (SERP Preview)",
      pageTitle: "Заголовок страницы (SEO Title)",
      metaDescription: "Краткое описание (Meta Description)",
      urlSlug: "Адрес ссылки (URL Slug)",
      keywords: "Ключевые слова (через запятую)",
      analysisTitle: "Автоматический анализ SEO",
      titleLengthCheck: "Длина Title (50–60 символов)",
      descLengthCheck: "Длина Description (120–160 символов)",
      keywordsCheck: "Плотность ключевых слов",
      kazakhCheck: "Казахские поисковые фразы",
      scoreLabel: "Индекс SEO-оптимизации",
      saveBtn: "Сохранить SEO-проект",
      savedSuccess: "SEO проект сохранен в портфолио!",
    },
    game: {
      title: "06. Маркетинг-игра — Задания и тесты",
      subtitle: "Игра на сопоставление 35+ терминов, банк 60+ вопросов и 10 реальных кейсов",
      tabTerms: "Игра терминов",
      tabQuiz: "Тест-центр (60+ вопросов)",
      tabCases: "Маркетинговые кейсы",
      score: "Баллы",
      combo: "Комбо",
      timeLeft: "Осталось времени",
      startBtn: "Начать игру",
      finishBtn: "Завершить",
      dictionarySearch: "Поиск в словаре...",
      test10Btn: "10 вопросов (Экспресс)",
      test40Btn: "40 вопросов (Экзамен)",
      nextQuestion: "Следующий вопрос",
      prevQuestion: "Назад",
      finishQuiz: "Завершить тест",
      caseExplanation: "Объяснение решения",
      expertVerdict: "Вердикт эксперта",
    },
    portfolio: {
      title: "07. Портфолио проектов — Работы ученика",
      subtitle: "Все бренды, слоганы, рекламные посты и SEO проекты ученика в одном месте",
      studentInfo: "Информация об ученике",
      badgesTitle: "Полученные бейджи и достижения",
      brandsTitle: "Созданные бренды",
      slogansTitle: "Коллекция слоганов",
      smmPostsTitle: "SMM посты",
      seoProjectsTitle: "SEO оптимизации",
      adTextsTitle: "Рекламные тексты",
      testsPassed: "Пройдено тестов",
      exportPdf: "Экспорт портфолио в PDF",
      printPortfolio: "Распечатать",
      emptyBrands: "Пока нет брендов. Создайте первый в разделе «03 Лаборатория бренда»!",
      emptySlogans: "Пока нет слоганов. Напишите в разделе «02 Студия рекламы»!",
      emptyPosts: "Пока нет постов. Опубликуйте в разделе «04 Центр SMM»!",
    },
    achievements: {
      title: "08. Зал достижений — Баллы и награды",
      subtitle: "Ваш опыт (XP), уровень мастерства, коллекция бейджей и официальный сертификат",
      xpProgress: "Прогресс до следующего уровня",
      currentLevel: "Текущий уровень мастерства",
      nextLevel: "Следующий уровень",
      streakTitle: "Серия непрерывных дней",
      badgesTitle: "Коллекция бейджей",
      leaderboardTitle: "Рейтинг класса (10 класс)",
      certificateTitle: "Официальный сертификат об окончании",
      downloadCertificate: "Скачать сертификат (PDF)",
    },
    lessonPlans: {
      title: "09. Планы уроков — Приказ № 130",
      subtitle: "17 готовых планов поурочных занятий (ҚМЖ) по приказу № 130 МОН РК",
      orderBadge: "По типовому шаблону приказа № 130",
      selectLesson: "Выберите урок (1–17 темы)",
      planDetails: "Паспорт плана урока",
      duration: "45 минут (10 + 25 + 10 минут)",
      objectives: "Цели обучения по программе",
      expectedResults: "Цели урока и ожидаемые результаты",
      stagesTable: "Ход урока (таблица 10+25+10 минут)",
      rubric: "Критериальное оценивание и дескрипторы",
      homework: "Домашнее задание и рефлексия",
      directions11Title: "11 направлений анализа урока",
      copyPlan: "Скопировать текст ҚМЖ",
      downloadDocx: "Скачать в DOCX (формат № 130)",
      downloadPdf: "Скачать в PDF",
      print: "Распечатать",
      copiedSuccess: "Текст ҚМЖ скопирован!",
    },
    methodology: {
      title: "10. Методпособие и рабочие листы",
      subtitle: "9 критериев оценивания, методические рекомендации и 10 рабочих листов с ключами ответов",
      guideTab: "Методическое руководство",
      rubricsTab: "9 критериев оценивания (Рубрикатор)",
      worksheetsTab: "10 печатных рабочих листов",
      printSheet: "Печать листа",
      downloadSheet: "Скачать PDF",
      answerKeyToggle: "Показать ключи ответов для учителя",
      studentNameField: "ФИО ученика: ___________________________",
      scoreField: "Баллы: ___ / 10",
      printWorksheet: "Печать листа",
      answerKeyHeader: "Ключи ответов для учителя",
    },
    teacher: {
      title: "Кабинет учителя — Управление и аналитика",
      subtitle: "Мониторинг 10A класса, успеваемость и управление учебным контентом (CMS)",
      classCode: "Код доступа для класса",
      studentsCount: "Учеников в классе",
      averageScore: "Средний балл класса",
      activeToday: "Активно сегодня",
      studentsTableTitle: "Ведомость успеваемости 10A класса",
      nameCol: "ФИО ученика",
      pointsCol: "Баллы (XP)",
      levelCol: "Уровень",
      completedCol: "Выполнено",
      lastActiveCol: "Был в сети",
      actionsCol: "Действие",
      exportExcel: "Экспорт в Excel (CSV)",
      viewStudent: "Карточка",
      quickActionsTitle: "Быстрые действия",
      createQmjBtn: "Создать ҚМЖ по приказу № 130",
      addQuestionBtn: "Добавить вопрос в банк",
      cmsTabTitle: "Управление контентом (CMS)",
      aiSettingsTitle: "Настройки ИИ-чатбота",
    },
    aiChat: {
      widgetTitle: "ИИ-консультант QAZMARKET",
      welcomeMessage: "Здравствуйте! Я ваш виртуальный помощник по маркетингу и казахскому языку. Какой у вас вопрос?",
      inputPlaceholder: "Задайте вопрос или введите задание...",
      sendBtn: "Отправить",
      limitNotice: "Дневной лимит: 25 сообщений",
      suggestion1: "Как проверить слоган по 5 критериям?",
      suggestion2: "Что такое модель 4P в маркетинге?",
      suggestion3: "Помоги составить ҚМЖ по приказу № 130",
    },
  },
};

export function getT(lang: Lang): TranslationSchema {
  return translations[lang] || translations.kk;
}
