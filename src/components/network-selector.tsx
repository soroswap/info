import { Box, useTheme } from "@mui/material";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useQueryNetwork from "../hooks/use-query-network";
import { useQueryClient } from "@tanstack/react-query";

const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export default function NetworkSelector() {
  const theme = useTheme();

  const router = useRouter();

  const { network } = useQueryNetwork();

  const handleClick = (e: any) => {
    router.push({ query: { network: e.value } });
  };

  return (
    <Box>
      <Menu
        onItemClick={handleClick}
        menuStyle={{
          fontSize: 16,
          marginTop: 5,
        }}
        menuButton={
          <MenuButton
            style={{
              height: 40,
              width: 100,
              cursor: "pointer",
              padding: "0px 16px",
              fontFamily: theme.typography.fontFamily,
              fontSize: 16,
              backgroundColor: "#f2f2f2",
              color: "black",
              border: "none",
              borderRadius: 4,
            }}
          >
            {capitalize(network || "mainnet")}
          </MenuButton>
        }
        transition
      >
        <MenuItem value="mainnet">Mainnet</MenuItem>
        <MenuItem value="testnet">Testnet</MenuItem>
      </Menu>
    </Box>
  );
}
