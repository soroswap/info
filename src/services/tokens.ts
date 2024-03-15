import { Token } from "../types/tokens";
import axiosInstance from "./axios";

export const fetchTokens = async () => {
  const { data } = await axiosInstance.get<Token[]>(
    "/info/tokens?protocols=soroswap&network=MAINNET"
  );
  return data;
};

export const fetchToken = async ({
  tokenAddress,
}: {
  tokenAddress: string;
}) => {
  const { data } = await axiosInstance.get<Token>(
    `/info/token/${tokenAddress}?protocols=soroswap&network=MAINNET`
  );
  return data;
};
