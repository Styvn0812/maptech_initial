import React, { useState } from 'react';
import {
  Search,
  Filter,
  PlayCircle,
  CheckCircle,
  Clock,
  BookOpen } from
'lucide-react';
interface Course {
  id: number;
  title: string;
  description: string;
  department: string;
  progress: number;
  modulesCount: number;
  status: 'In Progress' | 'Completed' | 'Not Started';
  thumbnail: string;
}
const courses: Course[] = [
{
  id: 1,
  title: 'Cybersecurity Fundamentals',
  description:
  'Learn the basics of digital security, phishing prevention, and password hygiene.',
  department: 'IT',
  progress: 75,
  modulesCount: 8,
  status: 'In Progress',
  thumbnail: 'bg-blue-500'
},
{
  id: 2,
  title: 'Leadership Training 101',
  description: 'Essential skills for new managers and team leaders.',
  department: 'HR',
  progress: 30,
  modulesCount: 12,
  status: 'In Progress',
  thumbnail: 'bg-purple-500'
},
{
  id: 3,
  title: 'Data Privacy Compliance',
  description: 'Understanding GDPR and local data privacy laws.',
  department: 'Operations',
  progress: 0,
  modulesCount: 5,
  status: 'Not Started',
  thumbnail: 'bg-green-500'
},
{
  id: 4,
  title: 'Workplace Safety',
  description: 'OSHA guidelines and emergency procedures.',
  department: 'Operations',
  progress: 100,
  modulesCount: 4,
  status: 'Completed',
  thumbnail: 'bg-red-500'
}];

interface MyCoursesProps {
  onNavigate: (page: string) => void;
}
export function MyCourses({ onNavigate }: MyCoursesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.
    toLowerCase().
    includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || course.status === filter;
    return matchesSearch && matchesFilter;
  });
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">My Courses</h1>

        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />

          </div>

          <div className="relative w-40">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}>

              <option value="All">All Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Not Started">Not Started</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) =>
        <div
          key={course.id}
          className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">

            <div className={`h-40 ${course.thumbnail} relative`}>
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-white opacity-75" />
              </div>
              <div className="absolute top-4 right-4">
                <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-slate-800 shadow-sm`}>

                  {course.department}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
                    {course.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                  {course.description}
                </p>

                <div className="flex items-center text-xs text-slate-500 mb-4">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {course.modulesCount} Modules
                  <span className="mx-2">•</span>
                  {course.status === 'Completed' ?
                <span className="text-green-600 flex items-center font-medium">
                      <CheckCircle className="h-3 w-3 mr-1" /> Completed
                    </span> :

                <span className="text-yellow-600 flex items-center font-medium">
                      <Clock className="h-3 w-3 mr-1" /> {course.status}
                    </span>
                }
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
                  <div
                  className={`h-2 rounded-full transition-all duration-500 ${course.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                  style={{
                    width: `${course.progress}%`
                  }}>
                </div>
                </div>

                <button
                onClick={() => onNavigate('course-viewer')}
                className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${course.status === 'Completed' ? 'bg-slate-600 hover:bg-slate-700' : 'bg-green-600 hover:bg-green-700'}`}>

                  {course.status === 'Not Started' ?
                'Start Course' :
                course.status === 'Completed' ?
                'Review Course' :
                'Continue Learning'}
                  <PlayCircle className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>);

}