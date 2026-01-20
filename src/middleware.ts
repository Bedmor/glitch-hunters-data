import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode("super-secret-key-change-this-in-env");

export async function middleware(request: NextRequest) {
  // Only apply to dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const session = request.cookies.get("session")?.value;

    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      await jwtVerify(session, SECRET_KEY, {
        algorithms: ["HS256"],
      });
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
