import { NextResponse } from "next/server";

export async function POST() {
  // Clear the token cookie
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.set({
    name: "token",
    value: "",
    path: "/",
    maxAge: 0, // expires immediately
    httpOnly: true, // optional, more secure
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return response;
}
