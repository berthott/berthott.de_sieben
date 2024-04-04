'use client';

import styles from '@components/Menu/Menu.module.css';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import WindowIcon from '@mui/icons-material/Window';
import CloseIcon from '@mui/icons-material/Close';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { dummy_data } from '@app/dummy_data';
import { MenuItem } from './MenuItem';
import { Rnd } from 'react-rnd';
import { createPortal } from 'react-dom';

enum MenuStyle {
  Layer,
  Grid,
  List,
}

type MenuProps = PropsWithChildren<{
  show?: boolean;
  onClose?: () => void;
}>;

export default function Menu({ show = false, onClose }: MenuProps) {
  const documentRef = useRef<Element | null>(null);
  useEffect(() => {
    documentRef.current = document.body;
  }, []);

  const [zIndex, setZIndex] = useState<number>(31);

  return show && documentRef.current && createPortal((
    <div className={styles.menu}>
      <div className={styles.menu__list}>
        <button onClick={onClose}>
          <CloseIcon style={{fontSize: 60}}/>
        </button>
        <button>
          <AutoAwesomeMotionIcon style={{fontSize: 60}}/>
        </button>
        <button>
          <WindowIcon style={{fontSize: 60}}/>
        </button>
      </div>
    { Object.entries(dummy_data).map(([key, data]) => {
      return (
        <Rnd 
          key={key} 
          default={{
            x: Math.random() * (window.innerWidth - 300), 
            y: Math.random() * (window.innerHeight - 300), 
            width: 300, 
            height: 300}}
          enableResizing={false}
          bounds='window'
          onDragStart={(_, item) => { item.node.style.zIndex = '5000' }}
          onDragStop={(_, item) => { 
            setZIndex(zIndex + 1);
            item.node.style.zIndex = zIndex.toString();
           }}>
  
          <MenuItem id={key} title={data.text}></MenuItem>
        </Rnd>
      );
    })}
    </div>
  ), documentRef.current);
}
