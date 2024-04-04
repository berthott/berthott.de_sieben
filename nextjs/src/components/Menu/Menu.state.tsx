'use client';

import { PropsWithChildren, createContext, useReducer } from 'react';

export type MenuState = {
  show: boolean;
};

export const initialMenuState: MenuState = {
  show: false,
};

export type MenuContextState = MenuState & {
  setShow: (show: boolean) => void;
};

export const MenuContext = createContext<MenuContextState>({
  ...initialMenuState, 
  setShow: () => {},
});

export type MenuAction = {
  type: string;
  payload?: any;
};

export const menuActions: MenuAction[] = [
  { type: 'SHOW' },
  { type: 'HIDE' },
];

export const menuReducer = (state: MenuState, action: MenuAction): MenuState => {
  switch (action.type) {
    case 'SHOW':
      return { ...state, show: true };
    case 'HIDE':
      return { ...state, show: false };
    default:
      return state;
  }
};


export const MenuContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(menuReducer, initialMenuState);

  return (
    <MenuContext.Provider value={{
      ...state,
      setShow: (show: boolean) => {
        dispatch({ type: show ? 'SHOW' : 'HIDE' });
      },
    }}>
      {children}
    </MenuContext.Provider>
  );
}