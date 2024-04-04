import styles from '@components/Menu/MenuItem/MenuItem.module.css';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

type MenuItemProps = PropsWithChildren<{
  id: string;
  title: string;
}>;

export default function MenuItem({ id }: MenuItemProps) {
  return (
    <Image className={styles.mix} src={`/images/${id}.jpg`} alt={id} width={300} height={300} onDragStart={e => e.preventDefault()}></Image>
  );
}
