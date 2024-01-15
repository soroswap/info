import { Box, Typography } from "@mui/material";
import { rows } from "../../src/components/pools-table/data";
import Layout from "../../src/components/layout";
import PoolsTable from "../../src/components/pools-table/pools-table";
import useSavedPools from "../../src/hooks/use-saved-pools";

const PoolsPage = () => {
  const { savedPools } = useSavedPools();
  return (
    <Layout>
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Your Watchlist
        </Typography>
        <PoolsTable
          rows={savedPools}
          emptyMessage="Saved pools will appear here"
        />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          All Pools
        </Typography>
        <PoolsTable rows={rows} />
      </Box>
    </Layout>
  );
};

export default PoolsPage;
