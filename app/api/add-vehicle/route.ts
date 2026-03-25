import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function padStockNumber(n: number) {
  return String(n).padStart(3, "0");
}

function generateSlug(
  year: string | number | null | undefined,
  make: string | null | undefined,
  model: string | null | undefined,
  stockNumber: string
) {
  return `${year ?? ""}-${make ?? ""}-${model ?? ""}-${stockNumber}`
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: existingStocks, error: stockError } = await supabase
      .from("vehicles")
      .select("stock_number");

    if (stockError) {
      return NextResponse.json({ error: stockError.message }, { status: 500 });
    }

    let maxNumber = 0;

    for (const row of existingStocks ?? []) {
      const stock = row.stock_number as string | null;
      if (!stock) continue;

      const match = stock.match(/^AAW-(\d+)$/i);
      if (!match) continue;

      const parsed = Number(match[1]);
      if (!Number.isNaN(parsed) && parsed > maxNumber) {
        maxNumber = parsed;
      }
    }

    const nextNumber = maxNumber + 1;
    const stockNumber = `AAW-${padStockNumber(nextNumber)}`;

    const slug = generateSlug(body.year, body.make, body.model, stockNumber);

    const payload = {
      ...body,
      stock_number: stockNumber,
      slug,
    };

    const { error } = await supabase.from("vehicles").insert(payload);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      stock_number: stockNumber,
      slug,
    });
  } catch {
    return NextResponse.json({ error: "server crash" }, { status: 500 });
  }
}