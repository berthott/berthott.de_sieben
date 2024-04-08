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
import _ from 'lodash';

let lastScrollTop = 0;

export default function NavBar() {
  const menu = useContext(MenuContext);

  const [titleTwice, setTitleTwice] = useState(false);
  const [slideClass, setSlideClass] = useState<string | undefined>(undefined);

  const onScroll = _.throttle(() => {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    const currentClass = slideClass === undefined ? undefined : slideClass === styles['slide-out'] ? 'slide-out' : 'slide-in';
    let cl = '';
    if (!(currentScroll < 40 && currentClass === 'slide-in')) {
      if (currentScroll > lastScrollTop && currentClass !== 'slide-out') {
        cl = 'slide-out'
      }
      else if (currentScroll < lastScrollTop && currentClass !== 'slide-in') {
        cl = 'slide-in';
      }
    }
    setSlideClass(styles[cl]);
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }, 500);

  useEffect(() => {
    setTimeout(() => setTitleTwice(true), 500);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const Icon = menu.show ? CloseIcon : MenuIcon;

  const navStyle = !slideClass ? styles.nav : `${styles.nav} ${slideClass}`;
  
  return (
    <>
      <nav 
          className={navStyle} 
          onMouseEnter={() => setTitleTwice(false)}
          onMouseLeave={() => setTitleTwice(true)}>
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
        <span className={`${styles.title} ${titleTwice ? styles.twice : ''}`}>berthott</span>
      </nav>
      <Menu/>
    </>
  );
};
