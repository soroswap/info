import { RouterEvents } from "../types/router-events";
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
  return data;
};

export const fetchSoroswapVolumeChart = async () => {
  const { data } = await axiosInstance.get<{ volume: number; date: string }[]>(
    `/info/soroswap/volume-chart?protocols=soroswap`
  );
  return data;
};

export const fetchSoroswapRouterEvents = async (
  topic2?: string,
  first?: number,
  offset?: number
) => {
  const { data } = await axiosInstance.post<RouterEvents>(`/events/router`, {
    topic2,
    first,
    offset,
  });
  return data;
};
