import axios from './api';

export const loginUser = async (payload: { email: string; password: string }) => {
  return await axios.post('/auth/signIn', payload);
};

export const registerUser = async (payload: { name: string; email: string; password: string }) => {
  return await axios.post('/auth/signUp', payload);
};
