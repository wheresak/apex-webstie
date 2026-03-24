import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const params = new URLSearchParams(body);

    const slug = params.get("slug");

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase
      .from("vehicles")
      .delete()
      .eq("slug", slug);

    if (error) {
      return Response.json({ error: error.message });
    }

    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ error: "delete crash" });
  }
}