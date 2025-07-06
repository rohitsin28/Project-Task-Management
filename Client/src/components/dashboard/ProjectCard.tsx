// import { deleteProject } from '../../services/projects';

// interface ProjectProps {
//   project: {
//     _id: string;
//     title: string;
//     description: string;
//     status: string;
//   };
//   onDelete: () => void;
// }

// const ProjectCard = ({ project, onDelete }: ProjectProps) => {
//   const handleDelete = async () => {
//     if (confirm(`Delete project "${project.title}"?`)) {
//       await deleteProject(project._id);
//       onDelete();
//     }
//   };

//   return (
//     <div className="border rounded p-4 shadow hover:shadow-md transition relative">
//       <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
//       <p className="text-sm text-gray-600 mb-2">{project.description}</p>
//       <span
//         className={`text-xs px-2 py-1 rounded ${
//           project.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
//         }`}
//       >
//         {project.status}
//       </span>

//       <button
//         onClick={handleDelete}
//         className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-sm"
//       >
//         🗑️
//       </button>
//     </div>
//   );
// };

// export default ProjectCard;
