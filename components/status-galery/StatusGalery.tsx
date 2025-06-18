'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Image } from "@heroui/image";
import { User } from '@heroui/user';
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter } from '@heroui/modal';
import { IoChevronBack, IoChevronForward, IoClose, IoSend } from 'react-icons/io5';
import { Input } from '@heroui/input';
import { useTimeTrackingStore } from '@/stores/time-tracking-store';
import { usePathname } from 'next/navigation';

interface StoryUser {
  name: string;
  avatarUrl: string;
}

interface Story {
  id: string;
  user: StoryUser;
  imageUrl: string;
  duration: number;
}

const mockStories: Story[] = [
  { id: 'story-1', user: { name: 'Elena R.', avatarUrl: 'https://i.pravatar.cc/150?u=elena' }, imageUrl: 'https://images.unsplash.com/photo-1523741543342-421b6e3497d3?q=80&w=1287&auto=format&fit=crop', duration: 7 },
  { id: 'story-2', user: { name: 'Marco D.', avatarUrl: 'https://i.pravatar.cc/150?u=marco' }, imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14694dd?q=80&w=2070&auto=format&fit=crop', duration: 5 },
  { id: 'story-3', user: { name: 'Sofia C.', avatarUrl: 'https://i.pravatar.cc/150?u=sofia' }, imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1364&auto=format&fit=crop', duration: 8 },
];

export const StatusGallery = () => {
  const [ selectedStory, setSelectedStory ] = useState<Story | null>( null );
  const [ canScrollLeft, setCanScrollLeft ] = useState( false );
  const [ canScrollRight, setCanScrollRight ] = useState( false );

  const scrollRef = useRef<HTMLDivElement>( null );
  const progressRef = useRef<HTMLDivElement>( null );
  const timerRef = useRef<NodeJS.Timeout>();

  const setActivePath = useTimeTrackingStore( ( state ) => state.setActivePath );
  const pathname = usePathname();
  const virtualPathName = 'Visor de Estados';

  const checkScrollability = useCallback( () => {
    const el = scrollRef.current;
    if ( el ) {
      const isScrollable = el.scrollWidth > el.clientWidth;
      setCanScrollLeft( el.scrollLeft > 5 );
      setCanScrollRight( isScrollable && el.scrollLeft < el.scrollWidth - el.clientWidth - 5 );
    }
  }, [] );

  useEffect( () => {
    const el = scrollRef.current;
    if ( el ) {
      checkScrollability();
      el.addEventListener( 'scroll', checkScrollability );
      window.addEventListener( 'resize', checkScrollability );

      return () => {
        el.removeEventListener( 'scroll', checkScrollability );
        window.removeEventListener( 'resize', checkScrollability );
      };
    }
  }, [ checkScrollability ] );

  const handleSelectStory = ( story: Story ) => {
    setActivePath( virtualPathName );
    setSelectedStory( story );
  };

  const handleCloseModal = () => {
    setActivePath( pathname );
    setSelectedStory( null );
  };

  const handleModalNavigation = ( direction: 'next' | 'prev' ) => {
    if ( !selectedStory ) return;
    const currentIndex = mockStories.findIndex( story => story.id === selectedStory.id );
    let nextIndex;
    if ( direction === 'next' ) {
      nextIndex = currentIndex + 1;
      if ( nextIndex >= mockStories.length ) {
        handleCloseModal();
        return;
      }
    } else {
      nextIndex = currentIndex - 1;
      if ( nextIndex < 0 ) {
        return;
      }
    }
    setSelectedStory( mockStories[ nextIndex ] );
  };

  useEffect( () => {
    const progressEl = progressRef.current;
    if ( selectedStory && progressEl ) {
      progressEl.style.transition = 'none';
      progressEl.style.width = '0%';
      void progressEl.offsetWidth;
      progressEl.style.transition = `width ${ selectedStory.duration }s linear`;
      progressEl.style.width = '100%';
      if ( timerRef.current ) clearTimeout( timerRef.current );
      timerRef.current = setTimeout( () => {
        handleModalNavigation( 'next' );
      }, selectedStory.duration * 1000 );
    }
    return () => {
      if ( timerRef.current ) clearTimeout( timerRef.current );
    };
  }, [ selectedStory ] );

  const handleScroll = ( direction: 'left' | 'right' ) => {
    if ( scrollRef.current ) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy( { left: scrollAmount, behavior: 'smooth' } );
    }
  };

  return (
    <div className="relative w-full">
      <div
        ref={ scrollRef }
        className="flex items-center gap-4 overflow-x-auto py-2 scrollbar-hide"
      >
        { mockStories.map( ( story ) => (
          <button
            key={ story.id }
            onClick={ () => handleSelectStory( story ) }
            className="relative flex-shrink-0 w-32 h-48 rounded-xl overflow-hidden group focus:outline-none focus:ring-4 focus:ring-blue-500/50"
          >
            <Image
              removeWrapper
              src={ story.imageUrl }
              alt={ `Historia de ${ story.user.name }` }
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2 left-2 flex items-center gap-2">
              <User
                name={ <p className="text-white text-xs font-bold drop-shadow-md truncate">{ story.user.name }</p> }
                avatarProps={ { src: story.user.avatarUrl, className: "w-8 h-8" } }
              />
            </div>
          </button>
        ) ) }
      </div>

      <button
        onClick={ () => handleScroll( 'left' ) }
        disabled={ !canScrollLeft }
        className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 w-10 h-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center transition-opacity hover:opacity-80 disabled:opacity-0 disabled:cursor-not-allowed z-10"
        aria-label="Desplazar a la izquierda"
      >
        <IoChevronBack className="text-xl" />
      </button>
      <button
        onClick={ () => handleScroll( 'right' ) }
        disabled={ !canScrollRight }
        className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 w-10 h-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center transition-opacity hover:opacity-80 disabled:opacity-0 disabled:cursor-not-allowed z-10"
        aria-label="Desplazar a la derecha"
      >
        <IoChevronForward className="text-xl" />
      </button>

      <Modal size="full" isOpen={ !!selectedStory } onClose={ handleCloseModal } backdrop="blur">
        <ModalContent className="bg-black/90 text-white">
          <ModalHeader className="absolute top-0 left-0 right-0 z-20 flex justify-between items-start p-6 bg-gradient-to-b from-black/50 to-transparent">
            <User
              name={ selectedStory?.user.name }
              description="hace 2h"
              avatarProps={ { src: selectedStory?.user.avatarUrl } }
            />
            <button onClick={ handleCloseModal } className="p-2 rounded-full bg-black/30 hover:bg-black/50">
              <IoClose className="text-2xl" />
            </button>
          </ModalHeader>
          <ModalBody className="p-0 flex items-center justify-center h-full w-full">
            <div className="absolute top-4 left-4 right-4 h-1 bg-white/30 rounded-full overflow-hidden z-20">
              <div ref={ progressRef } className="h-full bg-white" style={ { width: '0%' } } />
            </div>
            <Image
              removeWrapper
              src={ selectedStory?.imageUrl }
              alt={ `Historia de ${ selectedStory?.user.name }` }
              className="w-full h-full object-cover"
            />
          </ModalBody>
          <ModalFooter className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-black/50 to-transparent">
            <div className="flex w-full max-w-lg mx-auto items-center gap-3">
              <Input
                placeholder="Enviar un mensaje..."
                variant="bordered"
                className="text-white"
                classNames={ { inputWrapper: "bg-black/30 border-white/30" } }
              />
              <button className="p-3 rounded-full bg-black/30 hover:bg-black/50 flex-shrink-0">
                <IoSend className="text-2xl text-white" />
              </button>
            </div>
          </ModalFooter>

          <button
            onClick={ () => handleModalNavigation( 'prev' ) }
            className="absolute top-1/2 -translate-y-1/2 left-4 w-12 h-12 bg-black/30 rounded-full flex items-center justify-center z-20 hover:bg-black/50"
            aria-label="Historia anterior"
          >
            <IoChevronBack className="text-3xl" />
          </button>
          <button
            onClick={ () => handleModalNavigation( 'next' ) }
            className="absolute top-1/2 -translate-y-1/2 right-4 w-12 h-12 bg-black/30 rounded-full flex items-center justify-center z-20 hover:bg-black/50"
            aria-label="Siguiente historia"
          >
            <IoChevronForward className="text-3xl" />
          </button>
        </ModalContent>
      </Modal>
    </div>
  );
};