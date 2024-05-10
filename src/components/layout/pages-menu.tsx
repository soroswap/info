import { Box } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import * as React from "react";
import Link from "next/link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function PagesMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box
        component="button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          border: "1px solid white",
          borderRadius: "8px",
          width: 40,
          height: 40,
          bgcolor: "transparent",
          cursor: "pointer",
        }}
      >
        <MoreHoriz />
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        MenuListProps={{
          sx: {
            bgcolor: "#1b1b1b",
          },
        }}
      >
        <MenuItem>
          <Link href="https://soroswap.finance/" target="_blank">
            About
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="https://docs.soroswap.finance/" target="_blank">
            Docs
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="https://github.com/soroswap" target="_blank">
            Github
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="https://discord.gg/G8c98rhfqw" target="_blank">
            Discord
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
