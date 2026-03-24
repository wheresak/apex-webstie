import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#090909] px-6 py-8 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm text-zinc-400">
            © 2026 Apex Autowerks. All rights reserved.
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Premium automotive services and pre-owned inventory.
          </p>
        
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/login"
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-[#d71920]/60 hover:text-[#ff6666]"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}