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

type Charts = "volume" | "liquidity" | "fees";

const tabs = [
  {
    label: "Volume",
    value: "volume",
  },
  {
    label: "Liquidity",
    value: "liquidity",
  },
  {
    label: "Fees",
    value: "fees",
  },
];
const PoolChart = () => {
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
      <RenderIf isTrue={value === "volume" || value === "fees"}>
        <ResponsiveContainer width="100%" height="100%" minHeight={320}>
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="month" />
            <Tooltip content={<></>} />
            <Area
              type="monotone"
              dataKey="tvl"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </RenderIf>
      <RenderIf isTrue={value === "liquidity"}>
        <ResponsiveContainer width="100%" height="100%" minHeight={320}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="month" />
            <Tooltip content={<></>} />
            <Bar dataKey="tvl" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </RenderIf>
    </Box>
  );
};

export default PoolChart;
