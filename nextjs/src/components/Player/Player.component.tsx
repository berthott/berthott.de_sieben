 'use client';

import styles from '@components/Player/Player.module.css';
import { playerActions } from './Player.state';
import CloseIcon from '@mui/icons-material/Close';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { Fade } from '@components/Fade';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@store/store';
import { Mixes, Track, getMixByKey } from '@directus/mix.model';
import { assetsUrl } from '@directus/directus.helpers';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import usePlayer from './Player.hook';
import Slider from '@mui/material/Slider';
import { Popover, useTheme } from '@mui/material';
import { useBreakpoints } from '@utils/Breakpoints.hook';

export type PlayerProps = {
  mixes: Mixes;
};

export default function Player({ mixes }: PlayerProps) {
  const player = useAppSelector(state => state.player);
  const dispatch = useAppDispatch();
  const mix = getMixByKey(mixes, player.currentlyPlaying!);

  const { isMd } = useBreakpoints();

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
  }, [audioInitialized, mix, play, isCurrentSrc, dispatch]);

  useEffect(() => {
    if (audioInitialized && player.playAt) {
      setPlayPosition(stringToDuration(player.playAt));
      if (!playing && mix && isCurrentSrc(assetsUrl(mix.audio))) {
        play();
      }
      dispatch(playerActions.resetPlayingState());
    }
  }, [audioInitialized, play, player.playAt, dispatch, playing, stringToDuration, setPlayPosition, mix, isCurrentSrc]);

  const getCurrentTrack = (): Track | null => {
    if (!mix || !mix.parsed_tracklist || !currentTime || !mix.parsed_tracklist[0].time) {
      return null;
    }

    const currentTrack = mix.parsed_tracklist?.findLast(track => stringToDuration(track.time as string) <= currentTime);
    return currentTrack || mix.parsed_tracklist?.[0];
  }

  const [scrollDistance, setScrollDistance] = useState(0);
  const metaRef = useCallback((node: HTMLDivElement) => {
    if (node && node.scrollWidth > node.clientWidth) {
      setScrollDistance(node.scrollWidth - node.clientWidth);
    }
  }, []);

  const currentTrack = getCurrentTrack();

  const largeIconSize = isMd ? 60 : 40;
  const smallIconSize = isMd ? 40 : 30;
  const imageSize = isMd ? '6rem' : '5rem';

  const topIcons = (
    <>
      <button onClick={() => {
          dispatch(playerActions.hide());
          play(false);
        }}>
        <CloseIcon style={{fontSize: largeIconSize}}/>
      </button>
      <button onClick={() => document.querySelector(`#${player.currentlyPlaying}_tracklist`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
        <QueueMusicIcon style={{fontSize: largeIconSize}}/>
      </button>
    </>
  );

  return (
    mix && <div className={`${styles.player} ${!player.show ? styles.slide_out : ''}`}>
      <div className={styles.player_top}>
        {!isMd && topIcons}
        <span className='grow'></span>
      </div>
      <div className={styles.player_main}>
        {isMd && topIcons}
        <button onClick={event => setPopoverAnchor(event.currentTarget)}>
          <VolumeUpIcon style={{fontSize: smallIconSize}}/>
        </button>
        <Popover
          id='volume'
          open={Boolean(popoverAnchor)}
          anchorEl={popoverAnchor}
          onClose={() => setPopoverAnchor(null)}
          anchorOrigin={{
            vertical: isMd ? -28 : -65,
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
          <div 
              ref={!isMd ? metaRef : undefined} 
              className={`${styles.title} ${scrollDistance ? styles.scroll : ''}`}
              // @ts-ignore
              style={!isMd && scrollDistance ? {'--scroll-distance':`-${scrollDistance}px`} : {}}
              >
            <span>{mix.title}{currentTrack ? ` - ${currentTrack.artist} - ${currentTrack.title}` : ''}</span> 
          </div>
          <div className={styles.slider}>
            <span className={styles.duration}>{currentTimeString}</span>
            <Slider 
              value={audioSliderValue !== null ? audioSliderValue : currentTime}
              onChange={(_, value) => setAudioSliderValue(value as number)}
              onChangeCommitted={(_, value) => setPlayPosition(value as number)}
              valueLabelDisplay='auto'
              valueLabelFormat={value => durationToString(value as number)}
              max={duration}
              sx={sliderStyle}/>
            <span className={styles.duration}>{durationString}</span>
          </div>
        </div>
        <button onClick={() => play(!playing)}>
          <Fade in={!playing} states={{
            a: <PauseIcon style={{fontSize: largeIconSize}}/>,
            b: <PlayArrowIcon style={{fontSize: largeIconSize}}/>,
          }}/>
        </button>
        {player.currentlyPlaying && <Image 
          className={styles.img} 
          src={assetsUrl(mix.image)} 
          alt={player.currentlyPlaying || 'preview'} 
          width={0}
          height={0} 
          sizes={imageSize} style={{
            width: imageSize,
            height: imageSize,
          }}/>}
      </div>
    </div>
  );
}
