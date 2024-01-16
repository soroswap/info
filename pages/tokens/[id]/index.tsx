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
import { useRouter } from "next/router";
import AppBreadcrumbs from "../../../src/components/app-breadcrumbs";
import Layout from "../../../src/components/layout";
import PercentageChanged from "../../../src/components/percentage-changed";
import PoolChart from "../../../src/components/pool-chart";
import Token from "../../../src/components/token";
import TransactionsTable from "../../../src/components/transaction-table/transactions-table";
import useSavedPools from "../../../src/hooks/use-saved-pools";
import TokenChart from "../../../src/components/token-chart";
import PoolsTable from "../../../src/components/pools-table/pools-table";
import { rows as poolRows } from "../../../src/components/pools-table/data";
import useSavedTokens from "../../../src/hooks/use-saved-tokens";
const TokenPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { handleSavePool, isTokenSaved } = useSavedTokens();

  const StarIcon = isTokenSaved(id as string) ? Star : StarBorderOutlined;

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
              label: "ETH",
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
        <Token token="ETH" />
        <Typography variant="h5">Ether (ETH) </Typography>
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
          <Typography variant="h4">$2.56k</Typography>
          <PercentageChanged percentage={-1.52} />
        </Box>
        <Box display="flex" gap={2}>
          <Button variant="contained">Add liquidity</Button>
          <Button variant="contained">Trade</Button>
        </Box>
      </Box>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "white", p: 2, height: 410 }}>
            <Box mt={2}>
              <Typography>TVL</Typography>
              <Typography variant="h5">$3.40m</Typography>
              <PercentageChanged percentage={6.76} noParentheses />
            </Box>
            <Box mt={2}>
              <Typography>24h Trading Vol</Typography>
              <Typography variant="h5">$1.74m</Typography>
              <PercentageChanged percentage={38.54} noParentheses />
            </Box>
            <Box mt={2}>
              <Typography>7d Trading Vol</Typography>
              <Typography variant="h5">$5.74m</Typography>
              <PercentageChanged percentage={38.54} noParentheses />
            </Box>
            <Box mt={2}>
              <Typography>24h Fees</Typography>
              <Typography variant="h5">$5.22k</Typography>
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
        <PoolsTable rows={poolRows} />
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
