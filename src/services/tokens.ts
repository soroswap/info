import { Token } from "../types/tokens";
import axiosInstance from "./axios";

export const fetchTokens = async () => {
  const { data } = await axiosInstance.get<Token[]>(
    "/info/tokens?protocols=soroswap&network=MAINNET"
  );
  return data;
};

export const fetchToken = async ({
  tokenAddress,
}: {
  tokenAddress: string;
}) => {
  const { data } = await axiosInstance.get<Token>(
    `/info/token/${tokenAddress}?protocols=soroswap&network=MAINNET`
  );
  return data;
};

export const fetchTokenTVLChart = async ({
  tokenAddress,
}: {
  tokenAddress: string;
}) => {
  const { data } = await axiosInstance.get(
    `/info/token/tvl-chart/${tokenAddress}?protocols=soroswap&network=MAINNET`
  );
  return data;
};

export const fetchTokenPriceChart = async ({
  tokenAddress,
}: {
  tokenAddress: string;
}) => {
  const { data } = await axiosInstance.get(
    `/info/token/price-chart/${tokenAddress}?protocols=soroswap&network=MAINNET`
  );
  return data;
};

export const fetchTokenVolumeChart = async ({
  tokenAddress,
}: {
  tokenAddress: string;
}) => {
  const { data } = await axiosInstance.get(
    `/info/token/volume-chart/${tokenAddress}?protocols=soroswap&network=MAINNET`
  );
  return data;
};
