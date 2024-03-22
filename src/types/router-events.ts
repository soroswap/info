import { TokenType } from "./tokens";

export interface RouterEvents {
  totalCount: number;
  pageInfo: PageInfo;
  edges: Edge[];
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

export interface Edge {
  cursor: string;
  node: Node;
}

export type RouterEventType = "swap" | "add" | "remove" | "init";


export interface Node {
  data: Data
  topic1: string;
  topic2: RouterEventType;
  topic3?: string;
  topic4?: string;
  txInfoByTx: TxInfoByTx;
}

interface Data {
  amount_a?: number;
  amount_b?: number;
  liquidity?: number;
  pair?: string;
  token_a?: TokenType;
  token_b?: TokenType;
  amounts?: number[];
  path?: TokenType[];
  to?: string;
  factory?: string;
};

interface TxInfoByTx {
  ledgerByLedger: LedgerByLedger;
  txHash: string;
  opCount: number;
  fee: number;
}

interface LedgerByLedger {
  closeTime: number;
  sequence: number;
}