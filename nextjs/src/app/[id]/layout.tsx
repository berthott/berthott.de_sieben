import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { DirectusHelper, assetTransform } from '@directus/directus.helpers';


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const global = await DirectusHelper.instance().loadGlobal();
  const mix = await DirectusHelper.instance().getCurrentMix(params.id);
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || '';
  const url = `${baseUrl}/${mix?.key}`;

  const metadata = {
    title: global.title,
    description: global.description,
    openGraph: {
      type: 'website',
      url,
      title: mix ? `${global.title} - ${mix.title}` : global.title || '',
      description: mix ? `${mix.release}\n\n${mix.tracklist}` : global.description || '',
      images: [512].map(size =>
        ({ 
          url: assetTransform(mix ? mix.image : global.cover_image, {
            fit: 'cover', 
            format: 'png',
            width: size.toString(),
            height: size.toString(),
          }),
          width: size,
          height: size, 
          alt: (mix ? mix.title : global.title) || '', 
        })
      ),
    },
  };

  return metadata;
}

export default function IdLayout({ children }: PropsWithChildren) {
  return (
    <>{children}</>
  );
}
