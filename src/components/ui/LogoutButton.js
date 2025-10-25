"use client";
import React from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      router.push("/"); // redirect after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all"
      title="Log Out"
    >
      <LogOut className="w-5 h-5" />
    </button>
  );
};
