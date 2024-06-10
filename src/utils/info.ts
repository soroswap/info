import { Pool, TvlChartData, VolumeChartData } from "types/pools";
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
import { RouterEventAPI } from "types/router-events";
import {
  MercuryRsvCh,
  getMercuryEvents,
  getMercuryRsvCh,
} from "zephyr/helpers";
import { fillChart } from "./complete-chart";
import { MercuryEvent } from "../../pages/api/events";

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

  const rsvch = await getMercuryRsvCh(network);
  const events = await getMercuryEvents(network);

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

      const tvl = getPoolTVL(
        pool.reserveA,
        pool.reserveB,
        tokenAPrice,
        tokenBPrice,
        tokenA?.decimals,
        tokenB?.decimals
      );

      const poolData = {
        ...pool,
        tokenA: tokenA
          ? tokenA
          : { contract: pool.tokenA, code: pool.tokenA, name: pool.tokenA },
        tokenB: tokenB
          ? tokenB
          : { contract: pool.tokenB, code: pool.tokenB, name: pool.tokenB },
        tokenAPrice,
        tokenBPrice,
        fees24h: 0,
        feesYearly: 0,
        liquidity: 0,
        tvl,
        volume24h: 0,
        volume7d: 0,
      };

      const tvlChartData = getPoolTVLChartData(rsvch, poolData);
      const volumeChartData = getPoolVolumeChartData(events, poolData);

      const nowTimestamp = new Date().getTime() / 1000;

      const volume7d = volumeChartData.reduce((acc, item) => {
        if (!item.timestamp) return acc;

        if (nowTimestamp - parseInt(item.timestamp) < 7 * 24 * 3600) {
          return acc + item.volume;
        }
        return acc;
      }, 0);

      const volume24h = volumeChartData.reduce((acc, item) => {
        if (!item.timestamp) return acc;

        if (nowTimestamp - parseInt(item.timestamp) < 24 * 3600) {
          return acc + item.volume;
        }
        return acc;
      }, 0);

      return {
        ...poolData,
        tvlChartData,
        volumeChartData,
        volume7d,
        volume24h,
      };
    })
  );

  return result;
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

export const getPoolTVL = (
  reserveA: string,
  reserveB: string,
  tokenAPrice: number,
  tokenBPrice: number,
  decimalsA: number = 7,
  decimalsB: number = 7
) => {
  const valueA = parseFloat(reserveA) / 10 ** decimalsA;
  const valueB = parseFloat(reserveB) / 10 ** decimalsB;

  const tvl = valueA * Number(tokenAPrice) + valueB * Number(tokenBPrice);

  return tvl;
};

export const getPoolVolume = (
  amountA: string,
  amountB: string,
  tokenAPrice: number,
  tokenBPrice: number,
  decimalsA: number = 7,
  decimalsB: number = 7
) => {
  const amountAResult = parseFloat(amountA) / 10 ** decimalsA;
  const amountBResult = parseFloat(amountB) / 10 ** decimalsB;

  const valueA = amountAResult * tokenAPrice;
  const valueB = amountBResult * tokenBPrice;

  return valueA + valueB;
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

export const getPoolVolumeChartData = (events: MercuryEvent[], pool: Pool) => {
  const poolEvents = events.filter((e) => {
    if (
      e.tokenA === pool?.tokenA.contract &&
      e.tokenB === pool?.tokenB.contract
    ) {
      return true;
    }

    if (
      e.tokenA === pool?.tokenB.contract &&
      e.tokenB === pool?.tokenA.contract
    ) {
      return true;
    }

    return false;
  });

  const poolsEventsWithTokensOrdered = poolEvents.map((e) => {
    if (
      e.tokenA === pool?.tokenA.contract &&
      e.tokenB === pool?.tokenB.contract
    ) {
      return e;
    }

    return {
      ...e,
      tokenA: e.tokenB,
      tokenB: e.tokenA,
      amountA: e.amountB,
      amountB: e.amountA,
    };
  });

  const volumeChartData = poolsEventsWithTokensOrdered.map((e) => {
    return {
      timestamp: e.timestamp,
      date: new Date(parseInt(e.timestamp) * 1000).toISOString(),
      volume: getPoolVolume(
        e.amountA,
        e.amountB,
        pool.tokenAPrice,
        pool.tokenBPrice,
        pool?.tokenA.decimals,
        pool?.tokenB.decimals
      ),
    };
  });

  const filledVolumeChartData = fillChart(volumeChartData, "volume");

  return filledVolumeChartData as VolumeChartData[];
};

export const getPoolTVLChartData = (rsvchs: MercuryRsvCh[], pool: Pool) => {
  const rsvFiltered = rsvchs.filter((r) => r.address === pool.address);

  const tvlChartData = rsvFiltered.map((r) => {
    return {
      timestamp: r.timestamp,
      date: new Date(parseInt(r.timestamp) * 1000).toISOString(),
      tvl: getPoolTVL(
        r.reserveA,
        r.reserveB,
        pool.tokenAPrice,
        pool.tokenBPrice,
        pool?.tokenA.decimals,
        pool?.tokenB.decimals
      ),
    };
  });

  const filledTvlChartData = fillChart(tvlChartData, "tvl");

  return filledTvlChartData as TvlChartData[];
};
