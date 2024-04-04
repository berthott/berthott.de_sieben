import styles from '@components/MixPage/MixPage.module.css';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

type MixPageProps = PropsWithChildren<{
  id: string;
}>;

export default function MixPage({ id }: MixPageProps) {
  return (
    <section className={styles.page} id={id}>
      <Image className={styles.img} src={`/images/${id}.jpg`} alt={id} fill></Image>
    </section>
  );
}
