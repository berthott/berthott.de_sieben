'use client';

import { PropsWithChildren, createContext, useReducer } from 'react';

export type PlayerState = {
  show: boolean;
  currentlyPlaying?: string;
};

export const initialPlayerState: PlayerState = {
  show: false,
};

export type PlayerContextState = PlayerState & {
  setShow: (show: boolean) => void;
  play: (id: string) => void;
};

export const PlayerContext = createContext<PlayerContextState>({
  ...initialPlayerState, 
  setShow: () => {},
  play: () => {},
});

export type PlayerAction = {
  type: string;
  payload?: any;
};

export const playerActions: PlayerAction[] = [
  { type: 'SHOW' },
  { type: 'PLAY' },
];

export const playerReducer = (state: PlayerState, action: PlayerAction): PlayerState => {
  switch (action.type) {
    case 'SHOW':
      return { ...state, show: true };
    case 'HIDE':
      return { ...state, show: false };
    case 'PLAY':
      return { ...state, show: true, currentlyPlaying: action.payload };
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
      play: (id: string) => dispatch({ type: 'PLAY', payload: id}),
    }}>
      {children}
    </PlayerContext.Provider>
  );
}