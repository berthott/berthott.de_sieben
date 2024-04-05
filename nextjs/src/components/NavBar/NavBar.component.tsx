'use client';

import { Menu } from '@components/Menu';
import { MenuContext } from '@components/Menu/Menu.state';
import styles from '@components/NavBar/NavBar.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import WindowIcon from '@mui/icons-material/Window';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useEffect, useState } from 'react';


export default function NavBar() {
  const menu = useContext(MenuContext);

  const [titleStyle, setTitleStyle] = useState(styles.title);

  useEffect(() => {
    setTimeout(() => setTitleStyle(`${styles.title} ${styles.twice}`), 500);
  }, []);

  const Icon = menu.show ? CloseIcon : MenuIcon;
  
  return (
    <>
      <nav className={styles.nav}>
        <button onClick={() => menu.setShow(!menu.show)}>
          <Icon style={{fontSize: 60}}/>
        </button>
        {!menu.show ? (
          <button>
            <SearchIcon style={{fontSize: 50}}/>
          </button>
        ) : (
          <>
            <button>
              <AutoAwesomeMotionIcon style={{fontSize: 50}}/>
            </button>
            <button>
              <WindowIcon style={{fontSize: 50}}/>
            </button>
          </>
        )}
        <span className='grow'></span>
        <span className={titleStyle}>berthott</span>
      </nav>
      <Menu/>
    </>
  );
};
