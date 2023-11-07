import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { useAppSelector } from '../../Hook/redux';
import { calcTotalPrice, priceSplit } from '../../utils';
import { selectCartItems } from '../../redux/slice/cart';
import { selectWishItems } from '../../redux/slice/wishlist';
import SearchInput from '../SearchInput';
import wishlist from '../../assets/img/wishlist.svg';
import cart from '../../assets/img/cart.svg';

const Header: React.FC = () => {
  const wishItems = useAppSelector(selectWishItems);
  const cartItems = useAppSelector(selectCartItems);

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          <div className={styles.header__logo}>
            <h2>DINIS</h2>
          </div>
        </Link>
        <SearchInput />
        <div className={styles.header__cart}>
          <Link to="/wishlist">
            <div className={styles.header__cart_link}>
              <span>
                <img className={styles.header__cart_wish} src={wishlist} alt="Wishlist logo" />
                {wishItems.length ? (
                  <div className={styles.header__cart_count}>{wishItems.length}</div>
                ) : (
                  ''
                )}
              </span>
              <span className={styles.header__cart_descr}>Избранное</span>
            </div>
          </Link>
          <Link to="/cart">
            <div className={styles.header__cart_link}>
              <span>
                <img src={cart} alt="Cart logo" />
                {cartItems.length ? (
                  <div
                    className={`${styles.header__cart_count} ${styles.header__cart_count_wishlist}`}>
                    {cartItems.length}
                  </div>
                ) : (
                  ''
                )}
              </span>
              {cartItems.length ? (
                <span className={styles.header__cart_descr}>
                  {priceSplit(calcTotalPrice(cartItems))} ₽
                </span>
              ) : (
                <span className={styles.header__cart_descr}>Корзина</span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
