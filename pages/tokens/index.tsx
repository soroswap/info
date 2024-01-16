import { Box, Typography } from "@mui/material";
import Layout from "../../src/components/layout";
import TopMovers from "../../src/components/top-movers";
import TokensTable from "../../src/components/tokens-table/tokens-table";
import { rows } from "../../src/components/tokens-table/data";
import useSavedTokens from "../../src/hooks/use-saved-tokens";

const TokensPage = () => {
  const { savedTokens } = useSavedTokens();
  return (
    <Layout>
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Your Watchlist
        </Typography>
        <TokensTable
          rows={savedTokens}
          emptyMessage="Saved tokens will appear here"
        />
      </Box>
      <Box sx={{ mt: 4 }}>
        <TopMovers />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          All Tokens
        </Typography>
        <TokensTable rows={rows} />
      </Box>
    </Layout>
  );
};

export default TokensPage;
