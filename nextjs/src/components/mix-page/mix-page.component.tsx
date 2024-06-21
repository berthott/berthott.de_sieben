'use client';

import styles from './mix-page.module.css';

import { playerActions } from '@components/player/player.store';
import { Mix } from '@directus/mix.model';
import { assetsUrl, downloadUrl } from '@directus/directus.helpers';
import { useBreakpoints } from '@utils/hooks/breakpoints.hook';
import { useAppDispatch } from '@store/store';

import { PropsWithChildren, useState } from 'react';
import Image from 'next/image';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import { Snackbar } from '@mui/material';

export type MixPageProps = PropsWithChildren<{
  mix: Mix;
}>;

export function MixPage({mix}: MixPageProps) {
  const dispatch = useAppDispatch();
  const { isLg, isSm } = useBreakpoints();

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const share = (mix: Mix) => {
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || '';
    const url = `${baseUrl}/${mix.key}`;
    if (navigator.share && isSm) {
      const shareData: ShareData = {
        title: mix.title || '',
        text: `${mix.release}\n\n${mix.tracklist}`,
        url,
      };
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(url)
      setOpenSnackbar(true);
    }
  }

  // reusable title
  const title = (
    <div className={styles.title}>
      <h2>{mix.title}</h2>
      <h3>{mix.release}</h3>
      <div className={styles.hud}>
        <button onClick={() => dispatch(playerActions.play({ currentlyPlaying: mix.key, playAt: '0:00:00' }))}>
          <PlayArrowIcon />
        </button>
        <span className="grow"></span>
        <a href={downloadUrl(mix.audio)}>
          <DownloadIcon />
        </a>
        <button onClick={() => share(mix)}>
          <ShareIcon />
        </button>
      </div>
    </div>
  );

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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message='The link was copied to your clipboard.'
      />
    </section>
  );
}
