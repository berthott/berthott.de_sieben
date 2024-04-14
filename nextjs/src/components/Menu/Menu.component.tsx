'use client';

import styles from '@components/Menu/Menu.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { dummy_data } from '@app/dummy_data';
import { MenuItem } from './MenuItem';
import { Rnd } from 'react-rnd';
import { MenuContext, MenuStyle } from './Menu.state';
import { Fade } from '@mui/material';

export default function Menu() {

  const [zIndex, setZIndex] = useState(31);
  const [dragging, setDragging] = useState(false);

  const menu = useContext(MenuContext);

  return (
    <Fade in={menu.show}>
      <div className={styles[`menu_${menu.style}`]}>
      { Object.entries(dummy_data).map(([key, data]) => {
        return menu.style === MenuStyle.Layer ? (
          <Rnd 
            key={key} 
            default={{
              x: Math.random() * (window.innerWidth - 300), 
              y: Math.random() * (window.innerHeight - 300), 
              width: 300, 
              height: 300}}
            enableResizing={false}
            bounds='window'
            onDragStart={(_, item) => { 
              item.node.style.zIndex = '5000';
            }}
            onDrag={() => setDragging(true)}
            onDragStop={(_, item) => { 
              setZIndex(zIndex + 1);
              item.node.style.zIndex = zIndex.toString();
              setTimeout(() => setDragging(false), 100);
            }}>
            <MenuItem id={key} title={data.text} clickable={!dragging}></MenuItem>
          </Rnd>
        ) : (
          <MenuItem key={key} id={key} title={data.text}></MenuItem>
        );
      })}
      </div>
    </Fade>
  );
}
