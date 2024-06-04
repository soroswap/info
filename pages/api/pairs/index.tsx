import { NextApiRequest, NextApiResponse } from "next";
import { fetchTokenList } from "services/tokens";
import { Network } from "types/network";
import { Pool } from "types/pools";
import { TokenType } from "types/tokens";
import { parseMercuryScvalResponse } from "zephyr/helpers";
import { getMercuryInstance } from "zephyr/mercury";
import { GET_ALL_PAIRS } from "zephyr/queries/getAllPairs";

interface MercuryPair {
  tokenA: string;
  tokenB: string;
  address: string;
  reserveA: string;
  reserveB: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const queryParams = req.query;

  const address = queryParams?.address as string;
  const network = queryParams?.network as Network;

  if (network === "MAINNET") {
    return res.json([]);
  }

  const mercuryInstance = getMercuryInstance();

  const response = await mercuryInstance.getCustomQuery({
    request: GET_ALL_PAIRS,
  });

  if (response.ok) {
    const tokenList = await fetchTokenList({ network });

    const parsedData: MercuryPair[] = parseMercuryScvalResponse(
      response.data.events.data
    );

    const poolsWithTokenData: Pool[] = parsedData.map((pool) => {
      const tokenA: TokenType = tokenList.find(
        (token: TokenType) => token.contract === pool.tokenA
      );

      const tokenB: TokenType = tokenList.find(
        (token: TokenType) => token.contract === pool.tokenB
      );

      return {
        ...pool,
        tokenA: tokenA
          ? tokenA
          : { contract: pool.tokenA, code: pool.tokenA, name: pool.tokenA },
        tokenB: tokenB
          ? tokenB
          : { contract: pool.tokenB, code: pool.tokenB, name: pool.tokenB },
        fees24h: 0,
        feesYearly: 0,
        liquidity: 0,
        tvl: 0,
        volume24h: 0,
        volume7d: 0,
      };
    });

    if (address) {
      const filteredData = poolsWithTokenData.find(
        (pair) => pair.address === address
      );

      return res.json(filteredData);
    }

    return res.json(poolsWithTokenData);
  }

  return res.status(500).json({ error: "Failed to fetch pairs from mercury" });
}

export default handler;
