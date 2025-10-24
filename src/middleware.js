import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = [
  "/",
  "/signup",
  "/signin",
  "/forgot-password",
  "/reset-password",
];

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  console.log("middleware",token)
  const pathname = req.nextUrl.pathname;
  if (token) {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
    if (pathname == "/signup") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  } else {
    if (!PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
