import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteList } from '../redux/slice/cart/slice';
import { Link } from 'react-router-dom';
import PopupCopy from './PopupCopy/PopupCopy';
import { priceSplit } from '../utils/priceSplit';
import { selectDeleteList } from '../redux/slice/cart/selectors';

type ICartItem = {
  id: string;
  code: number;
  imageUrl: string;
  title: string;
  price: number;
  descr: string;
};

const CartItem: React.FC<ICartItem> = ({ id, code, imageUrl, title, price, descr }) => {
  const dispatch = useDispatch();
  const deleteList = useSelector(selectDeleteList);
  const [hidden, setHidden] = React.useState(true);

  const copyCode = () => {
    setHidden(false);
    navigator.clipboard.writeText(code.toString());
  };

  // скрываем модалку о скопированнии кода товара
  React.useEffect(() => {
    if (!hidden) {
      setTimeout(() => {
        setHidden(true);
      }, 1000);
    }
  }, [hidden]);

  return (
    <div className="cart__item">
      <input
        checked={deleteList.includes(id) ? true : false}
        onChange={() => dispatch(setDeleteList(id))}
        className="checkbox__deletion"
        type="checkbox"
      />
      <h3 className="cart__item-title">{title}</h3>
      <div className="cart__item-wrapper">
        <div>
          <div className="cart__item-img">
            <img className="cart-block__image" src={imageUrl} alt="Product" />
          </div>
          <div className="cart__item-code">
            <p onClick={() => copyCode()}>Код товара: {code}</p>
            <PopupCopy hidden={hidden} />
          </div>
        </div>
        <div className="cart__item-info">
          <Link to={`/product/${id}`}>
            <p>{descr}</p>
          </Link>
          <div className="cart__item-info-price">
            <b>{priceSplit(price)} ₽</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
