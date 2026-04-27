import { NextResponse } from "next/server";
import { adminCookieName, createAdminToken, verifyAdminPassword } from "@/lib/auth";
import { loginSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.errors[0]?.message || "登录信息不正确" }, { status: 400 });
  }
  const username = process.env.ADMIN_USERNAME;
  if (!username || parsed.data.username !== username || !verifyAdminPassword(parsed.data.password)) {
    return NextResponse.json({ message: "用户名或密码错误" }, { status: 401 });
  }
  const token = await createAdminToken(username);
  const response = NextResponse.json({ username });
  response.cookies.set(adminCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
  return response;
}
