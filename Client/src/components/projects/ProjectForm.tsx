import { useState } from "react";
import { createProject, updateProject } from "../../services/projects";

interface ProjectFormProps {
  onClose?: () => void;
  initialData?: {
    _id: string;
    title: string;
    description: string;
    status: string;
  };
}

const ProjectForm = ({ onClose, initialData }: ProjectFormProps) => {
  const isEditMode = Boolean(initialData);

  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    status: initialData?.status || "active",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isEditMode && initialData) {
        await updateProject(initialData._id, form);
      } else {
        await createProject(form);
      }

      onClose?.();
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to submit project";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">
        {isEditMode ? "Edit Project" : "Create New Project"}
      </h2>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        required
        placeholder="Project Title"
        className="w-full px-3 py-2 border rounded"
      />

      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        required
        placeholder="Project Description"
        className="w-full px-3 py-2 border rounded"
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      >
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        {loading
          ? isEditMode
            ? "Updating..."
            : "Creating..."
          : isEditMode
            ? "Update Project"
            : "Create Project"}
      </button>
    </form>
  );
};

export default ProjectForm;
