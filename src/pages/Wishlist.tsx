import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { clearItems, setMarkDeleteAll } from '../redux/slice/wishlist/slice';
import { selectDeleteList, selectWishItems } from '../redux/slice/wishlist/selectors';

import basket from '../assets/img/basket.svg';
import { priceSplit } from '../utils/priceSplit';
import { calcTotalPrice } from '../utils/calcTotalPrice';

import WishlistItem from '../components/WishlistItem';
import WishlistEmpty from '../components/WishlistEmpty';
import { TypeProductItem } from '../redux/slice/products/types';

const Wishlist: React.FC = () => {
  const dispatch = useDispatch();
  const wishItems = useSelector(selectWishItems);
  const deleteList = useSelector(selectDeleteList);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('wishItems', JSON.stringify(wishItems));
    }
    isMounted.current = true;
  }, [wishItems]);

  if (!wishItems.length) {
    return <WishlistEmpty />;
  }

  return (
    <div className="container">
      <div className="wishlist">
        <h2 className="content__title">Избранное</h2>

        <div className="wishlist__management">
          <div className="wishlist__management-info">
            <b>
              {wishItems.length}{' '}
              {wishItems.length > 4 ? 'товаров' : wishItems.length === 1 ? 'товар' : 'товара'} на
              сумму: {priceSplit(calcTotalPrice(wishItems))} ₽
            </b>
          </div>
          <div className="wishlist__management-main">
            <div className="wishlist__management-input">
              <input
                checked={wishItems.length === deleteList.length ? true : false}
                onChange={() => dispatch(setMarkDeleteAll())}
                id="all"
                type="checkbox"
              />
              <label htmlFor="all">Выбрать всё</label>
            </div>
            <div onClick={() => dispatch(clearItems())} className="wishlist__clear">
              <span></span>
              <img src={basket} alt="" />
            </div>
          </div>
        </div>
        <div className="content__items">
          {wishItems.map((item: TypeProductItem) => (
            <WishlistItem {...item} key={item.id} />
          ))}
        </div>
        <div className="wishlist__bottom">
          <div className="wishlist__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <span>На главную</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
