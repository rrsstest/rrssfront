"use client";
import Link from "next/link";


import { NavbarActions } from "./components";
import { useNavbarScroll } from "./hooks";
import { UI } from '../ui';

export const Navbar = () => {
  const isScrolled = useNavbarScroll();

  return (
    <nav className={ `navbar ${ isScrolled ? "navbar--scrolled" : "" }` }>
      <div className="navbar__container">

        <Link className="navbar__logo" href="/">
          <UI.Image
            src={ "https://i.imgur.com/BLdgH5W.png" }
            width={ 50 }
            height={ 50 }
          />
        </Link>

        <NavbarActions />
      </div>
    </nav>
  );
};
