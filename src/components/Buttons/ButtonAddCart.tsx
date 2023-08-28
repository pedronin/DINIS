import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Buttons.module.scss';

import { useAppDispatch, useAppSelector } from '../../Hook/redux';

import { TypeProductItem } from '../../redux/slice/products/types';
import { addItemCart } from '../../redux/slice/cart/slice';
import { selectCartItems } from '../../redux/slice/cart/selectors';

const cartItemIncluded = (cartItems: TypeProductItem[], id: string): Boolean => {
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id === id) return true;
  }
  return false;
};

interface IButtonAdd {
  flag?: Boolean;
  item: TypeProductItem;
}

const ButtonAddCart: React.FC<IButtonAdd> = ({ flag, item }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  React.useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  if (flag) {
    return cartItemIncluded(cartItems, item.id) ? (
      <Link to="/cart">
        <button className={`${styles.button__cart_custom} ${styles.active}`}>В корзине</button>
      </Link>
    ) : (
      <button onClick={() => dispatch(addItemCart(item))} className={styles.button__cart_custom}>
        Купить
      </button>
    );
  }

  return (
    <div
      className={`${styles.button__cart} ${
        cartItemIncluded(cartItems, item.id) ? styles.active : ''
      }`}
      onClick={() => dispatch(addItemCart(item))}>
      <svg
        data-v-7100e328=""
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          // data-v-7100e328=""
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.25 3C2.25 2.58579 2.58579 2.25 3 2.25H4.38197C5.04482 2.25 5.65078 2.6245 5.94721 3.21738L5.27639 3.55279L5.94721 3.21738L6.46353 4.25H20.1384C21.0982 4.25 21.6999 5.28685 21.2237 6.12017L17.9391 11.8682C17.6275 12.4135 17.0477 12.75 16.4197 12.75H8.91567L7.59225 14.8675C7.48818 15.034 7.60789 15.25 7.80425 15.25H19C19.4142 15.25 19.75 15.5858 19.75 16C19.75 16.4142 19.4142 16.75 19 16.75H7.80425C6.42974 16.75 5.59176 15.2381 6.32025 14.0725L7.67159 11.9103L5.30898 5.295L4.60557 3.8882C4.56322 3.8035 4.47666 3.75 4.38197 3.75H3C2.58579 3.75 2.25 3.41421 2.25 3ZM7.06427 5.75L9.02855 11.25H16.4197C16.5094 11.25 16.5922 11.2019 16.6368 11.124L19.7076 5.75H7.06427ZM10 19.5C10 20.3284 9.32843 21 8.5 21C7.67157 21 7 20.3284 7 19.5C7 18.6716 7.67157 18 8.5 18C9.32843 18 10 18.6716 10 19.5ZM17.5 21C18.3284 21 19 20.3284 19 19.5C19 18.6716 18.3284 18 17.5 18C16.6716 18 16 18.6716 16 19.5C16 20.3284 16.6716 21 17.5 21Z"></path>
      </svg>
    </div>
  );
};

export default ButtonAddCart;
