import axiosInstance from "./axios";

export const fetchPools = async () => {
  const { data } = await axiosInstance.get("/info/pools");
  return data;
};

export const fetchPool = async ({ poolAddress }: { poolAddress: string }) => {
  const { data } = await axiosInstance.get(`/info/pool/${poolAddress}`);
  return data;
};
