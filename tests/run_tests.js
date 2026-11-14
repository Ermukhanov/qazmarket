const { chromium } = require("playwright");

async function runTests() {
  console.log("=== QAZMARKET END-TO-END AUTOMATED TEST SUITE ===");
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const report = {
    total: 0,
    passed: 0,
    failed: 0,
    details: [],
  };

  function assert(name, condition, details = "") {
    report.total++;
    if (condition) {
      report.passed++;
      console.log(`[PASS] ${name}`);
      report.details.push({ test: name, status: "PASS", details });
    } else {
      report.failed++;
      console.error(`[FAIL] ${name} - ${details}`);
      report.details.push({ test: name, status: "FAIL", details });
    }
  }

  try {
    // 1. Home Page & Theme / Lang Switch
    console.log("\n--- TEST 1: HOME PAGE, THEME & LANGUAGE ---");
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    const title = await page.title();
    assert("Page title contains QAZMARKET", title.includes("QAZMARKET"), title);

    const sloganVisible = await page.getByText("Қазақша ойла. Креативті жаса. Нарықта таныт!").first().isVisible();
    assert("Slogan is displayed in header/hero", sloganVisible);

    // Toggle theme to dark
    const themeBtn = page.locator('button[aria-label="Теманы өзгерту"]');
    await themeBtn.click();
    await page.waitForTimeout(300);
    const htmlThemeDark = await page.getAttribute("html", "data-theme");
    assert("Theme toggle sets dark theme", htmlThemeDark === "dark", htmlThemeDark);

    // Toggle theme back to light
    await themeBtn.click();
    await page.waitForTimeout(300);
    const htmlThemeLight = await page.getAttribute("html", "data-theme");
    assert("Theme toggle sets light theme", htmlThemeLight === "light", htmlThemeLight);

    // Toggle language to Russian
    const langBtn = page.locator('button[aria-label="Тілді ауыстыру"]');
    await langBtn.click();
    await page.waitForTimeout(300);
    const ruVisible = await page.getByText("Лаборатория маркетинга").first().isVisible();
    assert("Language toggle switches to Russian", ruVisible);

    // Toggle language back to Kazakh
    await langBtn.click();
    await page.waitForTimeout(300);
    const kzVisible = await page.getByText("Қазақ тіліндегі маркетинг зертханасы").first().isVisible();
    assert("Language toggle switches to Kazakh", kzVisible);

    // 2. Auth Flow (Student & Teacher Demo)
    console.log("\n--- TEST 2: AUTHENTICATION FLOW ---");
    await page.goto("http://localhost:3000/login", { waitUntil: "networkidle" });
    const quickStudentBtn = page.getByText("Оқушы кіру").first();
    await quickStudentBtn.click();
    await page.waitForURL("http://localhost:3000/");
    const greetingVisible = await page.getByText("Сәлем, Айсұлтан!").first().isVisible();
    assert("Student demo login redirects and greets user", greetingVisible);

    // 3. Bilim Module (Theory, Match, Quiz, Find Kazakh, Self Check)
    console.log("\n--- TEST 3: BILIM ALAҢY MODULE ---");
    await page.goto("http://localhost:3000/bilim", { waitUntil: "networkidle" });
    const topicHeading = await page.getByText("Маркетинг дегеніміз не?").first().isVisible();
    assert("Bilim page displays topic 1", topicHeading);

    // Test match tab
    const matchTabBtn = page.getByText("2. Терминді сәйкестендіру").first();
    await matchTabBtn.click();
    const termBtn = page.getByText("Product (Өнім)").first();
    await termBtn.click();
    const defBtn = page.getByText("Тұтынушының қажеттілігін өтейтін тауар немесе қызмет").first();
    await defBtn.click();
    await page.waitForTimeout(300);
    const matchScore = await page.getByText("1 / 8 жұп табылды").first().isVisible();
    assert("Matching exercise pair matched successfully", matchScore);

    // 4. Terminder Game (35 terms matching & Dictionary)
    console.log("\n--- TEST 4: TERMINIDER GAME & DICTIONARY ---");
    await page.goto("http://localhost:3000/terminder", { waitUntil: "networkidle" });
    const dictBtn = page.getByText("Толық сөздікті ашу").first();
    await dictBtn.click();
    await page.waitForTimeout(300);
    const searchInput = page.getByPlaceholder("Терминді немесе анықтаманы іздеу...");
    await searchInput.fill("Slogan");
    const sloganDef = await page.getByText("Ұран, слоган").first().isVisible();
    assert("Dictionary search finds Slogan term", sloganDef);

    // close modal
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);

    // 5. Test Bank (Quiz mode, answer question, review errors)
    console.log("\n--- TEST 5: TEST BANK (40+ QUESTIONS) ---");
    await page.goto("http://localhost:3000/test", { waitUntil: "networkidle" });
    const random10Btn = page.getByText("Кездейсоқ 10 сұрақ алу").first();
    await random10Btn.click();
    await page.waitForTimeout(300);

    const question1 = await page.getByText("Сұрақ 1 / 10").first().isVisible();
    assert("Quiz question 1 of 10 is active", question1);

    const firstOption = page.locator("div.space-y-3 button").first();
    await firstOption.click();
    await page.waitForTimeout(200);

    const finishBtn = page.getByText("Келесі").first();
    assert("Next question button is present", await finishBtn.isVisible());

    // 6. Copywriter Workshop (5 criteria verification)
    console.log("\n--- TEST 6: COPYWRITER 5 CRITERIA VERIFICATION ---");
    await page.goto("http://localhost:3000/copywriter", { waitUntil: "networkidle" });
    const textarea = page.locator("textarea").first();
    await textarea.fill("Ақбұлақ — атамекеннің балғын сүтін таңдаңыз!");
    await page.waitForTimeout(300);

    const criteriaHeader = await page.getByText("Тексеру критерийлері").first().isVisible();
    assert("5 Criteria checklist is live", criteriaHeader);

    const saveSloganBtn = page.getByText("Портфолиоға қосу").first();
    await saveSloganBtn.click();
    await page.waitForTimeout(500);
    const savedNotice = await page.getByText("Портфолиоға сақталды!").first().isVisible();
    assert("Slogan saved to portfolio successfully", savedNotice);

    // 7. Brand Studio (Constructor & live preview)
    console.log("\n--- TEST 7: BRAND STUDIO CONSTRUCTOR ---");
    await page.goto("http://localhost:3000/brand", { waitUntil: "networkidle" });
    const brandInput = page.getByPlaceholder("Мысалы: Tumar Wear").first();
    await brandInput.fill("Astana Eco");
    await page.waitForTimeout(300);
    const previewHeader = await page.getByText("ASTANA ECO").first().isVisible();
    assert("Live brand card preview updates dynamically", previewHeader);

    const saveBrandBtn = page.getByText("Брендті портфолиоға сақтау").first();
    await saveBrandBtn.click();
    await page.waitForTimeout(500);
    const brandSavedAlert = await page.getByText("Бренд карточкасы портфолиоға сәтті сақталды!").first().isVisible();
    assert("Brand card saved to student portfolio", brandSavedAlert);

    // 8. Jarname Ad Creator (Instagram / Telegram Mockup)
    console.log("\n--- TEST 8: SOCIAL MEDIA AD CREATOR ---");
    await page.goto("http://localhost:3000/jarname", { waitUntil: "networkidle" });
    const tgBtn = page.getByText("Telegram Channel").first();
    await tgBtn.click();
    await page.waitForTimeout(300);
    const tgMockup = await page.getByText("Telegram Mockup").first().isVisible();
    assert("Telegram channel ad mockup is active", tgMockup);

    const copyBtn = page.getByText("Мәтінді көшіріп алу").first();
    await copyBtn.click();
    await page.waitForTimeout(300);
    const copiedAlert = await page.getByText("Мәтін буферге көшірілді!").first().isVisible();
    assert("Ad text copied with toast confirmation", copiedAlert);

    // 9. Cases (Case Study 1)
    console.log("\n--- TEST 9: MARKETING CASES ---");
    await page.goto("http://localhost:3000/cases", { waitUntil: "networkidle" });
    const case1Title = await page.getByText("Отандық сүт өніміне ұран таңдау").first().isVisible();
    assert("Case study 1 is displayed", case1Title);

    const correctCaseOpt = page.getByText("Ақбұлақ — атамекеннің балғын сүті, әр шаңырақтың ақ батасы!").first();
    await correctCaseOpt.click();
    await page.waitForTimeout(300);
    const expertExpl = await page.getByText("Әдістемелік түсіндірме:").first().isVisible();
    assert("Case option selected and expert explanation displayed", expertExpl);

    // 10. Portfolio Page (Badges, Brands, Slogans, PDF)
    console.log("\n--- TEST 10: STUDENT DIGITAL PORTFOLIO ---");
    await page.goto("http://localhost:3000/portfolio", { waitUntil: "networkidle" });
    const portfolioTitle = await page.getByText("Жеке цифрлық портфолио").first().isVisible();
    assert("Portfolio page rendered", portfolioTitle);
    const badgeSection = await page.getByText("Иеленген бейдждер мен жетістіктер").first().isVisible();
    assert("Badges collection rendered", badgeSection);
    const exportPdfBtn = page.getByText(/PDF/).first();
    assert("Export PDF button is available", await exportPdfBtn.isVisible());

    // 11. Teacher Dashboard & Excel Export
    console.log("\n--- TEST 11: TEACHER DASHBOARD & EXCEL EXPORT ---");
    await page.goto("http://localhost:3000/teacher", { waitUntil: "networkidle" });
    const teacherHeading = await page.getByText("Мұғалім басқару панелі").first().isVisible();
    assert("Teacher dashboard loaded", teacherHeading);

    const classCode = await page.getByText("10A-MARKET").first().isVisible();
    assert("Class code 10A-MARKET is active", classCode);

    const studentRow = await page.getByText("Айсұлтан Мұратұлы").first().isVisible();
    assert("Student record in class table is displayed", studentRow);

    const excelBtn = page.getByText("Excel-ге жүктеу").first();
    assert("Export Excel (CSV) button is present", await excelBtn.isVisible());

    // 12. Lesson Plans (10 plans with 45-min timing)
    console.log("\n--- TEST 12: 10 LESSON PLANS FOR TEACHERS ---");
    await page.goto("http://localhost:3000/lesson-plans", { waitUntil: "networkidle" });
    const plan1Title = await page.getByText("Маркетинг әлеміне саяхат: негізгі ұғымдар мен 4P моделі").first().isVisible();
    assert("Lesson plan 1 rendered with objectives and stages", plan1Title);

    const stagesTable = await page.getByText("Сабақтың кезең-кезеңімен құрылымы").first().isVisible();
    assert("Stages table with timings rendered", stagesTable);

    // 13. Methodology & Worksheets
    console.log("\n--- TEST 13: METHODOLOGY & 10 WORKSHEETS ---");
    await page.goto("http://localhost:3000/methodology", { waitUntil: "networkidle" });
    const ws1Title = await page.getByText("Жұмыс парағы №1").first().isVisible();
    assert("Worksheet 1 rendered", ws1Title);

    const keyBtn = page.getByText("Мұғалімге арналған жауап кілттерін ашу").first();
    await keyBtn.click();
    await page.waitForTimeout(300);
    const keyHeader = await page.getByText("Мұғалімге арналған жауап кілттері:").first().isVisible();
    assert("Teacher answer keys toggled open", keyHeader);

    // 14. Responsive Viewports Check (360px, 768px, 1024px, 1440px)
    console.log("\n--- TEST 14: RESPONSIVE VIEWPORTS TEST ---");
    const viewports = [
      { width: 360, height: 740, name: "Mobile (360px)" },
      { width: 768, height: 1024, name: "Tablet (768px)" },
      { width: 1024, height: 768, name: "Desktop (1024px)" },
      { width: 1440, height: 900, name: "Large Desktop (1440px)" },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
      const mainContent = await page.locator("#main-content").isVisible();
      assert(`Viewport ${vp.name} renders cleanly without break`, mainContent);

      if (vp.width < 768) {
        const bottomNav = await page.locator("nav[aria-label='Мобильді навигация']").isVisible();
        assert(`Mobile bottom nav visible at ${vp.width}px`, bottomNav);
      } else {
        const sidebar = await page.locator("aside[aria-label='Басты навигация']").isVisible();
        assert(`Desktop sidebar navigation visible at ${vp.width}px`, sidebar);
      }
    }

  } catch (err) {
    console.error("FATAL TEST ERROR:", err);
    report.failed++;
  } finally {
    await browser.close();
  }

  console.log("\n================================================");
  console.log(`TOTAL TESTS: ${report.total} | PASSED: ${report.passed} | FAILED: ${report.failed}`);
  console.log("================================================");

  if (report.failed > 0) {
    process.exit(1);
  }
}

runTests();
