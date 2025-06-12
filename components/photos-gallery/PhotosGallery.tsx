'use client';

import { useCallback, useEffect, useState } from 'react';

interface Image {
  alt: string;
  src: string;
  thumbnail: string;
}

const images: Image[] = [
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000",
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300",
    alt: "Foto 1"
  },
  {
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1000",
    thumbnail: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=300",
    alt: "Foto 2"
  },
  {
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1000",
    thumbnail: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=300",
    alt: "Foto 3"
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000",
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300",
    alt: "Foto 4"
  },
  {
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1000",
    thumbnail: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=300",
    alt: "Foto 5"
  },
  {
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1000",
    thumbnail: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=300",
    alt: "Foto 6"
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000",
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300",
    alt: "Foto 7"
  },
  {
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1000",
    thumbnail: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=300",
    alt: "Foto 8"
  },
  {
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1000",
    thumbnail: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=300",
    alt: "Foto 9"
  },
];

export const PhotosGallery = () => {

  const [ currentIndex, setCurrentIndex ] = useState<number | null>( null );
  const [ dragStart, setDragStart ] = useState( { x: 0, y: 0 } );
  const [ isDragging, setIsDragging ] = useState( false );
  const [ isPlaying, setIsPlaying ] = useState( false );
  const [ likedPhotos, setLikedPhotos ] = useState( new Set<number>() );
  const [ position, setPosition ] = useState( { x: 0, y: 0 } );
  const [ zoom, setZoom ] = useState( 1 );

  const handleOpen = useCallback( ( index: number ) => {
    setCurrentIndex( index );
  }, [] );

  const handleClose = useCallback( () => {
    setCurrentIndex( null );
    setIsPlaying( false );
  }, [] );

  const handleNext = useCallback( () => {
    setCurrentIndex( prev => ( prev === null ? 0 : ( prev + 1 ) % images.length ) );
  }, [] );

  const handlePrev = useCallback( () => {
    setCurrentIndex( prev => ( prev === null ? 0 : ( prev - 1 + images.length ) % images.length ) );
  }, [] );

  const handleZoomIn = useCallback( () => {
    setZoom( prev => Math.min( prev + 0.2, 5 ) );
  }, [] );

  const handleZoomOut = useCallback( () => {
    setZoom( prev => Math.max( 1, prev - 0.2 ) );
  }, [] );

  const handleResetZoom = useCallback( () => {
    setZoom( 1 );
  }, [] );

  const togglePlay = useCallback( () => {
    setIsPlaying( prev => !prev );
  }, [] );

  const toggleLike = useCallback( () => {
    if ( currentIndex === null ) return;
    setLikedPhotos( prev => {
      const newLikedPhotos = new Set( prev );
      if ( newLikedPhotos.has( currentIndex ) ) {
        newLikedPhotos.delete( currentIndex );
      } else {
        newLikedPhotos.add( currentIndex );
      }
      return newLikedPhotos;
    } );
  }, [ currentIndex ] );

  const handleChatClick = useCallback( () => {
    if ( currentIndex === null ) return;
  }, [ currentIndex ] );

  const handleMouseDown = useCallback( ( e: React.MouseEvent<HTMLDivElement> ) => {
    if ( zoom > 1 ) {
      e.preventDefault();
      setIsDragging( true );
      setDragStart( {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      } );
    }
  }, [ zoom, position ] );

  const handleMouseMove = useCallback( ( e: React.MouseEvent<HTMLDivElement> ) => {
    if ( isDragging && zoom > 1 ) {
      e.preventDefault();
      setPosition( {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      } );
    }
  }, [ isDragging, dragStart, zoom ] );

  const handleMouseUp = useCallback( () => {
    setIsDragging( false );
  }, [] );

  const handleWheelZoom = useCallback( ( e: React.WheelEvent ) => {
    if ( currentIndex === null ) return;
    e.preventDefault();
    if ( e.deltaY < 0 ) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  }, [ currentIndex, handleZoomIn, handleZoomOut ] );

  useEffect( () => {
    if ( currentIndex !== null ) {
      setZoom( 1 );
      setPosition( { x: 0, y: 0 } );
      setIsDragging( false );
    }
  }, [ currentIndex ] );

  useEffect( () => {
    if ( zoom === 1 ) {
      setPosition( { x: 0, y: 0 } );
    }
  }, [ zoom ] );

  useEffect( () => {
    const handleKeyDown = ( e: KeyboardEvent ) => {
      if ( currentIndex === null ) return;
      if ( e.key === 'Escape' ) handleClose();
      if ( e.key === 'ArrowRight' ) handleNext();
      if ( e.key === 'ArrowLeft' ) handlePrev();
    };

    window.addEventListener( 'keydown', handleKeyDown );
    return () => {
      window.removeEventListener( 'keydown', handleKeyDown );
    };
  }, [ currentIndex, handleClose, handleNext, handlePrev ] );

  useEffect( () => {
    if ( !isPlaying || currentIndex === null ) {
      return;
    }

    const timer = setInterval( () => {
      handleNext();
    }, 3000 );

    return () => clearInterval( timer );
  }, [ isPlaying, currentIndex, handleNext ] );


  return (
    <div className="container mx-auto p-4">

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

        { images.map( ( image, index ) => (
          <div
            key={ index }
            className="overflow-hidden rounded-lg cursor-pointer aspect-square"
            onClick={ () => handleOpen( index ) }
          >
            <img
              alt={ image.alt }
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              src={ image.thumbnail }
            />
          </div>
        ) ) }

      </div>

      { currentIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fade-in"
          onWheel={ handleWheelZoom }
        >

          <div
            className="relative w-full h-full flex items-center justify-center select-none"
            onMouseDown={ handleMouseDown }
            onMouseMove={ handleMouseMove }
            onMouseUp={ handleMouseUp }
            onMouseLeave={ handleMouseUp }
          >
            <img
              alt={ images[ currentIndex ].alt }
              className="max-w-[90vw] max-h-[90vh] object-contain transition-transform duration-200 ease-out"
              src={ images[ currentIndex ].src }
              style={ {
                transform: `scale(${ zoom }) translate(${ position.x }px, ${ position.y }px)`,
                cursor: isDragging ? 'grabbing' : ( zoom > 1 ? 'grab' : 'auto' ),
              } }
            />
          </div>

          <div className="absolute top-0 right-0 p-4">
            <button onClick={ handleClose } className="text-white/80 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 512 512">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M368 368L144 144M368 144L144 368" />
              </svg>
            </button>
          </div>

          <div className="absolute left-0 top-1/2 -translate-y-1/2 p-2 sm:p-4">
            <button onClick={ handlePrev } className="text-white/80 hover:text-white transition-colors bg-black/30 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 512 512">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292" />
              </svg>
            </button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 p-2 sm:p-4">
            <button onClick={ handleNext } className="text-white/80 hover:text-white transition-colors bg-black/30 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 512 512">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M268 112l144 144-144 144M392 256H100" />
              </svg>
            </button>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 p-4 bg-black/30 rounded-t-lg flex items-center space-x-4">
            <button onClick={ handleZoomOut } className="text-white/80 hover:text-white transition-colors disabled:opacity-50" disabled={ zoom <= 1 }>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 512 512">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M400 256H112" />
              </svg>
            </button>

            <button onClick={ handleResetZoom } className="text-white/80 hover:text-white transition-colors disabled:opacity-50" disabled={ zoom === 1 }>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 512 512">
                <path d="M336 80h32a48 48 0 0148 48v32M416 336v32a48 48 0 01-48 48h-32M176 416h-32a48 48 0 01-48-48v-32M96 176v-32a48 48 0 0148-48h32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
              </svg>
            </button>

            <button onClick={ handleZoomIn } className="text-white/80 hover:text-white transition-colors disabled:opacity-50" disabled={ zoom >= 5 }>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 512 512">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 112v288M400 256H112" />
              </svg>
            </button>

            <button onClick={ togglePlay } className="text-white/80 hover:text-white transition-colors">
              { isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 512 512">
                  <path d="M176 96h16v320h-16zM320 96h16v320h-16z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 512 512">
                  <path d="M112 111v290c0 17.44 17 28.52 31 20.16l247.9-145c12.45-7.27 12.45-23.05 0-30.32L143 90.84c-14-8.36-31 2.72-31 20.16z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" />
                </svg>
              ) }
            </button>

            <button onClick={ toggleLike } className="text-white/80 hover:text-white transition-colors">
              { likedPhotos.has( currentIndex ) ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" viewBox="0 0 512 512">
                  <path d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-94.54 94.7C64.44 245.2 112 304 256 432c144-128 191.56-186.8 191.56-257.3C447.46 124.14 405.68 80 352.92 80z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 512 512">
                  <path d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-94.54 94.7C64.44 245.2 112 304 256 432c144-128 191.56-186.8 191.56-257.3C447.46 124.14 405.68 80 352.92 80z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
                </svg>
              ) }
            </button>

            <button onClick={ handleChatClick } className="text-white/80 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 512 512">
                <path d="M408 64H104a56.16 56.16 0 00-56 56v192a56.16 56.16 0 0056 56h40v80l93.72-78.14a8 8 0 015.13-1.86H408a56.16 56.16 0 0056-56V120a56.16 56.16 0 00-56-56z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" />
                <path d="M160 216h16m64 0h16m64 0h16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
              </svg>
            </button>

          </div>

        </div>
      ) }
    </div>
  );
};