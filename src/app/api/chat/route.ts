import { NextResponse } from "next/server";

// In-memory rate limiting map
const rateLimitMap = new Map<string, { count: number; date: string }>();

// Lightweight, compact system prompt to minimize token burn
const BASE_SYSTEM_PROMPT = `Сіз — «QAZMARKET» (10-сынып, қазақ тілі + маркетинг) шағын AI-кеңесшісісіз.
Қатаң талаптар:
1. Тек қазақ тілінде жауап беріңіз.
2. Өте қысқа әрі нақты жауап қайтарыңыз (максимум 2-3 сөйлем). Ұзақ мәтін жазуға тыйым салынады.
3. Оқушының орнына бүкіл тапсырманы орындап бермеңіз, тек қысқа бағыт, термин немесе мысал беріңіз.
4. Тек маркетинг, жарнама, бренд, SMM тақырыбы бойынша жауап беріңіз.`;

export async function POST(req: Request) {
  try {
    const { message, context, user } = await req.json();

    // 1. AUTH CHECK: ONLY LOGGED-IN USERS CAN USE THE CHATBOT
    if (!user || !user.email) {
      return NextResponse.json(
        { error: "Чатботты пайдалану үшін алдымен жүйеге кіріңіз.", redirect: "/login" },
        { status: 401 }
      );
    }

    const ip = req.headers.get("x-forwarded-for") || user.email || "local_user";
    const today = new Date().toISOString().split("T")[0];

    // Rate Limiting: 25 messages per day to prevent token exhaustion
    const userLimit = rateLimitMap.get(ip);
    if (userLimit && userLimit.date === today) {
      if (userLimit.count >= 25) {
        return NextResponse.json(
          {
            error: "Күндізгі лимит (25 хабарлама) таусылды. Ертең қайта қосылыңыз.",
          },
          { status: 429 }
        );
      }
      userLimit.count += 1;
    } else {
      rateLimitMap.set(ip, { count: 1, date: today });
    }

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Хабарлама бос болмауы керек" }, { status: 400 });
    }

    let dynamicSystemPrompt = BASE_SYSTEM_PROMPT;
    if (context?.taskTitle || context?.lessonTitle) {
      dynamicSystemPrompt += `\nКонтекст сабақ: ${context.lessonTitle || ""}, тапсырма: ${context.taskTitle || ""}. ${context.descriptors ? `Дескрипторлар: ${context.descriptors}.` : ""} Қысқаша 2 сөйлеммен бағыт беріңіз.`;
    }

    const apiKey =
      process.env.ANTHROPIC_API_KEY ||
      "";

    if (apiKey) {
      try {
        // Use lightweight Claude Haiku with strict token cap (max_tokens: 180) to minimize cost
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-3-haiku-20240307",
            max_tokens: 180,
            system: dynamicSystemPrompt,
            messages: [{ role: "user", content: message }],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data.content?.[0]?.text;
          if (replyText) {
            return NextResponse.json({ reply: replyText });
          }
        }
      } catch (e) {
        console.error("AI service error, using local expert engine:", e);
      }
    }

    // Lightweight Local Fallback Expert Engine (concise, instant, 0 tokens burned)
    const lower = message.toLowerCase();
    let reply = "";

    if (context && (lower.includes("көмек") || lower.includes("дескриптор") || lower.includes("қалай") || lower.includes("мысал"))) {
      reply = `«${context.taskTitle || context.lessonTitle}» тапсырмасы бойынша кеңес: дескрипторларға сүйеніп, қазақша маркетинг терминдерін орынды қолданыңыз. Жауабыңызды жазып болған соң, «Авторлық жауаппен салыстыру» арқылы тексеріңіз.`;
    } else if (lower.includes("ұран") || lower.includes("слоган") || lower.includes("критерий")) {
      reply = `Қазақша ұран құрастырудағы 3 негізгі талап: 3–6 сөз аралығында ықшам болуы, төл әріптердің (ә, і, ң, ғ, ү, ұ, қ, ө, һ) сақталуы және нақты бренд атауы мен әрекетке шақырудың (CTA) болуы.`;
    } else if (lower.includes("4p") || lower.includes("модель") || lower.includes("принцип")) {
      reply = `Классикалық 4P моделі: Product (өнім), Price (баға), Place (сату нүктесі), Promotion (жарнама мен жылжыту). Осы 4 элемент маркетинг стратегиясының өзегі саналады.`;
    } else if (lower.includes("қмж") || lower.includes("130") || lower.includes("сабақ жоспар")) {
      reply = `№ 130 бұйрық бойынша ҚМЖ 3 бөліктен тұрады: басы (10 мин), ортасы (25 мин, дескрипторлы тапсырмалар) және соңы (10 мин, рефлексия). Үлгілер «09 Сабақ жоспарлары» бөлімінде бар.`;
    } else if (lower.includes("smm") || lower.includes("instagram") || lower.includes("пост")) {
      reply = `SMM жарнамалық посты үшін: алғашқы 3 секундта қызықтыратын тақырып, пайдалы қысқа мәтін, нақты әрекетке шақыру (CTA) және қазақша хэштегтер қолданыңыз.`;
    } else if (lower.includes("seo") || lower.includes("іздеу")) {
      reply = `SEO-да Title 50–60 таңба, ал Meta Description 120–160 таңба болуы керек. Басты кілт сөздер қазақ тіліндегі іздеу сұраныстарына дәл келуі тиіс.`;
    } else if (lower.includes("бренд") || lower.includes("нейминг")) {
      reply = `Бренд атауы қазақ тілінде әуезді, есте тез қалатын және ұлттық құндылықты бейнелейтін мағыналы сөздерден тұруы қажет.`;
    } else {
      reply = `QAZMARKET AI-көмекшісі: қазақша ұран жазу, бренд құру, SMM пост дайындау немесе сабақ дескрипторлары бойынша нақты сұрағыңызды қойыңыз.`;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Қате орын алды" }, { status: 500 });
  }
}
