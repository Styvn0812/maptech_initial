import React from 'react';
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle,
  PlayCircle,
  ArrowRight } from
'lucide-react';
const myCourses = [
{
  id: 1,
  title: 'Cybersecurity Fundamentals',
  progress: 75,
  nextLesson: 'Phishing Attacks',
  thumbnail: 'bg-blue-500'
},
{
  id: 2,
  title: 'Leadership Training 101',
  progress: 30,
  nextLesson: 'Effective Communication',
  thumbnail: 'bg-purple-500'
},
{
  id: 3,
  title: 'Data Privacy Compliance',
  progress: 0,
  nextLesson: 'Introduction to GDPR',
  thumbnail: 'bg-green-500'
}];

const upcomingDeadlines = [
{
  id: 1,
  title: 'Cybersecurity Quiz',
  date: 'Due Tomorrow',
  type: 'Quiz'
},
{
  id: 2,
  title: 'Leadership Reflection',
  date: 'Due in 3 days',
  type: 'Assignment'
}];

export function EmployeeDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, Juan! 👋
          </h1>
          <p className="text-slate-500 mt-1">
            You have 2 courses in progress and 1 upcoming deadline.
          </p>
        </div>
        <div className="hidden sm:block">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
            Resume Learning
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-full">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">
                Assigned Courses
              </p>
              <p className="text-2xl font-bold text-slate-900">5</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Completed</p>
              <p className="text-2xl font-bold text-slate-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-50 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">In Progress</p>
              <p className="text-2xl font-bold text-slate-900">2</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 rounded-full">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Certificates</p>
              <p className="text-2xl font-bold text-slate-900">3</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Courses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">
              My Current Courses
            </h2>
            <button className="text-sm text-green-600 font-medium hover:text-green-700">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {myCourses.map((course) =>
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow">

                <div
                className={`w-full sm:w-32 h-24 ${course.thumbnail} rounded-md flex-shrink-0 flex items-center justify-center`}>

                  <PlayCircle className="h-10 w-10 text-white opacity-75" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {course.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Next: {course.nextLesson}
                    </p>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>{course.progress}% Complete</span>
                      <span>
                        {course.progress === 100 ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${course.progress}%`
                      }}>
                    </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end sm:justify-center">
                  <button className="px-4 py-2 bg-slate-50 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-100 border border-slate-200">
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          {/* Deadlines */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Upcoming Deadlines
            </h3>
            <div className="space-y-4">
              {upcomingDeadlines.map((item) =>
              <div
                key={item.id}
                className="flex items-start p-3 bg-red-50 rounded-md border border-red-100">

                  <Clock className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-slate-900">
                      {item.title}
                    </p>
                    <p className="text-xs text-red-600 mt-1">
                      {item.date} • {item.type}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Achievement */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center mb-4">
              <Award className="h-8 w-8 text-yellow-300" />
              <h3 className="ml-3 text-lg font-bold">Latest Achievement</h3>
            </div>
            <p className="text-green-50 mb-4">
              You've earned the "Safety First" badge for completing Workplace
              Safety training!
            </p>
            <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-md text-sm font-medium transition-colors backdrop-blur-sm">
              View Certificates
            </button>
          </div>
        </div>
      </div>
    </div>);

}