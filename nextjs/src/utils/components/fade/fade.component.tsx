import { ReactElement } from 'react';
import styles from '@utils/components/fade/fade.module.css';
import { Fade as MuiFade, FadeProps as MuiFadeProps } from '@mui/material';


export interface FadeProps extends Partial<MuiFadeProps> {
  states: {
    a: ReactElement;
    b: ReactElement;
  };
  loading?: boolean;
  loadingComponent?: ReactElement;
};

export default function Fade({ states, loadingComponent, loading = false, ...props}: FadeProps) {
  return (
    <div className={styles.fade}>
      {loadingComponent && <MuiFade in={loading}>
        { loadingComponent }
      </MuiFade>}
      <MuiFade in={!loading && !props.in} appear={false}>
        { states.a }
      </MuiFade>
      <MuiFade in={!loading && props.in}>
        { states.b }
      </MuiFade>
    </div> 
  );
}
