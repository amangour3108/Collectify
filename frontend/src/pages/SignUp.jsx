import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

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
      await axios.post("http://localhost:8080/api/auth/register", formData);
      alert("User registered successfully!");
      navigate('/login');
      
    } catch (error) {
      console.error(error);
      alert("Registration failed.");
    }
  };

  return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-black-500 mb-8">
        Micro Collection Partner System
      </h1>

      <div className="flex w-[80%] max-w-4xl rounded-3xl bg-white shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full p-3 rounded-full bg-gray-100 border border-pink-300 focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 rounded-full bg-gray-100 border border-pink-300 focus:outline-none"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 rounded-full bg-gray-100 border border-pink-300 focus:outline-none"
              required
            />
            <select
              name="role"
              onChange={handleChange}
              className="w-full p-3 rounded-full bg-gray-100 border border-pink-300 focus:outline-none"
            >
              <option value="pickupPartner">Pickup Partner</option>
              <option value="microCollectionPartner">
                Micro Collection Partner
              </option>
            </select>
            <button
              type="submit"
              className="w-full p-3 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 text-white font-bold"
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className="w-1/2 bg-gradient-to-br from-blue-500 to-red-500 text-white flex flex-col justify-center items-center p-10">
          <h2 className="text-2xl font-bold">Already have an account?</h2>
          <p className="mt-2 mb-4">Login now to access your dashboard.</p>
          <a
            href="/login"
            className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-red-500 transition"
          >
            Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
