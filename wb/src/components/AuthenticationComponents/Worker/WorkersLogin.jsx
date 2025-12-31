import React, { useState,useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaRegCircleQuestion } from "react-icons/fa6";
import { toast } from "react-toastify";
import api from '../../../services/api';
import { ENDPOINTS } from '../../../utils/constants';

const WorkersLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "WORKER",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
  localStorage.setItem("logo_status", "worker");
}, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post(`${ENDPOINTS.AUTH_LOGIN}`, formData);

      // assume backend returns { token, user }
      login({
        id: res.data.user.id,
        username: res.data.user.username,
        email: res.data.user.email,
        role: res.data.user.role,
        token: res.data.token,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      toast.success("Welcome back operative 🎉");
      navigate('/worker-dashboard', { replace: true });

    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-[calc(100vh-64px)] flex items-center justify-center font-nunito px-4">
    <div className="relative w-full max-w-4xl bg-white rounded-sm shadow-2xl overflow-hidden flex">

      {/* LEFT PANEL */}
      <div className="w-1/2 bg-worker flex flex-col justify-center items-center text-white p-10">
        <h2 className="text-3xl font-bold mb-2 font-playwrite">Welcome back member!</h2>
        <div className="w-10 h-[2px] bg-white mb-4"></div>
        <p className="text-xs opacity-90 text-center px-8">
          Sign in to continue to your dashboard or create a new account.
        </p>
      </div>

      {/* CENTER ARROW */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-worker font-bold cursor-pointer">
          ❯
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-1/2 p-10 px-8">

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-worker"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-worker"
              required
            />
          </div>

          <div className='flex justify-between items-center pb-3'>
            <div className="flex items-center gap-2 text-xs text-gray-500">
            <input type="checkbox" />
            <span>I agree to the terms of service</span>
          </div>
             <button
                type="button"
                className=" text-worker hover:underline  py-0 flex items-center text-xs cursor-pointer"
                onClick={() => navigate('/forgot-password')}
                >
                <FaRegCircleQuestion className="inline mr-1 text-sm" /> Forgot password?
            </button>
          </div>

         <div className='flex justify-center items-center'>
             <button
            type="submit"
            disabled={loading}
            className="w-32 py-2 bg-worker text-white text-sm cursor-pointerc shadow hover:opacity-80 transition"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
         </div>

          <p className="text-center text-xs text-gray-600">
              Don't have an account?{" "}
              <a href="/worker-register" className="text-worker font-semibold hover:underline">
                Create account
              </a>
            </p>

            <p className="text-center text-[10px] text-gray-600">
              <a href="/handicapper-login" className="text-worker font-semibold hover:underline">
                Login as Handicapper
              </a> | <a href="/handicapper-register" className="text-worker font-semibold hover:underline">
                Register as Handicapper
              </a> | <a href="/customer-login" className="text-worker font-semibold hover:underline">
                Login as Customer
              </a> | <a href="/customer-register" className="text-worker font-semibold hover:underline">
                Register as Customer
              </a>
            </p>
        </form>
      </div>
    </div>
  </div>
);
};

export default WorkersLogin;
