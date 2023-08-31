import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ProductBlock.module.scss';
import { priceSplit } from '../../utils/priceSplit';

import { TypeProductItem } from '../../redux/slice/products/types';

import ButtonAddWish from '../Buttons/ButtonAddWish';
import ButtonAddCart from '../Buttons/ButtonAddCart';
import RatingStars from '../RatingStars';

const ProductItem: React.FC<{ item: TypeProductItem }> = ({ item }) => {
  const { id, imageUrl, title, price, rating } = item;

  return (
    <div className={styles.product_block}>
      <img className={styles.product_block__image} src={imageUrl} alt="Pizza" />
      <Link to={`product/${id}`}>
        <p className={styles.product_block__title}>{title}</p>
      </Link>
      <div className={styles.product_block__byu}>
        <div className={styles.product_block__price}>{priceSplit(price)} ₽</div>
        <div className={styles.product_block__link}>
          <ButtonAddWish item={item} />
          <ButtonAddCart item={item} />
        </div>
      </div>
      <div className={styles.product_block__rating}>
        <RatingStars ratingNum={rating} />
      </div>
    </div>
  );
};

export default ProductItem;
