import { Paper } from "@mui/material";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import ChartHeader from "./chart-header";

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
const TVLChart = () => {
  return (
    <Paper sx={{ maxWidth: 600, py: 2, bgcolor: "white" }}>
      <ChartHeader title="TVL" subtitle="$3.54b" />
      <ResponsiveContainer width={550} height={200}>
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
          <Area type="monotone" dataKey="tvl" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default TVLChart;
