import { useQuery } from "@tanstack/react-query";
import {
  fetchPool,
  fetchPoolFeesChart,
  fetchPoolTVLChart,
  fetchPoolVolumeChart,
  fetchPools,
} from "../services/pools";

const key = "pools";

export const useQueryPools = () => {
  return useQuery({ queryKey: [key], queryFn: fetchPools });
};

export const useQueryPool = ({ poolAddress }: { poolAddress: string }) => {
  return useQuery({
    queryKey: [key, poolAddress],
    queryFn: () => fetchPool({ poolAddress }),
    enabled: !!poolAddress,
  });
};

export const useQueryPoolTVLChart = ({
  poolAddress,
}: {
  poolAddress: string;
}) => {
  return useQuery({
    queryKey: [key, poolAddress, "tvl-chart"],
    queryFn: () => fetchPoolTVLChart({ poolAddress }),
    enabled: !!poolAddress,
  });
};

export const useQueryPoolFeesChart = ({
  poolAddress,
}: {
  poolAddress: string;
}) => {
  return useQuery({
    queryKey: [key, poolAddress, "fees-chart"],
    queryFn: () => fetchPoolFeesChart({ poolAddress }),
    enabled: !!poolAddress,
  });
};

export const useQueryPoolVolumeChart = ({
  poolAddress,
}: {
  poolAddress: string;
}) => {
  return useQuery({
    queryKey: [key, poolAddress, "volume-chart"],
    queryFn: () => fetchPoolVolumeChart({ poolAddress }),
    enabled: !!poolAddress,
  });
};
