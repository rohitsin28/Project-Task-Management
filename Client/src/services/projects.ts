import axios from './api';

export const getProjects = async () => {
  const res = await axios.get('project/getAll');
  return res.data.data.results;
};

export const createProject = async (data: {
  title: string;
  description: string;
  status: string;
}) => {
  return await axios.post('project/create', data);
};

export const deleteProject = async (id: string) => {
  return await axios.delete(`project/delete/${id}`);
};

export const updateProject = async (
  id: string,
  data: { title: string; description: string; status: string }
) => {
  return await axios.patch(`project/update/${id}`, data);
};
