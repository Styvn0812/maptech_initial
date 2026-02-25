import React, { useState } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Filter,
  MoreVertical,
  BookOpen,
  Users,
  FileText,
  X } from
'lucide-react';
interface Course {
  id: number;
  title: string;
  description: string;
  department: string;
  instructor: string;
  status: 'Active' | 'Draft' | 'Archived';
  enrolledCount: number;
  modulesCount: number;
  thumbnail: string;
}
const initialCourses: Course[] = [
{
  id: 1,
  title: 'Cybersecurity Fundamentals',
  description:
  'Learn the basics of digital security, phishing prevention, and password hygiene.',
  department: 'IT',
  instructor: 'Prof. Ana Reyes',
  status: 'Active',
  enrolledCount: 145,
  modulesCount: 8,
  thumbnail: 'bg-blue-500'
},
{
  id: 2,
  title: 'Leadership Training 101',
  description: 'Essential skills for new managers and team leaders.',
  department: 'HR',
  instructor: 'Andres Bonifacio',
  status: 'Active',
  enrolledCount: 32,
  modulesCount: 12,
  thumbnail: 'bg-purple-500'
},
{
  id: 3,
  title: 'Data Privacy Compliance',
  description: 'Understanding GDPR and local data privacy laws.',
  department: 'Operations',
  instructor: 'Prof. Ana Reyes',
  status: 'Draft',
  enrolledCount: 0,
  modulesCount: 5,
  thumbnail: 'bg-green-500'
},
{
  id: 4,
  title: 'Customer Service Excellence',
  description:
  'Techniques for handling difficult customers and ensuring satisfaction.',
  department: 'Marketing',
  instructor: 'Andres Bonifacio',
  status: 'Active',
  enrolledCount: 89,
  modulesCount: 6,
  thumbnail: 'bg-orange-500'
},
{
  id: 5,
  title: 'Workplace Safety',
  description: 'OSHA guidelines and emergency procedures.',
  department: 'Operations',
  instructor: 'Prof. Ana Reyes',
  status: 'Archived',
  enrolledCount: 210,
  modulesCount: 4,
  thumbnail: 'bg-red-500'
}];

export function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  // Filter Logic
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.
    toLowerCase().
    includes(searchTerm.toLowerCase());
    const matchesStatus =
    statusFilter === 'All' || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  // Delete Handler
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };
  // Modal Handlers
  const handleOpenModal = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
    } else {
      setEditingCourse(null);
    }
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
  };
  // Form Submit Handler (Mock)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCloseModal();
    alert('Course saved successfully!');
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Course Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">

          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
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
        <div className="sm:w-48">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-slate-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}>

              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) =>
        <div
          key={course.id}
          className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">

            <div
            className={`h-32 ${course.thumbnail} flex items-center justify-center`}>

              <BookOpen className="h-12 w-12 text-white opacity-50" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${course.status === 'Active' ? 'bg-green-100 text-green-800' : course.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-slate-100 text-slate-800'}`}>

                  {course.status}
                </span>
                <div className="flex space-x-1">
                  <button
                  onClick={() => handleOpenModal(course)}
                  className="p-1 text-slate-400 hover:text-blue-600">

                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                  onClick={() => handleDelete(course.id)}
                  className="p-1 text-slate-400 hover:text-red-600">

                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">
                {course.title}
              </h3>
              <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                {course.description}
              </p>

              <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {course.enrolledCount} Enrolled
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  {course.modulesCount} Modules
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                <div>
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    {course.department}
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Instructor: {course.instructor}
                  </p>
                </div>
                <button className="text-sm font-medium text-green-600 hover:text-green-700">
                  Manage Content &rarr;
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen &&
      <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
            className="fixed inset-0 transition-opacity"
            aria-hidden="true">

              <div className="absolute inset-0 bg-slate-500 opacity-75"></div>
            </div>
            <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">

              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-slate-900">
                    {editingCourse ? 'Edit Course' : 'Create New Course'}
                  </h3>
                  <button
                  onClick={handleCloseModal}
                  className="text-slate-400 hover:text-slate-500">

                    <X className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Course Title
                    </label>
                    <input
                    type="text"
                    defaultValue={editingCourse?.title}
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />

                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Description
                    </label>
                    <textarea
                    rows={3}
                    defaultValue={editingCourse?.description}
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />

                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">
                        Department
                      </label>
                      <select
                      defaultValue={editingCourse?.department}
                      className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">

                        <option>IT</option>
                        <option>HR</option>
                        <option>Operations</option>
                        <option>Finance</option>
                        <option>Marketing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">
                        Status
                      </label>
                      <select
                      defaultValue={editingCourse?.status}
                      className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">

                        <option>Active</option>
                        <option>Draft</option>
                        <option>Archived</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Assign Instructor
                    </label>
                    <select
                    defaultValue={editingCourse?.instructor}
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">

                      <option>Prof. Ana Reyes</option>
                      <option>Andres Bonifacio</option>
                    </select>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm">

                      Save Course
                    </button>
                    <button
                    type="button"
                    onClick={handleCloseModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:col-start-1 sm:text-sm">

                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      }
    </div>);

}