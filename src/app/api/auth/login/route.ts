import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email және құпия сөз міндетті." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const supabase = getServiceSupabase();

    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (error || !data.user) {
      return NextResponse.json(
        { error: "Email немесе құпия сөз қате." },
        { status: 401 }
      );
    }

    const user = data.user;
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.user_metadata?.name || normalizedEmail.split("@")[0],
        email: user.email,
        role: user.user_metadata?.role || "student",
        classCode: user.user_metadata?.classCode || "10A-MARKET",
        school: user.user_metadata?.school || "№6 Хромтау гимназиясы",
        createdAt: user.created_at,
      },
      session: {
        access_token: data.session?.access_token,
      },
    });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ error: "Серверлік қате." }, { status: 500 });
  }
}
