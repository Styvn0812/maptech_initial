import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid } from
'recharts';
import { Clock, Award, CheckCircle, TrendingUp } from 'lucide-react';
const progressData = [
{
  name: 'Completed',
  value: 3
},
{
  name: 'In Progress',
  value: 2
},
{
  name: 'Not Started',
  value: 1
}];

const COLORS = ['#22c55e', '#eab308', '#94a3b8'];
const timeSpentData = [
{
  name: 'Mon',
  hours: 2.5
},
{
  name: 'Tue',
  hours: 1.0
},
{
  name: 'Wed',
  hours: 3.5
},
{
  name: 'Thu',
  hours: 0.5
},
{
  name: 'Fri',
  hours: 4.0
},
{
  name: 'Sat',
  hours: 1.5
},
{
  name: 'Sun',
  hours: 0
}];

const quizScores = [
{
  name: 'Cybersecurity',
  score: 85
},
{
  name: 'Leadership',
  score: 92
},
{
  name: 'Safety',
  score: 100
},
{
  name: 'Privacy',
  score: 78
}];

export function MyProgress() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">
        My Learning Progress
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 flex items-center">
          <div className="p-3 bg-green-50 rounded-full">
            <Clock className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-slate-500">
              Total Learning Time
            </p>
            <p className="text-2xl font-bold text-slate-900">12h 45m</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 flex items-center">
          <div className="p-3 bg-blue-50 rounded-full">
            <Award className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-slate-500">
              Avg. Quiz Score
            </p>
            <p className="text-2xl font-bold text-slate-900">88%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 flex items-center">
          <div className="p-3 bg-purple-50 rounded-full">
            <CheckCircle className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-slate-500">
              Modules Completed
            </p>
            <p className="text-2xl font-bold text-slate-900">24</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Status Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Course Status Overview
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={progressData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value">

                  {progressData.map((entry, index) =>
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]} />

                  )}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {progressData.map((entry, index) =>
            <div
              key={entry.name}
              className="flex items-center text-sm text-slate-600">

                <div
                className="w-3 h-3 rounded-full mr-2"
                style={{
                  backgroundColor: COLORS[index]
                }}>
              </div>
                {entry.name}
              </div>
            )}
          </div>
        </div>

        {/* Learning Activity Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Weekly Learning Activity
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeSpentData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0" />

                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar
                  dataKey="hours"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                  name="Hours" />

              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quiz Performance */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Quiz Performance History
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quizScores} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                  stroke="#e2e8f0" />

                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={150}
                  axisLine={false}
                  tickLine={false} />

                <Tooltip />
                <Bar
                  dataKey="score"
                  fill="#3b82f6"
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                  name="Score (%)">

                  {quizScores.map((entry, index) =>
                  <Cell
                    key={`cell-${index}`}
                    fill={
                    entry.score >= 90 ?
                    '#22c55e' :
                    entry.score >= 75 ?
                    '#3b82f6' :
                    '#ef4444'
                    } />

                  )}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>);

}