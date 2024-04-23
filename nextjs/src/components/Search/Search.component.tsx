'use client';

import { useAppDispatch, useAppSelector } from '@store/store';
import styles from './Search.module.css';
import { searchActions } from './Search.store';

export default function Search() {
  const search = useAppSelector(state => state.search);
  const dispatch = useAppDispatch();
  return search.show && (
    <div className={styles.search} onClick={() => dispatch(searchActions.hide())}>
      <div className={styles.container}>
        <input 
          autoFocus 
          className={styles.input} 
          type="text" 
          placeholder="Search" 
          onClick={e => e.stopPropagation()}
          onKeyDown={e => e.key === 'Escape' && dispatch(searchActions.hide())}/>
      </div>
    </div>
  );
}