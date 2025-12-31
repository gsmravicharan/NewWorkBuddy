import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <aside className={`w-64 bg-gray-50 border-r p-4 ${className}`}>
      <div className="mb-6">
        <div className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">WC</div>
        <div className="mt-3">
          <div className="font-semibold">Welcome</div>
          <div className="text-sm text-gray-500">User</div>
        </div>
      </div>

      <nav className="space-y-2">
        <Link to="/" className="block px-3 py-2 rounded hover:bg-gray-100">Home</Link>
        <Link to="/worker-dashboard" className="block px-3 py-2 rounded hover:bg-gray-100">Worker Dashboard</Link>
        <Link to="/customer-dashboard" className="block px-3 py-2 rounded hover:bg-gray-100">Customer Dashboard</Link>
        <Link to="/worker-login" className="block px-3 py-2 rounded hover:bg-gray-100">Worker Login</Link>
        <Link to="/customer-login" className="block px-3 py-2 rounded hover:bg-gray-100">Customer Login</Link>
      </nav>

      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 rounded bg-red-50 text-red-700 hover:bg-red-100"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
