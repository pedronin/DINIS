import React from 'react';
import { setSearchValue } from '../redux/slice/filter/slice';
import { useDispatch } from 'react-redux';

import searchIconImg from '../assets/img/search-icon.svg';
import clearInputImg from '../assets/img/clear-input.svg';
import { useNavigate } from 'react-router-dom';

const Search: React.FC = () => {
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
    // setInputValue('')
  };

  const onChangeClearInput = () => {
    setInputValue('');
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  };

  return (
    <div className="search__input">
      <img onClick={onChangeValue} className="search__input-loop" src={searchIconImg} alt="поиск" />
      <input
        onChange={(e) => setInputValue(e.target.value)}
        ref={inputRef}
        value={inputValue}
        type="text"
        placeholder="Поиск по сайту"
      />
      {inputValue && (
        <div className="search__input-clear-wrap">
          <img
            className="search__input-clear"
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

export default Search;
