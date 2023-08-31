import React from 'react';

import styles from './EmptyPage.module.scss'
import cartEmptyImg from '../../assets/img/empty-cart.png';

import ButtonToHome from '../Buttons/ButtonToHome';

const CartEmpty: React.FC = () => {
  return (
    <div className={`${styles.root} container`}>
      <img src={cartEmptyImg} alt="Пусто" />
      <h2>Корзина пуста</h2>
      <p>Посмотрите предложения на главной странице, воспользуйтесь каталогом или поиском</p>
      <ButtonToHome />
    </div>
  );
};

export default CartEmpty;
