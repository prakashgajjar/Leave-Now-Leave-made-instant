"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getUserDetail } from "@/services/me/GetUserDetail.services";
import { LogoutButton } from "./LogoutButton";

import {
  Leaf,
  Home,
  ClipboardPenLine,
  History,
  LayoutDashboard,
  CheckSquare,
  Database,
  Users,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const studentLinks = [
  { name: "Dashboard", href: "/v1/dashboard", icon: Home },
  { name: "Apply for Leave", href: "/v1/apply", icon: ClipboardPenLine },
  { name: "My Leave History", href: "/v1/history", icon: History },
];

const teacherAdminLinks = [
  { name: "Admin Dashboard", href: "/v1/admin/dashboard", icon: LayoutDashboard },
  { name: "Approve Requests", href: "/v1/admin/approve", icon: CheckSquare },
  { name: "All Leave Records", href: "/v1/admin/records", icon: Database },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserDetail();
        if (data?.flag && data?.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const links =
    user?.role?.toUpperCase() === "TEACHER" ? teacherAdminLinks : studentLinks;

  const NavLink = ({ link }) => {
    const isActive = pathname === link.href;
    return (
      <Link
        href={link.href}
        className={`group flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition-all duration-200 ${
          isActive
            ? "text-green-700 bg-green-50"
            : "text-gray-600 hover:text-green-700 hover:bg-green-50"
        }`}
      >
        <link.icon
          className={`w-5 h-5 transition-transform ${
            isActive ? "text-green-700 scale-110" : "group-hover:scale-110"
          }`}
        />
        <span>{link.name}</span>
      </Link>
    );
  };

  const truncateName = (fullName) => {
    if (!fullName) return "";
    const words = fullName.split(" ");
    return words.slice(0, 2).join(" "); // only first 2 words
  };

  return (
    <nav className="backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="w-7 h-7 text-green-600" />
            <span className="text-2xl font-bold text-gray-800 tracking-tight">
              Leave<span className="text-green-600">Now</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <NavLink key={link.name} link={link} />
            ))}
          </div>

          {/* Profile Section */}
          <div className="hidden md:flex items-center gap-5">
            {loading ? (
              <div className="text-gray-500 text-sm">Loading...</div>
            ) : (
              <div className="flex items-center gap-3 bg-green-50 px-3 py-1.5 rounded-xl">
                <User className="w-8 h-8 text-white bg-green-600 rounded-full p-1.5 shadow-md" />
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-gray-800">
                    {truncateName(user?.name) || "Guest"}
                  </span>

                  <span className="text-xs font-medium text-green-700 capitalize">
                    {user?.role || "student"}
                  </span>
                </div>
              </div>
            )}

            <LogoutButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md shadow-lg transition-all">
          <div className="px-3 pt-3 pb-3 space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? "text-green-700 bg-green-50"
                      : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                  }`}
                >
                  <link.icon
                    className={`w-5 h-5 ${isActive ? "text-green-700" : ""}`}
                  />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile User Info */}
          <div className="pt-3 pb-4 border-t border-gray-100 bg-green-50/60">
            <div className="flex items-center px-4">
              <User className="w-9 h-9 text-white bg-green-600 rounded-full p-1.5" />
              <div className="ml-3">
                <div className="text-base font-semibold text-gray-800">
                  {truncateName(user?.name) || "Guest"}
                </div>

                <div className="text-sm font-medium text-green-700 capitalize">
                  {user?.role || "student"}
                </div>
              </div>
              <div className="ml-auto p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all">
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
