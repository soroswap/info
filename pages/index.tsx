import VolumeChart from "../src/components/volume-chart";
import Layout from "../src/components/layout";
import { Box, Container, Paper, Typography } from "@mui/material";
import TVLChart from "../src/components/tvl-chart";
import PercentageChanged from "../src/components/percentage-changed";

export default function Home() {
  return (
    <Layout>
      <Container maxWidth="lg">
        <Box display="flex" gap={1} justifyContent="space-between">
          <TVLChart />
          <VolumeChart />
        </Box>
        <Paper
          sx={{
            bgcolor: "white",
            px: 2,
            py: 2,
            mt: 4,
            width: "100%",
          }}
        >
          <Box display="flex" gap={4}>
            <Box display="flex" gap="4px">
              <Typography>Volume 24H:</Typography>
              <Typography fontWeight={600}>$1.76b</Typography>
              <PercentageChanged percentage={40.2} sx={{ fontWeight: 600 }} />
            </Box>
            <Box display="flex" gap="4px">
              <Typography>Fees 24H:</Typography>
              <Typography fontWeight={600}>$2.23m</Typography>
              <PercentageChanged percentage={8.21} sx={{ fontWeight: 600 }} />
            </Box>
            <Box display="flex" gap="4px">
              <Typography>TVL:</Typography>
              <Typography fontWeight={600}>$3.52b</Typography>
              <PercentageChanged percentage={5.67} sx={{ fontWeight: 600 }} />
            </Box>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}
