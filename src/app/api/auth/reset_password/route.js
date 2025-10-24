import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db.lib.js";
import User from "@/models/User.models.js";

export async function POST(req) {
  try {
    await dbConnect();

    // Parse and validate body
    const body = await req.json();
    const { token, password } = body || {};

    if (!token || !password) {
      return NextResponse.json(
        { message: "Token and password are required", flag: false },
        { status: 400 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid or expired token", flag: false },
        { status: 401 }
      );
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json(
        { message: "User not found", flag: false },
        { status: 404 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    await user.save();

    return NextResponse.json(
      { message: "Password reset successful", flag: true },
      { status: 200 }
    );

  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", flag: false },
      { status: 500 }
    );
  }
}
