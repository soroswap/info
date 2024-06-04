import { NextApiRequest, NextApiResponse } from "next";
import { fetchTokenList } from "services/tokens";
import { Network } from "types/network";
import { Token, TokenType } from "types/tokens";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const queryParams = req.query;

  let network = queryParams?.network as Network;
  const address = queryParams?.address as string;

  if (network && network !== "MAINNET" && network !== "TESTNET") {
    network = "MAINNET";
  }

  try {
    const tokenList: TokenType[] = await fetchTokenList({ network });

    const tokens: Token[] = tokenList.map((t) => ({
      asset: t,
      fees24h: 0,
      price: 0,
      priceChange24h: 0,
      tvl: 0,
      tvlSlippage24h: 0,
      tvlSlippage7d: 0,
      volume24h: 0,
      volume24hChange: 0,
      volume7d: 0,
      volume7dChange: 0,
    }));

    if (address) {
      const filteredData = tokens.find(
        (token) => token.asset.contract === address
      );

      return res.json(filteredData);
    }

    return res.json(tokens);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch token list" });
  }
}

export default handler;
