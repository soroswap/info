import BigNumber from "bignumber.js";

const soroswapAppUrl = process.env.NEXT_PUBLIC_SOROSWAP_APP_URL;

export const formatNumberToMoney = (number: number | undefined) => {
  if (!number) return "$0.00";
  if (number > 1000000000) {
    return `$${(number / 1000000000).toFixed(2)}b`;
  }
  if (number > 1000000) {
    return `$${(number / 1000000).toFixed(2)}m`;
  }
  if (number > 1000) {
    return `$${(number / 1000).toFixed(2)}k`;
  }
  return `$${number.toFixed(7)}`;
};

export const shortenAddress = (address: string | undefined) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const getExpectedAmountOfOne = (
  reserve0: number | undefined,
  reserve1: number | undefined
) => {
  if (!reserve0 || !reserve1) return;

  const one = BigNumber(1);

  const reserveIn = BigNumber(reserve0);
  const reserveOut = BigNumber(reserve1);

  let amountInWithFee = one.multipliedBy(997);
  let numerator = amountInWithFee.multipliedBy(reserveOut);
  let denominator = reserveIn.multipliedBy(1000).plus(amountInWithFee);

  return numerator.dividedBy(denominator).toFixed(7);
};

export const getSoroswapAddLiquidityUrl = (
  token0?: string | undefined,
  token1?: string | undefined
) => {
  if (!soroswapAppUrl) return;

  if (token0 && !token1) {
    return `${soroswapAppUrl}/liquidity/add/${token0}`;
  }

  if (!token0 && token1) {
    return `${soroswapAppUrl}/liquidity/add/${token1}`;
  }

  return `${soroswapAppUrl}/liquidity/add/${token0}/${token1}`;
};

export const getSoroswapSwapUrl = (
  token0?: string | undefined,
  token1?: string | undefined
) => {
  if (!soroswapAppUrl) return;

  if (token0 && !token1) {
    return `${soroswapAppUrl}/swap/${token0}`;
  }

  if (!token0 && token1) {
    return `${soroswapAppUrl}/swap/${token1}`;
  }

  return `${soroswapAppUrl}/swap/${token0}/${token1}`;
};
