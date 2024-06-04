import { Box, Typography } from "@mui/material";
import { useQueryTokens } from "../../src/hooks/tokens";
import Layout from "../../src/components/layout/layout";
import TokensTable from "../../src/components/tokens-table/tokens-table";
import TopMovers from "../../src/components/top-movers";
import useSavedTokens from "../../src/hooks/use-saved-tokens";

const TokensPage = () => {
  const { savedTokens } = useSavedTokens();
  const tokens = useQueryTokens();
  return (
    <Layout>
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Your Watchlist
        </Typography>
        <TokensTable
          rows={savedTokens ?? []}
          emptyMessage="Saved tokens will appear here"
        />
      </Box>
      {/* <Box sx={{ mt: 4 }}>
        <TopMovers />
      </Box> */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          All Tokens
        </Typography>
        <TokensTable rows={tokens.data ?? []} isLoading={tokens.isLoading} />
      </Box>
    </Layout>
  );
};

export default TokensPage;
