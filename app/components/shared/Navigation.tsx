"use client";

import { FC, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import ThemeToggle from "./ThemeToggle";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

const Navigation: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">SPŠT Knižnica</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">SPŠT Knižnica</p>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="#">
            Knihy
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Kategórie
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Spisovatelia
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Vydavateľstvá
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} color="primary" variant="flat" href="#">
            Prihlásenie
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="secondary" href="#" variant="flat">
            Registrácia
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link className="w-full" color="primary" href="#" size="lg">
            Knihy
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="mt-2">
          <Link className="w-full" color="primary" href="#" size="lg">
            Kategórie
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="mt-2">
          <Link className="w-full" color="primary" href="#" size="lg">
            Spisovatelia
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="mt-2">
          <Link className="w-full" color="primary" href="#" size="lg">
            Vydavatelstvá
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Navigation;
