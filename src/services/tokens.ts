import axiosInstance from "./axios";

export const fetchTokens = async () => {
  const { data } = await axiosInstance.get("/info/tokens");
  return data;
};

export const fetchToken = async ({
  tokenAddress,
}: {
  tokenAddress: string;
}) => {
  const { data } = await axiosInstance.get(`/info/token/${tokenAddress}`);
  return data;
};
