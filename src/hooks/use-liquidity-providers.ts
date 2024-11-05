// src/hooks/use-liquidity-providers.ts
import { useQuery } from "@tanstack/react-query";
import { LiquidityProvider } from "../types/liquidity-providers";

interface UseLiquidityProvidersProps {
  poolAddress?: string;
}

export const useLiquidityProviders = ({ poolAddress }: UseLiquidityProvidersProps) => {
  return useQuery({
    queryKey: ["liquidityProviders", poolAddress],
    queryFn: async () => {
      try {
        // This is temporary mock data - replace with actual API call
        const mockData: LiquidityProvider[] = [
          {
            address: "GBZV...DMUB",
            tvl: 1234.56,
            poolShare: 25.5,
          },
          {
            address: "GDZL...XVUC",
            tvl: 5678.90,
            poolShare: 15.3,
          },
          // Add more mock data as needed
        ];
        return mockData;
        
        // Uncomment this when API is ready:
        // const response = await fetch(`/api/pools/${poolAddress}/liquidity-providers`);
        // return await response.json();
      } catch (error) {
        console.error("Error fetching liquidity providers:", error);
        return [];
      }
    },
    enabled: !!poolAddress,
  });
};