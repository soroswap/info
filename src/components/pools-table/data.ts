export interface PoolsData {
  id: string;
  pool: string;
  tvl: number;
  v24: number;
  v7: number;
  fees24: number;
  feesYearly: number;
}

function createData(
  id: string,
  pool: string,
  tvl: number,
  v24: number,
  v7: number,
  fees24: number,
  feesYearly: number
): PoolsData {
  return {
    id,
    pool,
    tvl,
    v24,
    v7,
    fees24,
    feesYearly,
  };
}

export const rows: PoolsData[] = [
  createData(
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62ed",
    "ETH/USDT",
    6139289,
    6971544,
    4791297,
    15183471,
    0.5
  ),
  createData(
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62e2",
    "BTC/USDC",
    12994939,
    19421059,
    19843850,
    15183471,
    0.6
  ),
  createData(
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62e3",
    "ADA/ETH",
    4369673,
    18270992,
    16446706,
    15183471,
    2
  ),
  createData(
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62e4",
    "XRP/BTC",
    2658405,
    10138442,
    19187029,
    15183471,
    3
  ),
  createData(
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62e5",
    "LTC/ETH",
    19059460,
    14313574,
    15025412,
    15183471,
    0.8
  ),
  createData(
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62e6",
    "DOT/USDT",
    9855014,
    15094769,
    15756642,
    15183471,
    2
  ),
  createData(
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62e7",
    "LINK/USDC",
    16310947,
    8405003,
    1859308,
    15183471,
    1.2
  ),
  createData(
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62e8",
    "UNI/BTC",
    3733989,
    6717321,
    12314030,
    15183471,
    2
  ),
  createData(
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62e9",
    "AAVE/ETH",
    3829729,
    9031448,
    10213830,
    15183471,
    2
  ),
  createData(
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62e10",
    "SOL/USDT",
    16515659,
    12376324,
    7672210,
    15183471,
    2
  ),
];
