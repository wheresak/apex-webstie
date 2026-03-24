"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Vehicle = {
  title: string;
  slug: string;
  price: number;
  mileage: number;
  year?: number | null;
  status?: string | null;
  image_url?: string | null;
  body_type?: string | null;
  make?: string | null;
  model?: string | null;
  created_at?: string | null;
};

export default function InventoryPage() {
  const [cars, setCars] = useState<Vehicle[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [bodyTypeFilter, setBodyTypeFilter] = useState("all");
  const [makeFilter, setMakeFilter] = useState("all");
  const [modelFilter, setModelFilter] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    async function loadCars() {
      const res = await fetch("/api/get-vehicles");
      const data = await res.json();

      if (Array.isArray(data)) {
        setCars(data);
      }
    }

    loadCars();
  }, []);

  const bodyTypeOptions = useMemo(() => {
    const values = cars
      .map((car) => car.body_type?.trim())
      .filter((value): value is string => Boolean(value));

    return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
  }, [cars]);

  const makeOptions = useMemo(() => {
    const values = cars
      .map((car) => car.make?.trim())
      .filter((value): value is string => Boolean(value));

    return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
  }, [cars]);

  const modelOptions = useMemo(() => {
    const values = cars
      .filter((car) =>
        makeFilter === "all"
          ? true
          : (car.make ?? "").toLowerCase() === makeFilter.toLowerCase()
      )
      .map((car) => car.model?.trim())
      .filter((value): value is string => Boolean(value));

    return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
  }, [cars, makeFilter]);

  const filteredCars = useMemo(() => {
    let result = [...cars];

    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter((car) =>
        `${car.year ?? ""} ${car.title}`.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter(
        (car) => (car.status ?? "available").toLowerCase() === statusFilter
      );
    }

    if (minPrice.trim()) {
      result = result.filter((car) => car.price >= Number(minPrice));
    }

    if (maxPrice.trim()) {
      result = result.filter((car) => car.price <= Number(maxPrice));
    }

    if (maxMileage.trim()) {
      result = result.filter((car) => car.mileage <= Number(maxMileage));
    }

    if (bodyTypeFilter !== "all") {
      result = result.filter(
        (car) =>
          (car.body_type ?? "").toLowerCase() ===
          bodyTypeFilter.toLowerCase()
      );
    }

    if (makeFilter !== "all") {
      result = result.filter(
        (car) => (car.make ?? "").toLowerCase() === makeFilter.toLowerCase()
      );
    }

    if (modelFilter !== "all") {
      result = result.filter(
        (car) => (car.model ?? "").toLowerCase() === modelFilter.toLowerCase()
      );
    }

    switch (sortBy) {
      case "newest":
        result.sort((a, b) => {
          const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
          const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
          return bTime - aTime;
        });
        break;
      case "oldest":
        result.sort((a, b) => {
          const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
          const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
          return aTime - bTime;
        });
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "mileage-asc":
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      case "mileage-desc":
        result.sort((a, b) => b.mileage - a.mileage);
        break;
      case "title-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "title-asc":
      default:
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [
    cars,
    search,
    statusFilter,
    minPrice,
    maxPrice,
    maxMileage,
    bodyTypeFilter,
    makeFilter,
    modelFilter,
    sortBy,
  ]);

  function resetFilters() {
    setSearch("");
    setStatusFilter("all");
    setSortBy("newest");
    setMinPrice("");
    setMaxPrice("");
    setMaxMileage("");
    setBodyTypeFilter("all");
    setMakeFilter("all");
    setModelFilter("all");
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="relative overflow-hidden px-6 pb-20 pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(215,25,32,0.16),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_20%,transparent_80%,rgba(255,255,255,0.02))]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Inventory
            </p>
            <h1
              className="mt-3 text-4xl font-bold sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Browse Used Cars
            </h1>
            <p className="mt-4 max-w-2xl text-zinc-300">
              Filter premium pre-owned inventory with a cleaner, faster shopping
              experience built the Apex way.
            </p>
          </div>

          <div className="mb-10 rounded-[2rem] border border-white/10 bg-[#101010]/90 p-4 backdrop-blur-sm sm:p-5">
  <button
    type="button"
    onClick={() => setFiltersOpen((prev) => !prev)}
    className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-left md:hidden"
  >
    <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
      Filters
    </span>
    <span className="text-zinc-400">{filtersOpen ? "−" : "+"}</span>
  </button>

  <div className={`${filtersOpen ? "mt-4 block" : "hidden"} md:mt-0 md:block`}>
    <div className="grid gap-4 md:grid-cols-4">
      <input
        type="text"
        placeholder="Search by title or year..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-zinc-500"
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
      >
        <option value="all">All Statuses</option>
        <option value="available">Available</option>
        <option value="pending">Pending</option>
        <option value="sold">Sold</option>
      </select>

      <select
        value={makeFilter}
        onChange={(e) => {
          setMakeFilter(e.target.value);
          setModelFilter("all");
        }}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
      >
        <option value="all">All Makes</option>
        {makeOptions.map((make) => (
          <option key={make} value={make}>
            {make}
          </option>
        ))}
      </select>

      <select
        value={modelFilter}
        onChange={(e) => setModelFilter(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
      >
        <option value="all">All Models</option>
        {modelOptions.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>

    <div className="mt-4 grid gap-4 md:grid-cols-5">
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-zinc-500"
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-zinc-500"
      />

      <input
        type="number"
        placeholder="Max Mileage"
        value={maxMileage}
        onChange={(e) => setMaxMileage(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-zinc-500"
      />

      <select
        value={bodyTypeFilter}
        onChange={(e) => setBodyTypeFilter(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
      >
        <option value="all">All Body Types</option>
        {bodyTypeOptions.map((bodyType) => (
          <option key={bodyType} value={bodyType}>
            {bodyType}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="mileage-asc">Mileage: Low to High</option>
        <option value="mileage-desc">Mileage: High to Low</option>
        <option value="title-asc">Title: A-Z</option>
        <option value="title-desc">Title: Z-A</option>
      </select>
    </div>

    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-zinc-400">
        {filteredCars.length} vehicle{filteredCars.length !== 1 ? "s" : ""} found
      </p>

      <button
        type="button"
        onClick={resetFilters}
        className="rounded-xl border border-white/15 bg-white px-4 py-3 text-sm font-semibold text-black transition hover:opacity-90"
      >
        Reset Filters
      </button>
    </div>
  </div>
</div>


          {filteredCars.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-[#101010] p-10 text-zinc-400">
              No vehicles match your filters.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredCars.map((car) => {
                const imageSrc =
                  typeof car.image_url === "string" &&
                  car.image_url.trim() !== ""
                    ? car.image_url
                    : "/placeholder.jpg";

                const status = car.status ?? "available";

                return (
                  <div
                    key={car.slug}
                    className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[#101010] transition duration-300 hover:-translate-y-1 hover:border-[#d71920]/40"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={imageSrc}
                        alt={car.title}
                        className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white backdrop-blur-md">
                        {status}
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-sm text-zinc-500">
                        {car.year ?? "Vehicle"}
                        {car.make ? ` • ${car.make}` : ""}
                        {car.model ? ` ${car.model}` : ""}
                        {car.body_type && car.body_type.trim() !== ""
                          ? ` • ${car.body_type}`
                          : ""}
                      </p>

                      <h2
                        className="mt-2 text-2xl font-bold leading-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {car.title}
                      </h2>

                      <p className="mt-3 text-zinc-400">
                        {car.mileage?.toLocaleString()} km
                      </p>

                      <div className="mt-5 flex items-end justify-between gap-4">
                        <p className="text-3xl font-bold text-white">
                          ${car.price?.toLocaleString()}
                        </p>

                        <Link
                          href={`/inventory/${car.slug}`}
                          className="rounded-full bg-[#d71920] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ef232b]"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}