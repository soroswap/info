import { AppBar, Box, Input, Typography } from "@mui/material";
import BasicMenu from "./menu";
import { ReactNode } from "react";

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
  return (
    <main>
      <AppBar position="fixed" sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" gap="12px" alignItems="center">
            {LINKS.map((link) => (
              <Typography key={link.label} sx={{ cursor: "pointer" }}>
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
      <Box mt="70px" p={4}>
        {children}
      </Box>
    </main>
  );
}
