import { useEffect, useLayoutEffect, useState } from 'react';
import defaultTheme from 'tailwindcss/defaultTheme';

const breakpoints = defaultTheme.screens;

type BreakpointKey = keyof typeof breakpoints;

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => window.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

function useBreakpoint<K extends BreakpointKey>(breakpointKey: K) {
  const bool = useMediaQuery(`(min-width: ${breakpoints[breakpointKey]})`,
  );
  const capitalizedKey = breakpointKey[0].toUpperCase() + breakpointKey.substring(1);
  type Key = `is${Capitalize<K>}`;
  return {
    [`is${capitalizedKey}`]: bool,
  } as Record<Key, boolean>;
}

export function useBreakpoints() {
  const [isClient, setIsClient] = useState(false);

  const breakpoints = {
    ...useBreakpoint('sm'),
    ...useBreakpoint('md'),
    ...useBreakpoint('lg'),
    ...useBreakpoint('xl'),
    active: 'ssr',
  };

  useLayoutEffect(() => {
    if (typeof window !== "undefined") setIsClient(true);
  }, []);

  if (isClient && breakpoints.isSm) breakpoints.active = "sm";
  if (isClient && breakpoints.isMd) breakpoints.active = "md";
  if (isClient && breakpoints.isLg) breakpoints.active = "lg";
  if (isClient && breakpoints.isXl) breakpoints.active = "xl";

  return breakpoints;
}