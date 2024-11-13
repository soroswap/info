// src/types/liquidity-providers.ts

export interface LiquidityProvider {
    address: string;  // The account address of the liquidity provider
    tvl: number;      // Total Value Locked for this provider
    poolShare: number; // Provider's share of the pool as a percentage
  }
  
  // If you need any additional types related to liquidity providers, add them here
  export interface LiquidityProviderTableProps {
    rows: LiquidityProvider[];
    emptyMessage?: string;
    isLoading?: boolean;
    itemsPerPage?: number;
  }