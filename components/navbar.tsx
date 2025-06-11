"use client";

import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { GithubIcon, SearchIcon } from "@/components/icons";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ProfileDropdown } from './profile-dropdown';

export const Navbar = () => {
  const { theme } = useTheme();
  const [ mounted, setMounted ] = useState( false );

  useEffect( () => {
    setMounted( true );
  }, [] );

  const imageSrc =
    !mounted
      ? "https://i.imgur.com/dHcbo3u.png"
      : theme === "dark"
        ? "https://i.imgur.com/dHcbo3u.png"
        : "https://i.imgur.com/h9DXFR4.png";

  const searchInput = (
    <Input
      aria-label="Buscar"
      classNames={ {
        inputWrapper: "bg-default-100",
        input: "text-sm",
      } }
      labelPlacement="outside"
      placeholder="Buscar..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="static"
      className="fixed top-0 left-0 w-full z-50"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image
              alt="RR SS"
              src={ imageSrc }
              width={ 50 }
            />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="flex-1 justify-center hidden md:block mt-6" justify="center">
        <NavbarItem className="w-full max-w-md flex justify-center">
          { searchInput }
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden md:flex">
          <ProfileDropdown />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        { searchInput }
        <div className="mx-4 mt-2 flex flex-col gap-2">
          { siteConfig.navMenuItems.map( ( item, index ) => (
            <NavbarMenuItem key={ `${ item }-${ index }` }>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                { item.label }
              </Link>
            </NavbarMenuItem>
          ) ) }
        </div>
      </NavbarMenu>
    </HeroUINavbar>

  );
};
