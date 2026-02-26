import {
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Plus,
  Bell,
  UserPlus } from
'lucide-react';
import * as recharts from
'recharts';
const completionData = [
{
  name: 'Jan',
  rate: 65
},
{
  name: 'Feb',
  rate: 68
},
{
  name: 'Mar',
  rate: 75
},
{
  name: 'Apr',
  rate: 72
},
{
  name: 'May',
  rate: 80
},
{
  name: 'Jun',
  rate: 85
}];

const departmentData = [
{
  name: 'IT',
  completed: 45,
  assigned: 50
},
{
  name: 'HR',
  completed: 28,
  assigned: 35
},
{
  name: 'Ops',
  completed: 60,
  assigned: 75
},
{
  name: 'Finance',
  completed: 32,
  assigned: 40
},
{
  name: 'Marketing',
  completed: 25,
  assigned: 30
}];

const recentActivity = [
{
  id: 1,
  user: 'Maria Santos',
  action: 'Completed Course',
  target: 'Cybersecurity Fundamentals',
  time: '2 hours ago'
},
{
  id: 2,
  user: 'Juan Dela Cruz',
  action: 'Passed Quiz',
  target: 'Data Privacy Module 1',
  time: '4 hours ago'
},
{
  id: 3,
  user: 'Admin User',
  action: 'Created Course',
  target: 'Leadership Training 101',
  time: '1 day ago'
},
{
  id: 4,
  user: 'Elena Reyes',
  action: 'Enrolled',
  target: 'Workplace Safety',
  time: '1 day ago'
}];

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard Overview
        </h1>
        <div className="text-sm text-slate-500">
          Last updated: Today, 2:30 PM
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Employees
              </p>
              <p className="text-2xl font-bold text-slate-900">248</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12%
            </span>
            <span className="text-slate-400 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Active Courses
              </p>
              <p className="text-2xl font-bold text-slate-900">32</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +5
            </span>
            <span className="text-slate-400 ml-2">new this month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Completion Rate
              </p>
              <p className="text-2xl font-bold text-slate-900">78%</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +3.2%
            </span>
            <span className="text-slate-400 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Avg Quiz Score
              </p>
              <p className="text-2xl font-bold text-slate-900">82%</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-full">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-500 font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 rotate-180" />
              -1.5%
            </span>
            <span className="text-slate-400 ml-2">from last month</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Course Completion Trends
          </h3>
          <div className="h-80">
            <recharts.ResponsiveContainer width="100%" height="100%">
              <recharts.AreaChart data={completionData}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <recharts.CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0" />

                <recharts.XAxis dataKey="name" axisLine={false} tickLine={false} />
                <recharts.YAxis axisLine={false} tickLine={false} />
                <recharts.Tooltip />
                <recharts.Area
                  type="monotone"
                  dataKey="rate"
                  stroke="#22c55e"
                  fillOpacity={1}
                  fill="url(#colorRate)" />

              </recharts.AreaChart>
            </recharts.ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Department Performance
          </h3>
          <div className="h-80">
            <recharts.ResponsiveContainer width="100%" height="100%">
              <recharts.BarChart data={departmentData}>
                <recharts.CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0" />

                <recharts.XAxis dataKey="name" axisLine={false} tickLine={false} />
                <recharts.YAxis axisLine={false} tickLine={false} />
                <recharts.Tooltip />
                <recharts.Legend />
                <recharts.Bar
                  dataKey="completed"
                  fill="#22c55e"
                  name="Completed"
                  radius={[4, 4, 0, 0]} />

                <recharts.Bar
                  dataKey="assigned"
                  fill="#e2e8f0"
                  name="Assigned"
                  radius={[4, 4, 0, 0]} />

              </recharts.BarChart>
            </recharts.ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section: Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900">
              Recent Activity
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Target
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {recentActivity.map((activity) =>
                <tr
                  key={activity.id}
                  className="hover:bg-slate-50 transition-colors">

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {activity.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {activity.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {activity.target}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      {activity.time}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-100 text-center">
            <button className="text-sm text-green-600 font-medium hover:text-green-700">
              View All Activity
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center p-3 text-left rounded-lg border border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all group">
              <div className="p-2 bg-green-100 rounded-md group-hover:bg-green-200">
                <BookOpen className="h-5 w-5 text-green-700" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-900">
                  Create New Course
                </p>
                <p className="text-xs text-slate-500">
                  Add a new training module
                </p>
              </div>
            </button>

            <button className="w-full flex items-center p-3 text-left rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group">
              <div className="p-2 bg-blue-100 rounded-md group-hover:bg-blue-200">
                <UserPlus className="h-5 w-5 text-blue-700" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-900">
                  Add Employee
                </p>
                <p className="text-xs text-slate-500">Register a new user</p>
              </div>
            </button>

            <button className="w-full flex items-center p-3 text-left rounded-lg border border-slate-200 hover:border-purple-500 hover:bg-purple-50 transition-all group">
              <div className="p-2 bg-purple-100 rounded-md group-hover:bg-purple-200">
                <Bell className="h-5 w-5 text-purple-700" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-900">
                  Send Notification
                </p>
                <p className="text-xs text-slate-500">Alert all employees</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>);

}
