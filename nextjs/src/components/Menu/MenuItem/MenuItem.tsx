import styles from '@components/Menu/MenuItem/MenuItem.module.css';
import Image from 'next/image';
import { PropsWithChildren, useContext } from 'react';
import { MenuContext } from '../Menu.state';

type MenuItemProps = PropsWithChildren<{
  id: string;
  title: string;
}>;

export default function MenuItem({ id }: MenuItemProps) {
  const menu = useContext(MenuContext);
  return (
    <Image 
      className={styles.mix} 
      src={`/images/${id}.jpg`} 
      alt={id} 
      width={300} 
      height={300} 
      onDragStart={e => e.preventDefault()}
      onClick={() => {
        menu.setShow(false);
        document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
      }}>
    </Image>
  );
}
