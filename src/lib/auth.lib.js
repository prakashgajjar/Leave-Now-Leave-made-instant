import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getUserId() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    console.log(payload);
    return {id:payload.id, email:payload.email , name:payload.name, role:payload.role} || null;
  } catch (err) {
    console.error("Token decode error:", err);
    return null;
  }
}
