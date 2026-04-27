import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { compareSync } from "bcryptjs";

export const adminCookieName = "meow_admin_token";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("JWT_SECRET 未配置或长度过短");
  }
  return new TextEncoder().encode(secret);
}

export async function createAdminToken(username: string) {
  return new SignJWT({ username, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyAdminToken(token?: string) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.role === "admin" ? payload : null;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const token = cookies().get(adminCookieName)?.value;
  return verifyAdminToken(token);
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    throw new Response("未登录", { status: 401 });
  }
  return session;
}

export function verifyAdminPassword(password: string) {
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured) return false;
  if (configured.startsWith("$2a$") || configured.startsWith("$2b$") || configured.startsWith("$2y$")) {
    return compareSync(password, configured);
  }
  return password === configured;
}
