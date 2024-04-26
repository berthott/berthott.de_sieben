'use client';

import styles from './nav-bar.module.css';

import { Menu } from '@components/menu/menu.component';
import { MenuStyle, menuActions } from '@components/menu/menu.store';
import { searchActions } from '@components/search/search.store';
import { Mixes } from '@directus/mix.model';
import { useBreakpoints } from '@utils/hooks/breakpoints.hook';
import Fade from '@utils/components/fade/fade.component';
import { useAppDispatch, useAppSelector } from '@store/store';

import { useEffect, useState } from 'react';
import _ from 'lodash';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import WindowIcon from '@mui/icons-material/Window';
import CloseIcon from '@mui/icons-material/Close';

let lastScrollTop = 0;

export type MenuProps = {
  mixes: Mixes;
};

export function NavBar(props: MenuProps) {
  const menu = useAppSelector(state => state.menu);
  const dispatch = useAppDispatch();

  const { isMd } = useBreakpoints();

  const [titleTwice, setTitleTwice] = useState(false);
  const [slideClass, setSlideClass] = useState<string | undefined>(undefined);

  // throttled slide in/out effect
  const onScroll = _.throttle(() => {
    const currentScroll = window.scrollY || document.documentElement?.scrollTop;
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

  /* eslint-disable react-hooks/exhaustive-deps */ // add onScroll as a dependency will break the behavior
  useEffect(() => {
    setTimeout(() => setTitleTwice(true), 500);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []); 

  const navStyle = !slideClass ? styles.nav : `${styles.nav} ${slideClass}`;
  const StyleIcon = menu.style === MenuStyle.Layer ? WindowIcon : AutoAwesomeMotionIcon;
  
  return (
    <div className={`${styles.nav_container} ${!isMd && menu.show ? 'bg-white' : ''}`}>
      <nav 
          className={navStyle} 
          onMouseEnter={() => setTitleTwice(false)}
          onMouseLeave={() => setTitleTwice(true)}>
        <button onClick={() => dispatch(menuActions.show(!menu.show))}>
          <Fade in={menu.show} states={{
            a: <MenuIcon style={{fontSize: isMd ? 60 : 40}}/>,
            b: <CloseIcon style={{fontSize: isMd ? 60 : 40}}/>,
          }}/>
        </button>  
        <Fade in={menu.show} states={{
          a: (<button onClick={() => dispatch(searchActions.show())}>
                <SearchIcon style={{fontSize: isMd ? 50 : 30}}/>
              </button>),
          b: (menu.style !== MenuStyle.List ? <button onClick={() => dispatch(menuActions.toggleLayerGridStyle())}>
              <StyleIcon style={{fontSize: isMd ? 50 : 30}}/>
            </button> : <div></div>),
        }}/>
        <span className='grow'></span>
        <span className={`${styles.title} ${titleTwice || !isMd ? styles.twice : ''}`}>berthott</span>
      </nav>
      <Menu {...props}/>
    </div>
  );
};
