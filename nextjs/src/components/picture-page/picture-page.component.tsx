import styles from './picture-page.module.css';

import Image from 'next/image';
import { PropsWithChildren } from 'react';

export type PicturePageProps = PropsWithChildren<{
  src: string;
  alt?: string;
  priority?: boolean;
}>;

export function PicturePage({src, priority, alt = ''}: PicturePageProps) {
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
        }}
        priority/>
    </section>
  );
}
