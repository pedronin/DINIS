import React from 'react';

import styles from './Sort.module.scss';

import { useAppDispatch, useAppSelector } from '../../Hook/redux';
import { setSortId, setAsc } from '../../redux/slice/filter/slice';
import { selectFilter } from '../../redux/slice/filter/selectors';

const sortList = ['популярности', 'цене', 'алфавиту'];

const Sort: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sortId, asc } = useAppSelector(selectFilter);
  const [open, setOpen] = React.useState(false);

  return (
    <div className={styles.sort}>
      <div className={styles.sort__label}>
        <div
          // className={styles.asc ? 'sort__button' : 'sort__button sort__button-desc'}
          className={`${asc ? '' : styles.sort__button_desc} ${styles.sort__button}`}
          onClick={() => dispatch(setAsc())}>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
        </div>
        <b>Сортировка по: </b>
        <span onClick={() => setOpen(true)}>{sortList[sortId]}</span>
      </div>
      {open && (
        <div className={styles.sort__popup}>
          <ul>
            {sortList.map((el, i) => (
              <li
                className={sortId === i ? styles.active : ''}
                onClick={() => {
                  dispatch(setSortId(i));
                  setOpen(false);
                }}
                key={i}>
                {el}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
