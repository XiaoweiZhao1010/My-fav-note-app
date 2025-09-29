import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5050/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("jwtToken"); // Retrieve token from sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to request header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
