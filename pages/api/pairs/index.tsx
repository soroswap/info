import { NextApiRequest, NextApiResponse } from "next";
import { fetchTokenList } from "services/tokens";
import { Network } from "types/network";
import { TokenType } from "types/tokens";
import { fillChart } from "utils/complete-chart";
import {
  buildPoolsInfo,
  getPoolTVL,
  getPoolTokenPrices,
  getRouterFromPools,
  stellarNetworkDict,
} from "utils/info";
import { getMercuryRsvCh, parseMercuryScvalResponse } from "zephyr/helpers";
import { getMercuryInstance } from "zephyr/mercury";
import { GET_ALL_PAIRS } from "zephyr/queries/getAllPairs";
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

  const { mercury, result } = await buildPoolsInfo(tokenList, network);

  if (address) {
    const pool = result.find((pair) => pair.address === address);

    const rsvch = await getMercuryRsvCh(network);
    const rsvFiltered = rsvch.filter((r) => r.address === address);

    const usdc = tokenList.find((t) => t.code === "USDC");

    const router = getRouterFromPools(mercury, stellarNetworkDict[network]);

    const { tokenAPrice, tokenBPrice } = await getPoolTokenPrices(
      pool?.tokenA.contract,
      pool?.tokenB.contract,
      usdc?.contract,
      stellarNetworkDict[network],
      router
    );

    const tvlChartData = await Promise.all(
      rsvFiltered.map(async (r) => {
        return {
          timestamp: r.timestamp,
          date: new Date(parseInt(r.timestamp) * 1000).toISOString(),
          tvl: await getPoolTVL(
            pool?.tokenA,
            pool?.tokenB,
            r.reserveA,
            r.reserveB,
            tokenAPrice,
            tokenBPrice
          ),
        };
      })
    );

    const filledTvlChartData = fillChart(tvlChartData, "tvl");

    return res.json({ ...pool, tvlChartData: filledTvlChartData });
  }

  return res.json(result);
}

export default handler;
