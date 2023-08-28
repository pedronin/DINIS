import React from 'react';

import styles from './PopupCopyCode.module.scss';

interface IPopupCopyCode {
  code: string;
}

const PopupCopyCode: React.FC<IPopupCopyCode> = ({ code }) => {
  const [hidden, setHidden] = React.useState(true);

  const copyCode = () => {
    setHidden(false);
    navigator.clipboard.writeText(code);
  };

  // скрываем модалку о скопированнии кода товара
  React.useEffect(() => {
    if (!hidden) {
      setTimeout(() => {
        setHidden(true);
      }, 1000);
    }
  }, [hidden]);

  return (
    <div className={styles.code}>
      <p onClick={() => copyCode()}>Код товара: {code}</p>
      {!hidden && <div className={styles.popup__copy}>Код скопирован</div>}
    </div>
  );
};

export default PopupCopyCode;
