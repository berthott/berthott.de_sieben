import styles from '@components/MixPage/MixPage.module.css';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

export type PicturePageProps = PropsWithChildren<{
  src: string;
  alt?: string;
}>;

export default function PicturePage({src, alt = ''}: PicturePageProps) {
  return (
    <section className={styles.page}>
      <Image 
        className={styles.img} 
        src={src} 
        alt={alt} 
        width={0}
        height={0} 
        sizes="100vw" style={{
          width: '100%',
          height: '100vh',
        }}/>
    </section>
  );
}
