import axios from "axios";
import { BASE_URL } from "./apiPaths";

// ✅ Create Axios instance with base settings
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Request Interceptor (Adds Authorization & Handles File Uploads)
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // ✅ Automatically set correct headers for file uploads
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor (Handles Errors Globally)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`❌ API Error [${error.response.status}]:`, error.response.data);

      if (error.response.status === 401) {
        window.location.href = "/login"; // Redirect to login if unauthorized
      } else if (error.response.status === 500) {
        console.error("⚠️ Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("⏳ Request timeout. Please try again.");
    } else {
      console.error("❌ Unknown error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
