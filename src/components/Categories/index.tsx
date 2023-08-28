import React from 'react';
import { useAppDispatch, useAppSelector } from '../../Hook/redux';

import styles from './Categories.module.scss'

import { selectFilter } from '../../redux/slice/filter/selectors';
import { setCategoryId } from '../../redux/slice/filter/slice';

const categories = ['ноутбуки', 'ПК', 'клавиатуры', 'мыши', 'колонки'];

// недоделанный функционал
// для начала нужно додалать API
const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoryId } = useAppSelector(selectFilter);

  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((el, i) => (
          <li
            className={categoryId === i ? styles.active : ''}
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
