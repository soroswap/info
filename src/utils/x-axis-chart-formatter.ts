export const xAxisChartFormatter = (tick: string) => {
  return new Date(tick).toLocaleDateString("en-US", {
    day: "numeric",
  });
};
