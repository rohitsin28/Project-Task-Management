import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();

  const login = (token: string) => {
    localStorage.setItem('token', token);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getToken = () => localStorage.getItem('token');
  const isLoggedIn = !!getToken();

  return { login, logout, getToken, isLoggedIn };
};
