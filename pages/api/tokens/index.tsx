import { NextApiRequest, NextApiResponse } from "next";
import { fetchTokenList } from "services/tokens";
import { Network } from "types/network";
import { Token, TokenType } from "types/tokens";
import { buildTokensInfo } from "utils/info";
import { getMercuryPools } from "../pairs";
import { Networks } from "@stellar/stellar-sdk";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const queryParams = req.query;

  let network = queryParams?.network as Network;
  const address = queryParams?.address as string;

  if (network && network !== "MAINNET" && network !== "TESTNET") {
    network = "MAINNET";
  }

  try {
    const tokenList: TokenType[] = await fetchTokenList({ network });

    const tokens2: Token[] = tokenList.map((t) => ({
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

    const pools = await getMercuryPools(network);

    let stellarNetwork = null;

    if (network === "MAINNET") {
      stellarNetwork = Networks.PUBLIC;
    } else {
      stellarNetwork = Networks.TESTNET;
    }

    const tokens = await buildTokensInfo(tokens2, stellarNetwork, pools);

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
