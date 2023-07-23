import React from 'react';
import cartEmptyImg from '../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';

const CartEmpty: React.FC = () => {
  return (
    <div className="container common-empty">
      <img src={cartEmptyImg} alt="Пусто" />
      <h2>Корзина пуста</h2>
      <p>Посмотрите предложения на главной странице, воспользуйтесь каталогом или поиском</p>
      <Link to="/" className="button button--outline button--add go-back-btn">
        <span>На главную</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
