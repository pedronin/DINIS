import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { TypeProductItem } from '../redux/slice/products/types';
import { addItemWishlist } from '../redux/slice/wishlist/slice';
import { addItemCart } from '../redux/slice/cart/slice';
import { selectWishItems } from '../redux/slice/wishlist/selectors';
import { selectCartItems } from '../redux/slice/cart/selectors';

import CartSlider from '../components/CartSlider';

const wishlistItemIncluded = (wishItems: TypeProductItem[], id?: string): Boolean => {
  for (let i = 0; i < wishItems.length; i++) {
    if (wishItems[i].id === id) return true;
  }
  return false;
};

const cartItemIncluded = (cartItems: TypeProductItem[], id?: string): Boolean => {
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id === id) return true;
  }
  return false;
};

export const ProductCart: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishItems = useSelector(selectWishItems);
  const cartItems = useSelector(selectCartItems);
  const [product, setProduct] = React.useState<TypeProductItem>();
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    async function fetchProduct() {
      try {
        // const { data } = await axios.get('https://64b3aab60efb99d862683de5.mockapi.io/items/' + id);
        const { data } = await axios.get('https://64b7989221b9aa6eb0789204.mockapi.io/items/' + id);
        setProduct(data);
      } catch (error) {
        alert('Что-то пошло не так');
        navigate('/');
      }
    }
    fetchProduct();
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('wishItems', JSON.stringify(wishItems));
    }
  }, [wishItems]);

  React.useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    isMounted.current = true;
  }, [cartItems]);

  if (!product) {
    return (
      <div className="container">
        <h2>Загрузка...</h2>
      </div>
    );
  }

  return (
    <div className="container ">
      <h2 className="content__title">{product.title}</h2>
      <div className="product__cart">
        <CartSlider imageUrl={product.imageUrl} />
        <div className="product__cart-content">
          <p>{product.descr}</p>
          <div className="product__cart-content-buy">
            <h3>
              {product.price
                .toString()
                .replace(
                  /(\d{3})+$/,
                  (g, g1, i) => (i ? ' ' : '') + g.match(/.{3}/g)?.join(' '),
                )}{' '}
              ₽
            </h3>
            <div className="product__cart-content-buy-wrap">
              <div
                className={`product-block__wishlist ${
                  wishlistItemIncluded(wishItems, id) ? 'active' : ''
                }`}
                onClick={() => dispatch(addItemWishlist(product))}>
                <svg
                  data-v-7100e328=""
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.25 6.36912C0.25 3.07041 2.65767 0.25 5.79925 0.25C7.49913 0.25 8.99404 1.08608 10 2.36847C11.0059 1.08613 12.5006 0.25 14.1996 0.25C17.3423 0.25 19.75 3.07167 19.75 6.36912C19.75 7.69532 19.2489 8.97129 18.5251 10.1284C17.7997 11.2883 16.8229 12.3733 15.8015 13.3326C13.7592 15.2508 11.4589 16.7397 10.3901 17.3906C10.1504 17.5365 9.84927 17.5365 9.60965 17.3904C8.54109 16.7391 6.24079 15.2501 4.19851 13.3322C3.17709 12.3729 2.20033 11.288 1.47488 10.1283C0.751138 8.97123 0.25 7.69533 0.25 6.36912ZM5.79925 1.75C3.63983 1.75 1.75 3.73625 1.75 6.36912C1.75 7.31789 2.11117 8.31698 2.74658 9.33278C3.38027 10.3458 4.25947 11.3316 5.22537 12.2387C6.94066 13.8496 8.86662 15.1546 10.0001 15.8678C11.1335 15.1552 13.0594 13.8502 14.7746 12.2392C15.7405 11.3321 16.6197 10.3462 17.2534 9.33299C17.8888 8.31707 18.25 7.3179 18.25 6.36912C18.25 3.73751 16.3602 1.75 14.1996 1.75C12.7203 1.75 11.3843 2.66549 10.6719 4.10155C10.5452 4.35679 10.2849 4.51824 10 4.51824C9.71508 4.51824 9.45476 4.35679 9.32813 4.10155C8.61575 2.66559 7.2798 1.75 5.79925 1.75Z"></path>
                </svg>
              </div>
              <div className="product__cart-content-button-wrap">
                {cartItemIncluded(cartItems, id) ? (
                  <Link to="/cart">
                    <button className="product__cart-content-button">В корзине</button>
                  </Link>
                ) : (
                  <button
                    onClick={() => dispatch(addItemCart(product))}
                    className="product__cart-content-button active">
                    Купить
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
