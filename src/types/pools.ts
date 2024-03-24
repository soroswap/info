import { TokenType } from "./tokens";

export interface Pool {
  pool: string;
  token0: TokenType;
  token1: TokenType;
  reserve0: number;
  reserve1: number;
  tvl?: number;
  volume24h?: number;
  volume7d?: number;
  fees24h?: number;
  feesYearly?: number;
  liquidity?: number;
}
