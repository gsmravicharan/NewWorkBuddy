// ...existing code...
import React,{useEffect,useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MdWorkHistory } from "react-icons/md";
import { BsPersonBoundingBox } from "react-icons/bs";
import { BsPersonWheelchair } from "react-icons/bs";
import { MdAdminPanelSettings } from "react-icons/md";

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-lime-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`
    }
  >
    {children}
  </NavLink>
);

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

    const [logoStatus, setLogoStatus] = useState(""); // default if needed

  useEffect(() => {
    const status = localStorage.getItem("logo_status");
    if (status) {
      setLogoStatus(status)
    }
  }, []);
  return (
    <nav className="bg-white w-full shadow-md h-16 z-50 font-nunito">
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-6">
          
          {logoStatus === "worker" ? <NavLink to="/" className="text-xl font-extrabold font-playwrite text-worker flex items-center"><MdWorkHistory className=' text-4xl'/>WB <sub className="text-gray-700 text-xs">Operative</sub></NavLink>: 
          logoStatus === "customer" ? <NavLink to="/" className="text-xl font-extrabold font-playwrite text-lime-600 flex items-center"><BsPersonBoundingBox className='mr-1 text-2xl'/>WB<sub className="text-gray-700 text-xs">Customer</sub></NavLink> :logoStatus === "handicapper" ?
          <NavLink to="/" className="text-xl font-extrabold font-playwrite text-pink-600 flex items-center"><BsPersonWheelchair className='mr-0 text-4xl'/>WB<sub className="text-gray-700">Handicapper</sub></NavLink>:<NavLink to="/" className="text-xl font-extrabold font-playwrite text-admin1 flex items-center"><MdAdminPanelSettings className='text-4xl'/>WB<sub className="text-gray-700 text-xs">Administrator</sub></NavLink>}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated && <NavItem to="/dashboard">Dashboard</NavItem>}
            {isAuthenticated && <NavItem to="/profile">Profile</NavItem>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-700 hidden sm:inline">Hello, {user?.name || 'User'}</span>
              <button
                onClick={logout}
                className="px-3 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>

            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// ...existing code...