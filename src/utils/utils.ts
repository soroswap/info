import BigNumber from "bignumber.js";

const soroswapAppUrl = process.env.NEXT_PUBLIC_SOROSWAP_APP_URL;

export const formatNumberToMoney = (number: number | undefined) => {
  if (!number) return "$0.00";
  if (typeof number !== "number") return "$0.00";

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

export function shortenAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.substring(0, chars)}...${address.substring(56 - chars)}`;
}

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

export const openInNewTab = (url: string) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export const roundNumber = (number: number, decimals: number): number => {
  return Number(number.toFixed(decimals));
};

export const toCamelCase = (text: string): string => {
return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export const adjustAmountByDecimals = (amount: number, decimals: number | undefined): string => {
  const defaultDecimals = 7;
  const actualDecimals = decimals ?? defaultDecimals;

  let amountStr = amount.toString();

  while (amountStr.length <= actualDecimals) {
    amountStr = '0' + amountStr;
  }

  const integerPart = amountStr.slice(0, -actualDecimals);
  const decimalPart = amountStr.slice(-actualDecimals);
  const result = integerPart + '.' + decimalPart;

  return result.replace(/(\.\d*[1-9])0+$|\.0*$/, '$1');
}

export const shouldShortenCode = (contract: string) => {
  if (contract.length > 10) return shortenAddress(contract)
  return contract
}