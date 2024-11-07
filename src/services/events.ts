import { ApiNetwork } from "types/network";
import {
  RouterEventType,
  RouterEventsAPIResponse,
} from "../types/router-events";
import axiosInstance from "./axios";

interface FetchAllEventsProps extends ApiNetwork {
  type?: RouterEventType;
  address?: string;
}

export enum EventType {
  SWAP = 'swap',
  ADD_LIQUIDITY = 'add_liquidity',
  REMOVE_LIQUIDITY = 'remove_liquidity'
}

export const fetchAllEvents = async ({
  type,
  address,
  network,
}: FetchAllEventsProps) => {
  const { data } = await axiosInstance.get<RouterEventsAPIResponse>(
    `/api/events`,
    {
      params: { 
        type, 
        address, 
        network,
        eventType: EventType.SWAP
      },
    }
  );

  return data;
};