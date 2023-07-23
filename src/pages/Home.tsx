import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { useAppDispatch, useAppSelector } from '../Hook/redux';
import { fetchProducts } from '../redux/slice/products/asyncActions';
import { setFilters } from '../redux/slice/filter/slice';
import { selectItems } from '../redux/slice/products/selectors';
import { selectFilter } from '../redux/slice/filter/selectors';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ProductItem from '../components/ProductBlock';
import Loader from '../components/Loader';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items = useSelector(selectItems);
  const { sortId, asc, categoryId, searchValue } = useSelector(selectFilter);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters(params));
    }
  }, []);

  React.useEffect(() => {
    const p = ['rating', 'price', 'title'];
    // const search = `?sortBy=${p[sortId]}&order=${asc === true ? 'asc' : 'desc'}&category=${categoryId}&title=${searchValue}`;
    const search = `?sortBy=${p[sortId]}&order=${
      asc === true ? 'asc' : 'desc'
    }&title=${searchValue}`;

    dispatch(fetchProducts(search));
  }, [sortId, asc, searchValue]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortId,
        asc,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sortId, asc]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Ноутбуки {items.length} товаров</h2>
      <div className="content__items">
        {items.length ? items.map((obj) => <ProductItem item={obj} key={obj.id} />) : <Loader />}
      </div>
    </div>
  );
};

export default Home;
