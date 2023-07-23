import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectFilter } from '../redux/slice/filter/selectors';
import { setCategoryId } from '../redux/slice/filter/slice';

const categories = ['ноутбуки', 'ПК', 'клавиатуры', 'мыши', 'колонки'];

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const { categoryId } = useSelector(selectFilter);

  return (
    <div className="categories">
      <ul>
        {categories.map((el, i) => (
          <li
            className={categoryId === i ? 'active' : ''}
            onClick={() => dispatch(setCategoryId(i))}
            key={i}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
