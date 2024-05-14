import { useMediaQuery, useTheme } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Row } from "../styled/row";
import Image from "next/image";
import NetworkSelector from "./network-selector";
import Navbar from "./navbar";
import PagesMenu from "./pages-menu";
import { useRouter } from "next/router";
import Link from "next/link";

interface NavItem {
  href: string;
  label: string;
  target?: string;
  active?: boolean;
}

const Header = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down(1220));

  const router = useRouter();

  const { pathname } = router;

  const navItems: NavItem[] = [
    {
      href: "https://app.soroswap.finance/balance",
      label: "Balance",
      target: "_blank",
    },
    {
      href: "https://app.soroswap.finance/swap",
      label: "Swap",
      target: "_blank",
    },
    {
      href: "https://app.soroswap.finance/liquidity",
      label: "Liquidity",
      target: "_blank",
    },
    {
      href: "https://app.soroswap.finance/bridge",
      label: "Bridge",
      target: "_blank",
    },
    {
      href: "/",
      label: "Info",
      target: "_self",
      active: true,
    },
  ];

  return (
    <Row paddingY="24px" justifyContent="space-between">
      <Link href="/">
        <Image src="/logo-dark.svg" width={115} height={40} alt="Soroswap" />
      </Link>

      <Navbar navItems={navItems} />

      <Row gap="16px">
        <NetworkSelector />
        {isMobile ? (
          <Menu
            sx={{
              color: theme.palette.custom.textPrimary,
              height: "40px",
              width: "40px",
              cursor: "pointer",
            }}
          />
        ) : (
          <PagesMenu />
        )}
      </Row>
    </Row>
  );
};

export default Header;
