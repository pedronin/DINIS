import React from 'react';
import { Link } from 'react-router-dom';
import wishlistEmptyImg from '../assets/img/wishlist-empty.png';

const WishlistEmpty: React.FC = () => {
  return (
    <div className="container common-empty">
      <img src={wishlistEmptyImg} alt="Пусто" />
      <h2>Упс пусто</h2>
      <p>В списке пока нет ни одного избранного товара</p>
      <Link to="/" className="button button--outline button--add go-back-btn">
        <span>На главную</span>
      </Link>
    </div>
  );
};

export default WishlistEmpty;
