import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const font = Inter({ 
  subsets: ['latin'],
  variable: '--font-berthott' 
});

export const metadata: Metadata = {
  title: 'berthott.de',
  description: 'DJ Sets by berthott',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.variable} font-sans`}>{children}</body>
    </html>
  );
}
