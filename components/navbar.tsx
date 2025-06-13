"use client";

import { useEffect, useState } from "react";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { useSession, signIn } from "next-auth/react";
import NextLink from "next/link";
import { useTheme } from "next-themes";
import { IoLogoGoogle } from "react-icons/io5";

import { MessagesDropdown, NotificationsDropdown } from './notificactions';
import { ProfileDropdown } from './profile-dropdown';
import { SearchIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";


export const Navbar = () => {

  const { theme } = useTheme();
  const [ isMenuOpen, setIsMenuOpen ] = useState( false );
  const [ mounted, setMounted ] = useState( false );
  const { data: session, status } = useSession();

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
      className="fixed top-0 left-0 w-full z-50"
      isBlurred
      isMenuOpen={ isMenuOpen }
      maxWidth="xl"
      position="static"
      onMenuOpenChange={ setIsMenuOpen }
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
        <div className="flex-1 flex justify-end items-center pr-2">
          { status === "loading" ? <div /> : session?.user ? (
            <NavbarMenuToggle aria-label={ isMenuOpen ? "Close menu" : "Open menu" } />
          ) : (
            <button
              className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              onClick={ () => signIn( "google", { callbackUrl: "/" } ) }
            >
              <IoLogoGoogle className="h-4 w-4" />
              Entrar
            </button>
          ) }
        </div>
      </div>

      <NavbarContent className="flex-1 justify-center hidden md:flex" justify="center">
        <NavbarItem className="w-full max-w-md flex justify-center">
          { searchInput }
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="basis-1/5 justify-end hidden md:flex items-center" justify="end">
        { session?.user && (
          <>
            <NavbarItem>
              <MessagesDropdown />
            </NavbarItem>
            <NavbarItem>
              <NotificationsDropdown />
            </NavbarItem>
          </>
        ) }
        <NavbarItem>
          { status === "loading" ? null : session?.user ? (
            <ProfileDropdown />
          ) : (
            <button
              className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              onClick={ () => signIn( "google", { callbackUrl: "/" } ) }
            >
              <IoLogoGoogle className="h-5 w-5" />
              Iniciar con Google
            </button>
          ) }
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