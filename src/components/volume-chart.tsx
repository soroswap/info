import { Paper } from "@mui/material";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import ChartHeader from "./chart-header";

const data = [
  {
    month: "Jan",
    vol: 4000,
  },
  {
    month: "Feb",
    vol: 3000,
  },
  {
    month: "Mar",
    vol: 2000,
  },
  {
    month: "Apr",
    vol: 3500,
  },
  {
    month: "May",
    vol: 2800,
  },
  {
    month: "Jun",
    vol: 3200,
  },
  {
    month: "Jul",
    vol: 4500,
  },
  {
    month: "Aug",
    vol: 3300,
  },
  {
    month: "Sep",
    vol: 3900,
  },
  {
    month: "Oct",
    vol: 4200,
  },
  {
    month: "Nov",
    vol: 3100,
  },
  {
    month: "Dec",
    vol: 3700,
  },
];

const VolumeChart = () => {
  return (
    <Paper sx={{ maxWidth: 600, py: 2, bgcolor: "white" }}>
      <ChartHeader title="Volume 24h" subtitle="$1.79b" />
      <ResponsiveContainer width={550} height={200}>
        <BarChart
          width={500}
          height={200}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <Tooltip content={<></>} />
          <XAxis dataKey="month" />
          <Bar dataKey="vol" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default VolumeChart;
