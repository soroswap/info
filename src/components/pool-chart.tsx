import { Box, Typography } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import ChartSwitcher from "./chart-switcher";
import React from "react";
import RenderIf from "./render-if";
import {
  useQueryPoolFeesChart,
  useQueryPoolTVLChart,
  useQueryPoolVolumeChart,
} from "../hooks/pools";
import LoadingSkeleton from "./loading-skeleton";
import { xAxisChartFormatter } from "../utils/x-axis-chart-formatter";
import { formatTokenAmount } from "../utils/utils";

type Charts = "volume" | "liquidity" | "fees";

const PoolChart = ({ poolAddress }: { poolAddress: string }) => {
  const tvlChart = useQueryPoolTVLChart({ poolAddress });
  const feesChart = useQueryPoolFeesChart({ poolAddress });
  const volumeChart = useQueryPoolVolumeChart({ poolAddress });

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
        label: "Liquidity",
        value: "liquidity",
      });
    }
    if (feesChart.data) {
      availableTabs.push({
        label: "Fees",
        value: "fees",
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
                formatter={(amount) =>
                  formatTokenAmount(amount as number, 7, "token")
                }
              />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </LoadingSkeleton>
      </RenderIf>
      <RenderIf isTrue={value === "liquidity"}>
        <LoadingSkeleton
          width="100%"
          isLoading={tvlChart.isLoading}
          height={320}
        >
          <ResponsiveContainer width="100%" height="100%" minHeight={320}>
            <BarChart
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
                formatter={(amount) =>
                  formatTokenAmount(amount as number, 7, "token")
                }
              />
              <Bar dataKey="tvl" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </LoadingSkeleton>
      </RenderIf>
      <RenderIf isTrue={value === "fees"}>
        <LoadingSkeleton
          width="100%"
          isLoading={feesChart.isLoading}
          height={320}
        >
          <ResponsiveContainer width="100%" height="100%" minHeight={320}>
            <AreaChart
              width={500}
              height={400}
              data={feesChart.data ?? []}
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
                formatter={(amount) =>
                  formatTokenAmount(amount as number, 7, "token")
                }
              />
              <Area
                type="monotone"
                dataKey="fees"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </LoadingSkeleton>
      </RenderIf>
    </Box>
  );
};

export default PoolChart;
