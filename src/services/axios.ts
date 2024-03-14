import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SOROSWAP_BACKEND_URL,
  headers: {
    apiKey: process.env.NEXT_PUBLIC_SOROSWAP_BACKEND_API_KEY,
  },
});

export default axiosInstance;
