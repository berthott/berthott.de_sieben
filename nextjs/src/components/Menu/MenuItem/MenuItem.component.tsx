import styles from '@components/Menu/MenuItem/MenuItem.module.css';
import Image from 'next/image';
import { menuActions } from '../Menu.state';
import { useAppDispatch } from '@store/store';
import { Mix } from '@directus/mix.model';
import { assetsUrl } from '@directus/directus.helpers';

type MenuItemProps = {
  mix: Mix
  clickable?: boolean;
};

export default function MenuItem({ mix, clickable = true }: MenuItemProps) {
  const dispatch = useAppDispatch();
  return (
    <div 
        className={styles.mix}
        onDragStart={e => e.preventDefault()}
        onClick={() => {
          if (!clickable)
            return;

          dispatch(menuActions.hide());
          document.querySelector(`#${mix.key}`)?.scrollIntoView({ behavior: 'smooth' });
        }}>
      <Image 
        className={styles.image} 
        src={assetsUrl(mix.image)} 
        alt={mix.title || 'preview'} 
        width={300} 
        height={300} 
        />
      <div className={styles.hover}>
        <p className={styles.title}>{mix.title}</p>
      </div>
    </div>
  );
}
