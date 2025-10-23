import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getUserDetail() {
  try {
    const cookieStore = await cookies();
    const token =  cookieStore.get("ln_auth")?.value;

    if (!token) return null;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    console.log(payload);
    return {email:payload.email, password : payload.password , name : payload.name} || null;
  } catch (err) {
    console.error("Token decode error:", err);
    return null;
  }
}
