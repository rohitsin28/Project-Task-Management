import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-700">Project Manager</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
