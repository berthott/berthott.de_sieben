'use client';

import styles from '@utils/components/border/border.module.css';
import { use100vh } from 'react-div-100vh';

export default function Border() {
  return (
    <div className={styles.border} style={{ height: use100vh() || '100lvh'}}></div>
  );
}