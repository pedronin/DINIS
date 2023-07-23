import { TypeProductItem } from "../products/types";

export interface CartSliceState {
  cartItems: TypeProductItem[];
  deleteList: string[];
}
