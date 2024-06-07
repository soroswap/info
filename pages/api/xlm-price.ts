import { NextApiRequest, NextApiResponse } from "next";
import { fetchTokenList } from "services/tokens";
import { Network } from "types/network";
import { TokenType } from "types/tokens";
import { getRouterFromPools, getTokenPrice } from "utils/info";
import { Networks } from "@stellar/stellar-sdk";
import { getMercuryPools } from "./pairs";
import { getMercuryRsvCh } from "zephyr/helpers";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const queryParams = req.query;

  let network = queryParams?.network as Network;

  if (network && network !== "MAINNET" && network !== "TESTNET") {
    network = "MAINNET";
  }

  try {
    const tokenList: TokenType[] = await fetchTokenList({ network });

    const pools = await getMercuryPools(network);

    let stellarNetwork = null;

    if (network === "MAINNET") {
      stellarNetwork = Networks.PUBLIC;
    } else {
      stellarNetwork = Networks.TESTNET;
    }

    const router = getRouterFromPools(pools, stellarNetwork);

    const XLM = tokenList.find((token) => token.code === "XLM");
    const USDC = tokenList.find((token) => token.code === "USDC");

    if (!XLM || !USDC) {
      return res.json(0);
    }

    const price = await getTokenPrice(
      XLM?.contract,
      USDC?.contract,
      stellarNetwork,
      router
    );

    return res.json(price);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch token list" });
  }
}

export default handler;
