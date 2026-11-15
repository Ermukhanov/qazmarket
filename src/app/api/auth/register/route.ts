import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawName = body.name;
    const rawEmail = body.email;
    const rawPassword = body.password;
    const role = body.role;
    const classCode = body.classCode;

    if (!rawEmail) {
      return NextResponse.json(
        { error: "Email немесе логин енгізіңіз." },
        { status: 400 }
      );
    }

    let normalizedEmail = String(rawEmail).trim().toLowerCase();
    if (!normalizedEmail.includes("@")) {
      normalizedEmail = `${normalizedEmail}@qazmarket.kz`;
    }

    const name = String(rawName || normalizedEmail.split("@")[0]).trim();
    const password = String(rawPassword || "123456").trim();
    const safePassword = password.length < 6 ? `${password}__qaz` : password;

    const supabase = getServiceSupabase();

    // Create user in Supabase with auto-confirmation
    let { data, error } = await supabase.auth.admin.createUser({
      email: normalizedEmail,
      password: safePassword,
      email_confirm: true,
      user_metadata: {
        name,
        role: role || "student",
        classCode: (classCode || "10A-MARKET").toUpperCase(),
        school: "№6 Хромтау гимназиясы",
      },
    });

    // If already registered, update their profile & password and confirm
    if (error && (error.message?.includes("already registered") || error.message?.includes("already been registered"))) {
      const { data: usersList } = await supabase.auth.admin.listUsers();
      const existingUser = usersList?.users?.find(
        (u) => u.email?.toLowerCase() === normalizedEmail
      );
      if (existingUser) {
        const updateRes = await supabase.auth.admin.updateUserById(existingUser.id, {
          password: safePassword,
          email_confirm: true,
          user_metadata: {
            name,
            role: role || existingUser.user_metadata?.role || "student",
            classCode: (classCode || existingUser.user_metadata?.classCode || "10A-MARKET").toUpperCase(),
            school: "№6 Хромтау гимназиясы",
          },
        });
        if (updateRes.data?.user) {
          data = updateRes.data;
          error = null;
        }
      }
    }

    if (error || !data?.user) {
      return NextResponse.json(
        { error: error?.message || "Тіркелу қатесі орын алды." },
        { status: 400 }
      );
    }

    const user = data.user;
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.user_metadata?.name || name,
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
