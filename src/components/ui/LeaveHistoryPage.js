"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  X,
  CheckCircle,
  AlertCircle,
  XCircle,
  Download,
  QrCode,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Clock,
} from "lucide-react";

// --- Mock Data ---
const mockLeaveHistory = [
  {
    id: 1,
    reason: "Family Event",
    describe: "Attending my cousin's wedding in another city.",
    leaveType: "Casual Leave",
    fromDate: "2025-11-10",
    toDate: "2025-11-12",
    totalDays: 3,
    status: "approved",
    approvedBy: "Prof. Eleanor",
    approvedAt: "2025-11-05T10:30:00Z",
  },
  {
    id: 2,
    reason: "Medical Checkup",
    describe: "Scheduled annual health checkup.",
    leaveType: "Medical Leave",
    fromDate: "2025-11-08",
    toDate: "2025-11-08",
    totalDays: 1,
    status: "pending",
  },
  {
    id: 3,
    reason: "Personal Time",
    describe: "Need to take a day off for personal errands.",
    leaveType: "Casual Leave",
    fromDate: "2025-11-01",
    toDate: "2025-11-01",
    totalDays: 1,
    status: "rejected",
    rejectedBy: "Warden Smith",
    rejectionReason: "Not enough prior notice for non-emergency leave.",
  },
  {
    id: 4,
    reason: "Doctor Visit",
    describe: "Follow-up appointment with specialist.",
    leaveType: "Medical Leave",
    fromDate: "2025-10-20",
    toDate: "2025-10-20",
    totalDays: 1,
    status: "approved",
    approvedBy: "Prof. Eleanor",
    approvedAt: "2025-10-18T14:00:00Z",
  },
];

// --- Status Badge Component ---
const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    approved: "bg-green-100 text-green-800 border-green-300",
    rejected: "bg-red-100 text-red-800 border-red-300",
  };
  const icons = {
    pending: <AlertCircle className="w-4 h-4" />,
    approved: <CheckCircle className="w-4 h-4" />,
    rejected: <XCircle className="w-4 h-4" />,
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border ${
        styles[status] || ""
      }`}
    >
      {icons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// --- Detail Modal Component ---
const LeaveDetailModal = ({ leave, onClose }) => {
  if (!leave) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-auto max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Leave Details</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-6 mt-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {leave.reason}
                </h3>
                <p className="text-gray-600">{leave.leaveType}</p>
              </div>
              <StatusBadge status={leave.status} />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-500">From Date</p>
                  <p className="text-md font-semibold text-gray-800">
                    {new Date(leave.fromDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-500">To Date</p>
                  <p className="text-md font-semibold text-gray-800">
                    {new Date(leave.toDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Days
                  </p>
                  <p className="text-md font-semibold text-gray-800">
                    {leave.totalDays}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-500">Description</p>
                <p className="text-md text-gray-800">{leave.describe}</p>
              </div>
            </div>

            {/* Approval/Rejection Info */}
            {leave.status === "approved" && (
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium text-green-700">
                    Approved By
                  </p>
                  <p className="text-md font-semibold text-green-800">
                    {leave.approvedBy}
                  </p>
                  <p className="text-xs text-gray-600">
                    On: {new Date(leave.approvedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            {leave.status === "rejected" && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium text-red-700">
                    Rejected By
                  </p>
                  <p className="text-md font-semibold text-red-800">
                    {leave.rejectedBy}
                  </p>
                  <p className="text-sm font-medium text-red-700 mt-2">
                    Rejection Reason
                  </p>
                  <p className="text-md text-red-800">
                    {leave.rejectionReason}
                  </p>
                </div>
              </div>
            )}

            {leave.status === "pending" && (
              <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium text-yellow-700">
                    Pending Approval
                  </p>
                  <p className="text-md text-yellow-800">
                    Your request is currently being reviewed by the
                    administration.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer with Actions */}
        <div className="flex justify-end gap-3 p-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-100 transition-all"
          >
            Close
          </button>
          {leave.status === "approved" && (
            <>
              <button className="flex items-center justify-center gap-2 px-5 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-all">
                <QrCode className="w-5 h-5" />
                <span>Show QR</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all">
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const LeaveHistoryPage = ({ onBackClick }) => {
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredLeaves = mockLeaveHistory.filter((leave) =>
    activeFilter === "all" ? true : leave.status === activeFilter
  );

  const filters = ["all", "pending", "approved", "rejected"];

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-300">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              My Leave History
            </h1>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors
                    ${
                      activeFilter === filter
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Leave List */}
          <div className="space-y-4">
            {filteredLeaves.length > 0 ? (
              filteredLeaves.map((leave) => (
                <div
                  key={leave.id}
                  onClick={() => setSelectedLeave(leave)}
                  className="p-4 border border-gray-200 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {leave.reason}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(leave.fromDate).toLocaleDateString()} -{" "}
                      {new Date(leave.toDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <StatusBadge status={leave.status} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">
                No leave applications found for this filter.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedLeave && (
        <LeaveDetailModal
          leave={selectedLeave}
          onClose={() => setSelectedLeave(null)}
        />
      )}
    </>
  );
};

export default LeaveHistoryPage;
