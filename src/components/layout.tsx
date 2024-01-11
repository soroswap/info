import { AppBar, Box, Input, Typography, useTheme } from "@mui/material";
import { ReactNode, useState } from "react";
import BasicMenu from "./menu";

const LINKS = [
  {
    label: "Overview",
  },
  {
    label: "Pools",
  },
  {
    label: "Tokens",
  },
];

export default function Layout({ children }: { children: ReactNode }) {
  const theme = useTheme();

  const [active, setActive] = useState("Overview");

  const handleChangeActive = (label: string) => {
    setActive(label);
  };
  return (
    <main>
      <AppBar position="fixed">
        <Box
          bgcolor="black"
          px={2}
          py={1}
          display="flex"
          justifyContent="space-between"
        >
          <Box display="flex" gap="16px">
            <Box
              display="flex"
              alignItems="center"
              gap="2px"
              bgcolor="lightgray"
              color="black"
              px="8px"
              borderRadius="4px"
            >
              <Typography fontSize={12}>Latest synced block:</Typography>
              <Typography fontSize={12} color="green">
                12345678
              </Typography>
              <Box
                bgcolor="green"
                width="8px"
                height="8px"
                borderRadius="100%"
                marginLeft="2px"
              />
            </Box>
            <Box display="flex" alignItems="center" gap="2px">
              <Typography fontSize={12}>Eth Price:</Typography>
              <Typography fontSize={12}>$2.6k</Typography>
            </Box>
          </Box>
          <Box display="flex" gap="16px">
            <Typography fontSize={12}>V2 Analytics</Typography>
            <Typography fontSize={12}>Docs</Typography>
            <Typography fontSize={12}>App</Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" gap="12px" alignItems="center">
            <Box
              component="img"
              src="/logo-dark.svg"
              width="82px"
              height="40px"
              marginRight="12px"
            />
            {LINKS.map((link, idx) => (
              <Typography
                key={link.label}
                onClick={() => handleChangeActive(link.label)}
                sx={{
                  cursor: "pointer",
                  bgcolor: active === link.label ? "lightgray" : "",
                  color: active === link.label ? "black" : "",
                  padding: "4px 12px",
                  borderRadius: "6px",
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Box>
          <Box display="flex" gap="12px" flexGrow="1" justifyContent="flex-end">
            <Input
              placeholder="Search pools or tokens"
              sx={{
                bgcolor: "white",
                borderRadius: 5,
                px: 2,
                width: "100%",
                maxWidth: "400px",
              }}
            />
            <BasicMenu />
          </Box>
        </Box>
      </AppBar>
      <Box mt="100px" p={4} bgcolor={theme.palette.background.default}>
        {children}
      </Box>
    </main>
  );
}
