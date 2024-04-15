 'use client';

import styles from '@components/Player/Player.module.css';
import { PlayerContext } from './Player.state';
import { useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { Fade } from '@components/Fade';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Image from 'next/image';


export default function Player() {
  const player = useContext(PlayerContext);
  return (
    <div className={`${styles.player} ${!player.show ? styles.slide_out : ''}`}>
      <button onClick={() => player.setShow(false)}>
        <CloseIcon style={{fontSize: 60}}/>
      </button>
      <button onClick={() => document.querySelector(`#${player.currentlyPlaying}_tracklist`)?.scrollIntoView({ behavior: 'smooth' })}>
        <QueueMusicIcon style={{fontSize: 60}}/>
      </button>
      <div className={styles.waveform}>
        currently playing: {player.currentlyPlaying}
      </div>
      <button onClick={() => player.togglePlay(!player.playing)}>
        <Fade in={player.playing} states={{
          a: <PlayArrowIcon style={{fontSize: 60}}/>,
          b: <PauseIcon style={{fontSize: 60}}/>,
        }}/>
      </button>
      <Image 
        className={styles.img} 
        src={`/images/${player.currentlyPlaying}.jpg`} 
        alt={player.currentlyPlaying || 'preview'} 
        width={0}
        height={0} 
        sizes="6rem" style={{
          width: '6rem',
          height: '6rem',
        }}/>
    </div>
  );
}
