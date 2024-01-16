export interface TokensData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  v24: number;
  tvl: number;
}

function createData(
  id: string,
  name: string,
  symbol: string,
  price: number,
  change: number,
  v24: number,
  tvl: number
): TokensData {
  return {
    id,
    name,
    symbol,
    price,
    change,
    v24,
    tvl,
  };
}

export const rows: TokensData[] = [
  createData(
    "0xc2cdf9626bc03e24f779434178a73a0b4bad62ed",
    "Tether USD",
    "USDT",
    1690.71,
    0.29,
    14091979,
    6184693
  ),
  createData(
    "0xc2cdf9626bc03e24f779434178a73a0b4bad62e2",
    "Bitcoin",
    "BTC",
    2066.84,
    1.22,
    11397903,
    29538868
  ),
  createData(
    "0xc2cdf9626bc03e24f779434178a73a0b4bad62e3",
    "Ethereum",
    "ETH",
    981.2,
    -0.18,
    1627262,
    24308785
  ),
  createData(
    "0xc2cdf9626bc03e24f779434178a73a0b4bad62e4",
    "Ripple",
    "XRP",
    4137.69,
    2.35,
    5502269,
    19869732
  ),
  createData(
    "0xc2cdf9626bc03e24f779434178a73a0b4bad62e5",
    "Litecoin",
    "LTC",
    1540.67,
    2.96,
    7745698,
    28193539
  ),
  createData(
    "0xc2cdf9626bc03e24f779434178a73a0b4bad62e6",
    "Cardano",
    "ADA",
    3408.92,
    -1.99,
    6635886,
    18750693
  ),
  createData(
    "0xc2cdf9626bc03e24f779434178a73a0b4bad62e7",
    "Polkadot",
    "DOT",
    4303.12,
    2.85,
    5045217,
    9525834
  ),
  createData(
    "0xc2cdf9626bc03e24f779434178a73a0b4bad62e8",
    "Chainlink",
    "LINK",
    560.5,
    -2.32,
    19535310,
    10092550
  ),
  createData(
    "0xc2cdf9626bc03e24f779434178a73a0b4bad62e9",
    "Binance Coin",
    "BNB",
    4370.79,
    -1.23,
    19036235,
    14006176
  ),
  createData(
    "0xc2cdf9626bc03e24f779434178a73a0b4bad62e10",
    "Solana",
    "SOL",
    1782.48,
    -0.94,
    2045126,
    10102621
  ),
];
