import { NextRequest, NextResponse } from "next/server";

// Server-side admin route that returns the waitlist if the password matches.
//
// TODO: Once Supabase is connected, mirror the binate-web pattern:
//
//   import { createClient } from "@supabase/supabase-js";
//
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.SUPABASE_SERVICE_ROLE_KEY!
//   );
//
//   const { data, error } = await supabase
//     .from("waitlist")
//     .select("*")
//     .order("created_at", { ascending: false });
//
// For now we return an empty array so the admin UI is fully usable in dev.

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ data: [] });
}
