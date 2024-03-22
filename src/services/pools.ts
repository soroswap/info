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

export const fetchPoolTVLChart = async ({
  poolAddress,
}: {
  poolAddress: string;
}) => {
  const { data } = await axiosInstance.get(
    `/info/pool/tvl-chart/${poolAddress}?protocols=soroswap&network=MAINNET`
  );
  return data;
};

export const fetchPoolFeesChart = async ({
  poolAddress,
}: {
  poolAddress: string;
}) => {
  const { data } = await axiosInstance.get(
    `/info/pool/fees-chart/${poolAddress}?protocols=soroswap&network=MAINNET`
  );
  return data;
};

export const fetchPoolVolumeChart = async ({
  poolAddress,
}: {
  poolAddress: string;
}) => {
  const { data } = await axiosInstance.get(
    `/info/pool/volume-chart/${poolAddress}?protocols=soroswap&network=MAINNET`
  );
  return data;
};
