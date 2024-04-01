import axiosInstance from "./axios";

export const fetchXLMPrice = async () => {
  const { data } = await axiosInstance.get<number>("/info/xlmPrice");
  return data;
};
