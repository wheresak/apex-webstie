import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("ADD VEHICLE BODY:", body);
    console.log(
      "SERVICE ROLE EXISTS:",
      !!process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    console.log(
      "SERVICE ROLE PREFIX:",
      process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 10)
    );

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from("vehicles")
      .insert(body)
      .select();

    if (error) {
      console.log("ADD VEHICLE ERROR:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("ADD VEHICLE SUCCESS:", data);
    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.log("ADD VEHICLE CRASH:", e);
    return NextResponse.json({ error: "server crash" }, { status: 500 });
  }
}