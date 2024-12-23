import axios from "axios";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api", // Base URL
  timeout: 10000, // Timeout in milliseconds
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Default to protected routes unless explicitly set to false
    const isProtected = config.headers["is-protected"] !== "false"; // Default = true

    if (isProtected) {
      // Get token from localStorage or cookies
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Attach Bearer token
      } else {
        console.warn("No token found, request might fail.");
      }
    }

    // Clean up custom header before sending request
    delete config.headers["is-protected"];
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized. Redirecting to login...");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
