import { TypeProductItem } from '../redux/slice/products/types';

// общая сумма
export const calcTotalPrice = (items: TypeProductItem[]) => {
  return items.reduce((acc, el) => acc + el.price, 0);
};
