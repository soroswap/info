import { useQuery } from "@tanstack/react-query";
import { fetchToken, fetchTokens } from "../services/tokens";

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
