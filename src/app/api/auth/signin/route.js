import dbConnect from "@/lib/db.lib";
import User from "@/models/User.models.js";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();
    // console.log(email, password)
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.password !== password) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({ status: 200, message: "ok" });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // sameSite: "strict",
      maxAge: 20 * 60 * 10,
      path: "/",
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
