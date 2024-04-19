 'use client';

import { useEffect, useRef, useState } from 'react';

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

export default function usePlayer() {

  const audio = useRef<HTMLAudioElement>();
  const playing = useRef(false);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [duration, setDuration] = useState(0);
  const [durationString, setDurationString] = useState('0:00:00');
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTimeString, setCurrentTimeString] = useState('0:00:00');

  const play = (state: boolean = true, src?: string) => {
    playing.current = state;
    if (audio.current) {
      if (src && audio.current.currentSrc !== src) {
        console.log('src changed')
        audio.current.src = src;
        audio.current.load();
      } else {
        state ? audio.current.play() : audio.current.pause();
        console.log('play called')
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
      audio.current.currentTime = position;
    }
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
      audio.current.onloadeddata = () => {
        console.log('onLoad called', audio.current, playing)
        if (audio.current && playing.current) {
          audio.current.play();
        }
      }
      setAudioInitialized(true);
    } 

  }, [audioInitialized]);

  return {
    audioInitialized,
    duration,
    durationString,
    currentTime,
    currentTimeString,
    playing: playing.current,
    isCurrentSrc,
    play,
    setVolume,
    setPlayPosition,
    durationToString,
    stringToDuration,
  }
}
