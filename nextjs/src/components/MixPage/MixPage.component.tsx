'use client';

import styles from '@components/MixPage/MixPage.module.css';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useAppDispatch } from '@store/store';
import { playerActions } from '@components/Player/Player.state';
import { Mix } from '@directus/mix.model';
import { assetsUrl } from '@directus/directus.helpers';
import { useBreakpoints } from '@utils/Breakpoints.hook';

export type MixPageProps = PropsWithChildren<{
  mix: Mix;
}>;

export default function MixPage({mix}: MixPageProps) {
  const dispatch = useAppDispatch();
  const { isLg } = useBreakpoints();

  const title = 
  (<div className={styles.title}>
    <h2>{mix.title}</h2>
    <h3>{mix.release}</h3>
    <button className={styles.play} onClick={() => dispatch(playerActions.play({ currentlyPlaying: mix.key, playAt: '0:00:00' }))}>
      <PlayArrowIcon />
    </button>
  </div>);
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
          height: isLg ? '100vh' : '60vh',
        }}/>
      <div id={`${mix.key}_tracklist`}>
        <div className={styles.title_container}>
          {isLg && title}
        </div>

        <div className={styles.tracklist_container}>
          {!isLg && title}
          <div className={styles.tracklist}>
            <ul>
              {mix.parsed_tracklist?.map((track, i) => 
                <li 
                  key={`${mix.key}_tracklist_${i}`}
                  className={styles.track}>
                    {track.time && (<button onClick={() => dispatch(playerActions.play({ currentlyPlaying: mix.key, playAt: track.time }))}>
                      <PlayArrowIcon/>
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
