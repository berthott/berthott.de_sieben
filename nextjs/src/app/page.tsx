import MixPage from '@components/MixPage';
import NavBar from '@components/NavBar';

const mixes = ['allfalldown', 'alone', 'amusement'];

export default function Home() {
  return (
    <>
      <NavBar></NavBar>
      { mixes.map(mix => <MixPage id={mix} key={mix}></MixPage>) }
    </>
  );
}
