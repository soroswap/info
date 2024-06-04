import { Box } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
} from "recharts";
import ChartSwitcher from "./chart-switcher";
import React from "react";
import RenderIf from "./render-if";
import {
  useQueryTokenPriceChart,
  useQueryTokenTVLChart,
  useQueryTokenVolumeChart,
} from "../hooks/tokens";
import LoadingSkeleton from "./loading-skeleton";
import { xAxisChartFormatter } from "../utils/x-axis-chart-formatter";
import { formatNumberToMoney, formatNumberToToken } from "../utils/utils";
import ChartTooltip from "./chart-tooltip";

type Charts = "volume" | "tvl" | "price";

const TokenChart = ({ tokenAddress }: { tokenAddress: string }) => {
  const tvlChart = useQueryTokenTVLChart({ tokenAddress });
  const priceChart = useQueryTokenPriceChart({ tokenAddress });
  const volumeChart = useQueryTokenVolumeChart({ tokenAddress });

  const [value, setValue] = React.useState<Charts>("volume");

  const handleChange = (newValue: Charts) => {
    setValue(newValue);
  };

  const getAvailableTabs = () => {
    const availableTabs = [];
    if (volumeChart.data) {
      availableTabs.push({
        label: "Volume",
        value: "volume",
      });
    }
    if (tvlChart.data) {
      availableTabs.push({
        label: "TVL",
        value: "tvl",
      });
    }
    if (priceChart.data) {
      availableTabs.push({
        label: "Price",
        value: "price",
      });
    }
    return availableTabs;
  };
  return (
    <Box sx={{ py: 2 }}>
      <Box
        display="flex"
        justifyContent="flex-end"
        px={2}
        alignItems="center"
        mb={2}
      >
        <ChartSwitcher
          value={value}
          handleChange={handleChange}
          tabs={getAvailableTabs()}
        />
      </Box>
      <RenderIf isTrue={value === "volume"}>
        <LoadingSkeleton
          width="100%"
          isLoading={volumeChart.isLoading}
          height={320}
        >
          <ResponsiveContainer width="100%" height="100%" minHeight={320}>
            <AreaChart
              width={500}
              height={400}
              data={volumeChart.data ?? []}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis
                dataKey="date"
                tickFormatter={(tick) => xAxisChartFormatter(tick)}
              />

              <Tooltip
                formatter={(amount) => formatNumberToMoney(amount as number)}
                content={ChartTooltip}
              />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="#8866DD"
                strokeWidth="3px"
                fill="#221E2B"
              />
            </AreaChart>
          </ResponsiveContainer>
        </LoadingSkeleton>
      </RenderIf>
      <RenderIf isTrue={value === "tvl"}>
        <LoadingSkeleton
          isLoading={tvlChart.isLoading}
          height={320}
          width="100%"
        >
          <ResponsiveContainer width="100%" height="100%" minHeight={320}>
            <AreaChart
              width={500}
              height={300}
              data={tvlChart.data ?? []}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis
                dataKey="date"
                tickFormatter={(tick) => xAxisChartFormatter(tick)}
              />
              <Tooltip
                formatter={(amount) => formatNumberToToken(amount as number)}
                content={ChartTooltip}
              />
              <Area
                type="monotone"
                dataKey="tvl"
                stroke="#8866DD"
                strokeWidth="3px"
                fill="#221E2B"
              />
            </AreaChart>
          </ResponsiveContainer>
        </LoadingSkeleton>
      </RenderIf>
      <RenderIf isTrue={value === "price"}>
        <LoadingSkeleton
          width="100%"
          isLoading={priceChart.isLoading}
          height={320}
        >
          <ResponsiveContainer width="100%" height="100%" minHeight={320}>
            <AreaChart
              width={500}
              height={400}
              data={priceChart.data ?? []}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis
                dataKey="date"
                tickFormatter={(tick) => xAxisChartFormatter(tick)}
              />
              <Tooltip
                formatter={(amount) => formatNumberToMoney(amount as number)}
                content={ChartTooltip}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#8866DD"
                strokeWidth="3px"
                fill="#221E2B"
              />
            </AreaChart>
          </ResponsiveContainer>
        </LoadingSkeleton>
      </RenderIf>
    </Box>
  );
};

export default TokenChart;
