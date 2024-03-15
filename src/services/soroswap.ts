import axiosInstance from "./axios";

export const fetchSoroswapFees24h = async () => {
  const { data } = await axiosInstance.get<number>(
    "/info/soroswapFees24h?protocols=soroswap&network=MAINNET"
  );
  return data;
};

export const fetchSoroswapVolume24h = async () => {
  const { data } = await axiosInstance.get<number>(
    `/info/volume24h?protocols=soroswap&network=MAINNET`
  );
  return data;
};

export const fetchSoroswapTVL = async () => {
  const { data } = await axiosInstance.get<number>(
    `/info/soroswapTvl?protocols=soroswap&network=MAINNET`
  );
  return data;
};
