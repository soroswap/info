import { ApiNetwork, Network } from "types/network";
import { Pool } from "../types/pools";
import { fillDatesAndSort } from "../utils/complete-chart";
import axiosInstance from "./axios";
import { EventType, fetchAllEvents } from './events';
import { RouterEventAPI } from "types/router-events";


export const fetchPools = async ({ network }: ApiNetwork) => {
  const { data } = await axiosInstance.get<Pool[]>("/api/pairs", {
    params: { network },
  });

  return data;
};

interface FetchPoolProps extends ApiNetwork {
  poolAddress: string;
}
export const fetchPoolsByTokenAddress = async ({
  tokenAddress,
}: {
  tokenAddress: string;
}) => {
  const { data } = await axiosInstance.get(`/info/pools/${tokenAddress}`);
  return data;
};

export const fetchPool = async ({ poolAddress, network }: FetchPoolProps) => {
  const { data } = await axiosInstance.get<Pool>(
    `/api/pairs?address=${poolAddress}`,
    { params: { network } }
  );
  return data;
};

export const fetchPoolTVLChart = async ({
  poolAddress,
}: {
  poolAddress: string;
}) => {
  const { data } = await axiosInstance.get<{ tvl: number; date: string }[]>(
    `/info/pool/tvl-chart/${poolAddress}?protocols=soroswap`
  );

  const filledData = fillDatesAndSort(data, "tvl");

  return filledData;
};

export const fetchPoolFeesChart = async ({
  poolAddress,
}: {
  poolAddress: string;
}) => {
  const { data } = await axiosInstance.get<{ fees: number; date: string }[]>(
    `/info/pool/fees-chart/${poolAddress}?protocols=soroswap`
  );

  const filledData = fillDatesAndSort(data, "fees");

  return filledData;
};

export const fetchPoolVolumeChart = async ({
  poolAddress,
  network,
}: {
  poolAddress: string;
  network: Network;
}) => {
  try {
    
    const events = await fetchAllEvents({
      address: poolAddress,
      type: EventType.SWAP,
      network,
    });

    
    const volumeByDate = events.reduce((acc: { [key: string]: number }, event: RouterEventAPI) => {
      
      const timestamp = event.timestamp ? new Date(event.timestamp) : new Date();
      const date = timestamp.toISOString().split('T')[0];
      
      
      const eventVolume = calculateEventVolume(event);
      
      
      acc[date] = (acc[date] || 0) + eventVolume;
      
      return acc;
    }, {});

    
    const volumeData = Object.entries(volumeByDate).map(([date, volume]) => ({
      date,
      volume
    }));

    
    const filledData = fillDatesAndSort(volumeData, "volume");

    return filledData;
  } catch (error) {
    console.error('Error fetching pool volume chart:', error);
    return [];
  }
};


function calculateEventVolume(event: any): number {
  
  if (!event || event.type !== EventType.SWAP) {
    return 0;
  }

  
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