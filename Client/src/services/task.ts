import axios from './api';

export const getTasksByProject = async (projectId: string) => {
  const res = await axios.get(`task/get/${projectId}`);
  return res.data;
};

export const createTask = async (data: {
  title: string;
  description: string;
  status: string;
  dueDate?: string;
  projectId: string;
}) => {
  return await axios.post('task/create', data);
};

export const updateTask = async (
  id: string,
  data: {
    title: string;
    description: string;
    status: string;
    dueDate?: string;
  }
) => {
  return await axios.patch(`task/update/${id}`, data);
};

export const deleteTask = async (id: string) => {
  return await axios.delete(`task/delete/${id}`);
};
