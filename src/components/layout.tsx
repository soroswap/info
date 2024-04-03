import {
  AppBar,
  Box,
  Container,
  Grid,
  Input,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { formatNumberToMoney } from "../utils/utils";
import LoadingSkeleton from "./loading-skeleton";
import BasicMenu from "./menu";
import NetworkSelector from "./network-selector";
import { useQueryXLMPrice } from "../hooks/xlm-price";

const LINKS = [
  {
    label: "Overview",
    href: "/",
  },
  {
    label: "Pools",
    href: "/pools",
  },
  {
    label: "Tokens",
    href: "/tokens",
  },
];

export default function Layout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const isMd = useMediaQuery("(max-width: 900px)");
  const router = useRouter();
  const currentPath = router.pathname;

  const isActive = (href: string) => {
    if (href === "/") return currentPath === href;
    return currentPath.includes(href);
  };

  const xlm = useQueryXLMPrice();

  return (
    <main>
      <AppBar position="fixed">
        {!isMd && (
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
                <Typography fontSize={12}>
                  ⚠️ *This is a beta version, and data computation is actively
                  in progress.
                </Typography>
                <Typography fontSize={12} color="green">
                  ⚠️
                </Typography>
                <Box
                  bgcolor="red"
                  width="8px"
                  height="8px"
                  borderRadius="100%"
                  marginLeft="2px"
                />
              </Box>
              <Box display="flex" alignItems="center" gap="2px">
                <Typography fontSize={12}>XLM Price:</Typography>
                <LoadingSkeleton
                  isLoading={xlm.isLoading}
                  height={15}
                  width={80}
                  style={{ background: "gray" }}
                >
                  <Typography fontSize={12}>
                    {formatNumberToMoney(xlm.data)}
                  </Typography>
                </LoadingSkeleton>
              </Box>
            </Box>
            <Box display="flex" gap="16px">
              <Link href={"https://docs.soroswap.finance"} target="_blank">
                Docs
              </Link>
              <Link href={"https://app.soroswap.finance"} target="_blank">
                App
              </Link>
            </Box>
          </Box>
        )}

        <Grid container spacing={2} p={2}>
          <Grid item xs={12} md={6} display="flex" alignItems="center" gap={2}>
            <Box
              component="img"
              src="/logo-dark.svg"
              width="82px"
              height="40px"
              marginRight="12px"
            />
            <Box display="flex" gap={1} flexGrow={1}>
              {LINKS.map((link, idx) => (
                <Link href={link.href} key={link.label}>
                  <Typography
                    sx={{
                      cursor: "pointer",
                      bgcolor: isActive(link.href) ? "lightgray" : "",
                      color: isActive(link.href) ? "black" : "",
                      padding: "4px 12px",
                      borderRadius: "6px",
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            gap={2}
          >
            <NetworkSelector />
            <Input
              placeholder="Search pools or tokens"
              sx={{
                bgcolor: "white",
                borderRadius: 5,
                px: 2,
                py: 0.5,
                width: "100%",
                maxWidth: isMd ? "100%" : 400,
              }}
            />
            <BasicMenu />
          </Grid>
        </Grid>
      </AppBar>
      <Box mt="120px" p={4} bgcolor={theme.palette.background.default}>
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </main>
  );
}
