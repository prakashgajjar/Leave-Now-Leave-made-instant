"use client"
import React, { useState, useEffect } from "react";
import {
  Send,
  CalendarDays, // Changed from Calendar to CalendarDays for visual accuracy
  MessageSquare,
  User, // For Full Name
  ScrollText, // For Roll Number
  Loader2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const ApplyLeaveForm = () => {
  // --- Form States ---
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [fullName, setFullName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [reasonDescription, setReasonDescription] = useState(""); // Changed from 'description'
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isEmergency, setIsEmergency] = useState(false);
  const [notificationPreference, setNotificationPreference] =
    useState("No notifications"); // Default as per screenshot

  // --- UI States ---
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Effect to update reasonDescription when a template is selected
  useEffect(() => {
    switch (selectedTemplate) {
      case "Doctor Visit":
        setReasonDescription(
          "Applying for leave to attend a scheduled doctor's appointment."
        );
        break;
      case "Family Function":
        setReasonDescription(
          "Requesting leave to attend an important family function/event."
        );
        break;
      case "Family Emergency":
        setReasonDescription(
          "Due to an unforeseen family emergency, I need to take leave immediately."
        );
        break;
      case "Job/Internship Interview":
        setReasonDescription(
          "Requesting leave to attend a job/internship interview."
        );
        break;
      case "Custom Reason":
      default:
        if (selectedTemplate === "Custom Reason" || !selectedTemplate) {
          setReasonDescription(""); // Clear for custom or initial state
        }
        break;
    }
  }, [selectedTemplate]);

  // Calculate total days (optional, as not explicitly asked for in this design)
  // You can re-introduce totalDays state and useEffect if needed

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    // Basic validation
    if (
      !fullName ||
      !rollNumber ||
      !reasonDescription ||
      !fromDate ||
      !toDate
    ) {
      setError("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }
    if (new Date(fromDate) > new Date(toDate)) {
      setError("From Date cannot be after To Date.");
      setIsLoading(false);
      return;
    }

    const leaveData = {
      fullName,
      rollNumber,
      reason:
        selectedTemplate === "Custom Reason"
          ? "Custom"
          : selectedTemplate || "N/A",
      describe: reasonDescription,
      fromDate,
      toDate,
      isEmergency,
      notificationPreference,
      // totalDays: calculatedTotalDays, // Add if you re-introduce calculation
    };

    console.log("Submitting Leave Application:", leaveData);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate a server-side validation error for demonstration
      // if (rollNumber === '12345') {
      //   throw new Error('Invalid Roll Number. Please check your credentials.');
      // }

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(
        err.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  if (success) {
    return (
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-300 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Application Submitted!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Your leave request has been sent for approval. You can track its
            status on your dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-300">
        {/* --- Header --- */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Apply for Leave</h1>
          {/* Back button not in screenshot but good for UX, keep it or remove based on actual nav */}
          {/* <button
            onClick={onBackClick}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-200 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button> */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* --- Choose a Leave Template --- */}
          <div>
            <label className="block text-xl font-semibold text-gray-800 mb-3">
              Choose a Leave Template
            </label>
            <div className="flex flex-wrap gap-3">
              {[
                "Custom Reason",
                "Doctor Visit",
                "Family Function",
                "Family Emergency",
                "Job/Internship Interview",
              ].map((template) => (
                <button
                  key={template}
                  type="button"
                  onClick={() => setSelectedTemplate(template)}
                  className={`px-5 py-2 rounded-full border transition-all duration-200
                      ${
                        selectedTemplate === template
                          ? "bg-blue-600 text-white border-blue-600 shadow-md"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                >
                  {template}
                </button>
              ))}
            </div>
          </div>

          {/* --- Full Name --- */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-md font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* --- Roll Number --- */}
          <div>
            <label
              htmlFor="rollNumber"
              className="block text-md font-medium text-gray-700 mb-2"
            >
              Roll Number
            </label>
            <div className="relative">
              <ScrollText className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="rollNumber"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="Enter your roll number"
                required
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* --- Reason for Leave (Description) --- */}
          <div>
            <label
              htmlFor="reasonDescription"
              className="block text-md font-medium text-gray-700 mb-2"
            >
              Reason for Leave
            </label>
            <div className="relative">
              <MessageSquare className="w-5 h-5 text-gray-400 absolute left-3 top-4" />
              <textarea
                id="reasonDescription"
                value={reasonDescription}
                onChange={(e) => setReasonDescription(e.target.value)}
                rows="4"
                placeholder="Describe your reason for leave"
                required
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>

          {/* --- From & To Dates --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="fromDate"
                className="block text-md font-medium text-gray-700 mb-2"
              >
                From
              </label>
              <div className="relative">
                <CalendarDays className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date" // Use type="date" for native date picker
                  id="fromDate"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  min={today}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                When you will leave the hostel
              </p>
            </div>

            <div>
              <label
                htmlFor="toDate"
                className="block text-md font-medium text-gray-700 mb-2"
              >
                To
              </label>
              <div className="relative">
                <CalendarDays className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date" // Use type="date" for native date picker
                  id="toDate"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  min={fromDate || today}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                When you will return to the hostel
              </p>
            </div>
          </div>

          {/* --- Emergency Leave Checkbox --- */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="emergencyLeave"
              checked={isEmergency}
              onChange={(e) => setIsEmergency(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="emergencyLeave"
              className="ml-2 block text-md font-medium text-gray-900"
            >
              Emergency Leave
            </label>
            <p className="ml-4 text-sm text-gray-500">
              Check this only if this is an emergency situation requiring urgent
              approval.
            </p>
          </div>

          {/* --- Notification Preference --- */}
          <div>
            <label className="block text-md font-medium text-gray-700 mb-2">
              Notification Preference
            </label>
            <div className="space-y-2">
              {[
                "No notifications",
                "Email notifications",
                "WhatsApp notifications",
              ].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="radio"
                    id={option.replace(/\s/g, "-").toLowerCase()}
                    name="notificationPreference"
                    value={option}
                    checked={notificationPreference === option}
                    onChange={(e) => setNotificationPreference(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor={option.replace(/\s/g, "-").toLowerCase()}
                    className="ml-2 block text-sm text-gray-900"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Select how you want to receive notifications about your leave
              request status
            </p>
          </div>

          {/* --- NEW: Error Message --- */}
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-800 p-4 rounded-lg flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* --- Submit Button --- */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
                         disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              <span>
                {isLoading ? "Submitting..." : "Submit Leave Request"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeaveForm;
