import { Pool } from "types/pools";
import { adjustAmountByDecimals } from "./utils";
import {
  CurrencyAmount,
  Networks,
  Router,
  Token as SdkToken,
  TradeType,
} from "soroswap-router-sdk";
import { Token, TokenType } from "types/tokens";
import { MercuryPair, getMercuryPools } from "../../pages/api/pairs";
import { Network } from "types/network";

export const stellarNetworkDict = {
  MAINNET: Networks.PUBLIC,
  TESTNET: Networks.TESTNET,
};

const fromAddressToToken = (address: string, network: Networks) => {
  return new SdkToken(network, address, 18);
};

const fromAddressAndAmountToCurrencyAmount = (
  address: string,
  amount: string,
  network: Networks
) => {
  const token = fromAddressToToken(address, network);
  return CurrencyAmount.fromRawAmount(token, amount);
};

export const getRouterFromPools = (pools: MercuryPair[], network: Networks) => {
  return new Router({
    getPairsFn: async () => {
      return new Promise((resolve) => {
        resolve(pools);
      });
    },
    pairsCacheInSeconds: 60,
    network,
    maxHops: 5,
  });
};

export const getTokenPrice = async (
  tokenAddress: string,
  usdcAddress: string,
  network: Networks,
  router: Router
) => {
  const currencyAmount = fromAddressAndAmountToCurrencyAmount(
    tokenAddress,
    "10000000",
    network
  );

  const quoteCurrency = fromAddressToToken(usdcAddress, network);

  const route = await router.route(
    currencyAmount,
    quoteCurrency,
    TradeType.EXACT_INPUT
  );

  if (!route || !route.trade?.amountOutMin) return 0;

  const price = adjustAmountByDecimals(route.trade.amountOutMin, 7);

  return price;
};

export const getTokenTVL = (token: Token, pools: MercuryPair[]) => {
  const filteredPools = pools.filter(
    (pool) =>
      pool.tokenA === token.asset.contract ||
      pool.tokenB === token.asset.contract
  );

  const tokenDecimals = token.asset.decimals || 7;

  const tvl = filteredPools.reduce((acc, pool) => {
    if (pool.tokenA === token.asset.contract) {
      return acc + parseFloat(pool.reserveA) / 10 ** tokenDecimals;
    }

    if (pool.tokenB === token.asset.contract) {
      return acc + parseFloat(pool.reserveB) / 10 ** tokenDecimals;
    }

    return acc;
  }, 0);

  return tvl;
};

export const buildTokensInfo = async (
  tokens: Token[],
  network: Networks,
  pools: MercuryPair[]
) => {
  const USDC = tokens.find((token) => token.asset.code === "USDC");

  if (!USDC) return tokens;

  const router = getRouterFromPools(pools, network);

  const result = await Promise.all(
    tokens.map(async (token) => {
      const price = await getTokenPrice(
        token.asset.contract,
        USDC.asset.contract,
        network,
        router
      );

      const tvl = getTokenTVL(token, pools);

      const tvlInUsd = tvl * Number(price);

      return {
        ...token,
        price,
        tvl: tvlInUsd,
      };
    })
  );

  return result;
};

export const buildPoolsInfo = async (tokens: TokenType[], network: Network) => {
  const data = await getMercuryPools(network);

  const sdkNetwork = stellarNetworkDict[network];

  const router = getRouterFromPools(data, sdkNetwork);

  const USDC = tokens.find((token) => token.code === "USDC");

  const result: Pool[] = await Promise.all(
    data.map(async (pool) => {
      const tokenA = tokens.find(
        (token: TokenType) => token.contract === pool.tokenA
      );

      const tokenB = tokens.find(
        (token: TokenType) => token.contract === pool.tokenB
      );

      const { tokenAPrice, tokenBPrice } = await getPoolTokenPrices(
        pool.tokenA,
        pool.tokenB,
        USDC?.contract,
        sdkNetwork,
        router
      );

      const tvl = await getPoolTVL(
        tokenA,
        tokenB,
        pool.reserveA,
        pool.reserveB,
        tokenAPrice,
        tokenBPrice
      );

      return {
        ...pool,
        tokenA: tokenA
          ? tokenA
          : { contract: pool.tokenA, code: pool.tokenA, name: pool.tokenA },
        tokenB: tokenB
          ? tokenB
          : { contract: pool.tokenB, code: pool.tokenB, name: pool.tokenB },
        fees24h: 0,
        feesYearly: 0,
        liquidity: 0,
        tvl,
        volume24h: 0,
        volume7d: 0,
      };
    })
  );

  return { mercury: data, result };
};

export const getPoolTokenPrices = async (
  tokenA: string | undefined,
  tokenB: string | undefined,
  usdcAddress: string | undefined,
  network: Networks,
  router: Router
) => {
  if (!tokenA || !tokenB || !usdcAddress)
    return { tokenAPrice: 0, tokenBPrice: 0 };

  const tokenAPrice = await getTokenPrice(tokenA, usdcAddress, network, router);

  const tokenBPrice = await getTokenPrice(tokenB, usdcAddress, network, router);

  return {
    tokenAPrice: Number(tokenAPrice),
    tokenBPrice: Number(tokenBPrice),
  };
};

export const getPoolTVL = async (
  tokenA: TokenType | undefined,
  tokenB: TokenType | undefined,
  reserveA: string,
  reserveB: string,
  tokenAPrice: number,
  tokenBPrice: number
) => {
  if (!tokenA || !tokenB) return 0;

  const tokenADecimals = tokenA?.decimals || 7;
  const tokenBDecimals = tokenB?.decimals || 7;

  const valueA = parseFloat(reserveA) / 10 ** tokenADecimals;
  const valueB = parseFloat(reserveB) / 10 ** tokenBDecimals;

  const tvl = valueA * Number(tokenAPrice) + valueB * Number(tokenBPrice);

  return tvl;
};

export const getLastValuePerDate = (data: any[]): any[] => {
  const formatDate = (dateStr: string) => dateStr.split("T")[0];

  const dateMap = new Map<string, any>();

  data.forEach((item) => {
    const dateKey = formatDate(item.date);
    dateMap.set(dateKey, item);
  });

  const result = Array.from(dateMap.values()).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return result;
};
