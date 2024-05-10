import { Box, Grid, Typography } from "@mui/material";
import Head from "next/head";
import Layout from "../src/components/layout/layout";
import PoolsTable from "../src/components/pools-table/pools-table";
import TokensTable from "../src/components/tokens-table/tokens-table";
import TVLChart from "../src/components/tvl-chart";
import { useQueryPools } from "../src/hooks/pools";
import { useQueryTokens } from "../src/hooks/tokens";
import TransactionsTable from "../src/components/transaction-table/transactions-table";
import { useQueryAllEvents } from "../src/hooks/events";
import useEventTopicFilter from "../src/hooks/use-event-topic-filter";

export default function Home() {
  const pools = useQueryPools();
  const tokens = useQueryTokens();

  const eventsFilters = useEventTopicFilter();
  const events = useQueryAllEvents({ topic2: eventsFilters.topic });

  return (
    <>
      <Head>
        <title>Soroswap Info</title>
      </Head>
      <Layout>
        <Typography variant="h6" sx={{ mb: 1 }}></Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <TVLChart />
          </Grid>
          {/*           <Grid item xs={12} md={6}>
            <VolumeChart />
          </Grid> */}
        </Grid>

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
          <TransactionsTable
            rows={events.data ?? []}
            isLoading={events.isLoading}
            filters={eventsFilters}
          />
        </Box>
      </Layout>
    </>
  );
}
