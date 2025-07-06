// // src/components/dashboard/ProjectList.tsx
// import { useEffect, useState } from 'react';
// import { getProjects } from '../../services/projects';
// import ProjectCard from './ProjectCard';

// const ProjectList = () => {
//   const [projects, setProjects] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const fetchProjects = async () => {
//     try {
//       const res = await getProjects();
//       setProjects(res.data.results || []);
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Failed to load projects');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   if (loading) return <p>Loading projects...</p>;
//   if (error) return <p className="text-red-600">{error}</p>;
//   if (projects.length === 0) return <p>No projects found.</p>;

//   return (
//     <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
//       {projects.map((project) => (
//         <ProjectCard key={project._id} project={project} onDelete={fetchProjects} />
//       ))}
//     </div>
//   );
// };

// export default ProjectList;
