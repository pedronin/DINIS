import React from 'react';
import styles from './Loader.module.scss'

interface ILoader {
  bgW?: boolean
} 

const Loader: React.FC<ILoader> = ({ bgW }) => {
  if (bgW) {
    return (
      <div className={`${styles.loader__container} ${styles.loader__container_white}`}>
        <div className={styles.spinner}></div>
      </div>
    )
  }

  return (
      <div className={styles.loader__container}>
        <div className={styles.spinner}></div>
      </div>
  );
};

export default Loader