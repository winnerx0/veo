import axios from "axios";
import { BACKEND_URL } from ".";
import { useNavigate } from "react-router-dom";

export const api = axios.create({
    baseURL: BACKEND_URL
})

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token'); 

    const navigate = useNavigate()

    const res = await fetch(`${BACKEND_URL}/api/verify-token`)

    const isTokenValid = await res.json()

    if(!isTokenValid){
      localStorage.removeItem('token');
      navigate("login")
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);