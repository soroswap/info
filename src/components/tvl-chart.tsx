import { Box, Typography, useTheme } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  useQuerySoroswapTVL,
  useQuerySoroswapTVLChart,
} from "../hooks/soroswap";
import LoadingSkeleton from "./loading-skeleton";
import { xAxisChartFormatter } from "../utils/x-axis-chart-formatter";
import { formatNumberToMoney, formatNumberToToken } from "../utils/utils";
import { StyledCard } from "./styled/card";
import { Text } from "./styled/text";

const CustomTooltip = ({ active, payload, label }: any) => {
  const theme = useTheme();

  if (active && payload && payload.length) {
    return (
      <StyledCard bgcolor={theme.palette.background.default} p="12px">
        <Text color="gray">TVL</Text>
        <Text fontWeight={600}>{formatNumberToMoney(payload[0].value)}</Text>
        <Text color={theme.palette.customBackground.accentAction}>{label}</Text>
      </StyledCard>
    );
  }

  return null;
};

const TVLChart = () => {
  const tvlChart = useQuerySoroswapTVLChart();
  const soroswapTVL = useQuerySoroswapTVL();

  return (
    <StyledCard sx={{ maxWidth: 1184, p: "32px" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography fontSize="20px" fontWeight={600}>
            TVL
          </Typography>
        </Box>
        <Box>
          <LoadingSkeleton isLoading={soroswapTVL.isLoading} height={20}>
            <Typography fontWeight={600} fontSize="28px">
              {formatNumberToMoney(soroswapTVL.data?.tvl)}
            </Typography>
            {/* <PercentageChanged percentage={40.2} sx={{ fontWeight: 600 }} /> */}
          </LoadingSkeleton>
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
            <CartesianGrid stroke="#1b1b1b" />

            <XAxis
              dataKey="date"
              tickFormatter={(tick) => xAxisChartFormatter(tick)}
            />
            <YAxis
              tickFormatter={(amount) => formatNumberToToken(amount as number)}
            />
            <Tooltip
              formatter={(amount) => formatNumberToToken(amount as number)}
              content={CustomTooltip}
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
    </StyledCard>
  );
};

export default TVLChart;
