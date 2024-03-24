import { RouterEvents } from "../types/router-events";
import axiosInstance from "./axios";

export const fetchSoroswapFees24h = async () => {
  const { data } = await axiosInstance.get<{
    fees: number;
    variationLast24h: number;
  }>("/info/soroswapFees24h?protocols=soroswap&network=MAINNET");
  return data;
};

export const fetchSoroswapVolume24h = async () => {
  const { data } = await axiosInstance.get<{
    volume: number;
    variation: number;
  }>(`/info/volume24h?protocols=soroswap&network=MAINNET`);
  return data;
};

export const fetchSoroswapTVL = async () => {
  const { data } = await axiosInstance.get<{ tvl: number; variation: number }>(
    `/info/soroswapTvl?protocols=soroswap&network=MAINNET`
  );
  return data;
};

export const fetchSoroswapTVLChart = async () => {
  const { data } = await axiosInstance.get(
    `/info/soroswap/tvl-chart?protocols=soroswap&network=MAINNET`
  );
  return data;
};

export const fetchSoroswapVolumeChart = async () => {
  const { data } = await axiosInstance.get(
    `/info/soroswap/volume-chart?protocols=soroswap&network=MAINNET`
  );
  return data;
};

export const fetchSoroswapRouterEvents = async (topic2?: string, first?: number, offset?: number) => {
  const { data } = await axiosInstance.post<RouterEvents>(
    `/events/router?network=MAINNET`,
    {
      topic2,
      first,
      offset,
    },
    );
  return data;
};

export const fetchPoolsOfToken = async (contract: string) => {
  const { data } = await axiosInstance.get(`/info/pools/${contract}?network=MAINNET`)
  return data
}
