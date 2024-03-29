export interface Token {
  fees24h: number;
  name: string;
  asset: TokenType
  tvl: number;
  price: number;
  priceChange24h: number;
  volume24h: number;
  volume7d: number;
  tvlSlippage7d: number;
  tvlSlippage24h: number;
  volume24hChange: number;
  volume7dChange: number;
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
