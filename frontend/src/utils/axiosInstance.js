import axios from "axios";

// Base instance for all API calls
const instance = axios.create({
  baseURL: "http://localhost:8080/api", // adjust if using a different port or domain
});

// Add JWT token to headers if present
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;