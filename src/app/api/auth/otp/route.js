import { getUserDetail } from "@/lib/authOtp.lib";
import dbConnect from "@/lib/db.lib";
import OtpModels from "@/models/Otp.models";
import User from "@/models/User.models";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await dbConnect();
    const otp = await req.json();
    // console.log(otp);

    if (!otp) {
      return NextResponse.json({ message: "Otp is required" }, { status: 400 });
    }

    const { email, password, name } = await getUserDetail();

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const otpUser = await OtpModels.findOne({ email: email }).sort({
      createdAt: -1,
    });

    // console.log(otpUser);

    if (!otpUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404, flag: false }
      );
    }

    console.log(otpUser.otp, otp);

    if (String(otpUser.otp) !== String(otp)) {
      return NextResponse.json(
        { message: "Invalid otp" },
        { status: 401, flag: false }
      );
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: email,
      password: hashed,
      name: name,
      role: otpUser.role,
    });

    await OtpModels.deleteOne({ email: email });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      status: 200,
      flag: true,
      message: "Correct Otp",
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
    return NextResponse.json({
      flag: false,
      status: 500,
      message: error.message,
    });
  }
}
