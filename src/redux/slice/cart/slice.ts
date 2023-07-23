import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartSliceState } from "./types";
import { TypeProductItem } from "../products/types";

const initialState: CartSliceState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
  deleteList: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemCart(state, action: PayloadAction<TypeProductItem>) {
      const find = state.cartItems.find((obj) => obj.id === action.payload.id);
      if (find) {
        state.cartItems = state.cartItems.filter((obj) => obj.id !== action.payload.id);
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeItem(state, action: PayloadAction<TypeProductItem>) {
      state.cartItems = state.cartItems.filter((obj) => obj.id !== action.payload.id);
    },
    clearItems(state) {
      state.cartItems = state.cartItems.filter((obj) => {
        if (state.deleteList.includes(obj.id)) {
          return false;
        } else return true;
      });
      state.deleteList = [];
    },
    setDeleteList(state, action) {
      if (state.deleteList.includes(action.payload)) {
        state.deleteList = state.deleteList.filter((el) => el !== action.payload);
      } else {
        state.deleteList.push(action.payload);
      }
    },
    setMarkDeleteAll(state) {
      if (state.deleteList.length === state.cartItems.length) {
        state.deleteList = [];
      } else {
        state.deleteList = state.cartItems.map((obj) => obj.id);
      }
    },
  },
});

export const { addItemCart, removeItem, clearItems, setDeleteList, setMarkDeleteAll } =
  cartSlice.actions;
export default cartSlice.reducer;
