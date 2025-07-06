import { useState } from 'react';
import { createTask, updateTask } from '../../services/task';

interface TaskFormProps {
  onClose: () => void;
  projectId: string;
  initialData?: {
    _id: string;
    title: string;
    description: string;
    status: string;
    dueDate?: string;
  };
}

const TaskForm = ({ onClose, projectId, initialData }: TaskFormProps) => {
  const isEditMode = Boolean(initialData);

  const [form, setForm] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || 'todo',
    dueDate: initialData?.dueDate?.substring(0, 10) || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEditMode && initialData) {
        await updateTask(initialData._id, form);
      } else {
        await createTask({ ...form, projectId });
      }

      onClose();
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Task submission failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">
        {isEditMode ? 'Edit Task' : 'Add New Task'}
      </h2>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        required
        placeholder="Task Title"
        className="w-full px-3 py-2 border rounded"
      />

      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        required
        placeholder="Task Description"
        className="w-full px-3 py-2 border rounded"
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      >
        <option value="todo">To Do</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <input
        name="dueDate"
        type="date"
        value={form.dueDate}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        {loading
          ? isEditMode
            ? 'Updating...'
            : 'Creating...'
          : isEditMode
          ? 'Update Task'
          : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;
