'use client';

import styles from '@components/MixPage/MixPage.module.css';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useAppDispatch } from '@store/store';
import { playerActions } from '@components/Player/Player.state';
import { Mix } from '@directus/mix.model';
import { assetsUrl } from '@directus/directus.helpers';

export type MixPageProps = PropsWithChildren<{
  mix: Mix;
}>;

export default function MixPage({mix}: MixPageProps) {
  const dispatch = useAppDispatch();
  return (
    <section className={styles.page} id={mix.key}>
      <Image 
        className={styles.img} 
        src={assetsUrl(mix.image)} 
        alt={mix.key} 
        width={0}
        height={0} 
        sizes="100vw" 
        style={{
          width: '100%',
          height: '100vh',
        }}/>
      <div id={`${mix.key}_tracklist`}>
        <div className={styles.play_container}>
          <button className={styles.play} onClick={() => dispatch(playerActions.play({ currentlyPlaying: mix.key }))}>
            <PlayArrowRoundedIcon  style={{fontSize: 200}}/>
          </button>
        </div>
        <div className={styles.title_container}>
          <div className={styles.title}>
            <h2>{mix.title}</h2>
            <h3>{mix.release}</h3>
          </div>
        </div>

        <div className={styles.tracklist_container}>
          <div className={styles.tracklist}>
            <ul>
              {mix.parsed_tracklist?.map((track, i) => 
                <li 
                  key={`${mix.key}_tracklist_${i}`}
                  className={styles.track}>
                    {track.time && (<button onClick={() => dispatch(playerActions.play({ currentlyPlaying: mix.key, playAt: track.time }))}>
                      <PlayArrowRoundedIcon/>
                    </button>)}
                    <span className="grow"></span>
                    <div>
                      <div className={styles.artist}>{track.artist}</div>
                      <div className={styles.track_title}>{track.title}</div>
                    </div>
                </li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
