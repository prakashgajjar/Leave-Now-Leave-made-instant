import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth.lib";

export async function GET() {
  try {
    const user = await getUserId();
    console.log(user)
    if (!user)
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401, flag: false }
      );
    return NextResponse.json({ user, status: 200, flag: true });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ user, status: 500, flag: false });
  }
}
