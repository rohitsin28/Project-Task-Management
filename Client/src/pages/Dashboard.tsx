import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Modal from "../components/common/Modal";
import ProjectForm from "../components/projects/ProjectForm";
import { getProjects, deleteProject } from "../services/projects";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState<any | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      await deleteProject(id);
      await fetchProjects();
    } catch (err) {
      alert("Failed to delete project");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Header />
      <main className="p-4 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Projects</h1>
          <button
            onClick={() => {
              setEditProject(null);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Project
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => navigate(`/projects/${project._id}`)}
                className="border rounded p-4 shadow hover:shadow-md relative cursor-pointer"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditProject(project);
                    setShowModal(true);
                  }}
                  className="absolute top-2 right-10 text-blue-500 hover:text-blue-700 text-sm"
                >
                  🖊️
                </button>

                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {project.description}
                </p>
                <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">
                  {project.status}
                </span>

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(project._id);
                  }}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ProjectForm
          initialData={editProject}
          onClose={() => {
            setShowModal(false);
            fetchProjects();
          }}
        />
      </Modal>
    </>
  );
};

export default Dashboard;
