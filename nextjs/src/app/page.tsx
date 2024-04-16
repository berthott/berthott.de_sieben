'use client';

import { MixPage } from '@components/MixPage';
import { NavBar } from '@components/NavBar';
import { dummy_data } from './dummy_data';
import PicturePage from '@components/PicturePage/PicturePage.component';
import { Player } from '@components/Player';
import { useEffect, useState } from 'react';
import { getMixes } from '../directus/directus.helpers';
import { Mixes } from '../directus/directus';

export default function Home() {
  const [mixes, setMixes] = useState<Mixes[]>([]);

  useEffect(() => {
    getMixes().then(mixes => setMixes(mixes));
  }, []);

  console.log('mixes', mixes);
  return (
    <>
      <NavBar/>
      <div className="border"/>
      <div className="pages">
        <PicturePage id='boot'/>
        { Object.keys(dummy_data).map(id => <MixPage id={id} data={dummy_data[id]} key={id}/>) }
      </div>
      <Player/>
    </>
  );
}
