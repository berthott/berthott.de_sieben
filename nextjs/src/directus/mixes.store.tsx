import { Mixes } from './directus';
import { PayloadAction } from '@reduxjs/toolkit';
import { loadMixes } from './directus.helpers';
import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})


export type MixesState = {
  data: Mixes[];
  loading: boolean;
  error?: string;
};

export const initialMixesState: MixesState = {
  data: [],
  loading: false,
};

const mixesSlice = createAppSlice({
  name: 'mixes',
  initialState: initialMixesState,
  reducers: create => {
    return {
      loadMixes: create.asyncThunk<Mixes[]>(async () => {
        return await loadMixes();
      }, {
        pending: state => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        },
        fulfilled: (state, action: PayloadAction<Mixes[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      }),
    };
  },
});

export const mixesActions = mixesSlice.actions;
export const mixesReducer = mixesSlice.reducer;