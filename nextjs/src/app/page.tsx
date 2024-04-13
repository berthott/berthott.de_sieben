import { MixPage } from '@components/MixPage';
import { NavBar } from '@components/NavBar';
import { dummy_data } from './dummy_data';
import { MenuContextProvider } from '@components/Menu/Menu.state';

export default function Home() {
  return (
    <>
      <MenuContextProvider>
        <NavBar></NavBar>
        <div className="border"/>
        <div className="pages">
          { Object.keys(dummy_data).map(id => <MixPage id={id} data={dummy_data[id]} key={id}></MixPage>) }
        </div>
      </MenuContextProvider>
    </>
  );
}
