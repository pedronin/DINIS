// import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { TypeProductItem, Status } from '../products/types';
// import { fetchProducts } from '../products/asyncActions';
// import { ProductsSliceState } from './types';

// const initialState: ProductsSliceState = {
//   items: [],
//   status: Status.LOADING,
// };

// const productsSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {},
//   extraReducers(builder) {
//     builder.addCase(fetchProducts.pending, (state) => {
//       state.items = [];
//       state.status = Status.LOADING;
//     });
//     builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<TypeProductItem[]>) => {
//       state.items = action.payload;
//       state.status = Status.SUCCESS;
//     });
//     builder.addCase(fetchProducts.rejected, (state) => {
//       state.items = [];
//       state.status = Status.ERROR;
//     });
//   },
// });

// export default productsSlice.reducer;

export {}