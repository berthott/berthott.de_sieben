'use client';

import { MixPage } from '@components/MixPage';
import { NavBar } from '@components/NavBar';
import { dummy_data } from './dummy_data';
import PicturePage from '@components/PicturePage/PicturePage.component';
import { Player } from '@components/Player';

export default function Home() {
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
