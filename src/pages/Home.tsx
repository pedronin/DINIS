import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { useAppDispatch } from '../Hook/redux';
import { productsApi } from '../redux/slice/products/asyncActions';
import { setFilters } from '../redux/slice/filter/slice';
import { selectFilter } from '../redux/slice/filter/selectors';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ProductItem from '../components/ProductBlock';
import Loader from '../components/Loader';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sortId, asc, searchValue } = useSelector(selectFilter);
  const isMounted = React.useRef(false);
  const [search, setSearch] = React.useState('');

  const { data, error, isLoading } = productsApi.useFetchAllProductsQuery(search);

  React.useEffect(() => {
    console.log(window.location);
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters(params));
    }
  }, []);

  React.useEffect(() => {
    const sortList = ['rating', 'price', 'title'];
    // const search = `?sortBy=${p[sortId]}&order=${asc === true ? 'asc' : 'desc'}&category=${categoryId}&title=${searchValue}`;
    const d = `?sortBy=${sortList[sortId]}&order=${asc === true ? 'asc' : 'desc'}&title=${searchValue}`;
    setSearch(d);
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

  if (!data || isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="container">
        <h1>Ошибка при загрузке данных</h1>
        <h2>Попробуйте немного позже</h2>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Ноутбуки {data.length} товаров</h2>
      <div className="content__items">
        {data.map((obj) => (
          <ProductItem item={obj} key={obj.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
