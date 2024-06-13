 'use client';

import { useEffect, useRef, useState } from 'react';
import { log } from '@utils/logger/logger';

const context = 'player';

const durationToString = (duration: number): string => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hours}:${returnedMinutes}:${returnedSeconds}`;
}

const stringToDuration = (s: string): number => {
  const [hours, minutes, seconds] = s.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

export function usePlayer() {

  const audio = useRef<HTMLAudioElement>();
  const playing = useRef(false);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [durationString, setDurationString] = useState('0:00:00');
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTimeString, setCurrentTimeString] = useState('0:00:00');

  const play = (state: boolean = true, src?: string) => {
    playing.current = state;
    if (audio.current) {
      if (src && audio.current.currentSrc !== src) {
        log(context, 'Setting new src');
        audio.current.src = src;
        audio.current.load();
      } else {
        state ? audio.current.play() : audio.current.pause();
      }
    };
  }

  const setVolume = (volume: number) => {
    if (audio.current) {
      audio.current.volume = volume;
    }
  }

  const setPlayPosition = (position: number) => {
    if (audio.current) {
      log(context, 'Setting play position');
      audio.current.currentTime = position;
    }
  }

  const isCurrentSrc = (src: string) => {
    return audio.current?.currentSrc === src;
  }

  // Initialize audio
  useEffect(() => {

    if (!audioInitialized) {
      log(context, 'Initializing audio');
      audio.current = new Audio();
      audio.current.preload = 'metadata';
      audio.current.onloadedmetadata = () => {
        if (audio.current) {
          log(context, 'Loaded metadata');
          setDuration(audio.current.duration);
          setDurationString(durationToString(audio.current.duration));
        }
      }
      audio.current.ontimeupdate = () => {
        if (audio.current) {
          log(context, 'Time update');
          setCurrentTime(audio.current.currentTime);
          setCurrentTimeString(durationToString(audio.current.currentTime));
        }
      }
      audio.current.onloadeddata = () => {
        setLoading(false);
        if (audio.current && playing.current) {
          log(context, 'Data loaded: playing audio');
          audio.current.play();
        }
      }
      audio.current.onloadstart = () => {
        setLoading(true);
      }
      setAudioInitialized(true);
    } 

  }, [audioInitialized]);

  // Space key to play/pause
  useEffect(() => {
    const onSpace = (e: KeyboardEvent) => {
      if (document.activeElement?.nodeName.toLowerCase() === 'input') {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        play(!playing.current);
      }
    }

    window.addEventListener('keydown', onSpace);
    return () => window.removeEventListener('keydown', onSpace);
  }, []);

  return {
    audioInitialized,
    duration,
    durationString,
    currentTime,
    currentTimeString,
    playing: playing.current,
    loading,
    isCurrentSrc,
    play,
    setVolume,
    setPlayPosition,
    durationToString,
    stringToDuration,
  }
}
