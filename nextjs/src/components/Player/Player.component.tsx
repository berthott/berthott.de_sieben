 'use client';

import styles from '@components/Player/Player.module.css';
import { playerActions } from './Player.state';
import CloseIcon from '@mui/icons-material/Close';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { Fade } from '@components/Fade';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import DownloadIcon from '@mui/icons-material/Download';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@store/store';
import { Mixes, Track, getMixByKey } from '@directus/mix.model';
import { assetsUrl, downloadUrl } from '@directus/directus.helpers';
import { useEffect, useState } from 'react';
import usePlayer from './Player.hook';
import Slider from '@mui/material/Slider';
import { Popover, useTheme } from '@mui/material';

export type PlayerProps = {
  mixes: Mixes;
};

export default function Player({ mixes }: PlayerProps) {
  const player = useAppSelector(state => state.player);
  const dispatch = useAppDispatch();
  const mix = getMixByKey(mixes, player.currentlyPlaying!);

  const [audioSliderValue, setAudioSliderValue] = useState<number | null>(null);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLButtonElement | null>(null);
  const theme = useTheme();
  const sliderStyle = {
    color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
    '& .MuiSlider-thumb': {
      width: 8,
      height: 8,
      '&::before': {
        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
      },
      '&:hover, &.Mui-focusVisible': {
        boxShadow: `0px 0px 0px 8px ${
          theme.palette.mode === 'dark'
            ? 'rgb(255 255 255 / 16%)'
            : 'rgb(0 0 0 / 16%)'
        }`,
      },
      '&.Mui-active': {
        width: 20,
        height: 20,
      },
    },
    '& .MuiSlider-rail': {
      opacity: 0.28,
    },
  };

  const {
    audioInitialized,
    duration,
    durationString,
    currentTime,
    currentTimeString,
    playing,
    isCurrentSrc,
    play,
    setVolume,
    setPlayPosition,
    durationToString,
    stringToDuration,
  } = usePlayer();

  if (audioSliderValue === currentTime) {
    setAudioSliderValue(null);
  }

  useEffect(() => {
    if (audioInitialized && mix) {
      const src = assetsUrl(mix.audio);
      if (!isCurrentSrc(src)) {
        play(true, src);
        dispatch(playerActions.resetPlayingState());
      }
    }
  }, [audioInitialized, mix, play, isCurrentSrc]);

  useEffect(() => {
    if (audioInitialized && player.playAt) {
      setPlayPosition(stringToDuration(player.playAt));
      if (!playing) {
        play();
      }
      dispatch(playerActions.resetPlayingState());
    }
  }, [audioInitialized, play, player.playAt]);

  const getCurrentTrack = (): Track | null => {
    if (!mix || !mix.parsed_tracklist || !currentTime || !mix.parsed_tracklist[0].time) {
      return null;
    }

    const currentTrack = mix.parsed_tracklist?.findLast(track => stringToDuration(track.time as string) <= currentTime);
    return currentTrack || mix.parsed_tracklist?.[0];
  }

  const currentTrack = getCurrentTrack();

  return (
    mix && <div className={`${styles.player} ${!player.show ? styles.slide_out : ''}`}>
      <button onClick={() => {
          dispatch(playerActions.hide());
          play(false);
        }}>
        <CloseIcon style={{fontSize: 60}}/>
      </button>
      <button onClick={() => document.querySelector(`#${player.currentlyPlaying}_tracklist`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
        <QueueMusicIcon style={{fontSize: 60}}/>
      </button>
      <a href={downloadUrl(mix.audio)}>
        <DownloadIcon style={{fontSize: 40}}/>
      </a>
      <button onClick={event => setPopoverAnchor(event.currentTarget)}>
        <VolumeUpIcon style={{fontSize: 40}}/>
      </button>
      <Popover
        id='volume'
        open={Boolean(popoverAnchor)}
        anchorEl={popoverAnchor}
        onClose={() => setPopoverAnchor(null)}
        anchorOrigin={{
          vertical: -28,
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        classes={{ paper: styles.volume_popover }}>
        <Slider 
          orientation='vertical' 
          defaultValue={100}
          onChange={(_, value) => setVolume(value as number / 100)}
          sx={{
            height: '90%',
            ...sliderStyle
          }}/>
      </Popover>
      <div className={styles.waveform}>
        <span className={styles.title}>{mix.title}</span> 
        <div className={styles.waveform_meta}>
          <span className={styles.currentTrack}>{currentTrack ? `${currentTrack.artist} - ${currentTrack.title}` : ''}</span>
          <span className='grow'></span>
          <span className={styles.duration}>{`${currentTimeString} / ${durationString}`}</span>
        </div>
        <Slider 
          value={audioSliderValue !== null ? audioSliderValue : currentTime}
          onChange={(_, value) => setAudioSliderValue(value as number)}
          onChangeCommitted={(_, value) => setPlayPosition(value as number)}
          valueLabelDisplay='auto'
          valueLabelFormat={value => durationToString(value as number)}
          max={duration}
          sx={sliderStyle}/>
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
