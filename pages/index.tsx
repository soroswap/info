import VolumeChart from "../src/components/volume-chart";
import Layout from "../src/components/layout";
import { Box, Container, Paper, Typography } from "@mui/material";
import TVLChart from "../src/components/tvl-chart";
import PercentageChanged from "../src/components/percentage-changed";
import PoolsTable from "../src/components/pools-table/pools-table";
import TokensTable from "../src/components/tokens-table/tokens-table";
import TransactionsTable from "../src/components/transaction-table/transactions-table";
import { rows as poolRows } from "../src/components/pools-table/data";
import { rows as tokenRows } from "../src/components/tokens-table/data";
import { rows as txRows } from "../src/components/transaction-table/data";

export default function Home() {
  return (
    <Layout>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Soroswap Overview
      </Typography>
      <Box display="flex" gap={1} justifyContent="space-between">
        <TVLChart />
        <VolumeChart />
      </Box>
      <Paper
        sx={{
          bgcolor: "white",
          px: 2,
          py: 2,
          mt: 4,
          width: "100%",
        }}
      >
        <Box display="flex" gap={4}>
          <Box display="flex" gap="4px">
            <Typography>Volume 24H:</Typography>
            <Typography fontWeight={600}>$1.76b</Typography>
            <PercentageChanged percentage={40.2} sx={{ fontWeight: 600 }} />
          </Box>
          <Box display="flex" gap="4px">
            <Typography>Fees 24H:</Typography>
            <Typography fontWeight={600}>$2.23m</Typography>
            <PercentageChanged percentage={8.21} sx={{ fontWeight: 600 }} />
          </Box>
          <Box display="flex" gap="4px">
            <Typography>TVL:</Typography>
            <Typography fontWeight={600}>$3.52b</Typography>
            <PercentageChanged percentage={5.67} sx={{ fontWeight: 600 }} />
          </Box>
        </Box>
      </Paper>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Top Tokens
        </Typography>
        <TokensTable rows={tokenRows} />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Top Pools
        </Typography>
        <PoolsTable rows={poolRows} />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Transactions
        </Typography>
        <TransactionsTable rows={txRows} />
      </Box>
    </Layout>
  );
}
