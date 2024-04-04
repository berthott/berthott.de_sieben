import { MixPage } from '@components/MixPage';
import { NavBar } from '@components/NavBar';
import { dummy_data } from './dummy_data';

export default function Home() {
  return (
    <>
      <NavBar></NavBar>
      { Object.keys(dummy_data).map(mix => <MixPage id={mix} key={mix}></MixPage>) }
    </>
  );
}
