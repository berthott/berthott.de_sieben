import { menuReducer } from '@components/menu/menu.store';
import { playerReducer } from '@components/player/player.store';
import { searchReducer } from '@components/search/search.store';
import { mixesReducer } from '@directus/mix.store';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';

export const makeStore = () => configureStore({
  reducer: {
    menu: menuReducer,
    player: playerReducer,
    mixes: mixesReducer,
    search: searchReducer,
  },
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();