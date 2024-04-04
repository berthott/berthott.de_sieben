'use client';

import { Menu } from '@components/Menu';
import { MenuContext } from '@components/Menu/Menu.state';
import styles from '@components/NavBar/NavBar.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';


export default function NavBar() {
  const menu = useContext(MenuContext);
  return (
    <>
      {!menu.show && (<nav className={styles.nav}>
        <button onClick={() => menu.setShow(!menu.show)}>
          <MenuIcon style={{fontSize: 60}}/>
        </button>
        <SearchIcon style={{fontSize: 60}}/>
      </nav>)}
      <Menu/>
    </>
  );
};
