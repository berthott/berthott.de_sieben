import Home from '@app/page';
import { DirectusHelper } from '@directus/directus.helpers';

export default async function Mix({ params }: { params: { id: string } }) {
  const currentMix = await DirectusHelper.instance().getCurrentMix(params.id);
  return (
    <Home currentMix={currentMix || undefined}/>
  );
}
