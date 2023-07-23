import React from 'react';

import styles from './PopupCopy.module.scss';

interface IPopupCopy {
  hidden: boolean;
}

const PopupCopy: React.FC<IPopupCopy> = ({ hidden }) => {
  return <>{!hidden && <div className={styles.popup__copy}>Код скопирован</div>}</>;
};

export default PopupCopy;
