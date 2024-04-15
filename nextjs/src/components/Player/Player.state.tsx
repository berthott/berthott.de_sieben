'use client';

import { PropsWithChildren, createContext, useReducer } from 'react';
import { act } from 'react-dom/test-utils';

export type PlayerState = {
  show: boolean;
  currentlyPlaying?: string;
  playing?: boolean;
};

export const initialPlayerState: PlayerState = {
  show: false,
  playing: false,
};

export type PlayerContextState = PlayerState & {
  setShow: (show: boolean) => void;
  play: (id: string) => void;
  togglePlay: (playing: boolean) => void;
};

export const PlayerContext = createContext<PlayerContextState>({
  ...initialPlayerState, 
  setShow: () => {},
  play: () => {},
  togglePlay: () => {},
});

export type PlayerAction = {
  type: string;
  payload?: any;
};

export const playerActions: PlayerAction[] = [
  { type: 'SHOW' },
  { type: 'PLAY' },
  { type: 'TOGGLE_PLAY' },
];

export const playerReducer = (state: PlayerState, action: PlayerAction): PlayerState => {
  switch (action.type) {
    case 'SHOW':
      return { ...state, show: true, playing: false };
    case 'HIDE':
      return { ...state, show: false };
    case 'PLAY':
      return { ...state, show: true, currentlyPlaying: action.payload };
    case 'TOGGLE_PLAY':
      return { ...state, playing: action.payload };
    default:
      return state;
  }
};


export const PlayerContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(playerReducer, initialPlayerState);

  return (
    <PlayerContext.Provider value={{
      ...state,
      setShow: (show: boolean) => dispatch({ type: show ? 'SHOW' : 'HIDE' }),
      play: (id: string) => dispatch({ type: 'PLAY', payload: id }),
      togglePlay: (playing: boolean) => dispatch({ type: 'TOGGLE_PLAY', payload: playing }),
    }}>
      {children}
    </PlayerContext.Provider>
  );
}