import { NextResponse } from "next/server";

// In-memory rate limiting map for demo/production safety
const rateLimitMap = new Map<string, { count: number; date: string }>();

const SYSTEM_PROMPT = `Сіз — «QAZMARKET» білім беру платформасының виртуалды ИИ-кеңесшісісіз.
Платформа 10-сынып оқушылары мен мұғалімдеріне арналған («Маркетингтегі қазақ тілі» авторлық бағдарламасы).

Сіздің міндеттеріңіз:
1. Тек қана маркетинг, жарнама тілі, қазақ тіліндегі терминология, бренд құру, SMM, SEO және мұғалімдерге арналған № 130 бұйрық бойынша ҚМЖ құрастыру тақырыптарында ғана жауап беру.
2. Жауаптарды тек сауатты, көркем және түсінікті қазақ тілінде (кириллицада) қайтару.
3. Оқушының орнына бүкіл үй жұмысын толық жазып бермей, бағыт-бағдар, мысалдар, кеңестер мен дескрипторларды түсіндіру.
4. Ұрандар мен жарнамаларды 5 қатаң критерий бойынша бағалауға көмектесу:
   - Ұзындығы (3–6 сөз);
   - Төл қазақ әріптерінің (ә, і, ң, ғ, ү, ұ, қ, ө, һ) болуы;
   - Орысша спецификалық әріптердің (ё, ъ, ь, э, щ, ц) болмауы;
   - Мәтінде бренд атауының қамтылуы;
   - Ритм және әрекетке шақыру (Call to Action).
5. Бөгде тақырыптар (ойын-сауық, кодтау, саясат, т.б.) сұралса, сыпайы түрде тек QAZMARKET маркетинг платформасы бойынша көмектесе алатыныңызды айту.
6. Жауаптарыңыз қысқа, нақты әрі құрылымды (3-5 сөйлем немесе қысқа тізім) болуы тиіс.`;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "local_user";
    const today = new Date().toISOString().split("T")[0];

    // Rate Limiting: 25 messages per day
    const userLimit = rateLimitMap.get(ip);
    if (userLimit && userLimit.date === today) {
      if (userLimit.count >= 25) {
        return NextResponse.json(
          {
            error: "Күндізгі сұрақтар шегі (25 хабарлама) таусылды. Ертең қайта қосылыңыз немесе мұғалімнен көмек сұраңыз.",
          },
          { status: 429 }
        );
      }
      userLimit.count += 1;
    } else {
      rateLimitMap.set(ip, { count: 1, date: today });
    }

    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Хабарлама бос болмауы керек" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (apiKey) {
      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-3-5-haiku-latest",
            max_tokens: 600,
            system: SYSTEM_PROMPT,
            messages: [{ role: "user", content: message }],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data.content?.[0]?.text || "Жауап алу мүмкін болмады.";
          return NextResponse.json({ reply: replyText });
        }
      } catch (e) {
        console.error("Anthropic API error, using fallback expert:", e);
      }
    }

    // Intelligent Fallback Expert Engine (always responds accurately in Kazakh)
    const lower = message.toLowerCase();
    let reply = "";

    if (lower.includes("ұран") || lower.includes("слоган") || lower.includes("критерий")) {
      reply = `Қазақша ұран (слоган) құрастыруда 5 басты критерий бар:\n1. Ұзындығы 3–6 сөз аралығында ықшам болуы керек.\n2. Қазақ тілінің төл әріптерін (ә, і, ң, ғ, ү, ұ, қ, ө, һ) қолданыңыз.\n3. Орысша спецификалық әріптерден (ё, ъ, ь, э) аулақ болыңыз.\n4. Мәтінде бренд атауын міндетті түрде қамтыңыз.\n5. Ритм, ұйқас және нақты әрекетке шақыру (CTA) болуы тиіс.\nМысалы: «Qazaq Republic — дала рухының заманауи көрінісі!»`;
    } else if (lower.includes("4p") || lower.includes("модель") || lower.includes("принцип")) {
      reply = `Маркетингтің классикалық 4P моделі 4 негізгі элементтен тұрады:\n• Product (Өнім) — тұтынушы қажеттілігін өтейтін тауар немесе қызмет.\n• Price (Баға) — өнімнің нарықтағы құны мен жеңілдік саясаты.\n• Place (Орын/Сату нүктесі) — өнімді жеткізу және тарату арналары.\n• Promotion (Жылжыту) — жарнама, PR және әлеуметтік желілердегі таныту шаралары.`;
    } else if (lower.includes("қмж") || lower.includes("130") || lower.includes("сабақ жоспар")) {
      reply = `ҚР Оқу-ағарту министрлігінің № 130 бұйрығы бойынша ҚМЖ 3 негізгі уақыттық кезеңнен тұрады:\n1. Сабақтың басы (10 минут) — ұйымдастыру, өткенді қайталау, оқу мақсатын хабарлау.\n2. Сабақтың ортасы (25 минут) — дескрипторлары бар жаңа білім мен практикалық тапсырмалар (ҚБ: Бағдаршам, Өзін-өзі бағалау).\n3. Сабақтың соңы (10 минут) — бекіту, рефлексия және үй тапсырмасы.\n«09 Сабақ жоспарлары» бөлімінде 17 тақырыптың дайын үлгісін көре аласыз және DOCX форматында жүктей аласыз!`;
    } else if (lower.includes("smm") || lower.includes("instagram") || lower.includes("инстаграм") || lower.includes("пост")) {
      reply = `SMM жарнамалық постының 4 алтын ережесі:\n1. Цепляющий заголовок (алғашқы 3 секундта назар аударатын тақырып).\n2. Тұтынушының мәселесін шешетін қысқа әрі пайдалы мәтін.\n3. Әрекетке шақыру (Call to Action: «Сілтемеге өт», «Тіркел»).\n4. Қазақша тақырыптық хэштегтер (#ҚазақТілі, #ОтандықӨнім).\n«04 SMM орталығы» бөлімінде смартфон мокапында нақты көре аласыз!`;
    } else if (lower.includes("seo") || lower.includes("іздеу") || lower.includes("google")) {
      reply = `SEO (іздеу жүйесін оңтайландыру) бойынша негізгі көрсеткіштер:\n• Title тегі — 50–60 таңба, басты кілт сөз алдында болуы шарт.\n• Meta Description — 120–160 таңба, өнімнің артықшылығы мен шақыру қамтылуы керек.\n• Қазақ тілді іздеу сұраныстары бойынша сайтты Google мен Yandex-тің алғашқы орындарына шығару үшін «05 SEO шеберханасын» пайдаланыңыз.`;
    } else if (lower.includes("бренд") || lower.includes("нейминг") || lower.includes("атау")) {
      reply = `Бренд жасауда нейминг (атау беру) шешуші рөл атқарады:\n• Атау қазақ тілінде әуезді әрі есте қаларлық болуы керек.\n• Өнімнің мәнін немесе ұлттық құндылығын бейнелеуі тиіс.\n• Басқа тілдерде жағымсыз мағына бермеуі қажет.\n«03 Бренд зертханасында» өзіңіздің бренд карточкаңызды жасап, PNG сурет ретінде жүктеп алыңыз!`;
    } else {
      reply = `Сұрағыңызға рақмет! Сіз «QAZMARKET» маркетинг зертханасында өз жобаларыңызды жасай аласыз:\n• 02 бөлімде қазақша ұран жазып, сапасын тексеріңіз;\n• 03 бөлімде жеке брендіңізді құрастырыңыз;\n• 04 бөлімде SMM постын жариялаңыз;\n• 06 бөлімде 60+ тест сұрақтары мен кейстерді талдаңыз.\nНақты қай тақырып бойынша көмек қажет?`;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Серверлік қате орын алды" }, { status: 500 });
  }
}
