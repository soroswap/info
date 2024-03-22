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
  useQueryTokenPriceChart,
  useQueryTokenTVLChart,
  useQueryTokenVolumeChart,
} from "../hooks/tokens";
import LoadingSkeleton from "./loading-skeleton";

const data = [
  {
    month: "Jan",
    tvl: 4000,
  },
  {
    month: "Feb",
    tvl: 3000,
  },
  {
    month: "Mar",
    tvl: 2000,
  },
  {
    month: "Apr",
    tvl: 3500,
  },
  {
    month: "May",
    tvl: 2800,
  },
  {
    month: "Jun",
    tvl: 3200,
  },
  {
    month: "Jul",
    tvl: 4500,
  },
  {
    month: "Aug",
    tvl: 3300,
  },
  {
    month: "Sep",
    tvl: 3900,
  },
  {
    month: "Oct",
    tvl: 4200,
  },
  {
    month: "Nov",
    tvl: 3100,
  },
  {
    month: "Dec",
    tvl: 3700,
  },
];

type Charts = "volume" | "tvl" | "price";

const tabs = [
  {
    label: "Volume",
    value: "volume",
  },
  {
    label: "TVL",
    value: "tvl",
  },
  {
    label: "Price",
    value: "price",
  },
];
const TokenChart = ({ tokenAddress }: { tokenAddress: string }) => {
  const tvlChart = useQueryTokenTVLChart({ tokenAddress });
  const priceChart = useQueryTokenPriceChart({ tokenAddress });
  const volumeChart = useQueryTokenVolumeChart({ tokenAddress });

  const [value, setValue] = React.useState<Charts>("volume");

  const handleChange = (newValue: Charts) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ py: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        px={2}
        alignItems="center"
        mb={2}
      >
        <Box>
          <Typography variant="h5" fontWeight={600}>
            $391.5k
          </Typography>
        </Box>
        <ChartSwitcher value={value} handleChange={handleChange} tabs={tabs} />
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
              <XAxis dataKey="date" />
              <Tooltip />
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
      <RenderIf isTrue={value === "tvl"}>
        <LoadingSkeleton
          isLoading={tvlChart.isLoading}
          height={320}
          width="100%"
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
              <XAxis dataKey="date" />
              <Tooltip />
              <Bar dataKey="tvl" fill="#82ca9d" />
            </BarChart>
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
              <XAxis dataKey="date" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="price"
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

export default TokenChart;
