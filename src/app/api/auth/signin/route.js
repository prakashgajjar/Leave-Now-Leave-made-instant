import dbConnect from "@/lib/db.lib";
import User from "@/models/User.models.js";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();
    // console.log(email, password)
    const user = await User.findOne({ email }).select("+password");
    // console.log(user)

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404, flag: false }
      );
    }
    // console.log(user.password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json({ message: "Invalid password" }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id, role: user.role,email:user.email,name:user.name }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      status: 200,
      message: "ok",
      flag: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // sameSite: "strict",
      maxAge: 20 * 60 * 10 * 1000,
      path: "/",
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, flag: false }
    );
  }
}
