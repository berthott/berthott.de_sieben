 'use client';

import { useEffect, useRef, useState } from 'react';
import { log } from '@utils/logger/logger';
import { Mix, Track } from '@directus/mix.model';
import { assetTransform, assetsUrl } from '@directus/directus.helpers';

const context = 'player';
const initialTime = '0:00:00';

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
  const [currentMix, setCurrentMix] = useState<Mix | undefined>();
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [durationString, setDurationString] = useState(initialTime);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTimeString, setCurrentTimeString] = useState(initialTime);

  const setMediaSession = (mix: Mix, track?: Track) => {
    if ('mediaSession' in navigator) {
      const title = `${mix.title || undefined}${track ? ` - ${track.artist} - ${track.title}` : ''}`;
      if (navigator.mediaSession.metadata) {
        navigator.mediaSession.metadata.title = title;
      }
      else {
        navigator.mediaSession.metadata = new MediaMetadata({
          title,
          artist: 'berthott',
          album: mix.release || undefined,
          artwork: [512].map(size =>
            ({ 
              src: assetTransform(mix.image, {
                fit: 'cover', 
                format: 'png',
                width: size.toString(),
                height: size.toString(),
              }),
              sizes: `${size}x${size}`, 
              type: 'image/png', 
            })
          ),
        });
      }
      log(context, 'Media Session set', navigator.mediaSession.metadata);
    }
  }

  const play = (state: boolean = true, mix?: Mix) => {
    playing.current = state;
    if (audio.current) {
      if (mix && audio.current?.currentSrc !== assetsUrl(mix.audio)) {
        log(context, 'Setting new src');
        audio.current.src = assetsUrl(mix.audio);
        audio.current.load();
        setCurrentMix(mix);
        setMediaSession(mix);
      } else {
        log(context, 'Playing audio', state);
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

  const isCurrentMix = (mix: Mix) => {
    return currentMix?.id === mix.id && audio.current?.currentSrc === assetsUrl(mix.audio);
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
        setDurationString(initialTime);
        setCurrentTimeString(initialTime);
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
    isCurrentMix,
    play,
    setVolume,
    setPlayPosition,
    durationToString,
    stringToDuration,
    setMediaSession,
  }
}
