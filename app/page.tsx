import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="relative overflow-hidden px-6 pb-20 pt-24">
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover blur-sm scale-105 opacity-40"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-zinc-400">
              Phoenix Automotive
            </p>

            <h1
              className="text-5xl font-bold leading-tight tracking-tight sm:text-7xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Built For
              <span className="block text-[#d71920]">Drivers Who Care</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
              Apex Autowerks delivers premium tint, detailing, ceramic coating,
              and a modern used-car inventory experience — all under one brand.
            </p>

            
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <Link
              href="/services"
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#101010] p-8 text-center transition duration-300 hover:-translate-y-1 hover:border-[#d71920]/40"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(215,25,32,0.18),transparent_36%)] opacity-0 transition duration-300 group-hover:opacity-100" />

              <div className="relative flex h-full flex-col items-center">
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                  Automotive Services
                </p>

                <h2
                  className="mt-4 text-3xl font-bold sm:text-4xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Tint, Detailing & Ceramic Coating
                </h2>

                <p className="mx-auto mt-4 max-w-xl leading-7 text-zinc-300">
                  Premium vehicle care with a sharper, performance-focused feel.
                  Clean installs, protection, and finish work done right.
                </p>

                <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                      Tint
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      Clean install
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                      Detailing
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      Deep restoration
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                      Ceramic
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      Lasting protection
                    </p>
                  </div>
                </div>

                <div className="mt-8 inline-flex rounded-full bg-[#4da3ff] px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-[#69b2ff]">
                  Go to Services
                </div>
              </div>
            </Link>

            <Link
              href="/inventory"
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#101010] p-8 text-center transition duration-300 hover:-translate-y-1 hover:border-[#d71920]/40"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(215,25,32,0.18),transparent_36%)] opacity-0 transition duration-300 group-hover:opacity-100" />

              <div className="relative flex h-full flex-col items-center">
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                  Used Cars
                </p>

                <h2
                  className="mt-4 text-3xl font-bold sm:text-4xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Browse Premium Pre-Owned Inventory
                </h2>

                <p className="mx-auto mt-4 max-w-xl leading-7 text-zinc-300">
                  Shop a cleaner used-car experience with rich galleries,
                  detailed specs, and trust worthy sellers.
                </p>

                <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                      Inventory
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      Transparent listings
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                      Financing
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      Several financing options
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                      Trust
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      Reliable vehicles
                    </p>
                  </div>
                </div>

                <div className="mt-8 inline-flex rounded-full bg-[#d71920] px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-[#ef232b]">
                  Browse Used Cars
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0d0d0d] px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Why Apex
            </p>
            <h3
              className="mt-3 text-2xl font-bold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              One brand. Two lanes.
            </h3>
            <p className="mt-4 leading-7 text-zinc-300">
              Apex brings automotive services and pre-owned inventory together in
              one sharp, modern experience.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
              Services Side
            </p>
            <p className="mt-3 text-lg font-semibold">
              Protect and perfect your vehicle.
            </p>
            <p className="mt-3 text-zinc-300">
              Tint, detailing, ceramic coating, and premium finish work for
              owners who care about the details.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
              Inventory Side
            </p>
            <p className="mt-3 text-lg font-semibold">
              Shop quality pre-owned vehicles.
            </p>
            <p className="mt-3 text-zinc-300">
              A cleaner dealership experience with better galleries, specs,
              filters, and vehicle presentation.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}