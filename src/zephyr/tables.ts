import axiosInstance from "services/axios";
import { ApiNetwork } from "types/network";
export interface ZephyrTables {
  soroswap_events: string;
  soroswap_pairs: string;
  rsv_ch: string;
  phoenix_pairs: string;
  aqua_pairs: string;
}


export const fetchZephyrTables = async ({ network }: ApiNetwork) => {
  const parsedNetwork = network.toLowerCase();
  const { data } = await axiosInstance.get(
    `https://raw.githubusercontent.com/soroswap/zephyr-programs/main/public/${parsedNetwork}.zephyr-programs.json`
  );
  const response: ZephyrTables = data;
  return response;
}
