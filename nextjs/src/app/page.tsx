import { MixPage } from '@components/MixPage';
import { NavBar } from '@components/NavBar';
import { dummy_data } from './dummy_data';
import { MenuContextProvider } from '@components/Menu/Menu.state';

export default function Home() {
  return (
    <>
      <MenuContextProvider>
        <NavBar></NavBar>
        <div className="pages">
          { Object.keys(dummy_data).map(mix => <MixPage id={mix} key={mix}></MixPage>) }
        </div>
      </MenuContextProvider>
    </>
  );
}
