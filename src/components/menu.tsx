import * as React from "react";
import { Box, Popover, Typography, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const ITEMS = [
  { label: "About" },
  { label: "Docs" },
  { label: "Github" },
  { label: "Discord" },
];

export default function BasicMenu() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{
          minWidth: 30,
          width: 40,
          bgcolor: "#f2f2f2",
          ":hover": { bgcolor: "#f2f2f2" },
        }}
      >
        <MoreHorizIcon sx={{ color: "black" }} />
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          bgcolor={theme.palette.primary.main}
          color="white"
          width="100px"
          p="12px 6px"
        >
          {ITEMS.map((item, idx) => (
            <Typography
              key={idx}
              sx={{
                p: 1,
                borderRadius: 1,
                cursor: "pointer",
                ":hover": { bgcolor: "#f2f2f2", color: "black" },
              }}
            >
              {item.label}
            </Typography>
          ))}
        </Box>
      </Popover>
    </Box>
  );
}
