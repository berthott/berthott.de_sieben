import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type PlayerState = {
  show: boolean;
  currentlyPlaying?: string;
};

export const initialPlayerState: PlayerState = {
  show: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState: initialPlayerState,
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
    play: (state, action: PayloadAction<string>) => {
      state.show = true;
      state.currentlyPlaying = action.payload;
    },
  }
});

export const playerActions = playerSlice.actions;
export const playerReducer = playerSlice.reducer;