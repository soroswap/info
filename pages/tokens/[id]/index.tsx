import {
  GetApp,
  OpenInNew,
  Share,
  Star,
  StarBorderOutlined,
} from "@mui/icons-material";
import { Box, Button, Grid, Link, Typography } from "@mui/material";
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
import { useQueryPoolsByTokenAddress } from "../../../src/hooks/pools";
import { StyledCard } from "components/styled/card";
import { Text } from "components/styled/text";
import { SecondaryButton, PrimaryButton } from "components/styled/button";

const TokenPage = () => {
  const router = useRouter();
  const mounted = useMounted();

  const { id } = router.query;

  const { handleSaveToken, isTokenSaved } = useSavedTokens();

  const token = useQueryToken({ tokenAddress: id as string });

  const pools = useQueryPoolsByTokenAddress({ tokenAddress: id as string });

  const StarIcon = isTokenSaved(id as string) ? Star : StarBorderOutlined;

  const stellarExpertUrl = `https://stellar.expert/explorer/public/asset/${id}`;

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
            {token.data?.name} ({token.data?.asset.code}){" "}
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
          <StyledCard sx={{ p: 2, height: 410 }}>
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
            <TokenChart tokenAddress={id as string} />
          </StyledCard>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Pools
        </Typography>
        <PoolsTable rows={pools.data ?? []} isLoading={pools.isLoading} />
      </Box>
      {/* <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Transactions
        </Typography>
        <TransactionsTable rows={rows} />
      </Box> */}
    </Layout>
  );
};

export default TokenPage;
