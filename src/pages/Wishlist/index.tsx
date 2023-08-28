import React from 'react';

import styles from './Wishlist.module.scss';

import { useAppDispatch, useAppSelector } from '../../Hook/redux';

import { clearItems, setMarkDeleteAll } from '../../redux/slice/wishlist/slice';
import { selectDeleteList, selectWishItems } from '../../redux/slice/wishlist/selectors';

import basket from '../../assets/img/basket.svg';
import { priceSplit } from '../../utils/priceSplit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

import WishlistItem from '../../components/CartAndWishItem/WishlistItem';
import WishlistEmpty from '../../components/EmptyPage/WishlistEmpty';
import { TypeProductItem } from '../../redux/slice/products/types';
import ButtonToHome from '../../components/Buttons/ButtonToHome';

const Wishlist: React.FC = () => {
  const dispatch = useAppDispatch();
  const wishItems = useAppSelector(selectWishItems);
  const deleteList = useAppSelector(selectDeleteList);
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
      <div className={styles.wishlist}>
        <h2 className="content__title">Избранное</h2>
        <div className={styles.wishlist__management}>
          <div className={styles.wishlist__management_info}>
            <b>
              {wishItems.length}{' '}
              {wishItems.length > 4 ? 'товаров' : wishItems.length === 1 ? 'товар' : 'товара'} на
              сумму: {priceSplit(calcTotalPrice(wishItems))} ₽
            </b>
          </div>
          <div className={styles.wishlist__management_main}>
            <div className={styles.wishlist__management_input}>
              <input
                checked={wishItems.length === deleteList.length ? true : false}
                onChange={() => dispatch(setMarkDeleteAll())}
                id="all"
                type="checkbox"
              />
              <label htmlFor="all">Выбрать всё</label>
            </div>
            <div onClick={() => dispatch(clearItems())} className={styles.wishlist__clear}>
              <span></span>
              <img src={basket} alt="" />
            </div>
          </div>
        </div>
        <div className={styles.content__items}>
          {wishItems.map((item: TypeProductItem) => (
            <WishlistItem item={item} key={item.id} />
          ))}
        </div>
        <div className={styles.wishlist__bottom}>
          <ButtonToHome />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
