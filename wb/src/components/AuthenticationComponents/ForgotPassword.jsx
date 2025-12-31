import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../../services/api";
import { ENDPOINTS } from "../../utils/constants";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [logoStatus, setLogoStatus] = useState(""); // default if needed

  useEffect(() => {
      const status = localStorage.getItem("logo_status");
      if (status) {
        setLogoStatus(status)
      }
    }, []);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // STEP 1 → SEND OTP
  const sendOtp = async () => {
    if (!formData.email) return toast.error("Email required");

    setLoading(true);
    try {
      await api.post(`${ENDPOINTS.AUTH_FORGOT_PASSWORD}/send-otp`, { email: formData.email, role: logoStatus.toUpperCase() });

      toast.success("Verification code sent to email 📩");
      setStep(2);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 → VERIFY OTP + RESET PASSWORD
  const resetPassword = async () => {
    if (!formData.otp || !formData.newPassword) {
      return toast.error("All fields required");
    }

    setLoading(true);
    try {
      await api.post(`${ENDPOINTS.AUTH_FORGOT_PASSWORD}/verify-otp`, formData);

      toast.success("Password reset successful ✅");
      navigate("/admin-login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center font-nunito px-4">
      <div className="bg-white w-full max-w-4xl rounded-sm shadow-xl flex overflow-hidden">

        {/* LEFT ILLUSTRATION */}
        <div className={`w-1/2 bg-admin1 flex flex-col justify-center items-center text-white p-10 ${logoStatus === "administrator" ? "bg-admin1" : ""} ${logoStatus === "worker" ? "bg-worker" : ""} ${logoStatus === "customer" ? "bg-gradient-to-tr from-lime-500 to-emerald-500" : ""} ${logoStatus==="handicapper" ? "bg-pink-700" : ""}`}>
        <h2 className="text-3xl font-bold mb-2 font-playwrite">Reset your Password</h2>
        <div className="w-10 h-[2px] bg-white mb-4"></div>
        <p className="text-sm opacity-90 text-center px-8">
          The verification email will be sent to your mailbox.
        </p>
      </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 p-10 space-y-6">
          <h2 className={`text-2xl font-bold mb-5 font-playwrite ${logoStatus === "administrator" ? "text-admin1" : ""} ${logoStatus === "worker" ? "text-worker" : ""} ${logoStatus === "customer" ? "text-lime-500" : ""} ${logoStatus==="handicapper" ? "text-pink-700" : ""}`}>Reset your Password</h2>
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border-b border-gray-300 py-2 focus:outline-none ${logoStatus === "administrator" ? "focus:border-admin1" : ""} ${logoStatus === "worker" ? "focus:border-worker" : ""} ${logoStatus === "customer" ? "focus:border-lime-500" : ""} ${logoStatus==="handicapper" ? "focus:border-pink-700" : ""}`}
                placeholder="Enter your email"
              />

              <button
                onClick={sendOtp}
                disabled={loading}
                className={`w-full py-2 text-white cursor-pointer hover:opacity-90 ${logoStatus === "administrator" ? "bg-admin1" : ""} ${logoStatus === "worker" ? "bg-worker" : ""} ${logoStatus === "customer" ? "bg-gradient-to-tr from-lime-500 to-emerald-500" : ""} ${logoStatus==="handicapper" ? "bg-pink-700" : ""}`}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Verification Code</label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
               className={`w-full border-b border-gray-300 py-2 focus:outline-none ${logoStatus === "administrator" ? "focus:border-admin1" : ""} ${logoStatus === "worker" ? "focus:border-worker" : ""} ${logoStatus === "customer" ? "focus:border-lime-500" : ""} ${logoStatus==="handicapper" ? "focus:border-pink-700" : ""}`}
                placeholder="Enter OTP"
              />

              <label className="block text-xs font-semibold text-gray-500 mb-1">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={`w-full border-b border-gray-300 py-2 focus:outline-none ${logoStatus === "administrator" ? "focus:border-admin1" : ""} ${logoStatus === "worker" ? "focus:border-worker" : ""} ${logoStatus === "customer" ? "focus:border-lime-500" : ""} ${logoStatus==="handicapper" ? "focus:border-pink-700" : ""}`}
                placeholder="Enter new password"
              />

              <button
                onClick={resetPassword}
                disabled={loading}
                className={`w-full py-2 text-white cursor-pointer hover:opacity-90 ${logoStatus === "administrator" ? "bg-admin1" : ""} ${logoStatus === "worker" ? "bg-worker" : ""} ${logoStatus === "customer" ? "bg-gradient-to-tr from-lime-500 to-emerald-500" : ""} ${logoStatus==="handicapper" ? "bg-pink-700" : ""}`}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </>
          )}

          <p
            onClick={logoStatus === "administrator" ? () => navigate("/admin-auth") : logoStatus === "worker" ? () => navigate("/worker-login") : logoStatus === "customer" ? () => navigate("/customer-login") : () => navigate("/handicapper-login")}
            className={`text-center text-sm font-nunito cursor-pointer hover:underline ${logoStatus === "administrator" ? "text-admin1" : ""} ${logoStatus === "worker" ? "text-worker" : ""} ${logoStatus === "customer" ? "text-lime-500" : ""} ${logoStatus==="handicapper" ? "text-pink-700" : ""}`}
          >
            Back to Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
