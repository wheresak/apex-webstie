import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secret = new TextEncoder().encode(process.env.ADMIN_COOKIE_SECRET!);

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("admin_token")?.value;

  // Always allow the login page and login/logout APIs
  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin-login" ||
    pathname === "/api/admin-logout"
  ) {
    return NextResponse.next();
  }

  // Handle /admin root
  if (pathname === "/admin") {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL("/admin/inventory", req.url));
    } catch {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // Protect all other /admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin-login", "/api/admin-logout"],
};