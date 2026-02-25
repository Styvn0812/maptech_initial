import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line } from
'recharts';
import { Download, Calendar } from 'lucide-react';
const completionData = [
{
  name: 'Completed',
  value: 450
},
{
  name: 'In Progress',
  value: 300
},
{
  name: 'Not Started',
  value: 150
}];

const COLORS = ['#22c55e', '#eab308', '#94a3b8'];
const monthlyTrends = [
{
  name: 'Jan',
  enrollments: 40,
  completions: 24
},
{
  name: 'Feb',
  enrollments: 30,
  completions: 13
},
{
  name: 'Mar',
  enrollments: 20,
  completions: 58
},
{
  name: 'Apr',
  enrollments: 27,
  completions: 39
},
{
  name: 'May',
  enrollments: 18,
  completions: 48
},
{
  name: 'Jun',
  enrollments: 23,
  completions: 38
}];

const coursePopularity = [
{
  name: 'Cybersecurity',
  students: 120
},
{
  name: 'Leadership',
  students: 98
},
{
  name: 'Safety',
  students: 86
},
{
  name: 'Privacy',
  students: 75
},
{
  name: 'Customer Svc',
  students: 65
}];

export function ReportsAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Reports & Analytics
        </h1>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">
            <Calendar className="h-4 w-4 mr-2" />
            Last 6 Months
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completion Status Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Overall Completion Status
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value">

                  {completionData.map((entry, index) =>
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]} />

                  )}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trends Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Enrollment vs Completion Trends
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrends}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0" />

                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="enrollments"
                  stroke="#22c55e"
                  strokeWidth={2} />

                <Line
                  type="monotone"
                  dataKey="completions"
                  stroke="#3b82f6"
                  strokeWidth={2} />

              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Popularity Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Most Popular Courses
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coursePopularity} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                  stroke="#e2e8f0" />

                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={150}
                  axisLine={false}
                  tickLine={false} />

                <Tooltip />
                <Bar
                  dataKey="students"
                  fill="#22c55e"
                  radius={[0, 4, 4, 0]}
                  barSize={30} />

              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>);

}