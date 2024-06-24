 'use client';

import styles from './player.module.css';

import { playerActions } from './player.store';
import { usePlayer } from './player.hook';
import { Mixes, Track, getMixByKey } from '@directus/mix.model';
import { assetsUrl } from '@directus/directus.helpers';
import { log } from '@utils/logger/logger';
import { useBreakpoints } from '@utils/hooks/breakpoints.hook';
import { useAppDispatch, useAppSelector } from '@store/store';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import Fade from '@utils/components/fade/fade.component';
import CloseIcon from '@mui/icons-material/Close';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CircularProgress from '@mui/material/CircularProgress';
import Slider from '@mui/material/Slider';
import { Popover, useTheme } from '@mui/material';

const context = 'player';

export type PlayerProps = {
  mixes: Mixes;
};

export function Player({ mixes }: PlayerProps) {
  const player = useAppSelector(state => state.player);
  const dispatch = useAppDispatch();
  const mix = getMixByKey(mixes, player.currentlyPlaying!);

  const { isMd } = useBreakpoints();

  const [audioSliderValue, setAudioSliderValue] = useState<number | null>(null);

  // volume popover
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
    loading,
    isCurrentMix,
    play,
    setVolume,
    setPlayPosition,
    durationToString,
    stringToDuration,
    setMediaSession,
  } = usePlayer();

  log(context, 'Player component: playing', playing);

  if (audioSliderValue === currentTime) {
    setAudioSliderValue(null);
  }

  // set new source when mix changes
  useEffect(() => {
    if (audioInitialized && mix) {
      if (!isCurrentMix(mix)) {
        play(true, mix);
        dispatch(playerActions.resetPlayingState());
      }
    }
  }, [audioInitialized, mix, play, isCurrentMix, dispatch]);

  // play at specific position
  useEffect(() => {
    if (audioInitialized && player.playAt) {
      setPlayPosition(stringToDuration(player.playAt));
      if (!playing && mix && isCurrentMix(mix)) {
        play();
      }
      dispatch(playerActions.resetPlayingState());
    }
  }, [audioInitialized, play, player.playAt, dispatch, playing, stringToDuration, setPlayPosition, mix, isCurrentMix]);

  // get the currently played track
  const getCurrentTrack = (): Track | null => {
    if (!mix || !mix.parsed_tracklist || !currentTime || !mix.parsed_tracklist[0].time) {
      return null;
    }

    const currentTrack = mix.parsed_tracklist?.findLast(track => stringToDuration(track.time as string) <= currentTime);
    return currentTrack || mix.parsed_tracklist?.[0];
  }
  const currentTrack = getCurrentTrack();
  
  if (mix && currentTrack) {
    setMediaSession(mix, currentTrack);
  }

  // scroll title if it's too long
  const [scrollDistance, setScrollDistance] = useState(0);
  const metaRef = useCallback((node: HTMLDivElement) => {
    if (node && node.scrollWidth > node.clientWidth) {
      setScrollDistance(node.scrollWidth - node.clientWidth);
    }
  }, []);


  const largeIconSize = isMd ? 60 : 40;
  const smallIconSize = isMd ? 40 : 30;
  const imageSize = isMd ? '6rem' : '5rem';

  // reuseable top icons
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
        <button onClick={() => !loading && play(!playing)}>
          <Fade 
            in={!playing} 
            states={{
              a: <PauseIcon style={{fontSize: largeIconSize}}/>,
              b: <PlayArrowIcon style={{fontSize: largeIconSize}}/>,
            }}
            loading={loading}
            loadingComponent={<CircularProgress size={largeIconSize} color='inherit'/>}/>
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
