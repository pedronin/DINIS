import { TypeProductItem } from '../products/types';

export interface WishlistSlice {
  wishItems: TypeProductItem[];
  deleteList: string[];
}
