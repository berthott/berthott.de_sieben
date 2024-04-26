'use client';

import { useAppDispatch, useAppSelector } from '@store/store';
import styles from './search.module.css';
import { searchActions } from './search.store';
import { debounce } from 'lodash';
import { Mix, Mixes, Track } from '@directus/mix.model';
import { ChangeEvent } from 'react';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { playerActions } from '@components/player/player.store';

export type SearchProps = {
  mixes: Mixes;
};

type Result = {
  track: Track;
  mix: Mix;
}

export function Search({ mixes }: SearchProps) {
  const search = useAppSelector(state => state.search);
  const dispatch = useAppDispatch();
  const results = mixes.reduce((r, mix) => {
    const found = search.search.length && mix.parsed_tracklist?.map(track => 
      ({ track, mix })).filter(({ track }) => `${track.artist} ${track.title}`.toLowerCase().includes(search.search.toLowerCase()));
    return found ? r.concat(found) : r;
  }, [] as Result[])
  const onChange = debounce((e: ChangeEvent<HTMLInputElement>) => dispatch(searchActions.setSearch(e.target.value)), 250);
  return search.show && (
    <div className={styles.search} onClick={() => dispatch(searchActions.hide())}>
      <div className={styles.container}>
        <input 
          autoFocus 
          className={styles.input} 
          type="text" 
          placeholder='search ...' 
          onClick={e => e.stopPropagation()}
          onKeyDown={e => e.key === 'Escape' && dispatch(searchActions.hide())}
          onChange={e => onChange(e)}/>
        <ul className={styles.results}>
          {results.map(result => 
            <li key={`${result.track.artist} - ${result.track.title}`} className={styles.result}>
              <div>
                <div className={styles.artist}>{result.track.artist}</div>
                <div className={styles.title}>{result.track.title} - <a onClick={() => document.querySelector(`#${result.mix.key}`)?.scrollIntoView({ behavior: 'smooth' })}>{result.mix.title}</a></div>
              </div>
              <span className="grow"></span>
              {result.track.time && (<button onClick={() => dispatch(playerActions.play({ currentlyPlaying: result.mix.key, playAt: result.track.time }))}>
                <PlayArrowRoundedIcon/>
              </button>)}
            </li>)}
        </ul>
      </div>
    </div>
  );
}