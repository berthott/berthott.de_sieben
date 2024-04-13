'use client';

import { PropsWithChildren, createContext, useReducer } from 'react';

export enum MenuStyle {
  Layer = 'layer',
  Grid = 'grid',
  List = 'list',
}

export type MenuState = {
  show: boolean;
  style: MenuStyle;
};

export const initialMenuState: MenuState = {
  show: false,
  style: MenuStyle.Layer,
};

export type MenuContextState = MenuState & {
  setShow: (show: boolean) => void;
  setStyle: (style: MenuStyle) => void;
  toggleStyle: () => void;
};

export const MenuContext = createContext<MenuContextState>({
  ...initialMenuState, 
  setShow: () => {},
  setStyle: () => {},
  toggleStyle: () => {},
});

export type MenuAction = {
  type: string;
  payload?: any;
};

export const menuActions: MenuAction[] = [
  { type: 'SHOW' },
  { type: 'HIDE' },
  { type: 'LAYER' },
  { type: 'GRID' },
  { type: 'LIST' },
];

export const menuReducer = (state: MenuState, action: MenuAction): MenuState => {
  switch (action.type) {
    case 'SHOW':
      return { ...state, show: true };
    case 'HIDE':
      return { ...state, show: false };
    case 'LAYER':
      return { ...state, style: MenuStyle.Layer };
    case 'GRID':
      return { ...state, style: MenuStyle.Grid };
    case 'List':
      return { ...state, style: MenuStyle.List };
    default:
      return state;
  }
};


export const MenuContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(menuReducer, initialMenuState);

  return (
    <MenuContext.Provider value={{
      ...state,
      setShow: (show: boolean) => dispatch({ type: show ? 'SHOW' : 'HIDE' }),
      setStyle: (style: MenuStyle) => {
        let type = '';
        switch(style) {
          case MenuStyle.Layer: type = 'LAYER';
          case MenuStyle.Grid: type = 'GRID';
          case MenuStyle.List: type = 'LIST';
        }
        dispatch({ type });
      },
      toggleStyle: () => dispatch({ type: state.style === MenuStyle.Layer ? 'GRID' : 'LAYER'})
    }}>
      {children}
    </MenuContext.Provider>
  );
}