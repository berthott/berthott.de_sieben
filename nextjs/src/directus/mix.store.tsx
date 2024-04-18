import { PayloadAction } from '@reduxjs/toolkit';
import { DirectusHelper } from './directus.helpers';
import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'
import { Mixes } from './mix.model';

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

export type MixesState = {
  data: Mixes;
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
      loadMixes: create.asyncThunk<Mixes>(async () => {
        return await DirectusHelper.instance().loadMixes();
      }, {
        pending: state => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        },
        fulfilled: (state, action: PayloadAction<Mixes>) => {
          state.loading = false;
          state.data = action.payload;
        }
      }),
    };
  },
});

const selectors = {
  selectMixes: (state: { mixes: MixesState }) => state.mixes.data,
  selectMixById: (state: { mixes: MixesState }, id: number) => state.mixes.data.find(mix => mix.id === id),
};

export const mixesActions = mixesSlice.actions;
export const mixesReducer = mixesSlice.reducer;
export const mixesSelectors = selectors;