import { ReactElement } from 'react';
import styles from '@components/Fade/Fade.module.css';
import { Fade as MuiFade, FadeProps as MuiFadeProps } from '@mui/material';


export interface FadeProps extends Partial<MuiFadeProps> {
  states: {
    a: ReactElement;
    b: ReactElement;
  };
};

export default function Fade(props: FadeProps) {
  return (
    <div className={styles.fade}>
      <MuiFade in={!props.in} appear={false}>
        { props.states.a }
      </MuiFade>
      <MuiFade in={props.in}>
        { props.states.b }
      </MuiFade>
    </div> 
  );
}
