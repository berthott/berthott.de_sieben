import { MixPage } from '@components/mix-page/mix-page.component';
import { NavBar } from '@components/nav-bar/nav-bar.component';
import { PicturePage } from '@components/picture-page/picture-page.component';
import { Player } from '@components/player/player.component';
import { Router, RouterProps } from '@components/router/router.component';
import { Search } from '@components/search/search.component';
import { DirectusHelper, assetsUrl } from '@directus/directus.helpers';

export default async function Home({ currentMix }: RouterProps) {
  const mixes = await DirectusHelper.instance().loadMixes();
  const global = await DirectusHelper.instance().loadGlobal();
  return (
    <>
      <Router currentMix={currentMix}/>
      <NavBar mixes={mixes}/>
      <Search mixes={mixes}/>
      <div className="border"/>
      <div className="pages">
        <PicturePage src={assetsUrl(global.cover_image)} alt={global.title || ''} priority/>
        { mixes.map(mix => <MixPage mix={mix} key={mix.key}/>) }
      </div>
      <Player mixes={mixes} title={global.title || ''}/>
    </>
  );
}
