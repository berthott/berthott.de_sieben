import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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

const menuSlice = createSlice({
  name: 'menu',
  initialState: initialMenuState,
  reducers: {
    show: {
      reducer: (state, action: PayloadAction<boolean>) => {
        state.show = action.payload;
      },
      prepare: (show?: boolean) => ({
        payload: show ?? true,
      }),
    },
    hide: {
      reducer: (state, action: PayloadAction<boolean>) => {
        state.show = !action.payload;
      },
      prepare: (hide?: boolean) => ({
        payload: !hide ?? true,
      }),
    },
    setStyle: (state, action: PayloadAction<MenuStyle>) => {
      state.style = action.payload;
    },
    setLayerStyle: state => {
      state.style = MenuStyle.Layer;
    },
    setGridStyle: state => {
      state.style = MenuStyle.Grid;
    },
    setListStyle: state => {
      state.style = MenuStyle.List;
    },
    toggleLayerGridStyle: state => {
      state.style = state.style === MenuStyle.Layer ? MenuStyle.Grid : MenuStyle.Layer;
    },
  }
});

export const menuActions = menuSlice.actions;
export const menuReducer = menuSlice.reducer;