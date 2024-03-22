import { useQuery } from "@tanstack/react-query";
import {
  fetchSoroswapTVL,
  fetchSoroswapFees24h,
  fetchSoroswapVolume24h,
  fetchSoroswapVolumeChart,
  fetchSoroswapTVLChart,
} from "../services/soroswap";

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
