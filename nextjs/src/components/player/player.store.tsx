import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type PlayerState = {
  show: boolean;
  currentlyPlaying?: string;
  playAt?: string;
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
    play: (state, action: PayloadAction<{currentlyPlaying: string, playAt?: string}>) => {
      state.show = true;
      state.currentlyPlaying = action.payload.currentlyPlaying;
      if (action.payload.playAt) {
        state.playAt = action.payload.playAt;
      }
    },
    resetPlayingState: state => {
      state.playAt = undefined;
    }
  }
});

export const playerActions = playerSlice.actions;
export const playerReducer = playerSlice.reducer;