"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { useEffect } from "react";

import { useAuth } from "../../hooks/useAuth";


export const AuthButtons = () => {

  const { isAuthenticated, isClient } = useAuth();

  useEffect( () => {
    if (
      isClient &&
      isAuthenticated &&
      typeof window !== "undefined"
    ) {
      const redirected = localStorage.getItem( "alreadyRedirectedAfterLogin" );
      if ( !redirected ) {
        localStorage.setItem( "alreadyRedirectedAfterLogin", "true" );
        window.location.href = "/";
      }
    }
  }, [ isAuthenticated, isClient ] );

  return (
    <div>
      <SignedOut>
        <SignInButton>
          <button className="navbar__courses-link">INICIAR SESIÓN</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <div className="flex items-center">
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
};
