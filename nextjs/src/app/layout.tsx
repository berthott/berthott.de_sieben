import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@store/store.provider';
import { PropsWithChildren } from 'react';
import { DirectusHelper } from '@directus/directus.helpers';

const font = Inter({ 
  subsets: ['latin'],
  variable: '--font-berthott' 
});

export async function generateMetadata(): Promise<Metadata> {
  const global = await DirectusHelper.instance().loadGlobal();
  return {
    title: global.title,
    description: global.description,
  };
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
