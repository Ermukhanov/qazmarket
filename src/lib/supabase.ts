import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://irwmfzcolwjtktolndkg.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Client-side Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey || "dummy_key");

// Server-side Supabase
export function getServiceSupabase() {
  return createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey || "dummy_key", {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
