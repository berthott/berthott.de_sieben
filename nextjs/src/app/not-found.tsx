'use client';

import { DirectusHelper } from '@directus/directus.helpers';
import { Mixes } from '@directus/mix.model';
import Fuse from 'fuse.js';
import { usePathname, redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
 
export default function NotFound() {
  const pathname = decodeURI(usePathname().replace(/\//g, ''));

  const [mixes, setMixes] = useState<Mixes>([])

  useEffect(() => {
    const fetchMixes = async () => setMixes(await  DirectusHelper.instance().loadMixes());
    fetchMixes();
    const searched = new Fuse(mixes, { keys: ['key'] }).search(pathname);
    if (searched.length > 0) {
      redirect(`/#${searched[0].item.key}`);
    }
    redirect('/');
  }, [pathname, mixes]);
  return (
    <></>
  )
}