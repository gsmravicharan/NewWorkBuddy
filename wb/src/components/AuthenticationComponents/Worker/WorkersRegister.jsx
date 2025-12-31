import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../services/api"; 
import { ENDPOINTS } from "../../../utils/constants";
const WorkersRegister = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sendOtp, setSendOtp] = useState("Verify Email");

  useEffect(() => {
  localStorage.setItem("logo_status", "worker");
}, []);

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    otp: "",
    password: "",
    rePassword: "",
    role: "WORKER",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ---------------- EMAIL OTP ---------------- */
  const handleVerifyEmail = async () => {
    if (!formData.email) {
      toast.error("Please enter email first");
      return;
    }
    setSendOtp("Sending...");

    try {
      await api.post(`${ENDPOINTS.AUTH_REGISTER}/send-otp`, { email: formData.email });
      toast.success("OTP sent to your email address...");
      setSendOtp("Resend OTP");
    } catch {
      setSendOtp("Verify Email");
      toast.error("Failed to send OTP");
    }
  };

  /* ---------------- STEP 1 VALIDATION ---------------- */
  const handleNext = () => {
    if (
      !formData.username ||
      !formData.fullName ||
      !formData.email ||
      !formData.otp
    ) {
      toast.error("Please complete all fields in Step 1");
      return;
    }
    setStep(2);
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.rePassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await api.post(`${ENDPOINTS.AUTH_REGISTER}/verify-otp`, {
        username: formData.username,
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        otp: formData.otp,
        password: formData.password,
        role: formData.role,
      });
      toast.success("Registration successful 🎉");
      navigate("/worker-login");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center font-nunito px-4">
      <div className="w-full max-w-5xl bg-white rounded-sm shadow-2xl overflow-hidden flex">

        {/* LEFT FIXED PANEL */}
        <div className="w-1/2 bg-worker flex flex-col justify-center items-center text-white p-10">
        
          <h2 className="text-3xl font-bold mb-2 font-playwrite">
            Operative Registration
          </h2>
          <div className="w-10 h-[2px] bg-white mb-4"></div>
          <p className="text-sm opacity-90 text-center px-10">
            Register in two simple steps to get started.
          </p>

          <div className="flex gap-3 mt-6">
            <span className={`w-3 h-3 rounded-full ${step === 1 ? "bg-white" : "bg-white/40"}`} />
            <span className={`w-3 h-3 rounded-full ${step === 2 ? "bg-white" : "bg-white/40"}`} />
          </div>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-worker font-bold cursor-pointer">
          ❯
        </div>
      </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-1">

            {/* ================= STEP 1 ================= */}
            {step === 1 && (
              <>
                <h3 className="text-sm font-semibold text-gray-600 uppercase">
                  Step 1: Account Details
                </h3>

                <div>
                  <label className="text-xs font-semibold text-gray-500">
                    Username
                  </label>
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-worker placeholder:text-sm"
                    placeholder="Enter username"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500">
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-worker placeholder:text-sm"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500">
                    Email Address
                  </label>
                  <div className="flex justify-between gap-1">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-[75%] border-b border-gray-300 py-2 focus:outline-none focus:border-worker placeholder:text-sm"
                      placeholder="Enter your email"
                    />
                    <button
                    disabled={sendOtp === "Sending..."}
                      type="button"
                      onClick={handleVerifyEmail}
                      className={`px-3 py-1 text-xs bg-worker text-white cursor-pointer hover:opacity-80 transition ${sendOtp === "Sending..." ? "cursor-not-allowed opacity-60" : ""}`}
                    >
                      {sendOtp}
                    </button>
                  </div>
                </div>

                {/* OTP FIELD (ALWAYS SHOWN) */}
                <div>
                  <label className="text-xs font-semibold text-gray-500">
                    Email OTP
                  </label>
                  <input
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-worker placeholder:text-sm"
                    placeholder="Enter OTP"
                  />
                </div>

                <div className="flex justify-end py-3">
                    <button
                  type="button"
                  onClick={handleNext}
                  className="w-32 py-2 bg-worker text-white text-sm hover:opacity-80 transition"
                >
                  Next
                </button>
                </div>
              </>
            )}

            {/* ================= STEP 2 ================= */}
            {step === 2 && (
              <>
                <h3 className="text-sm font-semibold text-gray-600 uppercase">
                  Step 2: Security Details
                </h3>

                <div>
                  <label className="text-xs font-semibold text-gray-500">
                    Phone Number
                  </label>
                  <input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-worker placeholder:text-sm"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-worker placeholder:text-sm"
                    placeholder="Enter password"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="rePassword"
                    value={formData.rePassword}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-worker placeholder:text-sm"
                    placeholder="Re-enter password"
                  />
                </div>

                <div className="flex py-4 justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-24 py-2 border border-gray-300 text-sm hover:opacity-80 transition cursor-pointer"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-40 py-2 bg-worker text-white text-sm hover:opacity-80 transition cursor-pointer"
                  >
                    {loading ? "Creating..." : "Create Account"}
                  </button>
                </div>
              </>
            )}

            <p className="text-xs text-gray-600 text-center">
              Already have an account?{" "}
              <a href="/worker-login" className="text-worker font-semibold">
                Login
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

export default WorkersRegister;
