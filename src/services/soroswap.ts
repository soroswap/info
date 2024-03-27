import { RouterEventsAPIResponse } from "../types/router-events";
import { TokenType } from "../types/tokens";
import { fillDatesAndSort } from "../utils/complete-chart";
import { adjustAmountByDecimals } from "../utils/utils";
import axiosInstance from "./axios";

export const fetchSoroswapFees24h = async () => {
  const { data } = await axiosInstance.get<{
    fees: number;
    variationLast24h: number;
  }>("/info/soroswapFees24h?protocols=soroswap");
  return data;
};

export const fetchSoroswapVolume24h = async () => {
  const { data } = await axiosInstance.get<{
    volume: number;
    variation: number;
  }>(`/info/volume24h?protocols=soroswap`);
  return data;
};

export const fetchSoroswapTVL = async () => {
  const { data } = await axiosInstance.get<{ tvl: number; variation: number }>(
    `/info/soroswapTvl?protocols=soroswap`
  );
  return data;
};

export const fetchSoroswapTVLChart = async () => {
  const { data } = await axiosInstance.get<{ tvl: number; date: string }[]>(
    `/info/soroswap/tvl-chart?protocols=soroswap`
  );

  const filledData = fillDatesAndSort(data, "tvl");

  return filledData;
};

export const fetchSoroswapVolumeChart = async () => {
  const { data } = await axiosInstance.get<{ volume: number; date: string }[]>(
    `/info/soroswap/volume-chart?protocols=soroswap`
  );

  const filledData = fillDatesAndSort(data, "volume");

  return filledData;
};

export const fetchSoroswapRouterEvents = async (
  topic2?: string,
  first?: number,
  offset?: number
) => {
  const { data } = await axiosInstance.post<RouterEventsAPIResponse>(
    `/events/router`,
    {
      topic2,
      first,
      offset,
    }
  );

  return data;
};
