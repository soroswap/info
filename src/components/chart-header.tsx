import { Box, Typography } from "@mui/material";
import DWMButtons from "./dwm-buttons";

interface Props {
  title: string;
  subtitle: string;
}

const ChartHeader = ({ title, subtitle }: Props) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      px={2}
      alignItems="center"
      mb={2}
    >
      <Box>
        <Typography variant="body2" color="black">
          {title}
        </Typography>
        <Typography variant="h4" fontWeight={600}>
          {subtitle}
        </Typography>
      </Box>
      <DWMButtons />
    </Box>
  );
};

export default ChartHeader;
