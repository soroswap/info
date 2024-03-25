import { Pool } from "../types/pools";
import axiosInstance from "./axios";

export const fetchPools = async () => {
  const { data } = await axiosInstance.get<Pool[]>(
    "/info/pools?protocols=soroswap"
  );
  return data;
};

export const fetchPool = async ({ poolAddress }: { poolAddress: string }) => {
  const { data } = await axiosInstance.get<Pool>(
    `/info/pool/${poolAddress}?protocols=soroswap`
  );
  return data;
};

export const fetchPoolTVLChart = async ({
  poolAddress,
}: {
  poolAddress: string;
}) => {
  const { data } = await axiosInstance.get<{ tvl: number; date: string }[]>(
    `/info/pool/tvl-chart/${poolAddress}?protocols=soroswap`
  );
  return data;
};

export const fetchPoolFeesChart = async ({
  poolAddress,
}: {
  poolAddress: string;
}) => {
  const { data } = await axiosInstance.get<{ fees: number; date: string }[]>(
    `/info/pool/fees-chart/${poolAddress}?protocols=soroswap`
  );
  return data;
};

export const fetchPoolVolumeChart = async ({
  poolAddress,
}: {
  poolAddress: string;
}) => {
  const { data } = await axiosInstance.get<{ volume: number; date: string }[]>(
    `/info/pool/volume-chart/${poolAddress}?protocols=soroswap`
  );
  return data;
};

export const fetchPoolsByTokenAddress = async ({
  tokenAddress,
}: {
  tokenAddress: string;
}) => {
  const { data } = await axiosInstance.get(`/info/pools/${tokenAddress}`);
  return data;
};
