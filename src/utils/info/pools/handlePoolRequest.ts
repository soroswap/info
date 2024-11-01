// apiHelpers.ts
import { NextApiRequest, NextApiResponse } from "next";
import { fetchTokenList } from "services/tokens";
import { fetchAllEvents } from "services/events";
import { Network } from "types/network";
import { TokenType } from "types/tokens";

export interface MercuryPair {
  tokenA: string;
  tokenB: string;
  address: string;
  reserveA: string;
  reserveB: string;
}

export enum RequestType {
  POOL_INFO = 'pool_info',
  VOLUME = 'volume'
}

export enum EventType {
  SWAP = 'swap',
  ADD_LIQUIDITY = 'add_liquidity',
  REMOVE_LIQUIDITY = 'remove_liquidity'
}

interface VolumeData {
  timestamp: number;
  volume: number;
}

export async function handlePoolRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  getPools: (network: Network) => Promise<MercuryPair[]>
) {
  const queryParams = req.query;

  const address = queryParams?.address as string;
  const requestType = queryParams?.type as RequestType;
  const full = queryParams?.full === 'true';

  let network = queryParams?.network as string;
  network = network?.toUpperCase() as Network;

  if (network !== "MAINNET" && network !== "TESTNET") {
    return res.status(400).json({ error: "Invalid network" });
  }

  try {
    
    if (requestType === RequestType.VOLUME && address) {
      const events = await fetchAllEvents({
        address,
        network,
        type: EventType.SWAP
      });

      
      const volumeData = processVolumeEvents(events);
      return res.json(volumeData);
    }

    
    const tokenList: TokenType[] = await fetchTokenList({ network });
    const allowedContracts = tokenList.map(token => token.contract);

    const data = await getPools(network);

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
    console.error('Error in handlePoolRequest:', error);
    return res.status(500).json({ error: "Failed to process request" });
  }
}

function processVolumeEvents(events: any[]): VolumeData[] {
  
  const volumeByDay = events.reduce((acc: { [key: string]: number }, event) => {
    
    const timestamp = new Date(event.timestamp).setHours(0, 0, 0, 0);
    
    
    const volume = calculateEventVolume(event);
    
    acc[timestamp] = (acc[timestamp] || 0) + volume;
    
    return acc;
  }, {});

  return Object.entries(volumeByDay)
    .map(([timestamp, volume]) => ({
      timestamp: parseInt(timestamp),
      volume
    }))
    .sort((a, b) => a.timestamp - b.timestamp);
}

function calculateEventVolume(event: any): number {
  if (event.amount0 !== undefined && event.amount1 !== undefined) {
    return Math.max(
      Number(event.amount0) || 0,
      Number(event.amount1) || 0
    );
  }
  
  if (event.amountIn !== undefined && event.amountOut !== undefined) {
    return Math.max(
      Number(event.amountIn) || 0,
      Number(event.amountOut) || 0
    );
  }
  
  if (event.volume !== undefined) {
    return Number(event.volume);
  }
  
  return 0;
}