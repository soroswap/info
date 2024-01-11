export const formatNumberToMoney = (number: number) => {
  if (number > 1000000000) {
    return `$${(number / 1000000000).toFixed(2)}b`;
  }
  if (number > 1000000) {
    return `$${(number / 1000000).toFixed(2)}m`;
  }
  if (number > 1000) {
    return `$${(number / 1000).toFixed(2)}k`;
  }
  return `$${number.toFixed(2)}`;
};
