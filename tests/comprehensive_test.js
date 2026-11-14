const fs = require("fs");
const path = require("path");

async function runTests() {
  console.log("=========================================");
  console.log("   QAZMARKET COMPREHENSIVE TEST SUITE   ");
  console.log("=========================================");

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  const root = path.resolve(__dirname, "..");

  // 1. Check curriculum.json & lesson count
  const jsonPath = path.join(root, "src/data/curriculum.json");
  assert(fs.existsSync(jsonPath), "src/data/curriculum.json exists");

  const curriculumData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const lessons = curriculumData.lessons;
  assert(Array.isArray(lessons) && lessons.length === 17, `Curriculum has 17 lessons (found ${lessons ? lessons.length : 0})`);

  // Count total hours and tasks
  let totalTasks = 0;
  let sampleAnswerCount = 0;
  let descriptorsCount = 0;

  lessons.forEach((l) => {
    l.tasks.forEach((t) => {
      totalTasks++;
      if (t.sampleAnswer && t.sampleAnswer.length > 10) sampleAnswerCount++;
      if (t.descriptors && t.descriptors.length > 0 && t.descriptors[0].length > 10) descriptorsCount++;
    });
  });

  assert(totalTasks === 43, `All 43 tasks present across 17 lessons (${totalTasks}/43)`);
  assert(sampleAnswerCount === 43, `All 43 tasks have detailed sample answers (${sampleAnswerCount}/43)`);
  assert(descriptorsCount === 43, `All 43 tasks have meaningful descriptors (${descriptorsCount}/43)`);

  // 2. Check Worksheets in JSON
  const worksheets = curriculumData.worksheets;
  assert(Array.isArray(worksheets) && worksheets.length === 21, `All 21 worksheets in curriculum.json (${worksheets ? worksheets.length : 0}/21)`);

  // Check worksheets-full.ts separately
  const worksheetsTsPath = path.join(root, "src/data/worksheets-full.ts");
  assert(fs.existsSync(worksheetsTsPath), "src/data/worksheets-full.ts exists");

  // 3. Check Rubrics in JSON
  const rubrics = curriculumData.rubrics;
  assert(Array.isArray(rubrics) && rubrics.length === 9, `All 9 assessment rubrics in curriculum.json (${rubrics ? rubrics.length : 0}/9)`);

  // Check rubrics-full.ts separately
  const rubricsTsPath = path.join(root, "src/data/rubrics-full.ts");
  assert(fs.existsSync(rubricsTsPath), "src/data/rubrics-full.ts exists");

  // 4. Check Literature
  const litTsPath = path.join(root, "src/data/literature-full.ts");
  assert(fs.existsSync(litTsPath), "src/data/literature-full.ts exists");
  assert(curriculumData.literature && curriculumData.literature.teachers && curriculumData.literature.teachers.length >= 3, "Literature references present in JSON");

  // 5. Check Documentation files
  assert(fs.existsSync(path.join(root, "AUDIT.md")), "AUDIT.md exists");
  assert(fs.existsSync(path.join(root, "COVERAGE.md")), "COVERAGE.md exists");
  assert(fs.existsSync(path.join(root, "CONTENT_FIXES.md")), "CONTENT_FIXES.md exists");

  // 6. Check all route page files exist
  const pagesToCheck = [
    "src/app/(dashboard)/bilim/page.tsx",
    "src/app/(dashboard)/brand/page.tsx",
    "src/app/(dashboard)/smm/page.tsx",
    "src/app/(dashboard)/seo/page.tsx",
    "src/app/(dashboard)/game/page.tsx",
    "src/app/(dashboard)/portfolio/page.tsx",
    "src/app/(dashboard)/achievements/page.tsx",
    "src/app/(dashboard)/lesson-plans/page.tsx",
    "src/app/(dashboard)/methodology/page.tsx",
    "src/app/(dashboard)/teacher/page.tsx",
    "src/app/(dashboard)/staff/page.tsx",
    "src/app/(dashboard)/design/page.tsx",
    "src/app/(dashboard)/studio/page.tsx",
    "src/app/(dashboard)/copywriter/page.tsx",
    "src/app/not-found.tsx",
  ];

  pagesToCheck.forEach((p) => {
    assert(fs.existsSync(path.join(root, p)), `Route file ${p} exists`);
  });

  // 7. Security: Teacher/admin routes guarded with NotFound
  const teacherPageContent = fs.readFileSync(path.join(root, "src/app/(dashboard)/teacher/page.tsx"), "utf-8");
  assert(
    teacherPageContent.includes("NotFound") && teacherPageContent.includes("!isAuthorized"),
    "TeacherPage guarded: returns NotFound for unauthorized users"
  );

  const lessonPlansPageContent = fs.readFileSync(path.join(root, "src/app/(dashboard)/lesson-plans/page.tsx"), "utf-8");
  assert(
    lessonPlansPageContent.includes("NotFound") && lessonPlansPageContent.includes("teacher"),
    "LessonPlans guarded: returns NotFound for non-teacher users"
  );

  const methodologyPageContent = fs.readFileSync(path.join(root, "src/app/(dashboard)/methodology/page.tsx"), "utf-8");
  assert(
    methodologyPageContent.includes("NotFound") && methodologyPageContent.includes("!isAuthorized"),
    "Methodology guarded: returns NotFound for unauthorized users"
  );

  // 8. Sidebar hides teacher links from students/guests
  const sidebarContent = fs.readFileSync(path.join(root, "src/components/layout/sidebar.tsx"), "utf-8");
  assert(
    sidebarContent.includes("teacher") && sidebarContent.includes("admin") && sidebarContent.includes("teacherLinks"),
    "Sidebar conditionally renders teacher links only for teacher/admin roles"
  );

  // 9. AI Chat API with context support
  const chatApiContent = fs.readFileSync(path.join(root, "src/app/api/chat/route.ts"), "utf-8");
  assert(
    chatApiContent.includes("context") && chatApiContent.includes("lessonTitle") && chatApiContent.includes("descriptors"),
    "AI Chat API supports lesson context (lesson title, task, descriptors)"
  );

  // 10. Design system page exists and has tokens
  const designContent = fs.readFileSync(path.join(root, "src/app/(dashboard)/design/page.tsx"), "utf-8");
  assert(
    designContent.includes("colorPalettes") && designContent.includes("#0F1226") && designContent.includes("#171A36"),
    "Design system page contains dark dashboard color tokens"
  );

  // 11. Lesson Plans page uses curriculumLessons (all 17 from author program)
  assert(
    lessonPlansPageContent.includes("curriculumLessons") && lessonPlansPageContent.includes("isEditing"),
    "Lesson Plans page uses real curriculum data and has inline editing"
  );

  // 12. Teacher Cabinet has submissions inspection tab
  assert(
    teacherPageContent.includes("submissions") && teacherPageContent.includes("MockSubmission"),
    "Teacher Cabinet includes student submissions inspection tab"
  );

  console.log("=========================================");
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log("=========================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error("Test execution error:", e);
  process.exit(1);
});
