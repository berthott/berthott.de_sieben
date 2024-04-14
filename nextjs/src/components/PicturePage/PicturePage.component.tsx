import styles from '@components/MixPage/MixPage.module.css';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

export type PicturePageProps = PropsWithChildren<{
  id: string;
}>;

export default function PicturePage({id}: PicturePageProps) {
  return (
    <section className={styles.page} id={id}>
      <Image 
        className={styles.img} 
        src={`/images/${id}.jpg`} 
        alt={id} 
        width={0}
        height={0} 
        sizes="100vw" style={{
          width: '100%',
          height: '100vh',
        }}/>
    </section>
  );
}
