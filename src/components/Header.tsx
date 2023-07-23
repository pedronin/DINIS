import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCartItems } from '../redux/slice/cart/selectors';
import { selectWishItems } from '../redux/slice/wishlist/selectors';

import logo from '../assets/img/logo.svg';
import wishlist from '../assets/img/wishlist.svg';
import cart from '../assets/img/cart.svg';

import { calcTotalPrice } from '../utils/calcTotalPrice';
import { priceSplit } from '../utils/priceSplit';

import Search from './Search';

const Header: React.FC = () => {
  const wishItems = useSelector(selectWishItems);
  const cartItems = useSelector(selectCartItems);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <h2>DINIS</h2>
            {/* <img src={logo} alt="DINIS logo" /> */}
          </div>
        </Link>
        <Search />
        <div className="header__cart">
          <Link to="/wishlist">
            <div className="header__cart-link">
              <span>
                <img className="header__cart-img-wish" src={wishlist} alt="Wishlist logo" />
                {wishItems.length ? (
                  <div className="header__cart-count">{wishItems.length}</div>
                ) : (
                  ''
                )}
              </span>
              <span className="header__cart-descr">Избранное</span>
            </div>
          </Link>
          <Link to="/cart">
            <div className="header__cart-link">
              <span>
                <img src={cart} alt="Cart logo" />
                {cartItems.length ? (
                  <div className="header__cart-count header__cart-count-wishlist">
                    {cartItems.length}
                  </div>
                ) : (
                  ''
                )}
              </span>
              {cartItems.length ? (
                <span className="header__cart-descr">
                  {priceSplit(calcTotalPrice(cartItems))} ₽
                </span>
              ) : (
                <span className="header__cart-descr">Корзина</span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
