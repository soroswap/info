import { Token } from "../types/tokens";
import { fillDatesAndSort } from "../utils/complete-chart";
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

  const filledData = fillDatesAndSort(data, "tvl");

  return filledData;
};

export const fetchTokenPriceChart = async ({
  tokenAddress,
}: {
  tokenAddress: string;
}) => {
  const { data } = await axiosInstance.get<{ price: number; date: string }[]>(
    `/info/token/price-chart/${tokenAddress}?protocols=soroswap`
  );

  const filledData = fillDatesAndSort(data, "price");

  return filledData;
};

export const fetchTokenVolumeChart = async ({
  tokenAddress,
}: {
  tokenAddress: string;
}) => {
  const { data } = await axiosInstance.get<{ volume: number; date: string }[]>(
    `/info/token/volume-chart/${tokenAddress}?protocols=soroswap`
  );

  const filledData = fillDatesAndSort(data, "volume");

  return filledData;
};
