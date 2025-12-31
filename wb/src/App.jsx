import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import { ROLES } from './utils/constants';

import Home from './pages/Home';
import WorkerDashboard from './pages/WorkerDashboard';
import CustomerDashboard from './components/Dashboard/CustomerDashboard';
import Navbar from './pages/Navbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WorkersLogin from './components/AuthenticationComponents/Worker/WorkersLogin';
import WorkersRegister from './components/AuthenticationComponents/Worker/WorkersRegister';
import CustomerLogin from './components/AuthenticationComponents/Customer/CustomerLogin';
import CustomerRegister from './components/AuthenticationComponents/Customer/CustomerRegister';
import HandicapperLogin from './components/AuthenticationComponents/Handicapper/HandicapperLogin';
import HandicapperRegister from './components/AuthenticationComponents/Handicapper/HandicapperRegister';
import AdminLogin from './components/AuthenticationComponents/Admin/AdminLogin';
import ForgotPassword from './components/AuthenticationComponents/ForgotPassword';

function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
        {/* ✅ Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/worker-login" element={<WorkersLogin />} />
          <Route path="/worker-register" element={<WorkersRegister />} />
          <Route path="/customer-login" element={<CustomerLogin/>} />
          <Route path="/customer-register" element={<CustomerRegister/>} />
          <Route path="/handicapper-login" element={<HandicapperLogin/>} />
          <Route path="/handicapper-register" element={<HandicapperRegister/>} />
          <Route path="/admin-auth" element={<AdminLogin/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
        </Route>

        {/* ✅ Worker Protected Routes */}
        <Route element={<ProtectedRoute role={ROLES.WORKER} />}>
          <Route path="/worker-dashboard" element={<WorkerDashboard />} />
        </Route>

        {/* ✅ Customer Protected Routes */}
        <Route element={<ProtectedRoute role={ROLES.CUSTOMER} />}>
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
}

export default App;
