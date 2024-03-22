export interface Pool {
  pool: string;
  token0: PoolToken;
  token1: PoolToken;
  reserve0: number;
  reserve1: number;
  tvl: number;
  volume24h: number;
  volume7d: number;
  fees24h: number;
  feesYearly: number;
  liquidity: number;
}

export interface PoolToken {
  name: string;
  symbol: string;
  logo: string;
  contract: string;
}
