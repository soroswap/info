import { Pool } from "../types/pools";
import axiosInstance from "./axios";

export const fetchPools = async () => {
  const { data } = await axiosInstance.get<Pool[]>(
    "/info/pools?protocols=soroswap&network=MAINNET"
  );
  return data;
};

export const fetchPool = async ({ poolAddress }: { poolAddress: string }) => {
  const { data } = await axiosInstance.get<Pool>(
    `/info/pool/${poolAddress}?protocols=soroswap&network=MAINNET`
  );
  return data;
};
