import * as StellarSdk from "@stellar/stellar-sdk";
import { Network } from "types/network";
import { getMercuryInstance } from "./mercury";
import { ZEPHYR_TABLES } from "./tables";
import { GET_ALL_PAIRS } from "./queries/getAllPairs";
import { MercuryPair } from "../../pages/api/pairs";
import { GET_ALL_RSV_CH } from "./queries/getAllRsvCh";
import { GET_ALL_EVENTS } from "./queries/getAllEvents";
import { MercuryEvent } from "../../pages/api/events";

export const parseScvalValue = (value: any) => {
  const scval = StellarSdk.xdr.ScVal.fromXDR(value, "base64");
  return StellarSdk.scValToNative(scval);
};

export const parseMercuryScvalResponse = (data: any) => {
  return data?.map((d: any) => {
    let n: any = {};

    for (let key in d) {
      const value = parseScvalValue(d[key]);

      if (typeof value === "bigint" || typeof value === "number") {
        n[key] = value.toString();
      } else {
        n[key] = value;
      }
    }

    return n;
  });
};

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

export interface MercuryRsvCh {
  address: string;
  reserveA: string;
  reserveB: string;
  timestamp: string;
}

export const getMercuryRsvCh = async (network: Network) => {
  const mercuryInstance = getMercuryInstance(network);

  const response = await mercuryInstance.getCustomQuery({
    request: GET_ALL_RSV_CH(ZEPHYR_TABLES[network].RSV_CH),
  });

  const parsedData: MercuryRsvCh[] = parseMercuryScvalResponse(
    response.data?.events?.data
  );

  return parsedData;
};

export const getMercuryEvents = async (network: Network) => {
  const mercuryInstance = getMercuryInstance(network);

  const response = await mercuryInstance.getCustomQuery({
    request: GET_ALL_EVENTS(ZEPHYR_TABLES[network].EVENTS),
  });

  const parsedData: MercuryEvent[] = parseMercuryScvalResponse(
    response.data?.events?.data
  );

  return parsedData;
};
