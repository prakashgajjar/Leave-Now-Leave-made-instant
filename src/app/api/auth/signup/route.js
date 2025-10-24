import dbConnect from "@/lib/db.lib";
import OtpModel from "@/models/Otp.models.js";
import { sendEmail } from "@/utils/email.utils";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await dbConnect();
    const { name, email, password, role } = await req.json();
    // console.log(email, password, role);

    if (!email || !password || !role || !name) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400,flag:flase }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);
    // console.log("Your OTP is:", otp);

    await OtpModel.create({
      email,
      otp,
      role:role,
      expiresAt: expiry,
    }); 

    const token = jwt.sign(
      { email: email, password: password, name: name },
      process.env.JWT_SECRET,
      {
        expiresIn: "5mins",
      }
    );

    const response = NextResponse.json({
      status: 200,
      message: "user created",
      flag:true
    });

    response.cookies.set("ln_auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // sameSite: "strict",
      maxAge: 20 * 60 * 10 ,
      path: "/",
    });

    await sendEmail({
      to: email,
      subject: "Your OTP for LeaveNow",
      text: `Your OTP is ${otp}`,
      html: `<p>Your OTP is <strong>${otp}</strong></p>`,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500,flag:flase });
  }
}
