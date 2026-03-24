"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";

function generateSlug(
  year: string,
  make: string,
  model: string,
  stock: string
) {
  return `${year}-${make}-${model}-${stock}`
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default function AddVehiclePage() {
  const router = useRouter();

  const [files, setFiles] = useState<File[]>([]);
  const [mainIndex, setMainIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    year: "",
    make: "",
    model: "",
    price: "",
    mileage: "",
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
  });

  const previews = useMemo(
    () =>
      files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      })),
    [files]
  );

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  function removeImage(indexToRemove: number) {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));

    setMainIndex((prev) => {
      if (indexToRemove === prev) return 0;
      if (indexToRemove < prev) return prev - 1;
      return prev;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!files.length) {
      alert("Upload at least one image");
      return;
    }

    if (files.length > 25) {
      alert("Maximum 25 images allowed");
      return;
    }

    try {
      setSubmitting(true);

      const uploadedUrls: string[] = [];

      for (const file of files) {
        const filename = uuid() + "-" + file.name;

        const { error } = await supabase.storage
          .from("vehicle-images")
          .upload(filename, file);

        if (error) {
          alert(error.message);
          setSubmitting(false);
          return;
        }

        const { data } = supabase.storage
          .from("vehicle-images")
          .getPublicUrl(filename);

        uploadedUrls.push(data.publicUrl);
      }

      const mainImage = uploadedUrls[mainIndex];

      const autoSlug = generateSlug(
        form.year,
        form.make,
        form.model,
        form.stock_number
      );

      const res = await fetch("/api/add-vehicle", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          slug: autoSlug,
          year: form.year ? Number(form.year) : null,
          make: form.make,
          model: form.model,
          price: Number(form.price),
          mileage: Number(form.mileage),
          doors: form.doors ? Number(form.doors) : null,
          image_url: mainImage,
          gallery_urls: uploadedUrls,
        }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        setSubmitting(false);
      } else {
        router.push("/admin/inventory");
        router.refresh();
      }
    } catch {
      alert("Something went wrong");
      setSubmitting(false);
    }
  }

  const liveSlug = generateSlug(
    form.year,
    form.make,
    form.model,
    form.stock_number
  );

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Add Vehicle</h1>
          <p className="mt-3 text-zinc-400">
            Upload photos, choose the main image, and fill in the vehicle details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="rounded-3xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="text-xl font-semibold">Photos</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Add one or more photos. Click a thumbnail to choose the main image.
            </p>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setFiles([...(e.target.files ?? [])])}
              className="mt-5 block w-full rounded-xl border border-white/10 bg-zinc-900 p-3 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black"
            />

            {previews.length > 0 && (
              <div className="mt-5">
                

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {previews.map((preview, i) => {
                    const isMain = mainIndex === i;

                    return (
                      <div key={`${preview.file.name}-${i}`} className="relative">
                        <button
                          type="button"
                          onClick={() => setMainIndex(i)}
                          className={`group w-full overflow-hidden rounded-2xl border transition ${
                            isMain
                              ? "border-white ring-2 ring-white/60"
                              : "border-zinc-700 hover:border-zinc-400"
                          }`}
                        >
                          <img
                            src={preview.url}
                            alt={preview.file.name}
                            className="h-32 w-full object-cover"
                          />

                          <div className="absolute inset-x-0 bottom-0 bg-black/70 px-2 py-1 text-left text-xs text-white">
                            <div className="truncate">{preview.file.name}</div>
                          </div>

                          {isMain && (
                            <div className="absolute left-2 top-2 rounded-full bg-white px-2 py-1 text-xs font-semibold text-black">
                              Main Image
                            </div>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/75 text-sm font-bold text-white transition hover:bg-red-600"
                          aria-label="Remove image"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="text-xl font-semibold">Basic Info</h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <LabeledField
                label="Title"
                value={form.title}
                onChange={(v) => setForm({ ...form, title: v })}
              />
              <LabeledField
                label="Year"
                value={form.year}
                onChange={(v) => setForm({ ...form, year: v })}
                type="number"
              />
              <LabeledField
                label="Make"
                value={form.make}
                onChange={(v) => setForm({ ...form, make: v })}
              />
              <LabeledField
                label="Model"
                value={form.model}
                onChange={(v) => setForm({ ...form, model: v })}
              />
              <LabeledField
                label="Stock #"
                value={form.stock_number}
                onChange={(v) => setForm({ ...form, stock_number: v })}
              />
              <LabeledField
                label="Slug Preview"
                value={liveSlug}
                onChange={() => {}}
                readOnly
              />
              <LabeledField
                label="Price"
                value={form.price}
                onChange={(v) => setForm({ ...form, price: v })}
                type="number"
              />
              <LabeledField
                label="Mileage"
                value={form.mileage}
                onChange={(v) => setForm({ ...form, mileage: v })}
                type="number"
              />
              <LabeledField
                label="Status"
                value={form.status}
                onChange={(v) => setForm({ ...form, status: v })}
              />
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="text-xl font-semibold">Specifications</h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <LabeledField
                label="Transmission"
                value={form.transmission}
                onChange={(v) => setForm({ ...form, transmission: v })}
              />
              <LabeledField
                label="Drivetrain"
                value={form.drivetrain}
                onChange={(v) => setForm({ ...form, drivetrain: v })}
              />
              <LabeledField
                label="Exterior Color"
                value={form.exterior_color}
                onChange={(v) => setForm({ ...form, exterior_color: v })}
              />
              <LabeledField
                label="Interior Color"
                value={form.interior_color}
                onChange={(v) => setForm({ ...form, interior_color: v })}
              />
              <LabeledField
                label="VIN"
                value={form.vin}
                onChange={(v) => setForm({ ...form, vin: v })}
              />
              <LabeledField
                label="Fuel Type"
                value={form.fuel_type}
                onChange={(v) => setForm({ ...form, fuel_type: v })}
              />
              <LabeledField
                label="Engine"
                value={form.engine}
                onChange={(v) => setForm({ ...form, engine: v })}
              />
              <LabeledField
                label="Body Type"
                value={form.body_type}
                onChange={(v) => setForm({ ...form, body_type: v })}
              />
              <LabeledField
                label="Doors"
                value={form.doors}
                onChange={(v) => setForm({ ...form, doors: v })}
                type="number"
              />
            </div>

            <div className="mt-4">
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
          </section>

          <section className="rounded-3xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="text-xl font-semibold">Description</h2>

            <div className="mt-5">
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
          </section>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <a
              href="/admin/inventory"
              className="rounded-full border border-white/15 px-6 py-3 text-center font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/30"
            >
              Cancel
            </a>

            <button
              disabled={submitting}
              className="rounded-full bg-white px-6 py-3 font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,255,255,0.12)] disabled:opacity-60"
            >
              {submitting ? "Adding Vehicle..." : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

function LabeledField({
  label,
  value,
  onChange,
  type = "text",
  readOnly = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  readOnly?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
        {label}
      </label>
      <input
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-white outline-none transition duration-200 focus:border-[#d71920]/55 focus:ring-4 focus:ring-[#d71920]/10 read-only:cursor-not-allowed read-only:opacity-70"
      />
    </div>
  );
}