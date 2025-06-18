"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useTimeTrackingStore } from "@/stores/time-tracking-store";
import { EventType } from "@prisma/client";

const getEventTypeForPath = ( path: string ): EventType => {
  if ( path === "/" ) return "VIEW_HOME";
  if ( path.startsWith( "/comunidad" ) ) return "VIEW_COMMUNITY";
  if ( path.startsWith( "/publicacion" ) ) return "VIEW_PUBLICATION";
  if ( path.startsWith( "/perfil" ) ) return "VIEW_PROFILE";
  if ( path === "Visor de Estados" ) return "VIEW_STATE";

  return "VIEW_HOME";
};

const sendTrackingData = async ( payload: {
  path: string;
  durationSeconds: number;
  eventType: EventType;
} ) => {
  try {
    await fetch( '/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( payload ),
    } );
  } catch ( error ) {
  }
};

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
      const eventType = getEventTypeForPath( pathBeingLeft );

      if ( seconds > 0 ) {
        sendTrackingData( {
          path: pathBeingLeft,
          durationSeconds: seconds,
          eventType: eventType,
        } );
      }

      if ( seconds > 0 ) {
        const pageName = pathBeingLeft === "/" ? "/ (home)" : pathBeingLeft;
        const userIdentifier =
          status === "authenticated"
            ? `usuario ${ session?.user?.name }`
            : "visitante";
        console.log(
          `Estuviste ${ seconds } segundos en '${ pageName }' como ${ userIdentifier }. Evento: ${ eventType }`
        );
      }
    }

    previousPathRef.current = activePath;
    setSeconds( 0 );
  }, [ activePath, status, session ] );

  useEffect( () => {
    if ( !activePath ) {
      return;
    }

    const intervalRef = setInterval( () => {
      setSeconds( ( prevSeconds ) => prevSeconds + 1 );
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