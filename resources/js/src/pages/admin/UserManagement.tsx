import React, { useEffect, useState } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Filter,
  X } from
'lucide-react';
interface Employee {
  id: number;
  name: string;
  username: string;
  email: string;
  role: 'Admin' | 'Instructor' | 'Employee';
  status: 'Active' | 'Inactive';
  isGoogleVerified: boolean;
  coursesEnrolled: number;
}

interface UserApiItem {
  id: number;
  name: string;
  username: string;
  email: string;
  role: 'admin' | 'instructor' | 'employee';
  status: 'active' | 'inactive' | 'pending';
  is_google_verified: boolean;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'instructor' | 'employee';
  isActive: boolean;
}

const defaultFormData: FormData = {
  name: '',
  email: '',
  password: '',
  role: 'employee',
  isActive: true,
};

const mapRole = (role: UserApiItem['role']): Employee['role'] => {
  if (role === 'admin') return 'Admin';
  if (role === 'instructor') return 'Instructor';
  return 'Employee';
};

const mapStatus = (status: UserApiItem['status']): Employee['status'] => {
  if (status === 'active') return 'Active';
  return 'Inactive';
};

export function UserManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Roles');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return '';
  };

  const loadUsers = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/admin/users', {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load users');
      }

      const data: UserApiItem[] = await response.json();
      const mapped: Employee[] = data.map((user) => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: mapRole(user.role),
        status: mapStatus(user.status),
        isGoogleVerified: user.is_google_verified,
        coursesEnrolled: 0,
      }));

      setEmployees(mapped);
    } catch (loadError) {
      setError('Failed to load users. Please refresh and try again.');
      console.error(loadError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);
  // Filter Logic
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept =
    departmentFilter === 'All Roles' || emp.role === departmentFilter;
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
      setFormData(defaultFormData);
    }
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
    setFormData(defaultFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEmployee) {
      alert('Edit is not connected yet.');
      return;
    }

    try {
      await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        credentials: 'include',
      });

      const xsrfToken = getCookie('XSRF-TOKEN');

      const response = await fetch('http://127.0.0.1:8000/admin/users', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken || ''),
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          is_active: formData.isActive,
        }),
      });

      if (!response.ok) {
        const payload = await response.json();
        const firstError = payload?.errors ? Object.values(payload.errors)[0] : null;
        const firstMessage = Array.isArray(firstError) ? firstError[0] : payload?.message;
        throw new Error(firstMessage || 'Failed to create user');
      }

      await loadUsers();
      alert('User account created successfully.');
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : 'Failed to save user';
      alert(message);
    }

    handleCloseModal();
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">

          <Plus className="h-4 w-4 mr-2" />
          Add Account
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

              <option value="All Roles">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Instructor">Instructor</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
        </div>
      </div>

      {loading && <div className="text-sm text-slate-500">Loading users...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

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

                  Account
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
                      {employee.username}
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
                    <div className="text-xs text-slate-500 mt-1">
                      {employee.isGoogleVerified ? 'Google Verified' : 'Google Not Verified'}
                    </div>
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
                    {editingEmployee ? 'Edit Account' : 'Add New Account'}
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
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />

                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Email
                    </label>
                    <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />

                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Password
                    </label>
                    <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    required
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />

                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">
                        Role
                      </label>
                      <select
                      value={formData.role}
                      onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value as 'admin' | 'instructor' | 'employee' }))}
                      className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">

                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                        <option value="instructor">Instructor</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                    id="activeAccount"
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-slate-300 rounded" />

                    <label htmlFor="activeAccount" className="ml-2 block text-sm text-slate-900">
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
