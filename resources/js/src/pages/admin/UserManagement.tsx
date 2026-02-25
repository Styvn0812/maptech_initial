import React, { useState } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Filter,
  MoreVertical,
  X } from
'lucide-react';
interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  role: 'Admin' | 'Instructor' | 'Employee';
  status: 'Active' | 'Inactive';
  coursesEnrolled: number;
}
const initialEmployees: Employee[] = [
{
  id: 1,
  name: 'Juan Dela Cruz',
  email: 'juan.delacruz@maptech.com',
  department: 'IT',
  role: 'Employee',
  status: 'Active',
  coursesEnrolled: 4
},
{
  id: 2,
  name: 'Maria Santos',
  email: 'maria.santos@maptech.com',
  department: 'HR',
  role: 'Employee',
  status: 'Active',
  coursesEnrolled: 2
},
{
  id: 3,
  name: 'Prof. Ana Reyes',
  email: 'ana.reyes@maptech.com',
  department: 'IT',
  role: 'Instructor',
  status: 'Active',
  coursesEnrolled: 0
},
{
  id: 4,
  name: 'Jose Rizal',
  email: 'jose.rizal@maptech.com',
  department: 'Operations',
  role: 'Admin',
  status: 'Active',
  coursesEnrolled: 0
},
{
  id: 5,
  name: 'Elena Reyes',
  email: 'elena.reyes@maptech.com',
  department: 'Finance',
  role: 'Employee',
  status: 'Inactive',
  coursesEnrolled: 1
},
{
  id: 6,
  name: 'Antonio Luna',
  email: 'antonio.luna@maptech.com',
  department: 'Marketing',
  role: 'Employee',
  status: 'Active',
  coursesEnrolled: 3
},
{
  id: 7,
  name: 'Gabriela Silang',
  email: 'gabriela.silang@maptech.com',
  department: 'IT',
  role: 'Employee',
  status: 'Active',
  coursesEnrolled: 5
},
{
  id: 8,
  name: 'Andres Bonifacio',
  email: 'andres.bonifacio@maptech.com',
  department: 'Operations',
  role: 'Instructor',
  status: 'Active',
  coursesEnrolled: 0
},
{
  id: 9,
  name: 'Teresa Magbanua',
  email: 'teresa.magbanua@maptech.com',
  department: 'HR',
  role: 'Employee',
  status: 'Inactive',
  coursesEnrolled: 0
}];

export function UserManagement() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  // Filter Logic
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept =
    departmentFilter === 'All' || emp.department === departmentFilter;
    return matchesSearch && matchesDept;
  });
  // Delete Handler
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };
  // Modal Handlers
  const handleOpenModal = (employee?: Employee) => {
    if (employee) {
      setEditingEmployee(employee);
    } else {
      setEditingEmployee(null);
    }
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };
  // Form Submit Handler (Mock)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd gather form data here
    handleCloseModal();
    alert('User saved successfully!');
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">

          <Plus className="h-4 w-4 mr-2" />
          Add Employee
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
            placeholder="Search by name or email..."
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
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}>

              <option value="All">All Departments</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Operations">Operations</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
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
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">

                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">

                  Department
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">

                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">

                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">

                  Enrolled
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredEmployees.map((employee) =>
              <tr
                key={employee.id}
                className="hover:bg-slate-50 transition-colors">

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                          {employee.name.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">
                          {employee.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          {employee.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">
                      {employee.department}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${employee.role === 'Admin' ? 'bg-purple-100 text-purple-800' : employee.role === 'Instructor' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'}`}>

                      {employee.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>

                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {employee.coursesEnrolled} Courses
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                      onClick={() => handleOpenModal(employee)}
                      className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded">

                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                      onClick={() => handleDelete(employee.id)}
                      className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded">

                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
                    {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
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
                      Full Name
                    </label>
                    <input
                    type="text"
                    defaultValue={editingEmployee?.name}
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />

                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Email
                    </label>
                    <input
                    type="email"
                    defaultValue={editingEmployee?.email}
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />

                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">
                        Department
                      </label>
                      <select
                      defaultValue={editingEmployee?.department}
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
                        Role
                      </label>
                      <select
                      defaultValue={editingEmployee?.role}
                      className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">

                        <option>Employee</option>
                        <option>Instructor</option>
                        <option>Admin</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                    type="checkbox"
                    defaultChecked={editingEmployee?.status === 'Active'}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-slate-300 rounded" />

                    <label className="ml-2 block text-sm text-slate-900">
                      Active Account
                    </label>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm">

                      Save
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