import axios from "axios";
import React, { useState }from 'react';
import Signup from "./SignUp";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../utils/AuthContext";


const Login = () => {
    const navigate = useNavigate();
    const {login} = useAuth();
    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        console.log("Login successful:", response.data);

        // ✅ update context and localStorage
        login(user, token);

        // ✅ redirect based on role
        if (user.role.trim() === "pickupPartner") {
          navigate("/partner-dashboard");
        } else if (user.role.trim() === "microCollectionPartner") {
          navigate("/mcp-dashboard");
        } else {
          alert("Unknown role, contact admin.");
        }
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Invalid email or password");
    }
    };  
    

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-sans">
        <h1 className="text-3xl font-bold text-black-500 mb-8">Micro Collection Partner System</h1>
  
        <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">
          {/* Left Side */}
          <div className="w-1/2 p-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Log In</h2>
    
            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">E-Mail</label>
                <input
                  type="text"
                  placeholder="Enter E-Mail"
                  className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
                  onChange={ (e) => setEmail(e.target.value)}
                />
              </div>
  
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">Password</label>
                <input
                  type="password"
                  placeholder="**********"
                  className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
                  onChange={ (e) => setPassword(e.target.value)}
                />
              </div>
  
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-400 to-pink-600 text-white py-2 rounded-full hover:opacity-90 transition text-sm"
              >
                Log In
              </button>
            </form>
          </div>
  
          {/* Right Side */}
          <div className="w-1/2 bg-gradient-to-tr from-red-500 to-blue-600 text-white flex flex-col items-center justify-center p-10">
            <h2 className="text-2xl font-bold mb-2">Welcome to login</h2>
            <p className="mb-4 text-sm text-white/90">Don’t have an account?</p>
            <button onClick={()=>navigate('/signup')}className="border border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-pink-600 text-sm transition">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  };
  

export default Login