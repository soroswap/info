import { Box, Grid, Paper, Typography } from "@mui/material";
import Head from "next/head";
import Layout from "../src/components/layout";
import LoadingSkeleton from "../src/components/loading-skeleton";
import PoolsTable from "../src/components/pools-table/pools-table";
import TokensTable from "../src/components/tokens-table/tokens-table";
import TVLChart from "../src/components/tvl-chart";
import VolumeChart from "../src/components/volume-chart";
import { useQueryPools } from "../src/hooks/pools";
import {
  useQuerySoroswapFees24h,
  useQuerySoroswapTVL,
  useQuerySoroswapVolume24h,
} from "../src/hooks/soroswap";
import { useQueryTokens } from "../src/hooks/tokens";
import { formatNumberToMoney } from "../src/utils/utils";
import TransactionsTable from "../src/components/transaction-table/transactions-table";

export default function Home() {
  const pools = useQueryPools();
  const tokens = useQueryTokens();
  const soroswapTVL = useQuerySoroswapTVL();
  
  return (
    <>
      <Head>
        <title>Soroswap Info</title>
      </Head>
      <Layout>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Soroswap Overview
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <TVLChart />
          </Grid>
{/*           <Grid item xs={12} md={6}>
            <VolumeChart />
          </Grid> */}
        </Grid>
        <Paper
          sx={{
            bgcolor: "white",
            px: 2,
            py: 2,
            mt: 4,
            width: "100%",
          }}
        >
          <Grid container spacing={1}>
            {/* <Grid
              item
              xs={12}
              md={4}
              display="flex"
              gap="4px"
              alignItems="center"
            >
              <Typography>Volume 24H:</Typography>
              <LoadingSkeleton isLoading={soroswapVolume.isLoading} height={20}>
                <Typography fontWeight={600}>
                  {formatNumberToMoney(soroswapVolume.data?.volume)}
                </Typography>
                <PercentageChanged percentage={40.2} sx={{ fontWeight: 600 }} />
              </LoadingSkeleton>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              display="flex"
              gap="4px"
              alignItems="center"
            >
              <Typography>Fees 24H:</Typography>
              <LoadingSkeleton isLoading={soroswapFees.isLoading} height={20}>
                <Typography fontWeight={600}>
                  {formatNumberToMoney(soroswapFees.data?.fees)}
                </Typography>
                <PercentageChanged percentage={40.2} sx={{ fontWeight: 600 }} />
              </LoadingSkeleton>
            </Grid> */}
            <Grid
              item
              xs={12}
              md={4}
              display="flex"
              gap="4px"
              alignItems="center"
            >
              <Typography>TVL:</Typography>
              <LoadingSkeleton isLoading={soroswapTVL.isLoading} height={20}>
                <Typography fontWeight={600}>
                  {formatNumberToMoney(soroswapTVL.data?.tvl)}
                </Typography>
                {/* <PercentageChanged percentage={40.2} sx={{ fontWeight: 600 }} /> */}
              </LoadingSkeleton>
            </Grid>
          </Grid>
        </Paper>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Top Tokens
          </Typography>
          <TokensTable rows={tokens.data ?? []} isLoading={tokens.isLoading} />
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Top Pools
          </Typography>

          <PoolsTable rows={pools.data ?? []} isLoading={pools.isLoading} />
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Transactions
          </Typography>
          <TransactionsTable />
        </Box>
      </Layout>
    </>
  );
}
