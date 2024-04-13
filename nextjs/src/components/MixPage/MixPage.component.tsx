import { MixData } from '@app/dummy_data';
import styles from '@components/MixPage/MixPage.module.css';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

export type MixPageProps = PropsWithChildren<{
  id: string;
  data: MixData;
}>;

export default function MixPage({id, data}: MixPageProps) {
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
      <div className={styles.title_container}>
        <div className={styles.title}>
          <h2>{data.text}</h2>
          <h3>{data.date}</h3>
        </div>
      </div>

      <div className={styles.tracklist_container}>
        <div className={styles.tracklist} id={`${id}_tracklist`}>
          <ul>
            {data.tracklist.map((track, i) => <li key={`${id}_tracklist_${i}`}>{track}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
