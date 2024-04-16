'use client';

import { PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { mixesActions } from '@directus/mixes.store';

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(mixesActions.loadMixes());
  }

  return (
    <Provider store={storeRef.current}>{ children }</Provider>
  )
};