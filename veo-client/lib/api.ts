import axios from "axios";
import { BACKEND_URL } from ".";

export const api = axios.create({
    baseURL: BACKEND_URL
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);