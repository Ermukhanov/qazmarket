import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawEmail = body.email;
    const rawPassword = body.password;
    const role = body.role;

    if (!rawEmail) {
      return NextResponse.json(
        { error: "Email немесе логин енгізіңіз." },
        { status: 400 }
      );
    }

    // Normalize email: if user typed "mernar", turn into "mernar@qazmarket.kz"
    let normalizedEmail = String(rawEmail).trim().toLowerCase();
    if (!normalizedEmail.includes("@")) {
      normalizedEmail = `${normalizedEmail}@qazmarket.kz`;
    }

    // Ensure password is at least 6 chars for Supabase
    const password = String(rawPassword || "123456").trim();
    const safePassword = password.length < 6 ? `${password}__qaz` : password;

    const supabase = getServiceSupabase();

    // 1. Try standard sign in
    let { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: safePassword,
    });

    // 2. If password failed or email unconfirmed: look up user in admin
    if (error) {
      const { data: usersList } = await supabase.auth.admin.listUsers();
      const existingUser = usersList?.users?.find(
        (u) => u.email?.toLowerCase() === normalizedEmail
      );

      if (existingUser) {
        // User exists: update password to current one and confirm email immediately!
        await supabase.auth.admin.updateUserById(existingUser.id, {
          password: safePassword,
          email_confirm: true,
        });

        // Retry sign in
        const retry = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password: safePassword,
        });
        if (retry.data?.user) {
          data = retry.data;
          error = null;
        }
      } else {
        // User does not exist: auto-create account on the fly!
        const handle = normalizedEmail.split("@")[0].replace(/[._-]/g, " ");
        const defaultName = normalizedEmail.includes("teacher")
          ? "Сарсенова Ақкүміс Піржанқызы"
          : handle.charAt(0).toUpperCase() + handle.slice(1);
        const resolvedRole = role || (normalizedEmail.includes("teacher") ? "teacher" : "student");

        const createRes = await supabase.auth.admin.createUser({
          email: normalizedEmail,
          password: safePassword,
          email_confirm: true,
          user_metadata: {
            name: defaultName,
            role: resolvedRole,
            classCode: "10A-MARKET",
            school: "№6 Хромтау гимназиясы",
          },
        });

        if (createRes.data?.user) {
          const retry = await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password: safePassword,
          });
          if (retry.data?.user) {
            data = retry.data;
            error = null;
          }
        }
      }
    }

    if (error || !data?.user) {
      return NextResponse.json(
        { error: error?.message || "Кіру қатесі орын алды." },
        { status: 401 }
      );
    }

    const user = data.user;
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.user_metadata?.name || normalizedEmail.split("@")[0],
        email: user.email,
        role: user.user_metadata?.role || role || "student",
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
