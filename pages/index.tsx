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
import Tabs from "components/tabs";
import RenderIf from "components/render-if";
import { PrimaryButton } from "components/styled/button";
import { Row } from "components/styled/row";
import { useState } from "react";
import { SearchInput } from "components/styled/search-input";
import {
  shouldFilterEvent,
  shouldFilterPool,
  shouldFilterToken,
} from "utils/filters";
import { useRouter } from "next/router";

export default function Home() {
  const pools = useQueryPools();
  const tokens = useQueryTokens();

  const router = useRouter();

  const eventsFilters = useEventTopicFilter();
  const events = useQueryAllEvents({ type: eventsFilters.topic });

  const [searchValue, setSearchValue] = useState("");

  const filteredTokens = tokens.data?.filter((token) =>
    shouldFilterToken(token.asset, searchValue)
  );

  const filteredPools = pools.data?.filter((pool) =>
    shouldFilterPool(pool, searchValue)
  );

  const filteredEvents = events.data?.filter((event) =>
    shouldFilterEvent(event, searchValue)
  );

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
        <Box sx={{ mt: 8 }}>
          <Tabs
            items={["Tokens", "Pools", "Transactions"]}
            endContent={(selected) => (
              <Row gap="8px">
                <SearchInput
                  placeholder={`Search for ${selected.toLowerCase()}`}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <RenderIf isTrue={["Tokens", "Pools"].includes(selected)}>
                  <PrimaryButton
                    variant="outlined"
                    onClick={() => {
                      router.push(`/${selected.toLowerCase()}`, {
                        query: {
                          network: router.query.network,
                        },
                      });
                    }}
                  >
                    All {selected}
                  </PrimaryButton>
                </RenderIf>
              </Row>
            )}
          >
            {(selected) => (
              <Box mt={2}>
                <RenderIf isTrue={selected === "Tokens"}>
                  <TokensTable
                    rows={filteredTokens ?? []}
                    isLoading={tokens.isLoading}
                  />
                </RenderIf>
                <RenderIf isTrue={selected === "Pools"}>
                  <PoolsTable
                    rows={filteredPools ?? []}
                    isLoading={pools.isLoading}
                  />
                </RenderIf>
                <RenderIf isTrue={selected === "Transactions"}>
                  <TransactionsTable
                    rows={filteredEvents ?? []}
                    isLoading={events.isLoading}
                    filters={eventsFilters}
                  />
                </RenderIf>
              </Box>
            )}
          </Tabs>
        </Box>
      </Layout>
    </>
  );
}
