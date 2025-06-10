"use client";

import { Spinner } from "@heroui/react";
import { useEffect, useState } from "react";

import { JwtService } from "../shared/services";

interface AuthGateProps {
  children?: React.ReactNode;
}

export const AuthGate = ( { children }: AuthGateProps ) => {
  const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>( false );
  const [ isLoading, setIsLoading ] = useState<boolean>( true );
  const [ isClient, setIsClient ] = useState<boolean>( false );

  useEffect( () => {
    setIsClient( true );

    const checkToken = () => {
      const token = JwtService.getStoredToken();

      setIsAuthenticated( !!token );
      setIsLoading( false );
    };

    checkToken();

    const handleStorageChange = () => {
      checkToken();
    };

    window.addEventListener( "storage", handleStorageChange );

    return () => {
      window.removeEventListener( "storage", handleStorageChange );
    };
  }, [] );

  if ( !isClient || isLoading ) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner color="primary" size="lg" />
      </div>
    );
  }

  if ( !isAuthenticated ) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="relative flex flex-col items-center justify-center">
          <div className="absolute -inset-2 blur-2xl opacity-30 bg-red-900 rounded-2xl animate-pulse"></div>
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="mb-6 text-4xl font-extrabold text-red-700 tracking-widest select-none animate-pulse">
              ███ SYSTEM LOCKED ███
            </h2>
            <p className="text-2xl text-red-600 font-mono animate-[flicker_2s_infinite]">
              ACCESO NO AUTORIZADO
            </p>
            <p className="mt-8 text-lg text-gray-400 font-mono text-center">
              Esta instancia ha sido sellada.<br />
              Observa. El tiempo se diluye. Tu intento ha quedado registrado.<br />
              <span className="text-red-800">[ERROR] – No puedes avanzar.</span>
            </p>
          </div>
        </div>
        <style>
          { `
            @keyframes flicker {
              0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
              20%, 22%, 24%, 55% { opacity: 0.4; }
            }
          ` }
        </style>
      </div>
    );
  }

  return <>{ children }</>;
};
