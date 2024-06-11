import { TokenType } from "./tokens";

export interface TvlChartData {
  date: string;
  tvl: number;
  timestamp?: string;
}

export interface VolumeChartData {
  date: string;
  volume: number;
  timestamp?: string;
}

export interface FeesChartData {
  date: string;
  fees: number;
  timestamp?: string;
}

export interface Pool {
  address: string;
  tokenA: TokenType;
  tokenB: TokenType;
  reserveA: string;
  reserveB: string;
  tokenAPrice: number;
  tokenBPrice: number;
  tvl?: number;
  volume24h?: number;
  volume7d?: number;
  fees24h?: number;
  feesYearly?: number;
  tvlChartData?: TvlChartData[];
  volumeChartData?: VolumeChartData[];
  feesChartData?: FeesChartData[];
}
