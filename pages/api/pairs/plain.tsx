import { NextApiRequest, NextApiResponse } from "next";
import { fetchTokenList } from "services/tokens";
import { Network } from "types/network";
import { TokenType } from "types/tokens";
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
  
  const full = queryParams?.full === 'true';

  let network = queryParams?.network as string;
  network = network?.toUpperCase() as Network;

  if (network !== "MAINNET" && network !== "TESTNET") {
    return res.status(400).json({ error: "Invalid network" });
  }

  try {
    const tokenList: TokenType[] = await fetchTokenList({ network });
    const allowedContracts = tokenList.map(token => token.contract);
    
    const data = await getMercuryPools(network);

    if (full) {
      return res.json(data);
    }
    
    const filteredData = data.filter(pair => 
      allowedContracts.includes(pair.tokenA) && allowedContracts.includes(pair.tokenB)
    );

    if (address) {
      const pool = data.find((pair) => pair.address === address);
      return res.json(pool);
    }

    return res.json(filteredData);

  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch token list" });
  }
}

export default handler;
