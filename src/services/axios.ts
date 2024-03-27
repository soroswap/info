import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SOROSWAP_BACKEND_URL,
  headers: {
    apiKey: process.env.NEXT_PUBLIC_SOROSWAP_BACKEND_API_KEY,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const queryParams = new URLSearchParams(window.location.search);
    const network = queryParams.get("network");

    const url = new URL(config.url as string, config.baseURL);

    const isValid = network === "mainnet" || network === "testnet";

    if (isValid) {
      url.searchParams.set("network", network.toUpperCase());
    } else {
      throw new Error("Invalid network");
    }

    config.url = url.toString();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
