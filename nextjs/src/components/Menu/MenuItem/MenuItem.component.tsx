import styles from '@components/Menu/MenuItem/MenuItem.module.css';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { menuActions } from '../Menu.state';
import { useAppDispatch } from '@store/store';

type MenuItemProps = PropsWithChildren<{
  id: string;
  title: string;
  clickable?: boolean;
}>;

export default function MenuItem({ id, title, clickable = true }: MenuItemProps) {
  const dispatch = useAppDispatch();
  return (
    <div 
        className={styles.mix}
        onDragStart={e => e.preventDefault()}
        onClick={() => {
          if (!clickable)
            return;

          dispatch(menuActions.hide());
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
