import React, { useState } from 'react';
import {
  Search,
  UserPlus,
  Filter,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle } from
'lucide-react';
interface Enrollment {
  id: number;
  employeeName: string;
  courseTitle: string;
  department: string;
  enrolledDate: string;
  progress: number;
  status: 'Completed' | 'In Progress' | 'Not Started';
}
const initialEnrollments: Enrollment[] = [
{
  id: 1,
  employeeName: 'Juan Dela Cruz',
  courseTitle: 'Cybersecurity Fundamentals',
  department: 'IT',
  enrolledDate: '2025-01-15',
  progress: 100,
  status: 'Completed'
},
{
  id: 2,
  employeeName: 'Maria Santos',
  courseTitle: 'Leadership Training 101',
  department: 'HR',
  enrolledDate: '2025-02-01',
  progress: 45,
  status: 'In Progress'
},
{
  id: 3,
  employeeName: 'Antonio Luna',
  courseTitle: 'Workplace Safety',
  department: 'Marketing',
  enrolledDate: '2025-02-10',
  progress: 0,
  status: 'Not Started'
},
{
  id: 4,
  employeeName: 'Elena Reyes',
  courseTitle: 'Data Privacy Compliance',
  department: 'Finance',
  enrolledDate: '2025-01-20',
  progress: 80,
  status: 'In Progress'
},
{
  id: 5,
  employeeName: 'Gabriela Silang',
  courseTitle: 'Cybersecurity Fundamentals',
  department: 'IT',
  enrolledDate: '2025-01-15',
  progress: 100,
  status: 'Completed'
}];

export function EnrollmentManagement() {
  const [enrollments, setEnrollments] =
  useState<Enrollment[]>(initialEnrollments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch =
    enrollment.employeeName.
    toLowerCase().
    includes(searchTerm.toLowerCase()) ||
    enrollment.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
    statusFilter === 'All' || enrollment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    alert('Enrollment successful!');
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">
          Enrollment Management
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">

          <UserPlus className="h-4 w-4 mr-2" />
          New Enrollment
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
            placeholder="Search employee or course..."
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
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Not Started">Not Started</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Enrolled Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredEnrollments.map((enrollment) =>
              <tr
                key={enrollment.id}
                className="hover:bg-slate-50 transition-colors">

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">
                      {enrollment.employeeName}
                    </div>
                    <div className="text-xs text-slate-500">
                      {enrollment.department}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {enrollment.courseTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {enrollment.enrolledDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-slate-200 rounded-full h-2.5 max-w-[100px]">
                      <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{
                        width: `${enrollment.progress}%`
                      }}>
                    </div>
                    </div>
                    <span className="text-xs text-slate-500 mt-1">
                      {enrollment.progress}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${enrollment.status === 'Completed' ? 'bg-green-100 text-green-800' : enrollment.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-slate-100 text-slate-800'}`}>

                      {enrollment.status === 'Completed' &&
                    <CheckCircle className="h-3 w-3 mr-1" />
                    }
                      {enrollment.status === 'In Progress' &&
                    <Clock className="h-3 w-3 mr-1" />
                    }
                      {enrollment.status === 'Not Started' &&
                    <AlertCircle className="h-3 w-3 mr-1" />
                    }
                      {enrollment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enrollment Modal */}
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
                <h3 className="text-lg leading-6 font-medium text-slate-900 mb-4">
                  New Enrollment
                </h3>
                <form onSubmit={handleEnroll} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Select Employee(s)
                    </label>
                    <select className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                      <option>Juan Dela Cruz</option>
                      <option>Maria Santos</option>
                      <option>All IT Department</option>
                      <option>All Employees</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Select Course
                    </label>
                    <select className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                      <option>Cybersecurity Fundamentals</option>
                      <option>Leadership Training 101</option>
                      <option>Workplace Safety</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Due Date (Optional)
                    </label>
                    <input
                    type="date"
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />

                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm">

                      Enroll User
                    </button>
                    <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
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