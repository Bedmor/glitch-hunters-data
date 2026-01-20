"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

// HASH for 'admin'
const ADMIN_PASSWORD_HASH = "$2b$10$ouFonTx8yJP6B3GawWAxDOQVkJU9OMpRAcVH3rDritZoPFlbDolty";
// HASH for 'admin5454'
const SUPER_ADMIN_PASSWORD_HASH = "$2b$10$e0DpJxPRIecfTzaj1SpCyOXJZ86ztUTwXZpPvzFNBIESf6Si4UngG";

const SECRET_KEY = new TextEncoder().encode("super-secret-key-change-this-in-env");

export async function login(password: string) {
  let role = "user";
  
  if (await bcrypt.compare(password, ADMIN_PASSWORD_HASH)) {
    role = "admin";
  } else if (await bcrypt.compare(password, SUPER_ADMIN_PASSWORD_HASH)) {
    role = "super_admin";
  } else {
    return { success: false, error: "Hatalı şifre" };
  }

  // Create Session
  const token = await new SignJWT({ role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET_KEY);

  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return { success: true };
}

export async function logout() {
  (await cookies()).delete("session");
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, SECRET_KEY, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}
