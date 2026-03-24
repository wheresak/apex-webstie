import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug, ...updates } = body;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase
      .from("vehicles")
      .update(updates)
      .eq("slug", slug);

    if (error) {
      return Response.json({ error: error.message });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "update crash" });
  }
}