import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Item.module.scss';
import { priceSplit } from '../../utils/priceSplit';
import { useAppDispatch, useAppSelector } from '../../Hook/redux';
import { setDeleteList, selectDeleteList } from '../../redux/slice/wishlist';
import { TypeProductItem } from '../../redux/slice/products';
import ButtonAddCart from '../Buttons/ButtonAddCart';
import PopupCopyCode from '../PopupCopyCode';

interface WishlistItemProps { 
  item: TypeProductItem 
}

const WishlistItem: React.FC<WishlistItemProps> = ({ item }) => {
  const { id, code, imageUrl, title, price, descr } = item;
  const dispatch = useAppDispatch();
  const deleteList = useAppSelector(selectDeleteList);

  return (
    <div className={styles.cart__item}>
      <input
        checked={deleteList.includes(id) ? true : false}
        onChange={() => dispatch(setDeleteList(id))}
        className={styles.checkbox__deletion}
        type="checkbox"
      />
      <h3 className={styles.cart__item_title}>{title}</h3>
      <div className={styles.cart__item_wrapper}>
        <div>
          <div className={styles.cart__item_img}>
            <img className={styles.cart_block__image} src={imageUrl} alt="Product" />
          </div>
          <PopupCopyCode code={code.toString()} />
        </div>
        <div className={styles.cart__item_info}>
          <Link to={`/product/${id}`}>
            <p>{descr}</p>
          </Link>
          <div className={styles.cart__item_info_price}>
            <b>{priceSplit(price)} ₽</b>
            <ButtonAddCart item={item} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
