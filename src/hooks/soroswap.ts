import { useQuery } from "@tanstack/react-query";
import {
  fetchSoroswapFees24h,
  fetchSoroswapRouterEvents,
  fetchSoroswapTVL,
  fetchSoroswapTVLChart,
  fetchSoroswapVolume24h,
  fetchSoroswapVolumeChart,
} from "../services/soroswap";
import { RouterEventType } from "../types/router-events";

const key = "soroswap";

export const useQuerySoroswapTVL = () => {
  return useQuery({ queryKey: [key, "tvl"], queryFn: fetchSoroswapTVL });
};

export const useQuerySoroswapFees24h = () => {
  return useQuery({
    queryKey: [key, "fees24h"],
    queryFn: fetchSoroswapFees24h,
  });
};

export const useQuerySoroswapVolume24h = () => {
  return useQuery({
    queryKey: [key, "volume24h"],
    queryFn: fetchSoroswapVolume24h,
  });
};

export const useQuerySoroswapVolumeChart = () => {
  return useQuery({
    queryKey: [key, "volume-chart"],
    queryFn: fetchSoroswapVolumeChart,
  });
};

export const useQuerySoroswapTVLChart = () => {
  return useQuery({
    queryKey: [key, "tvl-chart"],
    queryFn: fetchSoroswapTVLChart,
  });
};

export const useQuerySoroswapRouterEvents = (topic2?: RouterEventType, first?: number, offset?: number) => {
  return useQuery({
    queryKey: ['routerEvents', topic2, first, offset],
    queryFn: () => fetchSoroswapRouterEvents(topic2, first, offset),
  });
};