import { useQuery } from "@tanstack/react-query";
import {
  fetchToken,
  fetchTokenPriceChart,
  fetchTokenTVLChart,
  fetchTokenVolumeChart,
  fetchTokens,
} from "../services/tokens";

const key = "tokens";

export const useQueryTokens = () => {
  return useQuery({ queryKey: [key], queryFn: fetchTokens });
};

export const useQueryToken = ({ tokenAddress }: { tokenAddress: string }) => {
  return useQuery({
    queryKey: [key, tokenAddress],
    queryFn: () => fetchToken({ tokenAddress }),
    enabled: !!tokenAddress,
  });
};

export const useQueryTokenTVLChart = ({
  tokenAddress,
}: {
  tokenAddress: string;
}) => {
  return useQuery({
    queryKey: [key, tokenAddress, "tvl-chart"],
    queryFn: () => fetchTokenTVLChart({ tokenAddress }),
    enabled: !!tokenAddress,
  });
};

export const useQueryTokenPriceChart = ({
  tokenAddress,
}: {
  tokenAddress: string;
}) => {
  return useQuery({
    queryKey: [key, tokenAddress, "price-chart"],
    queryFn: () => fetchTokenPriceChart({ tokenAddress }),
    enabled: !!tokenAddress,
  });
};

export const useQueryTokenVolumeChart = ({
  tokenAddress,
}: {
  tokenAddress: string;
}) => {
  return useQuery({
    queryKey: [key, tokenAddress, "volume-chart"],
    queryFn: () => fetchTokenVolumeChart({ tokenAddress }),
    enabled: !!tokenAddress,
  });
};
