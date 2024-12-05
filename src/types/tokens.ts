import { PriceChartData, TvlChartData, VolumeChartData } from "./pools";

export interface Token {
  fees24h: number;
  asset: TokenType;
  tvl: number;
  price: number;
  priceChange24h: number;
  volume24h: number;
  volume7d: number;
  tvlSlippage7d: number;
  tvlSlippage24h: number;
  volume24hChange: number;
  volume7dChange: number;
  volumeChartData?: VolumeChartData[];
  tvlChartData?: TvlChartData[];
  priceChartData?: PriceChartData[];
  issuer: string;
}

export interface TokenFeesChartData {
  date: string;
  fees: number;
  timestamp: number;
}

export interface TokenStats {
  volume24h: number;
  volume7d: number;
  volumeAllTime: number;
  fees24h: number;
  fees7d: number;
  feesAllTime: number;
}

export interface TokenType {
  code: string;
  issuer?: string;
  contract: string;
  name?: string;
  org?: string;
  domain?: string;
  icon?: string;
  decimals?: number;
}
