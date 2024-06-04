import { AppBar, Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useQueryXLMPrice } from "../../hooks/xlm-price";
import Banner from "./banner";
import Header from "./header";
import Footer from "./footer";

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
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          borderBottom: "1px solid #1B1B1B",
        }}
      >
        <Box bgcolor={theme.palette.customBackground.accentAction}>
          <Container maxWidth="lg">
            <Banner />
          </Container>
        </Box>
        <Box bgcolor={theme.palette.background.default}>
          <Container maxWidth="lg">
            <Header />
          </Container>
        </Box>
      </AppBar>
      <Box mt="140px" p={4} bgcolor={theme.palette.background.default}>
        <Container maxWidth="lg" sx={{ minHeight: "100vh" }}>
          {children}
        </Container>
      </Box>
      <Footer />
    </main>
  );
}
