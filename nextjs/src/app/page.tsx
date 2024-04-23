import { MixPage } from '@components/MixPage';
import { NavBar } from '@components/NavBar';
import PicturePage from '@components/PicturePage/PicturePage.component';
import { Player } from '@components/Player';
import Search from '@components/Search/Search.component';
import { DirectusHelper, assetsUrl } from '@directus/directus.helpers';

export default async function Home() {
  const mixes = await DirectusHelper.instance().loadMixes();
  const global = await DirectusHelper.instance().loadGlobal();
  return (
    <>
      <NavBar mixes={mixes}/>
      <Search/>
      <div className="border"/>
      <div className="pages">
        <PicturePage src={assetsUrl(global.cover_image)} alt={global.title || ''}/>
        { mixes.map(mix => <MixPage id={mix.key} mix={mix} key={mix.key}/>) }
      </div>
      <Player mixes={mixes}/>
    </>
  );
}
