"use client";

import { useEffect, useState } from "react";

type Car = {
  title: string;
  slug: string;
  year?: number | null;
  make?: string | null;
  model?: string | null;
  price: number;
  mileage?: number | null;
  image_url: string | null;
  gallery_urls?: string[] | null;
  transmission?: string | null;
  drivetrain?: string | null;
  exterior_color?: string | null;
  interior_color?: string | null;
  vin?: string | null;
  stock_number?: string | null;
  fuel_type?: string | null;
  engine?: string | null;
  body_type?: string | null;
  doors?: number | null;
  description?: string | null;
  status?: string | null;
  featured?: boolean | null;
};

type EditForm = {
  title: string;
  slug: string;
  year: string;
  make: string;
  model: string;
  price: string;
  mileage: string;
  image_url: string;
  gallery_urls: string;
  transmission: string;
  drivetrain: string;
  exterior_color: string;
  interior_color: string;
  vin: string;
  stock_number: string;
  fuel_type: string;
  engine: string;
  body_type: string;
  doors: string;
  description: string;
  status: string;
  featured: boolean;
};

const emptyForm: EditForm = {
  title: "",
  slug: "",
  year: "",
  make: "",
  model: "",
  price: "",
  mileage: "",
  image_url: "",
  gallery_urls: "",
  transmission: "",
  drivetrain: "",
  exterior_color: "",
  interior_color: "",
  vin: "",
  stock_number: "",
  fuel_type: "",
  engine: "",
  body_type: "",
  doors: "",
  description: "",
  status: "available",
  featured: false,
};

export default function AdminInventoryPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [form, setForm] = useState<EditForm>(emptyForm);

  async function loadCars() {
    try {
      setLoading(true);
      const res = await fetch("/api/get-vehicles", { cache: "no-store" });
      const data: Car[] = await res.json();
      setCars(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  async function deleteCar(slug: string) {
    const res = await fetch("/api/delete-vehicle", {
      method: "POST",
      body: new URLSearchParams({ slug }),
    });

    const data = await res.json();
    console.log("DELETE RESPONSE:", data);

    await loadCars();
  }

  function openEditModal(car: Car) {
    setEditingCar(car);
    setForm({
      title: car.title ?? "",
      slug: car.slug ?? "",
      year: car.year?.toString() ?? "",
      make: car.make ?? "",
      model: car.model ?? "",
      price: car.price?.toString() ?? "",
      mileage: car.mileage?.toString() ?? "",
      image_url: car.image_url ?? "",
      gallery_urls: Array.isArray(car.gallery_urls)
        ? car.gallery_urls.join("\n")
        : "",
      transmission: car.transmission ?? "",
      drivetrain: car.drivetrain ?? "",
      exterior_color: car.exterior_color ?? "",
      interior_color: car.interior_color ?? "",
      vin: car.vin ?? "",
      stock_number: car.stock_number ?? "",
      fuel_type: car.fuel_type ?? "",
      engine: car.engine ?? "",
      body_type: car.body_type ?? "",
      doors: car.doors?.toString() ?? "",
      description: car.description ?? "",
      status: car.status ?? "available",
      featured: Boolean(car.featured),
    });
  }

  async function saveEdit() {
    if (!editingCar) return;

    const galleryUrls = form.gallery_urls
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const payload = {
      slug: editingCar.slug,
      title: form.title,
      year: form.year ? Number(form.year) : null,
      make: form.make || null,
      model: form.model || null,
      price: form.price ? Number(form.price) : 0,
      mileage: form.mileage ? Number(form.mileage) : null,
      image_url: form.image_url || null,
      gallery_urls: galleryUrls.length ? galleryUrls : null,
      transmission: form.transmission || null,
      drivetrain: form.drivetrain || null,
      exterior_color: form.exterior_color || null,
      interior_color: form.interior_color || null,
      vin: form.vin || null,
      stock_number: form.stock_number || null,
      fuel_type: form.fuel_type || null,
      engine: form.engine || null,
      body_type: form.body_type || null,
      doors: form.doors ? Number(form.doors) : null,
      description: form.description || null,
      status: form.status || "available",
      featured: form.featured,
    };

    const res = await fetch("/api/update-vehicle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("UPDATE RESPONSE:", data);

    if (!data.error) {
      setEditingCar(null);
      setForm(emptyForm);
      await loadCars();
    }
  }

  useEffect(() => {
    loadCars();

    const handlePageShow = () => loadCars();
    const handleFocus = () => loadCars();
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        loadCars();
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black p-6 text-white sm:p-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Admin Inventory</h1>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <a
            href="/admin/add-vehicle"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,255,255,0.12)] sm:px-5"
          >
            + Add Vehicle
          </a>

          <button
            onClick={async () => {
              await fetch("/api/admin-logout", { method: "POST" });
              window.location.href = "/admin/login";
            }}
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-[#d71920]/60 hover:text-[#ff6666] sm:px-5"
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950"
            >
              <div className="h-48 w-full animate-pulse bg-zinc-800" />
              <div className="space-y-3 p-6">
                <div className="h-5 w-2/3 animate-pulse rounded bg-zinc-800" />
                <div className="h-4 w-1/3 animate-pulse rounded bg-zinc-800" />
                <div className="h-10 w-full animate-pulse rounded-full bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cars.map((car) => {
            const imageSrc =
              typeof car.image_url === "string" && car.image_url.trim() !== ""
                ? car.image_url
                : "/placeholder.jpg";

            return (
              <div
                key={car.slug}
                className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 transition duration-300 hover:-translate-y-1 hover:border-[#d71920]/35 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
              >
                <img
                  src={imageSrc}
                  alt={car.title}
                  className="h-48 w-full object-cover"
                />

                <div className="p-6">
                  <h2 className="text-xl font-semibold">{car.title}</h2>
                  <p className="text-white/60">${car.price}</p>
                  <p className="mt-1 text-sm text-zinc-400 capitalize">
                    {car.status ?? "available"}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={`/inventory/${car.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded bg-white px-3 py-1 text-sm text-black transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(255,255,255,0.15)]"
                    >
                      View
                    </a>

                    <button
                      onClick={() => openEditModal(car)}
                      className="rounded border border-white/20 px-3 py-1 text-sm transition duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteCar(car.slug)}
                      className="rounded border border-red-500 px-3 py-1 text-sm text-red-400 transition duration-300 hover:-translate-y-0.5 hover:border-red-400 hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {editingCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-6">
          <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Edit Vehicle</h2>

              <button
                onClick={() => setEditingCar(null)}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition duration-300 hover:border-white/30 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Title"
                value={form.title}
                onChange={(v) => setForm({ ...form, title: v })}
              />
              <Field
                label="Slug"
                value={form.slug}
                onChange={(v) => setForm({ ...form, slug: v })}
              />
              <Field
                label="Year"
                value={form.year}
                onChange={(v) => setForm({ ...form, year: v })}
                type="number"
              />
              <Field
                label="Make"
                value={form.make}
                onChange={(v) => setForm({ ...form, make: v })}
              />
              <Field
                label="Model"
                value={form.model}
                onChange={(v) => setForm({ ...form, model: v })}
              />
              <Field
                label="Price"
                value={form.price}
                onChange={(v) => setForm({ ...form, price: v })}
                type="number"
              />
              <Field
                label="Mileage"
                value={form.mileage}
                onChange={(v) => setForm({ ...form, mileage: v })}
                type="number"
              />
              <Field
                label="Doors"
                value={form.doors}
                onChange={(v) => setForm({ ...form, doors: v })}
                type="number"
              />
              <Field
                label="Transmission"
                value={form.transmission}
                onChange={(v) => setForm({ ...form, transmission: v })}
              />
              <Field
                label="Drivetrain"
                value={form.drivetrain}
                onChange={(v) => setForm({ ...form, drivetrain: v })}
              />
              <Field
                label="Exterior Color"
                value={form.exterior_color}
                onChange={(v) => setForm({ ...form, exterior_color: v })}
              />
              <Field
                label="Interior Color"
                value={form.interior_color}
                onChange={(v) => setForm({ ...form, interior_color: v })}
              />
              <Field
                label="Fuel Type"
                value={form.fuel_type}
                onChange={(v) => setForm({ ...form, fuel_type: v })}
              />
              <Field
                label="Engine"
                value={form.engine}
                onChange={(v) => setForm({ ...form, engine: v })}
              />
              <Field
                label="Body Type"
                value={form.body_type}
                onChange={(v) => setForm({ ...form, body_type: v })}
              />
              <Field
                label="Stock #"
                value={form.stock_number}
                onChange={(v) => setForm({ ...form, stock_number: v })}
              />
              <Field
                label="VIN"
                value={form.vin}
                onChange={(v) => setForm({ ...form, vin: v })}
              />
              <Field
                label="Main Image URL"
                value={form.image_url}
                onChange={(v) => setForm({ ...form, image_url: v })}
                className="md:col-span-2"
              />

              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Gallery URLs (one per line)
                </label>
                <textarea
                  value={form.gallery_urls}
                  onChange={(e) =>
                    setForm({ ...form, gallery_urls: e.target.value })
                  }
                  className="min-h-32 w-full rounded-xl border border-white/10 bg-black/40 p-3 text-white outline-none transition duration-200 focus:border-[#d71920]/55 focus:ring-4 focus:ring-[#d71920]/10"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="min-h-36 w-full rounded-xl border border-white/10 bg-black/40 p-3 text-white outline-none transition duration-200 focus:border-[#d71920]/55 focus:ring-4 focus:ring-[#d71920]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-white outline-none transition duration-200 focus:border-[#d71920]/55 focus:ring-4 focus:ring-[#d71920]/10"
                >
                  <option value="available">available</option>
                  <option value="sold">sold</option>
                  <option value="pending">pending</option>
                </select>
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) =>
                      setForm({ ...form, featured: e.target.checked })
                    }
                  />
                  <span className="text-sm font-medium">Featured Vehicle</span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditingCar(null)}
                className="rounded-full border border-white/10 px-5 py-2 transition duration-300 hover:border-white/30"
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="rounded-full bg-white px-5 py-2 font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(255,255,255,0.12)]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-white outline-none transition duration-200 focus:border-[#d71920]/55 focus:ring-4 focus:ring-[#d71920]/10"
      />
    </div>
  );
}