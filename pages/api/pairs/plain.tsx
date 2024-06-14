import { Network } from "types/network";
import { NextApiRequest, NextApiResponse } from "next";
import { buildPoolsInfo } from "utils/info/pools";
import { TokenType } from "types/tokens";
import { fetchTokenList } from "services/tokens";
import { getMercuryPools } from "zephyr/helpers";

export interface MercuryPair {
  tokenA: string;
  tokenB: string;
  address: string;
  reserveA: string;
  reserveB: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const queryParams = req.query;

  const address = queryParams?.address as string;

  let network = queryParams?.network as string;
  network = network?.toUpperCase() as Network;

  if (network !== "MAINNET" && network !== "TESTNET") {
    return res.status(400).json({ error: "Invalid network" });
  }

  const data = await getMercuryPools(network);

  if (address) {
    const pool = data.find((pair) => pair.address === address);
    return res.json(pool);
  }

  return res.json(data);
}

export default handler;
