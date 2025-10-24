// /app/api/auth/forgot-password/route.js
import { NextResponse } from "next/server";
import User from "@/models/User.models.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/utils/email.utils";
import dbConnect from "@/lib/db.lib";

export async function POST(req) {
  try {
    await dbConnect(); // 🔑 ensure DB connection

    const  {email}  = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Invalid email" },
        { status: 400, flag:false  }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404, flag:false });
    }

    // Create a reset token (valid for 15 min)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
    const response = NextResponse.json({ message: "Reset link sent!" , status:200, flag:true });
    // Send reset link via email
    await sendEmail({
      to: email,
      subject: "Password Reset",
      text: `Click the link to reset your password: ${resetLink}`,
      html: `<p>Click the link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
    });

    return response
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 , flag:false });
  }
}
