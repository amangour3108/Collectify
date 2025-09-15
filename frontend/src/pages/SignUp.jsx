import React, { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "pickupPartner",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      alert(response.data.message || "User registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200/60 to-purple-200/60 font-sans">
      <h1 className="text-3xl font-extrabold text-blue-900 drop-shadow-lg mb-8">
        Micro Collection Partner System
      </h1>
      <div className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl">
        <div className="w-1/2 p-10 backdrop-blur-lg bg-white/40 border border-white/30 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              className="w-full px-4 py-2 rounded-xl bg-white/60 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm backdrop-blur-md shadow"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              className="w-full px-4 py-2 rounded-xl bg-white/60 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm backdrop-blur-md shadow"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full px-4 py-2 rounded-xl bg-white/60 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm backdrop-blur-md shadow"
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/60 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm backdrop-blur-md shadow"
            >
              <option value="pickupPartner">Pickup Partner</option>
              <option value="microCollectionPartner">Micro Collection Partner</option>
            </select>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white py-2 rounded-xl font-bold hover:opacity-90 transition text-sm shadow-lg"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="w-1/2 bg-gradient-to-br from-blue-500 to-purple-500 text-white flex flex-col items-center justify-center p-10">
          <h2 className="text-2xl font-bold mb-2">Already have an account?</h2>
          <p className="mb-4 text-sm text-white/90">Login now to access your dashboard.</p>
          <a
            href="/login"
            className="border border-white text-white px-6 py-2 rounded-xl hover:bg-white hover:text-blue-600 text-sm transition font-bold shadow"
          >
            Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
