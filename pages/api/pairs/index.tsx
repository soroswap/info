import { buildPoolsInfo } from "utils/info";
import { fetchTokenList } from "services/tokens";
import { GET_ALL_PAIRS } from "zephyr/queries/getAllPairs";
import { getMercuryInstance } from "zephyr/mercury";
import { Network } from "types/network";
import { NextApiRequest, NextApiResponse } from "next";
import { parseMercuryScvalResponse } from "zephyr/helpers";
import { TokenType } from "types/tokens";
import { ZEPHYR_TABLES } from "zephyr/tables";

export interface MercuryPair {
  tokenA: string;
  tokenB: string;
  address: string;
  reserveA: string;
  reserveB: string;
}

export const getMercuryPools = async (network: Network) => {
  const mercuryInstance = getMercuryInstance(network);

  const response = await mercuryInstance.getCustomQuery({
    request: GET_ALL_PAIRS(ZEPHYR_TABLES[network].PAIRS),
  });

  const parsedData: MercuryPair[] = parseMercuryScvalResponse(
    response.data?.events?.data
  );

  return parsedData;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const queryParams = req.query;

  const address = queryParams?.address as string;
  const network = queryParams?.network as Network;

  if (network !== "MAINNET" && network !== "TESTNET") {
    return res.status(400).json({ error: "Invalid network" });
  }

  const tokenList: TokenType[] = await fetchTokenList({ network });

  const result = await buildPoolsInfo(tokenList, network);

  if (address) {
    const pool = result.find((pair) => pair.address === address);
    return res.json(pool);
  }

  return res.json(result);
}

export default handler;
