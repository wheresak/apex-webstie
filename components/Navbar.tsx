"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-[85px] items-center justify-between">
          <Link href="/" className="flex shrink-0 items-center" onClick={closeMenu}>
            <Image
              src="/apex-logo.png"
              alt="Apex Autowerks"
              width={260}
              height={78}
              className="h-16 w-auto object-contain sm:h-20"
              priority
            />
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/"
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40"
            >
              Home
            </Link>

            <Link
              href="/services"
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#d71920]/60 hover:text-[#ff4d4d]"
            >
              Tint / Detailing
            </Link>

            <Link
              href="/inventory"
              className="rounded-full bg-[#d71920] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#ef232b]"
            >
              Browse Cars
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/40 md:hidden"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 bg-white transition ${
                  menuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition ${
                  menuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {menuOpen && (
          <div className="pb-4 md:hidden">
            <div className="rounded-3xl border border-white/10 bg-[#111111] p-4">
              <div className="flex flex-col gap-3">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/30"
                >
                  Home
                </Link>

                <Link
                  href="/services"
                  onClick={closeMenu}
                  className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-[#d71920]/50"
                >
                  Tint / Detailing
                </Link>

                <Link
                  href="/inventory"
                  onClick={closeMenu}
                  className="rounded-2xl bg-[#d71920] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#ef232b]"
                >
                  Browse Cars
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}