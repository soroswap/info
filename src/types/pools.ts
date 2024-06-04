import { TokenType } from "./tokens";

export interface Pool {
  address: string;
  tokenA: TokenType;
  tokenB: TokenType;
  reserveA: string;
  reserveB: string;
  tvl?: number;
  volume24h?: number;
  volume7d?: number;
  fees24h?: number;
  feesYearly?: number;
  liquidity?: number;
}
