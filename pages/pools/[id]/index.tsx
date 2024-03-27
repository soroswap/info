import {
  Box,
  Button,
  Card,
  Chip,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { OpenInNew, Star, StarBorderOutlined } from "@mui/icons-material";
import { rows } from "../../../src/components/transaction-table/data";
import { useQueryPool } from "../../../src/hooks/pools";
import { useRouter } from "next/router";
import AppBreadcrumbs from "../../../src/components/app-breadcrumbs";
import Layout from "../../../src/components/layout";
import Link from "next/link";
import LoadingSkeleton from "../../../src/components/loading-skeleton";
import PercentageChanged from "../../../src/components/percentage-changed";
import PoolChart from "../../../src/components/pool-chart";
import Token from "../../../src/components/token";
import TransactionsTable from "../../../src/components/transaction-table/transactions-table";
import useSavedPools from "../../../src/hooks/use-saved-pools";
import {
  formatNumberToMoney,
  getExpectedAmountOfOne,
  getSoroswapAddLiquidityUrl,
  getSoroswapSwapUrl,
  shortenAddress,
} from "../../../src/utils/utils";

const PoolPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { handleSavePool, isPoolSaved } = useSavedPools();

  const pool = useQueryPool({ poolAddress: id as string });
  const token0 = pool.data?.token0;
  const token1 = pool.data?.token1;
  if (token0?.code == token0?.contract && token0) {
    token0.code = shortenAddress(token0?.contract);
  }
  if (token1?.code == token1?.contract && token1) {
    token1.code = shortenAddress(token1?.contract);
  }
  const token0code = token0?.code ?? "";
  const token1code = token1?.code ?? "";

  const StarIcon = isPoolSaved(id as string) ? Star : StarBorderOutlined;

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
              label: "Pools",
              href: "/pools",
            },
            {
              label: `${token0code}/${token1code}`,
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
        <Token imageUrl={token0?.icon} />
        <Token imageUrl={token1?.icon} />
        <Typography variant="h5">
          {token0code}/{token1code}
        </Typography>
        <Chip label="0.3%" sx={{ fontSize: 16 }} />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mt={2}
      >
        <Box display="flex" gap="8px" flexWrap="wrap">
          <LoadingSkeleton isLoading={pool.isLoading}>
            <Chip
              sx={{
                ":hover": {
                  bgcolor: "lightgray",
                },
                fontSize: 16,
              }}
              label={
                <Link href="/tokens/123">
                  <Box display="flex" alignItems="center" gap="4px">
                    <Token imageUrl={token0?.icon} width={20} height={20} />1{" "}
                    {token0code} ={" "}
                    {getExpectedAmountOfOne(
                      pool.data?.reserve0,
                      pool.data?.reserve1
                    )}{" "}
                    {token1code}
                  </Box>
                </Link>
              }
            />
          </LoadingSkeleton>
          <LoadingSkeleton isLoading={pool.isLoading}>
            <Chip
              sx={{
                ":hover": {
                  bgcolor: "lightgray",
                },
                fontSize: 16,
              }}
              label={
                <Link href="/tokens/123">
                  <Box display="flex" alignItems="center" gap="4px">
                    <Token imageUrl={token1?.icon} width={20} height={20} />1{" "}
                    {token1code} ={" "}
                    {getExpectedAmountOfOne(
                      pool.data?.reserve1,
                      pool.data?.reserve0
                    )}{" "}
                    {token0code}
                  </Box>
                </Link>
              }
            />
          </LoadingSkeleton>
        </Box>
        <Box display="flex" gap="8px">
          <LoadingSkeleton isLoading={pool.isLoading} height={36.5} width={100}>
            <Button variant="contained">
              <a
                href={getSoroswapAddLiquidityUrl(
                  token0?.contract,
                  token1?.contract
                )}
                target="_blank"
              >
                Add liquidity
              </a>
            </Button>
          </LoadingSkeleton>
          <LoadingSkeleton isLoading={pool.isLoading} height={36.5} width={100}>
            <Button variant="contained">
              <a
                href={getSoroswapSwapUrl(token0?.contract, token1?.contract)}
                target="_blank"
              >
                Trade
              </a>
            </Button>
          </LoadingSkeleton>
        </Box>
      </Box>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "white", p: 2, height: 410 }}>
            <Paper sx={{ bgcolor: "#00000014", p: 2 }}>
              <Typography>Total tokens locked</Typography>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <LoadingSkeleton
                  isLoading={pool.isLoading}
                  variant="text"
                  height={20}
                >
                  <Typography
                    fontSize={14}
                    display="flex"
                    gap="4px"
                    alignItems="center"
                  >
                    <Token imageUrl={token0?.icon} width={20} height={20} />
                    {token0code}
                  </Typography>
                  <Typography fontSize={14}>
                    {formatNumberToMoney(pool.data?.reserve0)}
                  </Typography>
                </LoadingSkeleton>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <LoadingSkeleton
                  isLoading={pool.isLoading}
                  variant="text"
                  height={20}
                >
                  <Typography
                    fontSize={14}
                    display="flex"
                    gap="4px"
                    alignItems="center"
                  >
                    <Token imageUrl={token1?.icon} width={20} height={20} />
                    {token1code}
                  </Typography>{" "}
                  <Typography fontSize={14}>
                    {formatNumberToMoney(pool.data?.reserve1)}
                  </Typography>
                </LoadingSkeleton>
              </Box>
            </Paper>
            <Box mt={2}>
              <Typography>TVL</Typography>
              <LoadingSkeleton isLoading={pool.isLoading} variant="text">
                <Typography variant="h5">
                  {formatNumberToMoney(pool.data?.tvl)}
                </Typography>
              </LoadingSkeleton>
            </Box>
            <Box mt={2}>
              <Typography>Volume 24h</Typography>
              <LoadingSkeleton isLoading={pool.isLoading} variant="text">
                <Typography variant="h5">
                  {formatNumberToMoney(pool.data?.volume24h)}
                </Typography>
              </LoadingSkeleton>
            </Box>
            <Box mt={2}>
              <Typography>24h Fees</Typography>
              <LoadingSkeleton isLoading={pool.isLoading} variant="text">
                <Typography variant="h5">
                  {formatNumberToMoney(pool.data?.fees24h)}
                </Typography>
              </LoadingSkeleton>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: 410, bgcolor: "white" }}>
            <PoolChart poolAddress={id as string} />
          </Card>
        </Grid>
      </Grid>
      {/* <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Transactions
        </Typography>
        <TransactionsTable rows={rows} />
      </Box> */}
    </Layout>
  );
};

export default PoolPage;
