'use client';

import { Mix } from '@directus/mix.model';
import { useEffect } from 'react';

export type RouterProps = {
  currentMix?: Mix;
};


export function Router({ currentMix }: RouterProps) {

  useEffect(() => {
    window.history.replaceState(null, '', '/');
    if (currentMix) {
      location.hash = `#${currentMix.key}`;
    }
  });
  
  return (
    <></>
  );
}