import { useEffect } from 'react';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  useEffect(() => {
    document.title = 'Login | Project Manager';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-500 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
