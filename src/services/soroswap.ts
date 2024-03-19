import axiosInstance from "./axios";

export const fetchSoroswapFees24h = async () => {
  const { data } = await axiosInstance.get<{ fees: number, variationLast24h: number }>(
    "/info/soroswapFees24h?protocols=soroswap&network=MAINNET"
  );
  return data;
};

export const fetchSoroswapVolume24h = async () => {
  const { data } = await axiosInstance.get<{ volume: number, variation: number }>(
    `/info/volume24h?protocols=soroswap&network=MAINNET`
  );
  return data;
};

export const fetchSoroswapTVL = async () => {
  const { data } = await axiosInstance.get<{ tvl: number, variation: number }>(
    `/info/soroswapTvl?protocols=soroswap&network=MAINNET`
  );
  return data;
};
