import { useAppSelector } from '../Hook/redux';
import { selectFilter } from '../redux/slice/filter/selectors';

export const useAddLocSearch = () => {
  const { sortId, asc, searchValue } = useAppSelector(selectFilter);
  const p = ['rating', 'price', 'title'];
  // const search = `?sortBy=${p[sortId]}&order=${asc === true ? 'asc' : 'desc'}&category=${categoryId}&title=${searchValue}`;
  return `?sortBy=${p[sortId]}&order=${asc === true ? 'asc' : 'desc'}&title=${searchValue}`;
};
