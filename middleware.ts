import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const adminCookieName = "meow_admin_token";

async function hasValidToken(request: NextRequest) {
  const token = request.cookies.get(adminCookieName)?.value;
  const secret = process.env.JWT_SECRET;
  if (!token || !secret) return false;
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!(await hasValidToken(request))) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/api/admin") && !["/api/admin/login", "/api/admin/logout"].includes(pathname)) {
    if (!(await hasValidToken(request))) {
      return NextResponse.json({ message: "请先登录后台" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};
