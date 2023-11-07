import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './FullProduct.module.scss';
import { priceSplit } from '../../utils';
import { productsApi } from '../../redux/slice/products';
import CartSlider from '../../components/CartSlider';
import Loader from '../../components/Loader';
import ButtonAddCart from '../../components/Buttons/ButtonAddCart';
import ButtonAddWish from '../../components/Buttons/ButtonAddWish';

export const ProductCart: React.FC = () => {
  const { id } = useParams();
  const { data: product } = productsApi.useGetOneProductQuery(id || '');

  if (!product || !id) {
    return <Loader bgW={true} />;
  }

  return (
    <div className="container">
      <h2 className="content__title">{product.title}</h2>
      <div className={styles.product__cart}>
        <CartSlider imageUrl={product.imageUrl} />
        <div className={styles.content}>
          <p>{product.descr}</p>
          <div className={styles.content__buy}>
            <h3>{priceSplit(product.price)}₽</h3>
            <div className={styles.content__buy_buttons}>
              <ButtonAddWish item={product} />
              <ButtonAddCart item={product} flag={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
