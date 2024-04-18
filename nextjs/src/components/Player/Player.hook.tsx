 'use client';

import { useEffect, useRef, useState } from 'react';

const durationToString = (duration: number): string => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
}

export default function usePlayer() {

  const audio = useRef<HTMLAudioElement>();
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [duration, setDuration] = useState(0);
  const [durationString, setDurationString] = useState('0:00');
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTimeString, setCurrentTimeString] = useState('0:00');
  const [playing, setPlaying] = useState(false);

  const play = (state: boolean = true, src?: string) => {
    if (audio.current) {
      if (src && audio.current.currentSrc !== src) {
        console.log('src changed')
        audio.current.src = src;
        audio.current.load();
      }
      state ? audio.current.play() : audio.current.pause();
      console.log('play called')
    }
    setPlaying(state);
  }

  const isCurrentSrc = (src: string) => {
    return audio.current?.currentSrc === src;
  }

  useEffect(() => {
    console.log('useEffect called')

    if (!audioInitialized) {
      console.log('audio init')
      audio.current = new Audio();
      audio.current.preload = 'metadata';
      audio.current.onloadedmetadata = () => {
        console.log('onLoadMetadata called')
        if (audio.current) {
          setDuration(audio.current.duration);
          setDurationString(durationToString(audio.current.duration));
        }
      }
      audio.current.ontimeupdate = () => {
        console.log('onTimeUpdate called')
        if (audio.current) {
          setCurrentTime(audio.current.currentTime);
          setCurrentTimeString(durationToString(audio.current.currentTime));
        }
      }
      setAudioInitialized(true);
    } 

  }, [audioInitialized]);

  return {
    audioInitialized,
    durationString,
    currentTimeString,
    playing,
    isCurrentSrc,
    play,
  }
}
