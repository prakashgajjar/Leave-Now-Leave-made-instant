import React from 'react';
import { 
  ClipboardPenLine, 
  History, 
  CheckSquare, 
  Database, 
  Users, 
  User,
  Bell,
  CalendarDays,  // Added for "Upcoming Leave"
  BarChart,        // Added for "Analytics"
  CheckCircle,     // Added for "Approved" status
  XCircle,         // Added for "Rejected" status
  AlertCircle,     // Added for "Pending" status
  ArrowRight,      // Added for links
  PieChart,         // Added for "Leave Balance"
  QrCode,          // Added for QR Code button
  Download         // Added for Download button
} from 'lucide-react';

/**
 * --- Reusable Progress Bar Component ---
 * A small component for the "Leave Balance" card.
 */
const LeaveProgressBar = ({ label, used, total, color = 'bg-green-600' }) => {
  const percentage = (used / total) * 100;
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-800">{used} / {total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className={`h-2.5 rounded-full ${color} transition-all duration-500`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};


/**
 * --- Student Dashboard Component ---
 * This is the view the student sees after logging in.
 */
const StudentDashboard = () => {
  // Mock data for demonstration
  const stats = [
    { name: 'Pending Applications', value: '1', icon: AlertCircle, color: 'text-yellow-600' },
    { name: 'Approved Leaves', value: '4', icon: CheckCircle, color: 'text-green-600' },
    { name: 'Total Leaves Taken', value: '5', icon: Database, color: 'text-blue-600' },
  ];
  const recentActivity = [
    { id: 1, reason: 'Family Event', type: 'Casual Leave', dates: 'Nov 10 - Nov 12, 2025', status: 'Approved', icon: CheckCircle, statusColor: 'text-green-700' },
    { id: 2, reason: 'Medical Checkup', type: 'Medical Leave', dates: 'Nov 14, 2025', status: 'Pending', icon: AlertCircle, statusColor: 'text-yellow-700' },
    { id: 3, reason: 'Personal Time', type: 'Casual Leave', dates: 'Nov 01, 2025', status: 'Rejected', icon: XCircle, statusColor: 'text-red-700' },
  ];

  return (
    <div className="space-y-6">
      
      {/* --- 1. Welcome Banner --- */}
      <div className="p-6 sm:p-8 text-zinc-800 rounded-xl shadow-lg bg-gray-50">
        <h1 className="text-3xl text-zinc-800 font-bold">Welcome back, Alex!</h1>
        <p className="mt-2 text-lg text-zinc-800 max-w-2xl">
          Ready to apply for your next leave or check on your application status? 
          Everything you need is right here.
        </p>
        <div className="mt-6">
          <a 
            href="/apply" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-green-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
          >
            <ClipboardPenLine className="w-5 h-5" />
            <span>Apply for a New Leave</span>
          </a>
        </div>
      </div>

      {/* --- 2. Main Dashboard Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- 2a. Main Content (Full Width) --- */}
        <div className="lg:col-span-3 space-y-6"> {/* MODIFIED: Changed to col-span-3 */}
          
          {/* Stats Grid */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">At a Glance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.name} className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 flex items-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <stat.icon className={`w-10 h-10 ${stat.color}`} />
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm font-medium text-gray-600">{stat.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MODIFIED: Recent Leave Status */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Bell className="w-6 h-6" />
              Recent Leave Status
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300">
              <ul className="divide-y divide-gray-200">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center hover:bg-gray-50 transition-colors rounded-md -mx-4 px-4">
                    {/* Details */}
                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                      <activity.icon className={`w-8 h-8 ${activity.statusColor} flex-shrink-0`} />
                      <div>
                        <h3 className="font-semibold text-gray-800">{activity.reason}</h3>
                        <p className="text-sm text-gray-600">{activity.type} | {activity.dates}</p>
                      </div>
                    </div>
                    
                    {/* Status & Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        activity.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        activity.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {activity.status}
                      </span>
                      
                      {/* Conditional Buttons */}
                      {activity.status === 'Approved' && (
                        <>
                          <button title="Generate QR Code" className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors">
                            <QrCode className="w-5 h-5" />
                          </button>
                          <button title="Download PDF" className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-100 rounded-full transition-colors">
                            <Download className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* --- 2b. Sidebar (Right) --- DELETED --- */}
        
      </div>
    </div>
  );
};

/**
 * --- Teacher (Admin) Dashboard Component ---
 * This is the view the teacher/admin sees after logging in.
 */
const TeacherDashboard = () => {
  // Mock data for demonstration
  const stats = [
    { name: 'Pending Approvals', value: '3', icon: AlertCircle, color: 'text-orange-600' },
    { name: 'Active Students', value: '120', icon: Users, color: 'text-blue-600' },
    { name: 'Total Staff', value: '15', icon: User, color: 'text-indigo-600' },
  ];
  const pendingRequests = [
    { id: 1, name: 'Alex Johnson', days: '2 days', reason: 'Family Event', date: 'Nov 10-12' },
    { id: 2, name: 'Maria Garcia', days: '1 day', reason: 'Medical Checkup', date: 'Nov 11' },
    { id: 3, name: 'David Lee', days: '5 days', reason: 'Personal Time', date: 'Nov 15-20' },
  ];
  // Data for the analytics chart
  const analyticsData = [
    { label: 'Mon', value: 5 },
    { label: 'Tue', value: 8 },
    { label: 'Wed', value: 3 },
    { label: 'Thu', value: 10 },
    { label: 'Fri', value: 7 },
  ];
  const maxAnalyticsValue = Math.max(...analyticsData.map(d => d.value));

  return (
    <div className="space-y-6">
      
      {/* --- 1. Welcome Banner --- */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-indigo-600 to-blue-800 rounded-xl shadow-lg text-white">
        <h1 className="text-3xl font-bold">Welcome, Prof. Eleanor!</h1>
        <p className="mt-2 text-lg text-blue-100 max-w-2xl">
          You have <span className="font-bold text-white bg-orange-500 px-2 py-0.5 rounded-md">{stats[0].value} pending requests</span> to review.
        </p>
        <div className="mt-6">
          <a 
            href="/admin/approve" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
          >
            <CheckSquare className="w-5 h-5" />
            <span>Review Pending Requests</span>
          </a>
        </div>
      </div>

      {/* --- 2. Stats Grid --- */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Admin Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 flex items-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <stat.icon className={`w-10 h-10 ${stat.color}`} />
              <div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm font-medium text-gray-600">{stat.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* --- 3. Main Dashboard Grid (Requests & Analytics) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- 3a. Recent Pending Requests (Left, larger) --- */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Bell className="w-6 h-6" />
            Recent Pending Requests
          </h2>
          <div className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {pendingRequests.map((req) => (
                <li key={req.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-gray-50 transition-colors rounded-md px-2 -mx-2">
                  <div className="mb-2 sm:mb-0">
                    <div className="font-semibold text-gray-800">{req.name}</div>
                    <div className="text-sm text-gray-600">
                      {req.reason} - <span className="font-medium text-indigo-600">{req.days}</span>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <CalendarDays className="w-3 h-3" />
                      {req.date}
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex gap-2">
                    <button className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-md hover:bg-green-200 transition-colors">Approve</button>
                    <button className="px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-md hover:bg-red-200 transition-colors">Reject</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-4 bg-gray-100 border-t border-gray-300"> {/* Changed background */}
              <a href="/admin/approve" className="text-blue-700 hover:text-blue-900 font-semibold text-sm flex items-center gap-1"> {/* Darker text */}
                View All Pending Requests <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* --- 3b. Analytics & Quick Actions (Right) --- */}
        <div className="lg:col-span-1 space-y-6">

          {/* NEW: Analytics Chart Card */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart className="w-6 h-6" />
              Leave Analytics
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300">
              <h3 className="text-md font-semibold text-gray-700">Requests This Week</h3>
              <div className="h-48 mt-4 flex items-end justify-between gap-2">
                {analyticsData.map((item) => (
                  <div key={item.label} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className="w-full bg-blue-600 rounded-t-md hover:bg-blue-700 transition-all" // Darker blue
                      style={{ height: `${(item.value / maxAnalyticsValue) * 100}%` }}
                      title={`${item.label}: ${item.value} requests`}
                    ></div>
                    <span className="text-xs font-medium text-gray-600">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* NEW: Quick Actions Card */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-300 space-y-2">
              <a href="/admin/records" className="flex items-center gap-3 p-3 text-gray-800 font-medium hover:bg-gray-100 rounded-lg transition-colors"> {/* Darker text */}
                <Database className="w-5 h-5 text-indigo-700" /> {/* Darker icon color */}
                <span>All Leave Records</span>
              </a>
              <a href="/admin/staff" className="flex items-center gap-3 p-3 text-gray-800 font-medium hover:bg-gray-100 rounded-lg transition-colors"> {/* Darker text */}
                <Users className="w-5 h-5 text-indigo-700" /> {/* Darker icon color */}
                <span>Manage Staff & Students</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

/**
 * --- Main Home Page Container ---
 * This component conditionally renders the correct dashboard.
 */
const HomePage = ({ userRole }) => {
  return (
    <div className="max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-8">
      {userRole === 'TEACHER' ? <TeacherDashboard /> : <StudentDashboard />}
    </div>
  );
};

export default HomePage;

