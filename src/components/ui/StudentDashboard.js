"use client";
import React, { useEffect, useState } from "react";
import { Home, ClipboardPenLine, History, User } from "lucide-react";
import { getUserDetail } from "@/services/me/GetUserDetail.services";
import { format } from "date-fns";

const StudentDashboard = () => {
  const [user, setUser] = useState({ name: "", email: "", role: "" });
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserDetail();
        if (data?.flag) setUser(data.user);
        
        // mock leaves if not fetched from API
        setLeaves([
          { id: 1, date: "2025-10-20", reason: "Medical Leave", status: "Approved" },
          { id: 2, date: "2025-10-18", reason: "Personal Work", status: "Pending" },
          { id: 3, date: "2025-10-15", reason: "Family Function", status: "Rejected" },
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Stats calculation
  const stats = leaves.reduce(
    (acc, leave) => {
      if (leave.status === "Approved") acc.approved += 1;
      if (leave.status === "Pending") acc.pending += 1;
      if (leave.status === "Rejected") acc.rejected += 1;
      return acc;
    },
    { approved: 0, pending: 0, rejected: 0 }
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {loading ? (
        <div className="text-center text-gray-500">Loading dashboard...</div>
      ) : (
        <>
          {/* Welcome Card */}
          <div className="flex items-center gap-4 bg-green-50 p-6 rounded-2xl shadow-md mb-6">
            <User className="w-14 h-14 p-2 rounded-full bg-green-600 text-white shadow-lg" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Hi, {user.name.split(" ").slice(0, 2).join(" ")} 👋
              </h2>
              <p className="text-gray-600">Role: {user.role}</p>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition">
              <p className="text-sm text-gray-500">Approved Leaves</p>
              <h3 className="text-2xl font-bold text-green-600">{stats.approved}</h3>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition">
              <p className="text-sm text-gray-500">Pending Leaves</p>
              <h3 className="text-2xl font-bold text-yellow-500">{stats.pending}</h3>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition">
              <p className="text-sm text-gray-500">Rejected Leaves</p>
              <h3 className="text-2xl font-bold text-red-600">{stats.rejected}</h3>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <a
              href="/apply"
              className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
            >
              <ClipboardPenLine className="w-5 h-5" />
              Apply for Leave
            </a>
            <a
              href="/history"
              className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl shadow hover:bg-gray-200 transition"
            >
              <History className="w-5 h-5" />
              View Leave History
            </a>
          </div>

          {/* Recent Leaves Table */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Leaves</h3>
            {leaves.length === 0 ? (
              <p className="text-gray-500">No leaves applied yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-2 text-gray-500 text-sm">Date</th>
                      <th className="px-4 py-2 text-gray-500 text-sm">Reason</th>
                      <th className="px-4 py-2 text-gray-500 text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaves.map((leave) => (
                      <tr key={leave.id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-2 text-gray-700">{format(new Date(leave.date), "dd MMM yyyy")}</td>
                        <td className="px-4 py-2 text-gray-700">{leave.reason}</td>
                        <td
                          className={`px-4 py-2 font-semibold ${
                            leave.status === "Approved"
                              ? "text-green-600"
                              : leave.status === "Pending"
                              ? "text-yellow-500"
                              : "text-red-600"
                          }`}
                        >
                          {leave.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
