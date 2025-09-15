import axios from "../utils/axiosInstance";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please enter email and password");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, user } = response.data;
      login(user, token);

      // Redirect based on role
      if (user.role.trim() === "pickupPartner") navigate("/partner-dashboard");
      else if (user.role.trim() === "microCollectionPartner") navigate("/mcp-dashboard");
      else alert("Unknown role, contact admin.");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200/60 to-purple-200/60 font-sans">
      <h1 className="text-3xl font-extrabold text-blue-900 drop-shadow-lg mb-8">
        Micro Collection Partner System
      </h1>
      <div className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl">
        <div className="w-1/2 p-10 backdrop-blur-lg bg-white/40 border border-white/30 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Log In</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">
                E-Mail
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter E-Mail"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white/60 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm backdrop-blur-md shadow"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="**********"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white/60 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm backdrop-blur-md shadow"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white py-2 rounded-xl font-bold hover:opacity-90 transition text-sm shadow-lg"
            >
              Log In
            </button>
          </form>
        </div>
        <div className="w-1/2 bg-gradient-to-br from-blue-500 to-purple-500 text-white flex flex-col items-center justify-center p-10">
          <h2 className="text-2xl font-bold mb-2">Welcome to login</h2>
          <p className="mb-4 text-sm text-white/90">Don’t have an account?</p>
          <button
            onClick={() => navigate("/signup")}
            className="border border-white text-white px-6 py-2 rounded-xl hover:bg-white hover:text-blue-600 text-sm transition font-bold shadow"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
