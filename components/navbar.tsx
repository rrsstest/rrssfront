"use client";
import { useEffect, useState } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { useTheme } from "next-themes";

import { siteConfig } from "@/config/site";
import { ProfileDropdown } from './profile-dropdown';
import { SearchIcon } from "@/components/icons";
import { MessagesDropdown, NotificationsDropdown } from './notificactions';


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
      isBlurred
    >
      <NavbarContent className="basis-1/5 justify-start hidden md:flex" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image alt="RR SS" src={ imageSrc } width={ 50 } />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <div className="w-full flex md:hidden items-center h-16">
        <div className="flex-1" />
        <div className="flex items-center justify-center">
          <NavbarBrand as="li" className="gap-3 max-w-fit flex items-center justify-center">
            <NextLink className="flex items-center justify-center gap-1" href="/">
              <Image alt="RR SS" src={ imageSrc } width={ 50 } />
            </NextLink>
          </NavbarBrand>
        </div>
        <div className="flex-1 flex justify-end">
          <NavbarMenuToggle />
        </div>
      </div>

      <NavbarContent className="flex-1 justify-center hidden md:flex" justify="center">
        <NavbarItem className="w-full max-w-md flex justify-center">
          { searchInput }
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="basis-1/5 justify-end hidden md:flex" justify="end">
        <NavbarItem>
          <MessagesDropdown />
        </NavbarItem>
        <NavbarItem>
          <NotificationsDropdown />
        </NavbarItem>
        <NavbarItem>
          <ProfileDropdown />
        </NavbarItem>
      </NavbarContent>

      <div className="hidden">
        <NavbarMenu>
          <div className="w-full flex flex-col gap-4 p-4">
            { searchInput }
            { siteConfig.navMenuItems.map( ( item, index ) => (
              <NavbarMenuItem key={ `${ item.label }-${ index }` }>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  href={ item.href ?? "#" }
                  size="lg"
                >
                  { item.label }
                </Link>
              </NavbarMenuItem>
            ) ) }
          </div>
        </NavbarMenu>
      </div>
    </HeroUINavbar>
  );
};
