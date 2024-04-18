'use client';

import styles from '@components/Menu/Menu.module.css';
import { useEffect, useRef, useState } from 'react';
import { MenuItem } from './MenuItem';
import { Rnd } from 'react-rnd';
import { MenuStyle } from './Menu.state';
import { Fade } from '@mui/material';
import { useAppSelector } from '@store/store';
import { Mixes } from '@directus/mix.model';

export type MenuProps = {
  mixes: Mixes;
};

export default function Menu({ mixes }: MenuProps) {
  const documentRef = useRef<Element | null>(null);
  useEffect(() => {
    documentRef.current = document.body;
  }, []);

  const [zIndex, setZIndex] = useState(31);
  const [dragging, setDragging] = useState(false);

  const menu = useAppSelector(state => state.menu);

  return documentRef.current && (
    <Fade in={menu.show}>
      <div className={styles[`menu_${menu.style}`]}>
      { mixes.map(mix => {
        return menu.style === MenuStyle.Layer ? (
          <Rnd 
            key={mix.key} 
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
            <MenuItem mix={mix} clickable={!dragging}></MenuItem>
          </Rnd>
        ) : (
          <MenuItem key={mix.key} mix={mix}></MenuItem>
        );
      })}
      </div>
    </Fade>
  );
}
