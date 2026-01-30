import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:4000/api",
    baseURL: "https://resume-analyzer-neoo.onrender.com/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
