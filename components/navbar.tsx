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
import { DiscordIcon, GithubIcon, HeartFilledIcon, Logo, SearchIcon, TwitterIcon } from "@/components/icons";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { link as linkStyles } from "@heroui/theme";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
      aria-label="Search"
      classNames={ {
        inputWrapper: "bg-default-100",
        input: "text-sm",
      } }
      endContent={
        <Kbd className="hidden lg:inline-block" keys={ [ "command" ] }>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
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
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          { siteConfig.navItems.map( ( item ) => (
            <NavbarItem key={ item.href }>
              <NextLink
                className={ clsx(
                  linkStyles( { color: "foreground" } ),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                ) }
                color="foreground"
                href={ item.href }
              >
                { item.label }
              </NextLink>
            </NavbarItem>
          ) ) }
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Twitter" href={ siteConfig.links.twitter }>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={ siteConfig.links.discord }>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={ siteConfig.links.github }>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{ searchInput }</NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={ Link }
            className="text-sm font-normal text-default-600 bg-default-100"
            href={ siteConfig.links.sponsor }
            startContent={ <HeartFilledIcon className="text-danger" /> }
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={ siteConfig.links.github }>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
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
