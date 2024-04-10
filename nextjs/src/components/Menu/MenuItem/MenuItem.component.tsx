import styles from '@components/Menu/MenuItem/MenuItem.module.css';
import Image from 'next/image';
import { PropsWithChildren, useContext } from 'react';
import { MenuContext } from '../Menu.state';
import { title } from 'process';

type MenuItemProps = PropsWithChildren<{
  id: string;
  title: string;
  clickable?: boolean;
}>;

export default function MenuItem({ id, title, clickable = true }: MenuItemProps) {
  const menu = useContext(MenuContext);
  return (
    <div 
        className={styles.mix}
        onDragStart={e => e.preventDefault()}
        onClick={() => {
          if (!clickable)
            return;

          menu.setShow(false);
          document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
        }}>
      <Image 
        className={styles.image} 
        src={`/images/${id}.jpg`} 
        alt={id} 
        width={300} 
        height={300} 
        />
      <div className={styles.hover}>
        <p className={styles.title}>{title}</p>
      </div>
    </div>
  );
}
