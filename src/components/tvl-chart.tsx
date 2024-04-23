import { Box, Paper, Typography } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { useQuerySoroswapTVLChart } from "../hooks/soroswap";
import LoadingSkeleton from "./loading-skeleton";
import { xAxisChartFormatter } from "../utils/x-axis-chart-formatter";
import { formatNumberToToken } from "../utils/utils";

const TVLChart = () => {
  const tvlChart = useQuerySoroswapTVLChart();

  return (
    <Paper sx={{ maxWidth: 1184, py: 2, bgcolor: "white" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        px={2}
        alignItems="center"
        mb={2}
      >
        <Box>
          <Typography variant="h5" fontWeight={600}>
            TVL
          </Typography>
        </Box>
      </Box>
      <LoadingSkeleton isLoading={tvlChart.isLoading} width="100%" height={300}>
        <ResponsiveContainer
          width="100%"
          height="100%"
          minHeight={300}
          style={{ paddingLeft: 5 }}
        >
          <AreaChart
            width={500}
            height={300}
            data={tvlChart.data ?? []}
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
            <YAxis
              tickFormatter={(amount) => formatNumberToToken(amount as number)}
            />
            <Tooltip
              formatter={(amount) => formatNumberToToken(amount as number)}
            />
            <Area
              type="monotone"
              dataKey="tvl"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </LoadingSkeleton>
    </Paper>
  );
};

export default TVLChart;
