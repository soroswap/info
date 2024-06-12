import { GetApp, Share, Star, StarBorderOutlined } from "@mui/icons-material";
import { Box, Grid, Link, Typography } from "@mui/material";
import { useRouter } from "next/router";
import AppBreadcrumbs from "../../../src/components/app-breadcrumbs";
import Layout from "../../../src/components/layout/layout";
import LoadingSkeleton from "../../../src/components/loading-skeleton";
import PoolsTable from "../../../src/components/pools-table/pools-table";
import Token from "../../../src/components/token";
import TokenChart from "../../../src/components/token-chart";
import { useQueryToken } from "../../../src/hooks/tokens";
import useMounted from "../../../src/hooks/use-mounted";
import useSavedTokens from "../../../src/hooks/use-saved-tokens";
import {
  formatNumberToMoney,
  formatNumberToToken,
  getSoroswapAddLiquidityUrl,
  getSoroswapSwapUrl,
  openInNewTab,
  shortenAddress,
} from "../../../src/utils/utils";
import { useQueryPools } from "../../../src/hooks/pools";
import { StyledCard } from "components/styled/card";
import { Text } from "components/styled/text";
import { SecondaryButton, PrimaryButton } from "components/styled/button";
import Tabs from "components/tabs";
import { Row } from "components/styled/row";
import { SearchInput } from "components/styled/search-input";
import RenderIf from "components/render-if";
import TransactionsTable from "components/transaction-table/transactions-table";
import useEventTopicFilter from "hooks/use-event-topic-filter";
import { useQueryAllEvents } from "hooks/events";
import { shouldFilterEvent, shouldFilterPool } from "utils/filters";
import { useState } from "react";

const TokenPage = () => {
  const router = useRouter();
  const mounted = useMounted();

  const { id } = router.query;

  const { handleSaveToken, isTokenSaved } = useSavedTokens();

  const token = useQueryToken({ tokenAddress: id as string });

  const pools = useQueryPools();

  const eventsFilters = useEventTopicFilter();
  const events = useQueryAllEvents({ type: eventsFilters.topic });

  const StarIcon = isTokenSaved(id as string) ? Star : StarBorderOutlined;

  const stellarExpertUrl = `https://stellar.expert/explorer/public/asset/${id}`;

  const [searchValue, setSearchValue] = useState("");

  const filteredPools = pools.data?.filter((pool) => {
    return (
      shouldFilterPool(pool, token.data?.asset.code) &&
      shouldFilterPool(pool, searchValue)
    );
  });

  const filteredEvents = events.data?.filter((event) => {
    return (
      shouldFilterEvent(event, token.data?.asset.code) &&
      shouldFilterEvent(event, searchValue)
    );
  });

  if (!mounted) return null;

  return (
    <Layout>
      <Box display="flex" justifyContent="space-between">
        <AppBreadcrumbs
          breadcrumbs={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Tokens",
              href: "/tokens",
            },
            {
              label: (
                <Box>
                  {token.data?.asset.code}{" "}
                  <Link
                    sx={{ cursor: "pointer" }}
                    underline="hover"
                    href={stellarExpertUrl}
                    target="_blank"
                  >
                    ({shortenAddress(id as string)})
                  </Link>
                </Box>
              ),
            },
          ]}
        />
        <Box display="flex" alignItems="center" gap="12px">
          <Box
            display="flex"
            border="1px solid white"
            borderRadius="8px"
            p="8px"
            sx={{
              ":hover": {
                cursor: "pointer",
                opacity: 0.8,
              },
            }}
            onClick={() => handleSaveToken(id as string)}
          >
            <StarIcon
              sx={{
                height: "20px",
              }}
            />
          </Box>
          <Box
            display="flex"
            border="1px solid white"
            borderRadius="8px"
            p="8px"
            sx={{
              ":hover": {
                cursor: "pointer",
                opacity: 0.8,
              },
            }}
            onClick={() => openInNewTab(stellarExpertUrl)}
          >
            <Share
              fontSize="small"
              sx={{
                height: "20px",
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap="6px" mt={4}>
        <LoadingSkeleton
          isLoading={token.isLoading}
          height={40}
          width={40}
          variant="circular"
        >
          <Token imageUrl={token.data?.asset.icon} />
        </LoadingSkeleton>
        <LoadingSkeleton isLoading={token.isLoading} variant="text">
          <Typography variant="h5">
            {token.data?.asset.name} ({token.data?.asset.code}){" "}
          </Typography>
        </LoadingSkeleton>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mt={2}
      >
        <Box display="flex" gap="8px" alignItems="center">
          <LoadingSkeleton isLoading={token.isLoading} height={30}>
            <Typography variant="h4">
              {formatNumberToMoney(token.data?.price)}
            </Typography>
            {/* <PercentageChanged percentage={token.data?.priceChange24h ?? 0} /> */}
          </LoadingSkeleton>
        </Box>
        <Box display="flex" gap={2}>
          <LoadingSkeleton
            isLoading={token.isLoading}
            height={36.5}
            width={100}
          >
            <a
              href={getSoroswapAddLiquidityUrl(token.data?.asset.contract)}
              target="_blank"
            >
              <SecondaryButton variant="contained" endIcon={<GetApp />}>
                Add Liquidity
              </SecondaryButton>
            </a>
          </LoadingSkeleton>
          <LoadingSkeleton
            isLoading={token.isLoading}
            height={36.5}
            width={100}
          >
            <a
              href={getSoroswapSwapUrl(token.data?.asset.contract)}
              target="_blank"
            >
              <PrimaryButton variant="contained">Trade</PrimaryButton>
            </a>
          </LoadingSkeleton>
        </Box>
      </Box>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={4}>
          <StyledCard sx={{ px: 2, py: 1, height: 410 }}>
            <Box mt={2}>
              <Text>TVL</Text>
              <LoadingSkeleton isLoading={token.isLoading} variant="text">
                <Typography variant="h6">
                  {formatNumberToMoney(token.data?.tvl)}
                </Typography>
              </LoadingSkeleton>

              {/* <PercentageChanged
                percentage={token.data?.tvlSlippage24h ?? 0}
                noParentheses
              /> */}
            </Box>
            <Box mt={2}>
              <Text>24h Trading Vol</Text>
              <LoadingSkeleton isLoading={token.isLoading} variant="text">
                <Typography variant="h6">
                  {formatNumberToMoney(token.data?.volume24h)}
                </Typography>
              </LoadingSkeleton>

              {/* <PercentageChanged
                percentage={token.data?.volume24hChange ?? 0}
                noParentheses
              /> */}
            </Box>
            <Box mt={2}>
              <Text>7d Trading Vol</Text>
              <LoadingSkeleton isLoading={token.isLoading} variant="text">
                <Typography variant="h6">
                  {formatNumberToMoney(token.data?.volume7d)}
                </Typography>
              </LoadingSkeleton>

              {/* <PercentageChanged
                percentage={token.data?.volume7dChange ?? 0}
                noParentheses
              /> */}
            </Box>
            <Box mt={2}>
              <Text>24h Fees</Text>
              <LoadingSkeleton isLoading={token.isLoading} variant="text">
                <Typography variant="h6">
                  {formatNumberToToken(token.data?.fees24h)}
                </Typography>
              </LoadingSkeleton>
            </Box>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={8}>
          <StyledCard sx={{ height: 410 }}>
            <TokenChart
              tokenAddress={id as string}
              isLoading={token.isLoading}
              volumeChartData={token.data?.volumeChartData}
              tvlChartData={token.data?.tvlChartData}
              priceChartData={token.data?.priceChartData}
            />
          </StyledCard>
        </Grid>
      </Grid>
      <Box mt={8}>
        <Tabs
          items={["Pools", "Transactions"]}
          endContent={(selected) => (
            <Row gap="8px">
              <SearchInput
                placeholder={`Search for ${selected.toLowerCase()}`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Row>
          )}
        >
          {(selected) => (
            <Box mt={2}>
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
  );
};

export default TokenPage;
