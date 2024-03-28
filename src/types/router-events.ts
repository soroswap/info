import { TokenType } from "./tokens";

export type RouterEventsAPIResponse = RouterEventAPI[];

export interface RouterEventAPI {
  tokenA?: TokenType;
  tokenB?: TokenType;
  amountA: string;
  amountB: string;
  txHash: string;
  event: RouterEventType;
  account?: string;
  timestamp: number;
}

export type RouterEventType = "swap" | "add" | "remove";
