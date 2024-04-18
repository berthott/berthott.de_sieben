 'use client';

import styles from '@components/Player/Player.module.css';
import { playerActions } from './Player.state';
import CloseIcon from '@mui/icons-material/Close';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { Fade } from '@components/Fade';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@store/store';
import { Mixes, getMixByKey } from '@directus/mix.model';
import { assetsUrl } from '@directus/directus.helpers';
import { useEffect } from 'react';
import usePlayer from './Player.hook';

export type PlayerProps = {
  mixes: Mixes;
};

export default function Player({ mixes }: PlayerProps) {
  const player = useAppSelector(state => state.player);
  const dispatch = useAppDispatch();
  const mix = getMixByKey(mixes, player.currentlyPlaying!);

  const {
    audioInitialized,
    durationString,
    currentTimeString,
    playing,
    isCurrentSrc,
    play,
  } = usePlayer();


  useEffect(() => {
    if (audioInitialized && mix) {
      const src = assetsUrl(mix.audio);
      if (!isCurrentSrc(src)) {
        play(true, src);
      }
    }
  }, [audioInitialized, mix, play, isCurrentSrc]);

  return (
    mix && <div className={`${styles.player} ${!player.show ? styles.slide_out : ''}`}>
      <button onClick={() => dispatch(playerActions.hide())}>
        <CloseIcon style={{fontSize: 60}}/>
      </button>
      <button onClick={() => document.querySelector(`#${player.currentlyPlaying}_tracklist`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
        <QueueMusicIcon style={{fontSize: 60}}/>
      </button>
      <div className={styles.waveform}>
        <span className={styles.title}>{mix.title}</span> <span className={styles.duration}>{`${currentTimeString} / ${durationString}`}</span>
      </div>
      <button onClick={() => play(!playing)}>
        <Fade in={!playing} states={{
          a: <PauseIcon style={{fontSize: 60}}/>,
          b: <PlayArrowIcon style={{fontSize: 60}}/>,
        }}/>
      </button>
      {player.currentlyPlaying && <Image 
        className={styles.img} 
        src={assetsUrl(mix.image)} 
        alt={player.currentlyPlaying || 'preview'} 
        width={0}
        height={0} 
        sizes="6rem" style={{
          width: '6rem',
          height: '6rem',
        }}/>}
    </div>
  );
}
