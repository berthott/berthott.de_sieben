import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@store/store.provider';
import { PropsWithChildren } from 'react';
import { DirectusHelper, assetTransform } from '@directus/directus.helpers';
import { headers } from 'next/headers';

const font = Inter({ 
  subsets: ['latin'],
  variable: '--font-berthott' 
});

export async function generateMetadata(): Promise<Metadata> {
  const pathname = headers().get('pathname') || '';
  const url = headers().get('referer') || '';
  const global = await DirectusHelper.instance().loadGlobal();
  const mix = await DirectusHelper.instance().getCurrentMix(pathname);

  console.log('pathname', pathname);
  headers().forEach((value, key) => console.log(`${key}: ${value}`));

  const metadata = {
    title: global.title,
    description: global.description,
    openGraph: {
      type: 'website',
      url,
      title: mix ? `berthott - ${mix.title}, ${global.title}` : global.title || '',
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

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${font.variable} font-sans`}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
