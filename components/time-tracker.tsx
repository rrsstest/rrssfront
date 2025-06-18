"use client";

import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useTimeTrackingStore } from '@/stores/time-tracking-store';

export const TimeTracker = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { activePath, setActivePath } = useTimeTrackingStore();

  const [ seconds, setSeconds ] = useState( 0 );
  const previousPathRef = useRef<string | null>( null );

  useEffect( () => {
    setActivePath( pathname );
  }, [ pathname, setActivePath ] );

  useEffect( () => {
    const pathBeingLeft = previousPathRef.current;

    if ( pathBeingLeft && pathBeingLeft !== activePath ) {
      if ( status !== 'loading' && seconds > 0 ) {
        const pageName = pathBeingLeft === '/' ? '/ (home)' : pathBeingLeft;
        const userIdentifier = status === 'authenticated' ? `usuario ${ session?.user?.name }` : 'visitante';
        console.log( `Estuviste ${ seconds } segundos en '${ pageName }' como ${ userIdentifier }.` );
      }
    }

    previousPathRef.current = activePath;
    setSeconds( 0 );
  }, [ activePath ] );

  useEffect( () => {
    if ( !activePath ) {
      return;
    }

    const intervalRef = setInterval( () => {
      setSeconds( prevSeconds => prevSeconds + 1 );
    }, 1000 );

    const handleVisibilityChange = () => {
      if ( document.hidden ) {
        clearInterval( intervalRef );
      }
    };

    document.addEventListener( "visibilitychange", handleVisibilityChange );

    return () => {
      clearInterval( intervalRef );
      document.removeEventListener( "visibilitychange", handleVisibilityChange );
    };
  }, [ activePath ] );

  return null;
};