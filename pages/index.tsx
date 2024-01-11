import VolumeChart from "../src/components/volume-chart";
import Layout from "../src/components/layout";
import { Box, Container, Paper, Typography } from "@mui/material";
import TVLChart from "../src/components/tvl-chart";
import PercentageChanged from "../src/components/percentage-changed";
import PoolsTable from "../src/components/pools-table";
import TokensTable from "../src/components/tokens-table";
import TransactionsTable from "../src/components/transactions-table";

export default function Home() {
  return (
    <Layout>
      <Container maxWidth="lg">
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
          <TokensTable />
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Top Pools
          </Typography>
          <PoolsTable />
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Transactions
          </Typography>
          <TransactionsTable />
        </Box>
      </Container>
    </Layout>
  );
}
