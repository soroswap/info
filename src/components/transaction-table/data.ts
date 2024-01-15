export type ActionName = "Swap" | "Add" | "Remove";

export interface TransactionsData {
  name: ActionName;
  value: number;
  amount0: number;
  symbol0: string;
  amount1: number;
  symbol1: string;
  account: string;
  time: number;
}

function createData(
  name: ActionName,
  value: number,
  amount0: number,
  symbol0: string,
  amount1: number,
  symbol1: string,
  account: string,
  time: number
): TransactionsData {
  return {
    name,
    value,
    amount0,
    symbol0,
    amount1,
    symbol1,
    account,
    time,
  };
}

export const rows: TransactionsData[] = [
  createData(
    "Remove",
    28695,
    41,
    "LTC",
    770,
    "BNB",
    "0x5DE39C7FE4D81F06D8F2BC05F8E098F04617E83C",
    1704985943
  ),
  createData(
    "Add",
    40255,
    754,
    "USDT",
    23,
    "SOL",
    "0xDE9DBF3FCABA35625DD1E7B8287E41720CC914DE",
    1704985943
  ),
  createData(
    "Remove",
    44258,
    976,
    "XRP",
    806,
    "BNB",
    "0x478E9CF9FF0E021C99CF52BCEDBC012863A292C7",
    1704985943
  ),
  createData(
    "Remove",
    40942,
    194,
    "LTC",
    233,
    "BTC",
    "0xB02569E7AE6D1C2412BD1BD72098EFFB2ED4EC18",
    1704985943
  ),
  createData(
    "Remove",
    37082,
    915,
    "XRP",
    749,
    "BTC",
    "0x0AA3BBE63B3CC453D34661DEFE3FB3EBB84BB921",
    1704985943
  ),
  createData(
    "Remove",
    11969,
    655,
    "BTC",
    749,
    "DOT",
    "0x66F5B988552E148365EF439F9028C7AA8CF3E39B",
    1704985943
  ),
  createData(
    "Swap",
    8190,
    663,
    "ETH",
    576,
    "USDT",
    "0x33F8B6AEF0BC25A6CA9CA3FF95AA77BEE967EDB6",
    1704985943
  ),
  createData(
    "Remove",
    8982,
    867,
    "BNB",
    480,
    "ETH",
    "0xD8ECD44764D797DD744DA6980114C4AAF7FE8721",
    1704985943
  ),
  createData(
    "Swap",
    14169,
    971,
    "SOL",
    561,
    "ETH",
    "0x665B8DED49B8F9C125FBC4E50098E117F8D3558D",
    1704985943
  ),
  createData(
    "Remove",
    47587,
    645,
    "XRP",
    237,
    "LTC",
    "0xFD190924FD8A92DD56AA3ECE1323302F087AD6A6",
    1704985943
  ),
  createData(
    "Add",
    9238,
    668,
    "DOT",
    23,
    "LTC",
    "0x5EC202EEA6A4D48620CE97DFBD909C9156EF5BF1",
    1704985943
  ),
];
