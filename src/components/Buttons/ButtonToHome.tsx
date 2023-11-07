import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Buttons.module.scss';

const ButtonToHome: React.FC = () => {
  return (
    <Link to="/">
      <button className={styles.button__back}>На главную</button>
    </Link>
  );
};

export default ButtonToHome;
