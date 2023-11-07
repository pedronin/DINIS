import React from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import styles from './Home.module.scss';
import { useAppDispatch, useAppSelector } from '../../Hook/redux';
import { productsApi } from '../../redux/slice/products';
import { setFilters, selectFilter } from '../../redux/slice/filter';
import Sort from '../../components/Sort';
import ProductItem from '../../components/ProductBlock';
import Loader from '../../components/Loader';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sortId, asc, searchValue } = useAppSelector(selectFilter);
  const isMounted = React.useRef(false);
  const [search, setSearch] = React.useState('');

  const { data, error, isLoading } = productsApi.useFetchAllProductsQuery(search);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters(params));
    }
  }, []);

  React.useEffect(() => {
    const sortList = ['rating', 'price', 'title'];
    const d = `?sortBy=${sortList[sortId]}&order=${
      asc === true ? 'asc' : 'desc'
    }&title=${searchValue}`;
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
    );
  }

  return (
    <div className="container">
      <h2 className={styles.content__title}>Ноутбуки {data.length} товаров</h2>
      <div className={styles.content__sort}>
        {/* <Categories /> */}
        <Sort />
      </div>
      <div className={styles.content__items}>
        {data.map((obj) => (
          <ProductItem item={obj} key={obj.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
