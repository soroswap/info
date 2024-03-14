import { useQuery } from "@tanstack/react-query";
import { fetchPool, fetchPools } from "../services/pools";

const key = "pools";

export const useQueryPools = () => {
  return useQuery({ queryKey: [key], queryFn: fetchPools });
};

export const useQueryPool = ({ poolAddress }: { poolAddress: string }) => {
  return useQuery({
    queryKey: [key, poolAddress],
    queryFn: () => fetchPool({ poolAddress }),
  });
};
