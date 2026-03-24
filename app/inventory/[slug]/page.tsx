import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import VehicleGallery from "@/components/VehicleGallery";

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: car, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !car) {
    notFound();
  }

  const galleryImages =
    Array.isArray(car.gallery_urls) && car.gallery_urls.length > 0
      ? car.gallery_urls
      : car.image_url
      ? [car.image_url]
      : [];

  return (
    <main className="min-h-screen text-white bg-[radial-gradient(circle_at_top,rgba(215,25,32,0.15),transparent_35%),linear-gradient(180deg,#050505_0%,#0a0a0a_100%)]">
      <section className="relative overflow-hidden px-6 pb-20 pt-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(215,25,32,0.14),transparent_34%)]" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/inventory"
            className="mb-8 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-[#d71920]/40 hover:text-white"
          >
            ← Back to Inventory
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.9fr]">
            <VehicleGallery
              title={car.title}
              images={galleryImages}
              status={car.status}
            />

            <div className="rounded-[2rem] border border-white/10 bg-[#101010] p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                  Vehicle Details
                </p>

                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-300">
                  {car.status ?? "available"}
                </span>
              </div>

              <h1
                className="mt-4 text-4xl font-bold leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {car.title}
              </h1>

              <p className="mt-3 text-zinc-400">
                {car.year ?? "Vehicle"}
                {car.make ? ` • ${car.make}` : ""}
                {car.model ? ` ${car.model}` : ""}
                {car.body_type ? ` • ${car.body_type}` : ""}
              </p>

              <p className="mt-6 text-4xl font-bold text-white">
                ${car.price?.toLocaleString()}
              </p>

              <div className="mt-10">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                  Specifications
                </p>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <Spec label="Mileage" value={`${car.mileage?.toLocaleString()} km`} />
                  <Spec label="Transmission" value={car.transmission} />
                  <Spec label="Drivetrain" value={car.drivetrain} />
                  <Spec label="Fuel Type" value={car.fuel_type} />
                  <Spec label="Engine" value={car.engine} />
                  <Spec label="Body Type" value={car.body_type} />
                  <Spec label="Doors" value={car.doors} />
                  <Spec label="Exterior" value={car.exterior_color} />
                  <Spec label="Interior" value={car.interior_color} />
                  <Spec label="Stock #" value={car.stock_number} />
                  <Spec label="VIN" value={car.vin} />
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                  Description
                </p>
                <p className="mt-3 leading-7 text-zinc-300">
                  {car.description || "No description available."}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button className="rounded-full bg-[#d71920] px-6 py-3 font-semibold text-white transition hover:bg-[#ef232b]">
                  Contact Dealer
                </button>

                <button className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-[#d71920]/50">
                  Book Test Drive
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Spec({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  if (!value) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}