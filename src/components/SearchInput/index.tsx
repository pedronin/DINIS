import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './SearchInput.module.scss';
import searchIconImg from '../../assets/img/search-icon.svg';
import clearInputImg from '../../assets/img/clear-input.svg';
import { setSearchValue } from '../../redux/slice/filter';

const SearchInput: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.code === 'Enter') {
        onChangeValue();
      }
    }
    document.addEventListener('keydown', handler);

    return () => document.removeEventListener('keydown', handler);
  }, [inputValue]);

  const onChangeValue = () => {
    dispatch(setSearchValue(inputValue));
    if (window.location.pathname !== '/') {
      navigate('/');
    }
  };

  const onChangeClearInput = () => {
    setInputValue('');
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  };

  return (
    <div className={styles.search__input}>
      <img
        onClick={onChangeValue}
        className={styles.search__input_loop}
        src={searchIconImg}
        alt="поиск"
      />
      <input
        onChange={(e) => setInputValue(e.target.value)}
        ref={inputRef}
        value={inputValue}
        type="text"
        placeholder="Поиск по сайту"
      />
      {inputValue && (
        <div className={styles.search__input_clear_wrap}>
          <img
            className={styles.search__input_clear}
            onClick={onChangeClearInput}
            src={clearInputImg}
            alt=""
          />
          <hr />
        </div>
      )}
    </div>
  );
};

export default SearchInput;
