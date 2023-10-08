import axios from "axios";
import { baseUrl } from "../utils/const";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add the token to the request headers
    const deData = JSON.parse(localStorage.getItem("DEPOS"));
    const authToken = deData.DET;
    config.headers.Authorization = `Bearer ${authToken}`;
    return config;
  },
  (error) => {
    // Handle request errors
    console.log('errorrrrr')
    return Promise.reject(error);
  }
);

// ... Rest of the code

export default axiosInstance;
