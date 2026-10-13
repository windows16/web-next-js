import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_TOKEN_COOKIE } from "./src/lib/auth";

export function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });
  const hasAccessToken = request.cookies.has(ACCESS_TOKEN_COOKIE);
  const isLoginPage = request.nextUrl.pathname === "/login";

  if (!hasAccessToken && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (hasAccessToken && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
