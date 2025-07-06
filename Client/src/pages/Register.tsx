import { useEffect } from 'react';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  useEffect(() => {
    document.title = 'Register | Project Manager';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
