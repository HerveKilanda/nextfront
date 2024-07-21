import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.SECRET_KEY;

export async function middleware(request: NextRequest) {
  console.log("middleware run");

  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/adminCategory");
  console.log(`Requested Path: ${pathname}`);
  console.log(`Is Admin Route: ${isAdminRoute}`);

  if (isAdminRoute) {
    const token = request.cookies.get("token")?.value || "";
    console.log(`Token: ${token}`);

    if (!token) {
      console.log("No token found, redirecting to home");
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      // Vérifier le token en utilisant jose
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(SECRET_KEY)
      );
      console.log(`Decoded Token: ${JSON.stringify(payload)}`);

      if (payload.role === "ADMIN") {
        console.log("User is admin, allowing access");
        return NextResponse.next();
      } else {
        console.log("User is not admin, redirecting to home");
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.error("Failed to verify token:", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/adminCategory/:path*",
};
