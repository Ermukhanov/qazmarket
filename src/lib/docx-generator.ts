import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  AlignmentType,
  BorderStyle,
  HeadingLevel,
} from "docx";
import saveAs from "file-saver";
import type { LessonPlan } from "@/data/lesson-plans";

export async function generateOrder130Docx(plan: LessonPlan) {
  const tableBorder = {
    top: { style: BorderStyle.SINGLE, size: 1, color: "4B5563" },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: "4B5563" },
    left: { style: BorderStyle.SINGLE, size: 1, color: "4B5563" },
    right: { style: BorderStyle.SINGLE, size: 1, color: "4B5563" },
    insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "D1D5DB" },
    insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "D1D5DB" },
  };

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: "Тексерілді: ____________________          Білім беру ұйымы: «№6 Хромтау гимназиясы» КММ",
                size: 20,
                font: "Times New Roman",
              }),
            ],
          }),
          new Paragraph({ text: "" }),

          // Passport Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorder,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 30, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: "Бөлім:", bold: true, size: 22 })] })],
                  }),
                  new TableCell({
                    width: { size: 70, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: "Маркетингтегі қазақ тілі (10-сынып)", size: 22 })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Педагогтің аты-жөні:", bold: true, size: 22 })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Сарсенова Ақкүміс Піржанқызы", size: 22 })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Күні:", bold: true, size: 22 })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: new Date().toLocaleDateString("kk-KZ"), size: 22 })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Сынып:", bold: true, size: 22 })] })],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "10-сынып | Қатысушылар саны: 24 | Қатыспағандар саны: 0",
                            size: 22,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Сабақтың тақырыбы:", bold: true, size: 22 })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: plan.title, bold: true, size: 22 })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Оқу мақсаттары:", bold: true, size: 22 })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: plan.objective, size: 22 })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Сабақтың мақсаты:", bold: true, size: 22 })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: plan.expectedOutcome, size: 22 })] })],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: "" }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "Сабақтың барысы:", bold: true, size: 24 })],
          }),
          new Paragraph({ text: "" }),

          // Stages Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorder,
            rows: [
              new TableRow({
                children: [
                  new TableCell({ width: { size: 18, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: "Кезең/уақыт", bold: true, size: 20 })] })] }),
                  new TableCell({ width: { size: 32, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: "Педагогтің әрекеті", bold: true, size: 20 })] })] }),
                  new TableCell({ width: { size: 22, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: "Оқушының әрекеті", bold: true, size: 20 })] })] }),
                  new TableCell({ width: { size: 14, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: "Бағалау", bold: true, size: 20 })] })] }),
                  new TableCell({ width: { size: 14, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: "Ресурстар", bold: true, size: 20 })] })] }),
                ],
              }),
              ...plan.stages.map(
                (stage) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ children: [new TextRun({ text: stage.time, bold: true, size: 18 })] }),
                          new Paragraph({ children: [new TextRun({ text: stage.name, size: 18 })] }),
                        ],
                      }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: stage.teacherActivity, size: 18 })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: stage.studentActivity, size: 18 })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: stage.formativeAssessment, bold: true, size: 18 })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: plan.resources.slice(0, 2).join(", "), size: 18 })] })] }),
                    ],
                  })
              ),
            ],
          }),

          new Paragraph({ text: "" }),
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [new TextRun({ text: "Сабақты талдаудың 11 бағыты (№ 130 бұйрық бойынша):", bold: true, size: 22 })],
          }),
          ...[
            "1. Сабақтың құрылымы және уақытты ұтымды пайдалану (10+25+10 минут)",
            "2. Сабақ мақсаты мен күтілетін нәтиженің нақтылығы",
            "3. Оқыту әдістері мен ресурстарды тиімді қолдану",
            "4. Тапсырмалардың оқу мақсатына сәйкестігі мен дескрипторлар жүйесі",
            "5. Функционалдық сауаттылықты дамыту және өмірмен байланыстыру",
            "6. Цифрлық білім беру ресурстарын (QAZMARKET интерактивті платформасы) қолдану",
            "7. Саралауды пайдалану (тапсырмалар жеңілден күрделіге қарай сараланған)",
            "8. Білім алушылардың өзара әрекеттесуі (жұптық, топтық жұмыстар)",
            "9. Қалыптастырушы бағалау әдістері мен құралдарын жүйелі қолдану",
            "10. «Адал азамат» құндылықтары мен ұлттық мәдениетті іске асыру",
            "11. Сабақ бойынша рефлексия жасау және кері байланыс беру",
          ].map(
            (item) =>
              new Paragraph({
                children: [new TextRun({ text: item, size: 18 })],
              })
          ),

          new Paragraph({ text: "" }),
          new Paragraph({
            children: [
              new TextRun({ text: "Үй тапсырмасы: ", bold: true, size: 20 }),
              new TextRun({ text: plan.homework, size: 20 }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `ҚМЖ_130_бұйрық_${plan.id}_${plan.topic.slice(0, 20)}.docx`);
}
