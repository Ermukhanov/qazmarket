import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { name, email, password, role, classCode } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Аты, email және құпия сөз міндетті." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Құпия сөз кемінде 6 таңбадан тұруы керек." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const supabase = getServiceSupabase();

    // Create user in Supabase Auth (stored in real cloud database)
    const { data, error } = await supabase.auth.admin.createUser({
      email: normalizedEmail,
      password: password,
      email_confirm: true,
      user_metadata: {
        name: name.trim(),
        role: role || "student",
        classCode: (classCode || "10A-MARKET").toUpperCase(),
        school: "№6 Хромтау гимназиясы",
      },
    });

    if (error) {
      if (error.message?.includes("already registered") || error.message?.includes("already been registered")) {
        return NextResponse.json(
          { error: "Бұл email-мен тіркелген қолданушы бар." },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: error.message || "Тіркелу кезінде қате орын алды." },
        { status: 400 }
      );
    }

    const user = data.user;
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.user_metadata?.name || name.trim(),
        email: user.email,
        role: user.user_metadata?.role || role || "student",
        classCode: user.user_metadata?.classCode || classCode || "10A-MARKET",
        school: user.user_metadata?.school || "№6 Хромтау гимназиясы",
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json({ error: "Серверлік қате." }, { status: 500 });
  }
}
