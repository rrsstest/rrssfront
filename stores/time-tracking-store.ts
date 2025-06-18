import { create } from 'zustand';

interface TimeTrackingState {
  activePath: string | null;
  setActivePath: ( path: string | null ) => void;
}

export const useTimeTrackingStore = create<TimeTrackingState>( ( set ) => ( {
  activePath: null,
  setActivePath: ( path ) => set( { activePath: path } ),
} ) );