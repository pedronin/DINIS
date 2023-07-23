import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { clearItems, setMarkDeleteAll } from '../redux/slice/cart/slice';
import { selectCartItems, selectDeleteList } from '../redux/slice/cart/selectors';

import basket from '../assets/img/basket.svg';
import { priceSplit } from '../utils/priceSplit';
import { calcTotalPrice } from '../utils/calcTotalPrice';

import CartItem from '../components/CartItem';
import CartEmpty from '../components/CartEmpty';
import { TypeProductItem } from '../redux/slice/products/types';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const deleteList = useSelector(selectDeleteList);
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
      <div className="cart">
        <div className="cart__content">
          <div className="cart__management">
            <div className="cart__management-input">
              <input
                checked={cartItems.length === deleteList.length ? true : false}
                onChange={() => dispatch(setMarkDeleteAll())}
                id="all"
                type="checkbox"
              />
              <label htmlFor="all">Выбрать всё</label>
            </div>
            <div onClick={() => dispatch(clearItems())} className="cart__clear">
              <img src={basket} alt="" />

              <span>Удалить выбранные</span>
            </div>
          </div>
          <div className="content__items">
            {cartItems.map((item: TypeProductItem) => (
              <CartItem {...item} key={item.id} />
            ))}
          </div>
          <div className="cart__bottom"></div>
        </div>
        <div className="cart__menu">
          <div className="cart__menu-top">
            <h4>Условия заказа</h4>
          </div>
          <hr className="line" />
          <div className="cart__menu-amount">
            <h4>
              <span>Итого:</span>
              {cartItems.length}{' '}
              {cartItems.length > 4 ? 'товаров' : cartItems.length === 1 ? 'товар' : 'товара'}
            </h4>
            <h4>{priceSplit(calcTotalPrice(cartItems))}₽</h4>
          </div>
          <button className="cart__menu-submit">Перейти к оформлению</button>
          <div className="cart__menu-remains">
            В магазинах:
            <span>22 июля (СБ)</span>
          </div>
          <hr className="line" />
          <div className="cart__menu-bottom">Нашли дешевле? Снизим цену</div>
        </div>
      </div>
      <div className="cart__bottom-buttons">
        <Link to="/" className="button button--outline button--add go-back-btn">
          <span>На главную</span>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
