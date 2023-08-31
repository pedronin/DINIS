import React from 'react';

import styles from './Cart.module.scss';
import { useAppDispatch, useAppSelector } from '../../Hook/redux';
import { priceSplit } from '../../utils/priceSplit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import basket from '../../assets/img/basket.svg';

import { TypeProductItem } from '../../redux/slice/products/types';
import { clearItems, setMarkDeleteAll } from '../../redux/slice/cart/slice';
import { selectCartItems, selectDeleteList } from '../../redux/slice/cart/selectors';

import CartItem from '../../components/CartAndWishItem/CartItem';
import CartEmpty from '../../components/EmptyPage/CartEmpty';
import ButtonToHome from '../../components/Buttons/ButtonToHome';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const deleteList = useAppSelector(selectDeleteList);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    isMounted.current = true;
  }, [cartItems]);

  if (!cartItems.length) {
    return <CartEmpty />;
  }

  return (
    <div className="container">
      <h2 className="content__title">Корзина</h2>
      <div className={styles.cart}>
        <div className={styles.cart__content}>
          <div className={styles.cart__management}>
            <div className={styles.cart__management_input}>
              <input
                checked={cartItems.length === deleteList.length ? true : false}
                onChange={() => dispatch(setMarkDeleteAll())}
                id="all"
                type="checkbox"
              />
              <label htmlFor="all">Выбрать всё</label>
            </div>
            <div onClick={() => dispatch(clearItems())} className={styles.cart__clear}>
              <img src={basket} alt="" />

              <span>Удалить выбранные</span>
            </div>
          </div>
          <div className={styles.content__items}>
            {cartItems.map((item: TypeProductItem) => (
              <CartItem {...item} key={item.id} />
            ))}
          </div>
        </div>
        <div className={styles.cart__menu}>
          <div className={styles.cart__menu_top}>
            <h4>Условия заказа</h4>
          </div>
          <hr className={styles.line} />
          <div className={styles.cart__menu_amount}>
            <h4>
              <span>Итого:</span>
              {cartItems.length}{' '}
              {cartItems.length > 4 ? 'товаров' : cartItems.length === 1 ? 'товар' : 'товара'}
            </h4>
            <h4>{priceSplit(calcTotalPrice(cartItems))}₽</h4>
          </div>
          <button className={styles.cart__menu_submit}>Перейти к оформлению</button>
          <div className={styles.cart__menu_remains}>
            В магазинах:
            <span>22 июля (СБ)</span>
          </div>
          <hr className={styles.line} />
          <div className={styles.cart__menu_bottom}>Нашли дешевле? Снизим цену</div>
        </div>
      </div>
      <div className={styles.cart__bottom_buttons}>
        <ButtonToHome />
      </div>
    </div>
  );
};

export default Cart;
