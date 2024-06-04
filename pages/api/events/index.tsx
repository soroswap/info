import { fetchTokenList } from "services/tokens";
import { GET_ALL_EVENTS } from "zephyr/queries/getAllEvents";
import { getMercuryInstance } from "zephyr/mercury";
import { NextApiRequest, NextApiResponse } from "next";
import { parseMercuryScvalResponse } from "zephyr/helpers";
import { RouterEventAPI, RouterEventType } from "types/router-events";
import { TokenType } from "types/tokens";
import { Network } from "types/network";

interface MercuryEvent {
  tokenA: string;
  tokenB: string;
  eType: "swap" | "add" | "remove";
  amountA: string;
  amountB: string;
  account: string;
}

export const adjustAmountByDecimals = (
  amountStr: string,
  decimals: number | undefined
): string => {
  const defaultDecimals = 7;
  const actualDecimals = decimals ?? defaultDecimals;

  while (amountStr.length <= actualDecimals) {
    amountStr = "0" + amountStr;
  }

  const integerPart = amountStr.slice(0, -actualDecimals);
  const decimalPart = amountStr.slice(-actualDecimals);
  const result = integerPart + "." + decimalPart;

  return result.replace(/(\.\d*[1-9])0+$|\.0*$/, "$1");
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const queryParams = req.query;

  const address = queryParams?.address as string;
  const network = queryParams?.network as Network;
  const type = queryParams?.type as RouterEventType;

  if (network === "MAINNET") {
    return res.json([]);
  }

  const mercuryInstance = getMercuryInstance();

  const response = await mercuryInstance.getCustomQuery({
    request: GET_ALL_EVENTS,
  });

  if (response.ok) {
    const parsedData: MercuryEvent[] = parseMercuryScvalResponse(
      response.data.events.data
    );

    const tokenList = await fetchTokenList({ network });

    let data: RouterEventAPI[] = parsedData.map((event) => {
      const tokenA = tokenList.find(
        (token: TokenType) => token.contract === event.tokenA
      );
      const tokenB = tokenList.find(
        (token: TokenType) => token.contract === event.tokenB
      );

      return {
        ...event,
        txHash: "",
        timestamp: 0,
        tokenA: tokenA
          ? tokenA
          : { contract: event.tokenA, code: event.tokenA, name: event.tokenA },
        tokenB: tokenB
          ? tokenB
          : { contract: event.tokenB, code: event.tokenB, name: event.tokenB },
        amountA: adjustAmountByDecimals(event.amountA, tokenA?.decimals),
        amountB: adjustAmountByDecimals(event.amountB, tokenB?.decimals),
      };
    });

    if (type) {
      data = data.filter((event) => event.eType === type);
    }

    if (address) {
      data = data.filter(
        (event) =>
          event.tokenA?.contract === address ||
          event.tokenB?.contract === address
      );
    }

    return res.json(data);
  }

  return res.status(500).json({ error: "Failed to fetch pairs from mercury" });
}

export default handler;
