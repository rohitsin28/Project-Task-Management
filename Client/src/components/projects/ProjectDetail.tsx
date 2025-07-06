// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import Header from '../common/Header';
// import { getTasksByProject } from '../../services/task';

// const ProjectDetail = () => {
//   const { id: projectId } = useParams();
//   const [tasks, setTasks] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const fetchTasks = async () => {
//     try {
//       const res = await getTasksByProject(projectId!);
//       console.log(res)
//       setTasks(res.data.results || []);
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Failed to fetch tasks');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [projectId]);

//   return (
//     <>
//       <Header />
//       <main className="p-4 max-w-4xl mx-auto">
//         <h2 className="text-2xl font-bold mb-4">Project Tasks</h2>

//         {loading ? (
//           <p>Loading tasks...</p>
//         ) : error ? (
//           <p className="text-red-600">{error}</p>
//         ) : tasks.length === 0 ? (
//           <p>No tasks found for this project.</p>
//         ) : (
//           <ul className="space-y-3">
//             {tasks.map((task) => (
//               <li
//                 key={task._id}
//                 className="p-4 border rounded shadow-sm bg-white"
//               >
//                 <h3 className="text-lg font-semibold">{task.title}</h3>
//                 <p className="text-sm text-gray-700">{task.description}</p>
//                 <span className="text-xs text-blue-700 capitalize">{task.status}</span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </main>
//     </>
//   );
// };

// export default ProjectDetail;
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../common/Header';
import Modal from '../common/Modal';
import TaskForm from '../tasks/TaskForm';
import {
  getTasksByProject,
  deleteTask
} from '../../services/task';

const ProjectDetail = () => {
  const { id: projectId } = useParams();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState<any | null>(null);

  const fetchTasks = async () => {
    try {
      const res = await getTasksByProject(projectId!);
      setTasks(res.data.results || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      await deleteTask(id);
      await fetchTasks();
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  return (
    <>
      <Header />
      <main className="p-4 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Project Tasks</h2>
          <button
            onClick={() => {
              setEditTask(null);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Task
          </button>
        </div>

        {loading ? (
          <p>Loading tasks...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : tasks.length === 0 ? (
          <p>No tasks found for this project.</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="p-4 border rounded shadow-sm bg-white relative"
              >
                {/* Edit Button */}
                <button
                  onClick={() => {
                    setEditTask(task);
                    setShowModal(true);
                  }}
                  className="absolute top-2 right-10 text-blue-500 hover:text-blue-700 text-sm"
                >
                  🖊️
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(task._id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                >
                  🗑️
                </button>

                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-700">{task.description}</p>
                <span className="text-xs text-blue-700 capitalize">
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <TaskForm
          projectId={projectId!}
          initialData={editTask}
          onClose={() => {
            setShowModal(false);
            fetchTasks(); // refresh list
          }}
        />
      </Modal>
    </>
  );
};

export default ProjectDetail;
