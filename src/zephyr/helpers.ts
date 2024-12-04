import * as StellarSdk from "@stellar/stellar-sdk";
import { Network } from "types/network";
import { MercuryEvent } from "../../pages/api/events";
import { MercuryPair } from "../../pages/api/pairs";
import { getMercuryInstance } from "./mercury";
import { GET_ALL_EVENTS } from "./queries/getAllEvents";
import { GET_ALL_PAIRS } from "./queries/getAllPairs";
import { GET_ALL_RSV_CH } from "./queries/getAllRsvCh";
import { fetchZephyrTables } from "./tables";

export const parseScvalValue = (value: any) => {
  const scval = StellarSdk.xdr.ScVal.fromXDR(value, "base64");
  return StellarSdk.scValToNative(scval);
};

export const parseMercuryScvalResponse = (data: any) => {
  // console.log("Raw data to parse (first 5):", data.slice(0, 5));
  
  return data?.map((d: any) => {
    let n: any = {};

    for (let key in d) {
      const value = parseScvalValue(d[key]);
      // console.log(`Parsing field ${key} (first 5):`, value);
      
      if (typeof value === "bigint" || typeof value === "number") {
        n[key] = value.toString();
      } else if(key == 'txHash'){
        const txHash = StellarSdk.xdr.Hash.fromXDR(value, 'hex').toString('hex')
        if(txHash.length != 64) throw new Error('Invalid txHash length');
        n[key] = txHash;
      } else if(key == 'eType') {
        // Asegurarnos que eType sea un string válido y esté normalizado
        const eventType = String(value).toLowerCase();
        // console.log("Parsed event type:", eventType);
        n[key] = eventType;
      } else {
        n[key] = value;
      }
    }

    return n;
  });
};

export const getMercuryPools = async (network: Network) => {
  const mercuryInstance = getMercuryInstance(network);
  const { soroswap_pairs } = await fetchZephyrTables({ network });
  const response = await mercuryInstance.getCustomQuery({
    request: GET_ALL_PAIRS(soroswap_pairs),
  });

  // console.log("Raw Mercury Pools Response (first 5):", response.data?.events?.data.slice(0, 5));

  if (!response.ok) {
    return [];
  }

  const parsedData: MercuryPair[] = parseMercuryScvalResponse(
    response.data?.events?.data
  );

  // console.log("Parsed Mercury Pools (first 5):", parsedData.slice(0, 5));

  return parsedData;
};

export const getMercuryPhoenixPools = async (network: Network) => {
  const mercuryInstance = getMercuryInstance(network);
  const { phoenix_pairs } = await fetchZephyrTables({ network });
  const response = await mercuryInstance.getCustomQuery({
    request: GET_ALL_PAIRS(phoenix_pairs),
  });

  // console.log("Raw Mercury Phoenix Pools Response (first 5):", response.data?.events?.data.slice(0, 5));

  if (!response.ok) {
    return [];
  }

  const parsedData: MercuryPair[] = parseMercuryScvalResponse(
    response.data?.events?.data
  );

  // console.log("Parsed Mercury Phoenix Pools (first 5):", parsedData.slice(0, 5));

  return parsedData;
};

export const getMercuryAquaPools = async (network: Network) => {
  const mercuryInstance = getMercuryInstance(network);
  const { aqua_pairs } = await fetchZephyrTables({ network });
  const response = await mercuryInstance.getCustomQuery({
    request: GET_ALL_PAIRS(aqua_pairs),
  });

  // console.log("Raw Mercury Aqua Pools Response (first 5):", response.data?.events?.data.slice(0, 5));

  if (!response.ok) {
    return [];
  }

  const parsedData: MercuryPair[] = parseMercuryScvalResponse(
    response.data?.events?.data
  );

  // console.log("Parsed Mercury Aqua Pools (first 5):", parsedData.slice(0, 5));

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
  const { soroswap_rsv_ch } = await fetchZephyrTables({ network });
  const response = await mercuryInstance.getCustomQuery({
    request: GET_ALL_RSV_CH(soroswap_rsv_ch),
  });

  // console.log("Raw Mercury RsvCh Response (first 5):", response.data?.events?.data.slice(0, 5));

  if (!response.ok) {
    return [];
  }

  const parsedData: MercuryRsvCh[] = parseMercuryScvalResponse(
    response.data?.events?.data
  );

  // console.log("Parsed Mercury RsvCh (first 5):", parsedData.slice(0, 5));

  return parsedData;
};

export const getMercuryEvents = async (network: Network) => {
  const mercuryInstance = getMercuryInstance(network);
  const { soroswap_events } = await fetchZephyrTables({ network });
  
  console.log("Fetching events from table:", soroswap_events);
  
  const response = await mercuryInstance.getCustomQuery({
    request: GET_ALL_EVENTS(soroswap_events),
  });

  // console.log("Raw Mercury Events Response (first 5):", response.data?.events?.data.slice(0, 5));

  if (!response.ok) {
    console.error("Error fetching Mercury events:", response);
    return [];
  }

  const parsedData: MercuryEvent[] = parseMercuryScvalResponse(
    response.data?.events?.data
  );

  // console.log("Parsed Mercury Events (first 5):", parsedData.slice(0, 5));
  // console.log("Event types present (first 5):", [...new Set(parsedData.map(e => e.eType))].slice(0, 5));

  return parsedData;
};
