import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import filter from './slice/filter/slice'
import products from './slice/products/slice'
import cart from './slice/cart/slice'
import wishlist from './slice/wishlist/slice'

export const store = configureStore({
  reducer: {
    filter,
    products,
    cart,
    wishlist
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// export const useAppDispatch: () => AppDispatch = useDispatch
// export const useAppDispatch = () => useDispatch<typeof store.dispatch>()



