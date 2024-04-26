'use client';

import styles from './menu.module.css';

import { MenuStyle, menuActions } from './menu.store';
import { MenuItem } from './menu-item/menu-item.component';
import { Mixes } from '@directus/mix.model';
import { useAppDispatch, useAppSelector } from '@store/store';
import { useBreakpoints } from '@utils/hooks/breakpoints.hook';

import { useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import { Fade } from '@mui/material';

export type MenuProps = {
  mixes: Mixes;
};

export function Menu({ mixes }: MenuProps) {
  const dispatch = useAppDispatch();

  const [zIndex, setZIndex] = useState(31);
  const [dragging, setDragging] = useState(false);

  const menu = useAppSelector(state => state.menu);

  const { isMd } = useBreakpoints();
  useEffect(() => {
    if (!isMd && menu.style !== MenuStyle.List) {
      dispatch(menuActions.setListStyle());
    } else if (isMd && menu.style === MenuStyle.List) {
      dispatch(menuActions.setLayerStyle());
    }
  }, [isMd, menu, dispatch]);

  return (
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
