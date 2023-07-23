export type TypeProductItem = {
  id: string;
  code: number;
  imageUrl: string;
  title: string;
  price: number;
  category: number;
  rating: number;
  descr: string;
};

export interface ProductsSliceState {
  items: TypeProductItem[];
  status: Status;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
