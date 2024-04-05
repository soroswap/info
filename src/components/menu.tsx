import { MoreHoriz } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";

export default function BasicMenu() {
  const theme = useTheme();

  return (
    <Box>
      <Menu
        menuStyle={{
          fontSize: 16,
          marginTop: 5,
        }}
        menuButton={
          <MenuButton
            style={{
              height: 40,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "0px 12px",
              fontFamily: theme.typography.fontFamily,
              fontSize: 16,
              backgroundColor: "#f2f2f2",
              color: "black",
              border: "none",
              borderRadius: 4,
            }}
          >
            <MoreHoriz />
          </MenuButton>
        }
        transition
      >
        <MenuItem href="https://soroswap.finance/" target="_blank">
          About
        </MenuItem>
        <MenuItem href="https://docs.soroswap.finance/" target="_blank">
          Docs
        </MenuItem>
        <MenuItem href="https://github.com/soroswap" target="_blank">
          Github
        </MenuItem>
        <MenuItem href="https://discord.gg/G8c98rhfqw" target="_blank">
          Discord
        </MenuItem>
      </Menu>
    </Box>
  );
}
