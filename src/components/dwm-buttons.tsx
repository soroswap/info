import { Box, Button, useTheme } from "@mui/material";

const DWMButtons = () => {
  const theme = useTheme();
  return (
    <Box display="flex" gap="8px">
      <Button
        sx={{
          bgcolor: theme.palette.primary.main,
          color: "white",
          p: 0,
          minWidth: 30,
        }}
      >
        D
      </Button>
      <Button
        sx={{
          bgcolor: theme.palette.primary.main,
          color: "white",
          p: 0,
          minWidth: 30,
        }}
      >
        W
      </Button>
      <Button
        sx={{
          bgcolor: theme.palette.primary.main,
          color: "white",
          p: 0,
          minWidth: 30,
        }}
      >
        M
      </Button>
    </Box>
  );
};

export default DWMButtons;
