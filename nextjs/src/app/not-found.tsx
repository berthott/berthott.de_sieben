'use client';

import { DirectusHelper } from '@directus/directus.helpers';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
 
export default function NotFound() {
  const pathname = decodeURI(usePathname().replace(/\//g, ''));
  const router = useRouter();

  useEffect(() => {
    const fetchMix = async (): Promise<string> => {
      const mix = await DirectusHelper.instance().getCurrentMix(pathname);
      return mix ? `/#${mix.key}` : '/';
    };
    fetchMix().then(path => router.push(path))
  }, [pathname, router]);
  return (
    <></>
  )
}