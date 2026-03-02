import React, { useEffect, useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  BookOpen,
  Users,
  FileText,
  X,
} from 'lucide-react';

interface CourseItem {
  id: number;
  title: string;
  description: string | null;
  department: string | null;
  subdepartment: string | null;
  status: 'active' | 'draft' | 'archived';
  created_by: number;
}

interface SubdepartmentItem {
  id: number;
  name: string;
}

interface DepartmentItem {
  id: number;
  name: string;
  subdepartments: SubdepartmentItem[];
}

interface CreateCourseForm {
  title: string;
  description: string;
  department: string;
  subdepartment: string;
  status: 'active' | 'draft' | 'archived';
}

const initialCreateCourseForm: CreateCourseForm = {
  title: '',
  description: '',
  department: '',
  subdepartment: '',
  status: 'draft',
};

const badgeClass = (status: CourseItem['status']) => {
  if (status === 'active') return 'bg-green-100 text-green-800';
  if (status === 'draft') return 'bg-yellow-100 text-yellow-800';
  return 'bg-slate-100 text-slate-700';
};

export function InstructorCourseManagement() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<CreateCourseForm>(initialCreateCourseForm);
  const [departments, setDepartments] = useState<DepartmentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return '';
  };

  const loadCourses = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/courses', {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load courses');
      }

      const data: CourseItem[] = await response.json();
      setCourses(data);
    } catch (loadError) {
      setError('Failed to load courses. Please refresh and try again.');
      console.error(loadError);
    } finally {
      setLoading(false);
    }
  };

  const loadDepartments = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/departments', {
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load departments');
      }

      const data: DepartmentItem[] = await response.json();
      setDepartments(data);

      if (data.length > 0) {
        const firstDepartment = data[0];
        const firstSubdepartment = firstDepartment.subdepartments[0]?.name || '';

        setFormData((prev) => ({
          ...prev,
          department: prev.department || firstDepartment.name,
          subdepartment: prev.subdepartment || firstSubdepartment,
        }));
      }
    } catch (departmentError) {
      console.error(departmentError);
    }
  };

  useEffect(() => {
    loadCourses();
    loadDepartments();
  }, []);

  const selectedDepartment = departments.find((department) => department.name === formData.department);
  const subdepartmentOptions = selectedDepartment?.subdepartments ?? [];

  const handleCreateCourse = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        credentials: 'include',
      });

      const xsrfToken = getCookie('XSRF-TOKEN');

      const response = await fetch('http://127.0.0.1:8000/courses', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken || ''),
        },
        body: JSON.stringify(formData),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || 'Failed to create course');
      }

      setIsModalOpen(false);
      setFormData((prev) => ({
        ...initialCreateCourseForm,
        department: prev.department,
        subdepartment: subdepartmentOptions[0]?.name || '',
      }));
      await loadCourses();
      alert('Course created successfully.');
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : 'Failed to create course';
      alert(message);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.description || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Course Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="sm:w-48 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-slate-400" />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {loading && <div className="text-sm text-slate-500">Loading courses...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden"
          >
            <div className="h-32 bg-emerald-500 flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-white opacity-50" />
            </div>
            <div className="p-6">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClass(course.status)}`}>
                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{course.title}</h3>
              <p className="mt-1 text-sm text-slate-500 line-clamp-2">{course.description || 'No description'}</p>

              <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />0 Enrolled
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-1" />0 Modules
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  {course.department || 'N/A'}
                </span>
                <p className="text-xs text-slate-400 mt-0.5">
                  {course.subdepartment || 'No sub department'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-slate-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-slate-900">Create New Course</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-500">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleCreateCourse} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Course Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                      className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">Description</label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Department</label>
                      <select
                        value={formData.department}
                        onChange={(e) => {
                          const departmentName = e.target.value;
                          const department = departments.find((item) => item.name === departmentName);
                          const firstSubdepartment = department?.subdepartments[0]?.name || '';

                          setFormData((prev) => ({
                            ...prev,
                            department: departmentName,
                            subdepartment: firstSubdepartment,
                          }));
                        }}
                        className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3"
                      >
                        {departments.map((department) => (
                          <option key={department.id} value={department.name}>{department.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Sub Department</label>
                      <select
                        value={formData.subdepartment}
                        onChange={(e) => setFormData((prev) => ({ ...prev, subdepartment: e.target.value }))}
                        className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3"
                        disabled={subdepartmentOptions.length === 0}
                      >
                        {subdepartmentOptions.length === 0 && <option value="">No sub departments</option>}
                        {subdepartmentOptions.map((subdepartment) => (
                          <option key={subdepartment.id} value={subdepartment.name}>{subdepartment.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            status: e.target.value as 'active' | 'draft' | 'archived',
                          }))
                        }
                        className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3"
                      >
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:col-start-2 sm:text-sm"
                    >
                      Save Course
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 sm:mt-0 sm:col-start-1 sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
