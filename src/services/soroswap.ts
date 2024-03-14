import axiosInstance from "./axios";

export const fetchSoroswapFees24h = async () => {
  const { data } = await axiosInstance.get("/info/soroswapFees24h");
  return data;
};

export const fetchSoroswapVolume24h = async () => {
  const { data } = await axiosInstance.get(`/info/volume24h`);
  return data;
};

export const fetchSoroswapTVL = async () => {
  const { data } = await axiosInstance.get(`/info/soroswapTvl`);
  return data;
};
