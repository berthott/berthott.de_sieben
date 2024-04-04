'use client';

import { Menu } from '@components/Menu';
import styles from '@components/NavBar/NavBar.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';


export default function NavBar() {

  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      {!showMenu && (<nav className={styles.nav}>
        <button onClick={() => setShowMenu(showMenu => !showMenu)}>
          <MenuIcon style={{fontSize: 60}}/>
        </button>
        <SearchIcon style={{fontSize: 60}}/>
      </nav>)}
      <Menu show={showMenu} onClose={() => setShowMenu(false)}></Menu>
    </>
  );
};
