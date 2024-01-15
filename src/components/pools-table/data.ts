export interface PoolsData {
  id: string;
  pool: string;
  tvl: number;
  v24: number;
  v7: number;
}

function createData(
  id: string,
  pool: string,
  tvl: number,
  v24: number,
  v7: number
): PoolsData {
  return {
    id,
    pool,
    tvl,
    v24,
    v7,
  };
}

export const rows: PoolsData[] = [
  createData(
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62ed",
    "ETH/USDT",
    6139289,
    6971544,
    4791297
  ),
  createData(
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62e2",
    "BTC/USDC",
    12994939,
    19421059,
    19843850
  ),
  createData(
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62e3",
    "ADA/ETH",
    4369673,
    18270992,
    16446706
  ),
  createData(
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62e4",
    "XRP/BTC",
    2658405,
    10138442,
    19187029
  ),
  createData(
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62e5",
    "LTC/ETH",
    19059460,
    14313574,
    15025412
  ),
  createData(
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62e6",
    "DOT/USDT",
    9855014,
    15094769,
    15756642
  ),
  createData(
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62e7",
    "LINK/USDC",
    16310947,
    8405003,
    1859308
  ),
  createData(
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62e8",
    "UNI/BTC",
    3733989,
    6717321,
    12314030
  ),
  createData(
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62e9",
    "AAVE/ETH",
    3829729,
    9031448,
    10213830
  ),
  createData(
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62e10",
    "SOL/USDT",
    16515659,
    12376324,
    7672210
  ),
];
