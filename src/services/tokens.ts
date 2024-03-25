import { Token } from "../types/tokens";
import axiosInstance from "./axios";

export const fetchTokens = async () => {
  const { data } = await axiosInstance.get<Token[]>(
    "/info/tokens?protocols=soroswap"
  );
  return data;
};

export const fetchToken = async ({
  tokenAddress,
}: {
  tokenAddress: string;
}) => {
  const { data } = await axiosInstance.get<Token>(
    `/info/token/${tokenAddress}?protocols=soroswap`
  );
  return data;
};

export const fetchTokenTVLChart = async ({
  tokenAddress,
}: {
  tokenAddress: string;
}) => {
  const { data } = await axiosInstance.get<{ tvl: number; date: string }[]>(
    `/info/token/tvl-chart/${tokenAddress}?protocols=soroswap`
  );
  return data;
};

export const fetchTokenPriceChart = async ({
  tokenAddress,
}: {
  tokenAddress: string;
}) => {
  const { data } = await axiosInstance.get<{ price: number; date: string }[]>(
    `/info/token/price-chart/${tokenAddress}?protocols=soroswap`
  );
  return data;
};

export const fetchTokenVolumeChart = async ({
  tokenAddress,
}: {
  tokenAddress: string;
}) => {
  const { data } = await axiosInstance.get<{ volume: number; date: string }[]>(
    `/info/token/volume-chart/${tokenAddress}?protocols=soroswap`
  );
  return data;
};
