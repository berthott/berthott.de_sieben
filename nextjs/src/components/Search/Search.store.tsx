import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type SearchState = {
  show: boolean;
  search: string;
};

export const initialSearchState: SearchState = {
  show: false,
  search: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState: initialSearchState,
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
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    }
  }
});

export const searchActions = searchSlice.actions;
export const searchReducer = searchSlice.reducer;