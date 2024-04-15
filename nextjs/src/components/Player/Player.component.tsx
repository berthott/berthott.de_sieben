 'use client';

import styles from '@components/Player/Player.module.css';
import { PlayerContext } from './Player.state';
import { useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';


export default function Player() {
  const player = useContext(PlayerContext);
  return (
    <div className={`${styles.player} ${!player.show ? styles.slide_out : ''}`}>
      <button onClick={() => player.setShow(false)}>
        <CloseIcon style={{fontSize: 60}}/>
      </button>
      currently playing: {player.currentlyPlaying}
    </div>
  );
}
