import Link from "next/link";

const galleryItems = [
  {
    image: "/images/gallery-1.jpg",
    href: "https://www.instagram.com/p/DQ5d8svDNA4/",
    alt: "Apex Autowerks tint work 1",
  },
  {
    image: "/images/gallery-2.jpg",
    href: "https://www.instagram.com/p/DLDFk9pMFtc/",
    alt: "Apex Autowerks detailing work 1",
  },
  {
    image: "/images/gallery-3.jpg",
    href: "https://www.instagram.com/p/DKfQZ24xMM5/",
    alt: "Apex Autowerks tint work 2",
  },
  {
    image: "/images/gallery-4.jpg",
    href: "https://www.instagram.com/p/DQ-grGTjAw-/",
    alt: "Apex Autowerks detailing work 2",
  },
  {
    image: "/images/gallery-5.jpg",
    href: "https://www.instagram.com/p/DNBCGipsRtT/",
    alt: "Apex Autowerks tint work 3",
  },
  {
    image: "/images/gallery-6.jpg",
    href: "https://www.instagram.com/p/DIe4B4hz5Lc/?img_index=1",
    alt: "Apex Autowerks detailing work 3",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <section className="relative min-h-[88vh] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,8,12,0.86)_0%,rgba(7,9,13,0.56)_48%,rgba(7,9,13,0.76)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(255,64,64,0.12),transparent_20%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.05),transparent_20%)]" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-center px-6 py-24">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#ff4040]">
              Phoenix Auto Styling
            </p>

            <h1
              className="text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Premium Automotive Care.
              <span className="mt-2 block text-[#ff4040]">
                Built To Stand Out.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Window tint, detailing, and ceramic coating done right.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-[#d61f1f] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#ef232b]"
              >
                Get A Quote
              </a>

              <a
                href="#gallery"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                View Recent Work
              </a>
            </div>
          </div>
        </div>

        <a
          href="#services"
          className="absolute bottom-7 left-1/2 hidden h-14 w-9 -translate-x-1/2 items-start justify-center rounded-full border border-white/20 bg-white/5 pt-2 md:flex"
          aria-label="Scroll to services"
        >
          <span className="h-3 w-1.5 animate-bounce rounded-full bg-white" />
        </a>
      </section>

      <section className="relative z-10 -mt-10 px-6 pb-8">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-white/10 bg-[#12151c]/80 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-md">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[22px] border border-white/10 bg-white/[0.025] p-7 text-center transition hover:-translate-y-1 hover:border-white/15">
              <h3
                className="mb-2 text-3xl font-bold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Premium
              </h3>
              <p className="text-zinc-400">
                Clean installs and attention to detail on every vehicle.
              </p>
            </div>

            <div className="rounded-[22px] border border-white/10 bg-white/[0.025] p-7 text-center transition hover:-translate-y-1 hover:border-white/15">
              <h3
                className="mb-2 text-3xl font-bold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Custom
              </h3>
              <p className="text-zinc-400">
                Every build is tailored to the car and the owner’s vision.
              </p>
            </div>

            <div className="rounded-[22px] border border-white/10 bg-white/[0.025] p-7 text-center transition hover:-translate-y-1 hover:border-white/15">
              <h3
                className="mb-2 text-3xl font-bold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Phoenix
              </h3>
              <p className="text-zinc-400">
                Serving drivers across the greater Phoenix area.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#101318] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#ff4040]">
              Our Services
            </p>
            <h2
              className="text-4xl font-bold sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Focused Automotive Care Done Properly
            </h2>
            <p className="mt-5 text-lg text-zinc-300">
              We specialize in premium window tint, detailing, and ceramic
              coatings for drivers who want their vehicles looking sharp and
              protected.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <ServiceCard
              title="Window Tint"
              icon="shield"
              description="Reduce heat, increase privacy, and give your vehicle a cleaner, more aggressive appearance with premium tint installation."
              items={[
                "Ceramic & carbon tint options",
                "Heat rejection & UV protection",
                "Clean edge precision install",
                "Multiple darkness levels",
              ]}
            />

            <ServiceCard
              title="Detailing"
              icon="sparkles"
              description="Restore shine, remove grime, and maintain a premium presentation inside and out with professional detailing packages."
              items={[
                "Interior deep cleaning",
                "Exterior wash & protection",
                "Paint gloss enhancement",
                "Maintenance detail plans",
              ]}
            />

            <ServiceCard
              title="Ceramic Coating"
              icon="drop"
              description="Protect your paint with long-lasting ceramic coatings that enhance gloss, repel contaminants, and make maintenance easier."
              items={[
                "Hydrophobic protection",
                "Deep gloss enhancement",
                "UV & chemical resistance",
                "Multi-year durability options",
              ]}
            />
          </div>
        </div>
      </section>

      <section id="about" className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#171b24] p-3 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80"
              alt="Apex Autowerks vehicle"
              className="h-full w-full rounded-[22px] object-cover"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#ff4040]">
              About Apex Autowerks
            </p>
            <h2
              className="max-w-2xl text-4xl font-bold sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              We treat every car like it represents our name.
            </h2>

            <p className="mt-6 text-lg leading-8 text-zinc-300">
              Apex Autowerks is a Phoenix-based automotive shop specializing in
              precision window tint and premium detailing. We focus on clean
              installs, flawless finishes, and presentation that elevates the
              overall look of your vehicle.
            </p>

            <p className="mt-5 text-lg leading-8 text-zinc-300">
              Whether you&apos;re looking for heat reduction, increased privacy,
              or a full interior and exterior refresh, our goal is simple:
              deliver results you’re proud to drive every single day.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Precision installation",
                "Premium materials",
                "Performance aesthetic",
                "Client-first service",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-center gap-3 rounded-[18px] border border-white/10 bg-white/[0.02] px-4 py-4 text-center text-white transition hover:-translate-y-1 hover:border-white/15"
                >
                  <span className="text-[#ff4040]">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#101318] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#ff4040]">
              Why Choose Us
            </p>
            <h2
              className="text-4xl font-bold sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Built To Feel Premium From First Click To Final Delivery
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <WhyCard
              title="Clean Results"
              text="Sharp lines, proper fitment, and an install quality that looks intentional, not rushed."
            />
            <WhyCard
              title="Real Enthusiast Energy"
              text="This isn’t generic car care. It’s for owners who actually care how the car sits, shines, and presents."
            />
            <WhyCard
              title="One-Stop Styling"
              text="Tint, detailing, and ceramic protection all in one place."
            />
          </div>
        </div>
      </section>

      <section id="gallery" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#ff4040]">
              Gallery
            </p>
            <h2
              className="text-4xl font-bold sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Recent Work
            </h2>
            <p className="mt-5 text-lg text-zinc-300">
              A look at some of our recent tint and detailing work. Click any
              photo to view it on Instagram.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-[24px] border border-white/10 bg-[#171b24] shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition hover:-translate-y-2 hover:border-white/15"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="h-[340px] w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-75"
                  />
                  <div className="absolute inset-0 flex items-end bg-[linear-gradient(180deg,transparent_40%,rgba(6,8,12,0.82)_100%)] p-5 opacity-0 transition group-hover:opacity-100">
                    <span className="font-semibold text-white">View Post</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://www.instagram.com/apexautowerks_/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-[#d61f1f] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#ef232b]"
            >
              View More On Instagram
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#101318] px-6 py-24">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-white/10 bg-white/[0.02] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.28)] lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#ff4040]">
                Contact Us
              </p>

              <h2
                className="text-4xl font-bold sm:text-5xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Let’s Build Your Next Look
              </h2>

              <p className="mt-5 text-lg leading-8 text-zinc-300">
                Ready for tint or detailing? Reach out and tell us what you
                drive and what you want done.
              </p>

              <div className="mt-8 space-y-4 text-zinc-200">
                <div className="flex items-center gap-3">
                  <span className="text-[#ff4040]">📍</span>
                  <span>2885 N 91st Ave, Phoenix, AZ 85037</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[#ff4040]">📞</span>
                  <a
                    href="tel:+16028579929"
                    className="transition hover:text-white"
                  >
                    +1 602-857-9929
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[#ff4040]">◎</span>
                  <a
                    href="https://www.instagram.com/apexautowerks_/"
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-white"
                  >
                    @apexautowerks_
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-[22px] border border-white/10 bg-[#0f1114] p-4">
              <div className="overflow-hidden rounded-[18px]">
                <iframe
                  src="https://api.leadconnectorhq.com/widget/form/LE9V9VOsqgg80BUTFoDn"
                  className="h-[660px] w-full border-0 bg-[#0f1114]"
                  title="tint form"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </main>
  );
}

function ServiceCard({
  title,
  icon,
  description,
  items,
}: {
  title: string;
  icon: "shield" | "sparkles" | "drop";
  description: string;
  items: string[];
}) {
  const iconMap = {
    shield: "🛡️",
    sparkles: "✨",
    drop: "💧",
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] p-8 text-center shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition hover:-translate-y-2 hover:border-white/15">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,64,64,0.11),transparent_28%)]" />

      <div className="relative">
        <div className="mx-auto mb-5 flex h-[62px] w-[62px] items-center justify-center rounded-[18px] bg-[linear-gradient(180deg,rgba(255,64,64,0.18),rgba(255,64,64,0.09))] text-2xl">
          {iconMap[icon]}
        </div>

        <h4
          className="text-3xl font-bold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h4>

        <p className="mt-4 text-zinc-400">{description}</p>

        <ul className="mx-auto mt-5 w-fit max-w-full list-disc pl-5 text-left text-zinc-200">
          {items.map((item) => (
            <li key={item} className="mt-2">
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex justify-center">
          <a
            href="#contact"
            className="rounded-full bg-[#d61f1f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ef232b]"
          >
            Get Quote
          </a>
        </div>
      </div>
    </div>
  );
}

function WhyCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition hover:-translate-y-2 hover:border-white/15">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,64,64,0.11),transparent_28%)]" />
      <div className="relative">
        <h4
          className="text-3xl font-bold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h4>
        <p className="mt-4 text-zinc-400">{text}</p>
      </div>
    </div>
  );
}