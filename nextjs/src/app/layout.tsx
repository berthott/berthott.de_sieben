import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@store/store.provider';
import { PropsWithChildren } from 'react';
import { DirectusHelper, assetTransform } from '@directus/directus.helpers';
import { cookies, headers } from 'next/headers';
import Script from 'next/script';

const font = Inter({ 
  subsets: ['latin'],
  variable: '--font-berthott' 
});

export async function generateMetadata(): Promise<Metadata> {
  const global = await DirectusHelper.instance().loadGlobal();
  const mixKey = cookies().get('mix')?.value || '';
  const mix = await DirectusHelper.instance().getMixByKey(mixKey);
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
