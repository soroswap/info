export interface Pool {
  pool: string;
  token0: string;
  token1: string;
  reserve0: number;
  reserve1: number;
  tvl: number;
  volume24h: number;
  volume7d: number;
  fees24h: number;
  feesYearly: number;
  liquidity: number;
}
