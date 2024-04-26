import styles from '@components/Menu/MenuItem/MenuItem.module.css';
import Image from 'next/image';
import { MenuStyle, menuActions } from '../Menu.store';
import { useAppDispatch, useAppSelector } from '@store/store';
import { Mix } from '@directus/mix.model';
import { assetsUrl } from '@directus/directus.helpers';

type MenuItemProps = {
  mix: Mix
  clickable?: boolean;
};

export default function MenuItem({ mix, clickable = true }: MenuItemProps) {
  const dispatch = useAppDispatch();
  const menu = useAppSelector(state => state.menu);
  const list = menu.style === MenuStyle.List;
  return (
    <div 
        className={list ? styles.item_list : styles.item}
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
        width={0}
        height={0}
        sizes='100%'
        style={{
          width: list ? 100 : 300,
          height: list ? 100 : 300,
        }}
        />
      <div className={list ? styles.text_list : styles.hover}>
        <p className={list ? styles.title_list : styles.title}>{mix.title}</p>
        <p className={list ? styles.release_list : styles.release}>{mix.release}</p>
      </div>
    </div>
  );
}
