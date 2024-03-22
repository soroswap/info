import { OpenInNew, Star, StarBorderOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Grid,
  Link,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";
import AppBreadcrumbs from "../../../src/components/app-breadcrumbs";
import Layout from "../../../src/components/layout";
import LoadingSkeleton from "../../../src/components/loading-skeleton";
import PercentageChanged from "../../../src/components/percentage-changed";
import PoolsTable from "../../../src/components/pools-table/pools-table";
import Token from "../../../src/components/token";
import TokenChart from "../../../src/components/token-chart";
import { rows } from "../../../src/components/transaction-table/data";
import TransactionsTable from "../../../src/components/transaction-table/transactions-table";
import { useQueryPools } from "../../../src/hooks/pools";
import { useQueryToken } from "../../../src/hooks/tokens";
import useMounted from "../../../src/hooks/use-mounted";
import useSavedTokens from "../../../src/hooks/use-saved-tokens";
import {
  formatNumberToMoney,
  getSoroswapAddLiquidityUrl,
  getSoroswapSwapUrl,
  openInNewTab,
  shortenAddress,
} from "../../../src/utils/utils";

const TokenPage = () => {
  const router = useRouter();
  const mounted = useMounted();

  const { id } = router.query;

  const { handleSavePool, isTokenSaved } = useSavedTokens();

  const token = useQueryToken({ tokenAddress: id as string });

  const pools = useQueryPools();

  const StarIcon = isTokenSaved(id as string) ? Star : StarBorderOutlined;

  const stellarExpertUrl = `https://stellar.expert/explorer/public/asset/${id}`

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
                  ETH{" "}
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
        <Box display="flex" alignItems="center" gap="4px">
          <StarIcon
            onClick={() => handleSavePool(id as string)}
            sx={{
              ":hover": {
                cursor: "pointer",
                opacity: 0.5,
              },
            }}
          />
          <OpenInNew
            fontSize="small"
            onClick={() => openInNewTab(stellarExpertUrl)}
            sx={{
              ":hover": {
                cursor: "pointer",
                opacity: 0.5,
              },
            }}
          />
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap="6px" mt={4}>
        <LoadingSkeleton
          isLoading={token.isLoading}
          height={40}
          width={40}
          variant="circular"
        >
          <Token imageUrl={token.data?.logo} />
        </LoadingSkeleton>
        <LoadingSkeleton isLoading={token.isLoading} variant="text">
          <Typography variant="h5">{token.data?.name} ({token.data?.symbol}) </Typography>
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
            <Button variant="contained">
              <a
                href={getSoroswapAddLiquidityUrl(token.data?.token)}
                target="_blank"
              >
                Add liquidity
              </a>
            </Button>
          </LoadingSkeleton>
          <LoadingSkeleton
            isLoading={token.isLoading}
            height={36.5}
            width={100}
          >
            <Button variant="contained">
              <a href={getSoroswapSwapUrl(token.data?.token)} target="_blank">
                Trade
              </a>
            </Button>
          </LoadingSkeleton>
        </Box>
      </Box>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "white", p: 2, height: 410 }}>
            <Box mt={2}>
              <Typography>TVL</Typography>
              <LoadingSkeleton isLoading={token.isLoading} variant="text">
                <Typography variant="h5">
                  {formatNumberToMoney(token.data?.tvl)}
                </Typography>
              </LoadingSkeleton>

              {/* <PercentageChanged percentage={token.data?.tvlSlippage24h ?? 0} noParentheses /> */}
            </Box>
            <Box mt={2}>
              <Typography>24h Trading Vol</Typography>
              <LoadingSkeleton isLoading={token.isLoading} variant="text">
                <Typography variant="h5">
                  {formatNumberToMoney(token.data?.volume24h)}
                </Typography>
              </LoadingSkeleton>

              {/* <PercentageChanged percentage={token.data?.volume24hChange ?? 0} noParentheses /> */}
            </Box>
            <Box mt={2}>
              <Typography>7d Trading Vol</Typography>
              <LoadingSkeleton isLoading={token.isLoading} variant="text">
                <Typography variant="h5">
                  {formatNumberToMoney(token.data?.volume7d)}
                </Typography>
              </LoadingSkeleton>

              {/* <PercentageChanged percentage={token.data?.volume7dChange ?? 0} noParentheses /> */}
            </Box>
            <Box mt={2}>
              <Typography>24h Fees</Typography>
              <LoadingSkeleton isLoading={token.isLoading} variant="text">
                <Typography variant="h5">
                  {formatNumberToMoney(token.data?.fees24h)}
                </Typography>
              </LoadingSkeleton>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: 410, bgcolor: "white" }}>
            <TokenChart />
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Pools
        </Typography>
        <PoolsTable rows={pools.data ?? []} isLoading={pools.isLoading} />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Transactions
        </Typography>
        <TransactionsTable rows={rows} />
      </Box>
    </Layout>
  );
};

export default TokenPage;
