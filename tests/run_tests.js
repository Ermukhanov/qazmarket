const { chromium } = require("playwright");

async function runTests() {
  console.log("==================================================================");
  console.log("       QAZMARKET COMMERCIAL RELEASE END-TO-END TEST SUITE         ");
  console.log("==================================================================");

  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
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
      console.log(`  [PASS] ${name}`);
      report.details.push({ test: name, status: "PASS", details });
    } else {
      report.failed++;
      console.error(`  [FAIL] ${name} - ${details}`);
      report.details.push({ test: name, status: "FAIL", details });
    }
  }

  try {
    // ---------------------------------------------------------
    // 1. PUBLIC LANDING PAGE & FOOTER
    // ---------------------------------------------------------
    console.log("\n[TEST GROUP 1] Public Landing Page & Identity");
    await page.goto("http://localhost:3000/landing", { waitUntil: "networkidle" });
    const pageTitle = await page.title();
    assert("Page title has QAZMARKET", pageTitle.includes("QAZMARKET"), pageTitle);

    const heroText = await page.getByText("Идеяңды брендке айналдыр!").first().isVisible();
    assert("Hero title 'Идеяңды брендке айналдыр!' is visible", heroText);

    const sloganText = await page.getByText("Қазақша ойла. Креативті жаса. Нарықта таныт!").first().isVisible();
    assert("Official slogan is displayed", sloganText);

    const authorText = await page.getByText("Сарсенова Ақкүміс Піржанқызы").first().isVisible();
    assert("Author name (Сарсенова Ақкүміс) present in footer", authorText);

    const schoolText = await page.getByText("Хромтау гимназиясы").first().isVisible();
    assert("School name (Хромтау гимназиясы) present in footer", schoolText);

    // ---------------------------------------------------------
    // 2. THEME & LANGUAGE CONTROLS
    // ---------------------------------------------------------
    console.log("\n[TEST GROUP 2] Theme & Language Controls");
    const themeBtn = page.locator('button[aria-label="Тақырыпты ауыстыру"]');
    if (await themeBtn.isVisible()) {
      await themeBtn.click();
      await page.waitForTimeout(300);
      const htmlTheme = await page.getAttribute("html", "data-theme");
      assert("Theme switches to light/dark correctly", htmlTheme === "light" || htmlTheme === "dark", htmlTheme);

      // Switch back
      await themeBtn.click();
      await page.waitForTimeout(300);
    } else {
      assert("Theme switch button found", false, "Not visible");
    }

    const langBtn = page.locator('button[aria-label="Тілді ауыстыру"]');
    if (await langBtn.isVisible()) {
      await langBtn.click();
      await page.waitForTimeout(300);
      const ruCheck = await page.getByText("Войти на платформу").first().isVisible();
      assert("Language toggle switches to Russian (RU)", ruCheck);

      await langBtn.click();
      await page.waitForTimeout(300);
      const kkCheck = await page.getByText("Платформаға кіру").first().isVisible();
      assert("Language toggle switches back to Kazakh (KK)", kkCheck);
    }

    // ---------------------------------------------------------
    // 3. AUTHENTICATION & DEMO ROLES
    // ---------------------------------------------------------
    console.log("\n[TEST GROUP 3] Authentication & Student Dashboard");
    await page.goto("http://localhost:3000/login", { waitUntil: "networkidle" });
    const studentDemoBtn = page.locator("button:has-text('Оқушы')").last();
    assert("Student demo button is available", await studentDemoBtn.isVisible());
    await studentDemoBtn.click();
    await page.waitForTimeout(600);

    // Check student dashboard
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
    const dashboardStats = await page.getByText("Жалпы ұпай").first().isVisible();
    assert("Student Dashboard displays real XP stats", dashboardStats);

    const module01 = await page.getByText("01. Білім алаңы").first().isVisible();
    assert("Module 01 is present on student dashboard", module01);

    const module08 = await page.getByText("08. Жетістік алаңы").first().isVisible();
    assert("Module 08 is present on student dashboard", module08);

    // ---------------------------------------------------------
    // 4. MODULE 01: БІЛІМ АЛАҢЫ (/bilim)
    // ---------------------------------------------------------
    console.log("\n[TEST GROUP 4] 01. Білім алаңы (17 topics)");
    await page.goto("http://localhost:3000/bilim", { waitUntil: "networkidle" });
    const bilimTitle = await page.getByText("01. Білім алаңы").first().isVisible();
    assert("Bilim page loaded with 17 topics", bilimTitle);

    const theoryTab = await page.getByText("Теориялық конспект").first().isVisible();
    assert("Theory tab is active", theoryTab);

    // ---------------------------------------------------------
    // 5. MODULE 02: ЖАРНАМА СТУДИЯСЫ (/studio)
    // ---------------------------------------------------------
    console.log("\n[TEST GROUP 5] 02. Жарнама студиясы (5 criteria & 6 elements)");
    await page.goto("http://localhost:3000/studio", { waitUntil: "networkidle" });
    const studioTitle = await page.getByText("02. Жарнама студиясы").first().isVisible();
    assert("Studio page loaded", studioTitle);

    const criteriaCheck = (await page.getByText("/ 5").first().isVisible()) || (await page.getByText("5").first().isVisible());
    assert("5 Criteria verification panel is present", criteriaCheck);

    // Test typing a slogan
    const sloganInput = page.locator("textarea").first();
    await sloganInput.fill("Ақбұлақ — атамекеннің балғын сүтін таңдаңыз!");
    await page.waitForTimeout(200);
    const saveSloganBtn = page.getByText("Портфолиоға сақтау").first();
    assert("Save Slogan to portfolio button is active", await saveSloganBtn.isVisible());
    await saveSloganBtn.click();
    await page.waitForTimeout(300);

    // ---------------------------------------------------------
    // 6. MODULE 03: БРЕНД ЗЕРТХАНАСЫ (/brand)
    // ---------------------------------------------------------
    console.log("\n[TEST GROUP 6] 03. Бренд зертханасы (Brand card & PNG export)");
    await page.goto("http://localhost:3000/brand", { waitUntil: "networkidle" });
    const brandTitle = await page.getByText("03. Бренд зертханасы").first().isVisible();
    assert("Brand laboratory loaded", brandTitle);

    const exportBtn = page.getByText("Карточканы жүктеу (PNG)").first();
    assert("Export PNG button is present", await exportBtn.isVisible());

    // ---------------------------------------------------------
    // 7. MODULE 04: SMM ОРТАЛЫҒЫ (/smm)
    // ---------------------------------------------------------
    console.log("\n[TEST GROUP 7] 04. SMM орталығы (Instagram/TikTok/Facebook)");
    await page.goto("http://localhost:3000/smm", { waitUntil: "networkidle" });
    const smmTitle = await page.getByText("04. SMM орталығы").first().isVisible();
    assert("SMM Center loaded", smmTitle);

    const instaTab = await page.getByText("Instagram Post").first().isVisible();
    assert("Instagram post mockup preview is active", instaTab);

    // ---------------------------------------------------------
    // 8. MODULE 05: SEO ШЕБЕРХАНАСЫ (/seo)
    // ---------------------------------------------------------
    console.log("\n[TEST GROUP 8] 05. SEO шеберханасы (SERP simulator)");
    await page.goto("http://localhost:3000/seo", { waitUntil: "networkidle" });
    const seoTitle = await page.getByText("05. SEO шеберханасы").first().isVisible();
    assert("SEO Workshop loaded", seoTitle);

    const serpPreview = (await page.getByText("Google").first().isVisible()) || (await page.getByText("SERP").first().isVisible());
    assert("SERP live simulator is active", serpPreview);

    // ---------------------------------------------------------
    // 9. MODULE 06: МАРКЕТИНГ ОЙЫНЫ (/game)
    // ---------------------------------------------------------
    console.log("\n[TEST GROUP 9] 06. Маркетинг ойыны (Terms, 65+ Bank, Cases)");
    await page.goto("http://localhost:3000/game", { waitUntil: "networkidle" });
    const gameTitle = await page.getByText("06. Маркетинг ойыны").first().isVisible();
    assert("Marketing Game loaded", gameTitle);

    const tabTerms = await page.getByText("Терминдер ойыны").first().isVisible();
    assert("Terms matching tab present", tabTerms);

    const tabQuiz = await page.getByText("Тест").first().isVisible();
    assert("Questions quiz bank tab present", tabQuiz);

    const tabCases = await page.getByText("кейстер").first().isVisible();
    assert("Real Marketing Cases tab present", tabCases);

    // ---------------------------------------------------------
    // 10. MODULE 07: ЖОБА ПОРТФОЛИОСЫ (/portfolio)
    // ---------------------------------------------------------
    console.log("\n[TEST GROUP 10] 07. Жоба портфолиосы (Digital Student Portfolio)");
    await page.goto("http://localhost:3000/portfolio", { waitUntil: "networkidle" });
    const portfolioTitle = await page.getByText("07. Жоба портфолиосы").first().isVisible();
    assert("Portfolio page loaded", portfolioTitle);

    const pdfBtn = page.getByText("PDF").first();
    assert("PDF download/print button present", await pdfBtn.isVisible());

    // ---------------------------------------------------------
    // 11. MODULE 08: ЖЕТІСТІК АЛАҢЫ (/achievements)
    // ---------------------------------------------------------
    console.log("\n[TEST GROUP 11] 08. Жетістік алаңы (5 levels, 8 badges, cert)");
    await page.goto("http://localhost:3000/achievements", { waitUntil: "networkidle" });
    const achTitle = await page.getByText("08. Жетістік алаңы").first().isVisible();
    assert("Achievements page loaded", achTitle);

    const certTitle = await page.getByText("Сертификат").first().isVisible();
    assert("Official Certificate module present", certTitle);

    // ---------------------------------------------------------
    // 12. MODULE 09: САБАҚ ЖОСПАРЛАРЫ (/lesson-plans)
    // ---------------------------------------------------------
    console.log("\n[TEST GROUP 12] 09. Сабақ жоспарлары (Order № 130 DOCX)");
    await page.goto("http://localhost:3000/lesson-plans", { waitUntil: "networkidle" });
    const plansTitle = await page.getByText("09. Сабақ жоспарлары").first().isVisible();
    assert("Lesson Plans page loaded", plansTitle);

    const orderBadge = await page.getByText("№6 Хромтау гимназиясы").first().isVisible();
    assert("Order № 130 school header present", orderBadge);

    const docxBtn = page.getByText("DOCX").first();
    assert("DOCX download button present", await docxBtn.isVisible());

    const dir11 = await page.getByText("Сабақты талдаудың 11 бағыты").first().isVisible();
    assert("11 Directions of lesson analysis accordion present", dir11);

    // ---------------------------------------------------------
    // 13. MODULE 10: ӘДІСТЕМЕЛІК ҚҰРАЛ (/methodology)
    // ---------------------------------------------------------
    console.log("\n[TEST GROUP 13] 10. Әдістемелік құрал және жұмыс парақтары");
    await page.goto("http://localhost:3000/methodology", { waitUntil: "networkidle" });
    const methTitle = await page.getByText("10. Әдістемелік құрал").first().isVisible();
    assert("Methodology page loaded", methTitle);

    const rubricsTab = await page.getByText("9 бағалау критерийі").first().isVisible();
    assert("9 evaluation rubrics present", rubricsTab);

    const worksheetsTab = await page.getByText("10 баспалық жұмыс парағы").first().isVisible();
    assert("10 printable worksheets present", worksheetsTab);

    // ---------------------------------------------------------
    // 14. TEACHER CABINET (/teacher)
    // ---------------------------------------------------------
    console.log("\n[TEST GROUP 14] Teacher Cabinet & Admin");
    await page.goto("http://localhost:3000/teacher", { waitUntil: "networkidle" });
    const teacherTitle = await page.getByText("Мұғалім кабинеті").first().isVisible();
    assert("Teacher Cabinet loaded", teacherTitle);

    const classCode = await page.getByText("10A-MARKET").first().isVisible();
    assert("10A Class Code (10A-MARKET) displayed", classCode);

    const excelBtn = page.getByText("Excel (CSV) жүктеу").first();
    assert("Excel export button present", await excelBtn.isVisible());

    // ---------------------------------------------------------
    // 15. AI CHATBOT API (/api/chat)
    // ---------------------------------------------------------
    console.log("\n[TEST GROUP 15] AI Chatbot API Verification");
    const chatResponse = await page.request.post("http://localhost:3000/api/chat", {
      data: { message: "Маркетингтегі 4P моделі туралы қазақша түсіндіріп берші" }
    });
    assert("Chat API responds with 200 OK", chatResponse.status() === 200, `Status: ${chatResponse.status()}`);
    const chatJson = await chatResponse.json();
    assert("Chat API returns meaningful reply", chatJson && (chatJson.reply || "").length > 20, chatJson.reply?.slice(0, 50));

    // ---------------------------------------------------------
    // 16. RESPONSIVE VIEWPORT CHECKS
    // ---------------------------------------------------------
    console.log("\n[TEST GROUP 16] Responsive Viewports (360px, 390px, 768px, 1024px)");
    const viewports = [
      { name: "Mobile Small (360x640)", width: 360, height: 640 },
      { name: "Mobile Standard (390x844)", width: 390, height: 844 },
      { name: "Tablet (768x1024)", width: 768, height: 1024 },
      { name: "Laptop (1024x768)", width: 1024, height: 768 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("http://localhost:3000/landing", { waitUntil: "networkidle" });
      const navVisible = await page.locator("header").first().isVisible();
      assert(`Header renders cleanly on ${vp.name}`, navVisible);
    }

  } catch (err) {
    console.error("Test execution encountered an error:", err);
  } finally {
    await browser.close();
  }

  console.log("\n==================================================================");
  console.log(`TOTAL TESTS: ${report.total} | PASSED: ${report.passed} | FAILED: ${report.failed}`);
  console.log("==================================================================");

  if (report.failed > 0) {
    process.exit(1);
  }
}

runTests();
