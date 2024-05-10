import { useMediaQuery, useTheme } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Row } from "../styled/row";
import Image from "next/image";
import NetworkSelector from "./network-selector";
import soroswapLogoPurpleWhite from "assets/svg/SoroswapPurpleWhite.svg";
import Navbar from "./navbar";
import PagesMenu from "./pages-menu";

interface NavItem {
  href: string;
  label: string;
  target?: string;
}

const navItems: NavItem[] = [
  { href: "/balance", label: "Balance", target: "_self" },
  { href: "/swap", label: "Swap", target: "_self" },
  { href: "/liquidity", label: "Liquidity", target: "_self" },
  { href: "/bridge", label: "Bridge", target: "_self" },
  { href: "https://info.soroswap.finance", label: "Info", target: "_blank" },
];

const Header = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down(1220));

  return (
    <Row paddingY="24px" justifyContent="space-between">
      <Image
        src={soroswapLogoPurpleWhite}
        width={115}
        height={40}
        alt="Soroswap"
      />

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
