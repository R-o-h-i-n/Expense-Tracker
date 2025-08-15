import axios from "axios";
import { BASE_URL } from "./apiPaths"

// Create configured axios instance with default settings
const axiosInstance = axios.create({
      baseURL : BASE_URL,        // Base URL for all API requests
      timeout : 10000,           // Request timeout in milliseconds
      headers : {
            "Content-Type" : "application/json", // Default content type
            Accept : "application/json",          // Expected response format
      },
});

// Request interceptor: Automatically add authentication token to all requests
axiosInstance.interceptors.request.use(
      (config) => {
            const accessToken = localStorage.getItem("token");
            if(accessToken) {
                  config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
      },
      (error) => {
            return Promise.reject(error);
      }
)

// Response interceptor: Handle common HTTP errors globally
axiosInstance.interceptors.response.use (
      (response) => {
            return response;
      },
      (error) => {
            // Handle common errors globally
            if (error.response) {
                  if(error.response.status === 401) {
                        // Unauthorized: Redirect to login page
                        window.location.href = "/login";
                  } 
                  else if (error.response.status === 500) {
                        console.error("Server error, please try again later.");
                  }
                  
            }
            else if (error.response.status === "ECONNABORTED") {
                  console.error("Request timeout, please check your internet connection.");
            } 

            return Promise.reject(error);
      }
);

export default axiosInstance;
