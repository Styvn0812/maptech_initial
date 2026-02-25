import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Users,
  BookOpen,
  Building2,
  X,
} from "lucide-react";

interface Subdepartment {
  id: number;
  name: string;
}

interface Department {
  id: number;
  name: string;
  code: string;
  description: string;
  head: string;
  employee_count: number;
  course_count: number;
  status: "Active" | "Inactive";
  subdepartments: Subdepartment[];
}

export default function DepartmentManagement() {
  const API = "http://127.0.0.1:8000/api";

  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showDeptModal, setShowDeptModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedDeptId, setSelectedDeptId] = useState<number | null>(null);
  const [editing, setEditing] = useState<Department | null>(null);

  const [deptForm, setDeptForm] = useState({
    name: "",
    code: "",
    head: "",
    description: "",
  });

  const [subName, setSubName] = useState("");

  // ================= LOAD =================
  const loadDepartments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/departments`);
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setDepartments(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  // ================= SAVE DEPARTMENT =================
  const handleSaveDepartment = async () => {
    const url = editing
      ? `${API}/departments/${editing.id}`
      : `${API}/departments`;

    const method = editing ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...deptForm,
        status: "Active",
      }),
    });

    setShowDeptModal(false);
    setEditing(null);
    loadDepartments();
  };

  // ================= ADD SUB =================
  const handleSaveSub = async () => {
    if (!selectedDeptId) return;

    await fetch(
      `${API}/departments/${selectedDeptId}/subdepartments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: subName }),
      }
    );

    setSubName("");
    setShowSubModal(false);
    loadDepartments();
  };

  // ================= DELETE =================
  const confirmDelete = async () => {
    if (!selectedDeptId) return;

    await fetch(`${API}/departments/${selectedDeptId}`, {
      method: "DELETE",
    });

    setShowDeleteModal(false);
    loadDepartments();
  };

  // ================= RENDER =================
  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Department Management
        </h1>

        <button
          onClick={() => {
            setEditing(null);
            setDeptForm({ name: "", code: "", head: "", description: "" });
            setShowDeptModal(true);
          }}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-white rounded-lg shadow p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-md">
                  <Building2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{dept.name}</h2>
                  <p className="text-sm text-gray-500">{dept.code}</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-2">
              Head: <span className="font-medium">{dept.head}</span>
            </p>

            {/* SUBDEPARTMENTS */}
            {dept.subdepartments?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {dept.subdepartments.map((sub) => (
                  <span
                    key={sub.id}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                  >
                    {sub.name}
                  </span>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => {
                    setSelectedDeptId(dept.id);
                    setShowSubModal(true);
                  }}
                  className="text-green-600 text-xs"
                >
                  + Sub
                </button>

                <Pencil
                  onClick={() => {
                    setEditing(dept);
                    setDeptForm({
                      name: dept.name,
                      code: dept.code,
                      head: dept.head,
                      description: dept.description,
                    });
                    setShowDeptModal(true);
                  }}
                  className="w-4 h-4 cursor-pointer text-gray-600"
                />

                <Trash2
                  onClick={() => {
                    setSelectedDeptId(dept.id);
                    setShowDeleteModal(true);
                  }}
                  className="w-4 h-4 cursor-pointer text-gray-600"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DEPARTMENT MODAL ================= */}
      {showDeptModal && (
        <Modal onClose={() => setShowDeptModal(false)}>
          <h2 className="text-lg font-semibold mb-4">
            {editing ? "Edit Department" : "Add Department"}
          </h2>

          <Input
            placeholder="Department Name"
            value={deptForm.name}
            onChange={(v) => setDeptForm({ ...deptForm, name: v })}
          />
          <Input
            placeholder="Department Code"
            value={deptForm.code}
            onChange={(v) => setDeptForm({ ...deptForm, code: v })}
          />
          <Input
            placeholder="Department Head"
            value={deptForm.head}
            onChange={(v) => setDeptForm({ ...deptForm, head: v })}
          />
          <Input
            placeholder="Description"
            value={deptForm.description}
            onChange={(v) =>
              setDeptForm({ ...deptForm, description: v })
            }
          />

          <button
            onClick={handleSaveDepartment}
            className="w-full mt-4 bg-green-600 text-white py-2 rounded-md"
          >
            Save
          </button>
        </Modal>
      )}

      {/* ================= SUB MODAL ================= */}
      {showSubModal && (
        <Modal onClose={() => setShowSubModal(false)}>
          <h2 className="text-lg font-semibold mb-4">
            Add Subdepartment
          </h2>

          <Input
            placeholder="Subdepartment Name"
            value={subName}
            onChange={setSubName}
          />

          <button
            onClick={handleSaveSub}
            className="w-full mt-4 bg-green-600 text-white py-2 rounded-md"
          >
            Save Subdepartment
          </button>
        </Modal>
      )}

      {/* ================= DELETE MODAL ================= */}
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <h2 className="text-lg font-semibold mb-4">
            Delete this department?
          </h2>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>

            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
        {children}
      </div>
    </div>
  );
}

function Input({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full border rounded-md px-3 py-2 mb-3"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}