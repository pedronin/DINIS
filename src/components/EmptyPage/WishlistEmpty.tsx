import React from 'react';
import wishlistEmptyImg from '../../assets/img/wishlist-empty.png';
import ButtonToHome from '../Buttons/ButtonToHome';

import styles from './EmptyPage.module.scss';

const WishlistEmpty: React.FC = () => {
  return (
    <div className={`${styles.root} container`}>
      <img src={wishlistEmptyImg} alt="Пусто" />
      <h2>Упс пусто</h2>
      <p>В списке пока нет ни одного избранного товара</p>
      <ButtonToHome />
    </div>
  );
};

export default WishlistEmpty;
